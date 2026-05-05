import { CATEGORY_META } from '../models/Transaction.js'
import { formatAmount, formatDate, isIncome } from '../models/Transaction.js'

export default function TxItem({ tx, onDelete }) {
  const meta  = CATEGORY_META[tx.category] ?? { emoji: '📋', color: '#707080' }
  const sign  = isIncome(tx) ? '+' : '−'
  const color = isIncome(tx) ? 'var(--green)' : 'var(--red)'

  return (
    <li className="tx-item">
      <div className="tx-icon" style={{ background: meta.color + '22' }}>
        {meta.emoji}
      </div>

      <div className="tx-info">
        <span className="tx-desc">{tx.description}</span>
        <span className="tx-meta">{tx.category} · {formatDate(tx)} · {tx.payment}</span>
      </div>

      <span className="tx-amount" style={{ color }}>
        {sign} R$ {formatAmount(tx)}
      </span>

      {onDelete && (
        <button className="tx-del" onClick={() => onDelete(tx.id)}>×</button>
      )}
    </li>
  )
}
