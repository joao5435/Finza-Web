// Categorias disponíveis por tipo
export const CATEGORIES = {
  expense: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Lazer', 'Educação', 'Vestuário', 'Assinaturas', 'Outros'],
  income:  ['Salário', 'Freelance', 'Investimentos', 'Presente', 'Bônus', 'Outros'],
}

export const CATEGORY_META = {
  Alimentação:   { emoji: '🍽', color: '#e8935a' },
  Transporte:    { emoji: '🚗', color: '#5a9de8' },
  Moradia:       { emoji: '🏠', color: '#9b5ae8' },
  Saúde:         { emoji: '💊', color: '#5ae8b0' },
  Lazer:         { emoji: '🎮', color: '#e85a6e' },
  Educação:      { emoji: '📚', color: '#5ac8e8' },
  Vestuário:     { emoji: '👕', color: '#e85ab0' },
  Assinaturas:   { emoji: '📱', color: '#8a7fe8' },
  Salário:       { emoji: '💼', color: '#4ecb91' },
  Freelance:     { emoji: '💻', color: '#5a9de8' },
  Investimentos: { emoji: '📈', color: '#4ade80' },
  Presente:      { emoji: '🎁', color: '#e8c45a' },
  Bônus:         { emoji: '⭐', color: '#f0d060' },
  Outros:        { emoji: '📋', color: '#707080' },
}

export const PALETTE = ['#7b6ef6', '#4ecb91', '#e85a6e', '#e8935a', '#5a9de8', '#e85ab0', '#4ade80', '#e8c45a']

// A entidade em si — objeto simples, sem classes
export function createTransaction({ description, amount, type, category, payment, date }) {
  return {
    id:          Date.now() + Math.random(), // evita colisão em criações rápidas
    description,
    amount:      Number(amount),
    type,        // 'income' | 'expense'
    category,
    payment,
    date,        // 'YYYY-MM-DD'
  }
}

export function validateTransaction({ description, amount, date }) {
  if (!description?.trim()) return 'Informe uma descrição.'
  if (!amount || Number(amount) <= 0) return 'Valor precisa ser maior que zero.'
  if (!date) return 'Selecione uma data.'
  return null
}

// Helpers de leitura (evita repetir lógica nas views)
export function isIncome(tx)  { return tx.type === 'income' }
export function isExpense(tx) { return tx.type === 'expense' }

export function getYearMonth(tx) {
  const d = new Date(tx.date + 'T00:00:00')
  return d.getFullYear() * 100 + d.getMonth()
}

export function formatAmount(tx) {
  return tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

export function formatDate(tx) {
  return new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR')
}
