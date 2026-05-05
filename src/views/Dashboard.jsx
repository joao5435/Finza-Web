import TxItem from '../components/TxItem.jsx'

function toBRL(n) {
  return 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

function currentYM() {
  const d = new Date()
  return d.getFullYear() * 100 + d.getMonth()
}

export default function Dashboard({ controller, onNavigate }) {
  const summary = controller.getSummaryForMonth(currentYM())
  const recent  = controller.getRecentTransactions(5)

  const balanceColor = summary.balance >= 0 ? 'var(--green)' : 'var(--red)'
  const monthLabel   = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <div className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="page-sub">{monthLabel}</p>
      </header>

      <div className="cards">
        <div className="card">
          <span className="card-label">Saldo</span>
          <strong className="card-value" style={{ color: balanceColor }}>
            {summary.balance < 0 ? '−' : ''}{toBRL(summary.balance)}
          </strong>
        </div>
        <div className="card">
          <span className="card-label">Receitas</span>
          <strong className="card-value" style={{ color: 'var(--green)' }}>
            {toBRL(summary.income)}
          </strong>
          <small>{summary.incomeCount} entrada(s)</small>
        </div>
        <div className="card">
          <span className="card-label">Despesas</span>
          <strong className="card-value" style={{ color: 'var(--red)' }}>
            {toBRL(summary.expenses)}
          </strong>
          <small>{summary.expensesCount} saída(s)</small>
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <p className="panel-label">Últimas transações</p>
          {recent.length === 0 ? (
            <p className="empty">Nenhuma transação ainda.</p>
          ) : (
            <ul>
              {recent.map(tx => <TxItem key={tx.id} tx={tx} />)}
            </ul>
          )}
          {recent.length > 0 && (
            <button className="link-btn" onClick={() => onNavigate('transactions')}>
              Ver todas →
            </button>
          )}
        </div>

        <div className="panel">
          <p className="panel-label">Este mês em números</p>
          <div className="stat-list">
            <div className="stat-row">
              <span>Total de entradas</span>
              <span style={{ color: 'var(--green)' }}>{toBRL(summary.income)}</span>
            </div>
            <div className="stat-row">
              <span>Total de saídas</span>
              <span style={{ color: 'var(--red)' }}>{toBRL(summary.expenses)}</span>
            </div>
            <div className="stat-row" style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              <span style={{ fontWeight: 500 }}>Saldo</span>
              <span style={{ fontWeight: 600, color: balanceColor }}>
                {summary.balance < 0 ? '−' : ''}{toBRL(summary.balance)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
