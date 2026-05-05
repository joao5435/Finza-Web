const KEY = 'finza_v1'

export function loadTransactions() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTransactions(transactions) {
  localStorage.setItem(KEY, JSON.stringify(transactions))
}

export function addTransaction(transactions, tx) {
  const updated = [...transactions, tx]
  saveTransactions(updated)
  return updated
}

export function removeTransaction(transactions, id) {
  const updated = transactions.filter(t => t.id !== id)
  saveTransactions(updated)
  return updated
}
