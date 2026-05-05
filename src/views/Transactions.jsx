import { useState } from 'react'
import TxItem from '../components/TxItem.jsx'

const FILTERS = [
  { key: 'all',     label: 'Todos' },
  { key: 'income',  label: 'Receitas' },
  { key: 'expense', label: 'Despesas' },
]

export default function Transactions({ controller }) {
  const [filter, setFilter] = useState('all')

  const transactions = controller.getFilteredTransactions(filter)

  function handleDelete(id) {
    if (!window.confirm('Remover esta transação?')) return
    controller.remove(id)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Transações</h1>
        <p className="page-sub">Histórico completo</p>
      </header>

      <div className="panel">
        <div className="filters">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`chip ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {transactions.length === 0 ? (
          <p className="empty">Nada aqui ainda.</p>
        ) : (
          <ul>
            {transactions.map(tx => (
              <TxItem key={tx.id} tx={tx} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
