import { useState } from 'react'
import { createTransaction, validateTransaction, isIncome, isExpense, getYearMonth } from '../models/Transaction.js'
import { loadTransactions, addTransaction, removeTransaction } from '../models/store.js'

// Hook controller — fica entre as views e os models.
// As views chamam as actions daqui, nunca tocam o store diretamente.
export function useFinza() {
  const [transactions, setTransactions] = useState(() => loadTransactions())

  function add(formData) {
    const error = validateTransaction(formData)
    if (error) return { ok: false, error }

    const tx      = createTransaction(formData)
    const updated = addTransaction(transactions, tx)
    setTransactions(updated)
    return { ok: true }
  }

  function remove(id) {
    const updated = removeTransaction(transactions, id)
    setTransactions(updated)
  }

  // Dados computados que as views consomem
  function getSummaryForMonth(yearMonth) {
    const month    = transactions.filter(t => getYearMonth(t) === yearMonth)
    const income   = month.filter(isIncome).reduce((s, t) => s + t.amount, 0)
    const expenses = month.filter(isExpense).reduce((s, t) => s + t.amount, 0)
    return {
      income,
      expenses,
      balance:       income - expenses,
      incomeCount:   month.filter(isIncome).length,
      expensesCount: month.filter(isExpense).length,
    }
  }

  function getRecentTransactions(limit = 5) {
    return [...transactions].sort((a, b) => b.id - a.id).slice(0, limit)
  }

  function getFilteredTransactions(filter) {
    const sorted = [...transactions].sort((a, b) => b.id - a.id)
    if (filter === 'income')  return sorted.filter(isIncome)
    if (filter === 'expense') return sorted.filter(isExpense)
    return sorted
  }

  function getExpensesForMonth(yearMonth) {
    return transactions.filter(t => getYearMonth(t) === yearMonth && isExpense(t))
  }

  function getMonthlyTotals(months) {
    return months.map(m => {
      const monthTxs = transactions.filter(t => getYearMonth(t) === m.ym)
      return {
        income:   monthTxs.filter(isIncome).reduce((s, t) => s + t.amount, 0),
        expenses: monthTxs.filter(isExpense).reduce((s, t) => s + t.amount, 0),
      }
    })
  }

  return {
    transactions,
    add,
    remove,
    getSummaryForMonth,
    getRecentTransactions,
    getFilteredTransactions,
    getExpensesForMonth,
    getMonthlyTotals,
  }
}
