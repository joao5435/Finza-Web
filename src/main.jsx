import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useFinza } from './controllers/useFinza.js'
import Dashboard      from './views/Dashboard.jsx'
import Transactions   from './views/Transactions.jsx'
import AddTransaction from './views/AddTransaction.jsx'
import Charts         from './views/Charts.jsx'
import './styles/app.css'

const NAV = [
  { key: 'dashboard',    label: 'Dashboard' },
  { key: 'transactions', label: 'Transações' },
  { key: 'add',          label: '+ Adicionar' },
  { key: 'charts',       label: 'Gráficos' },
]

function App() {
  const [page, setPage] = useState('dashboard')
  const controller = useFinza()

  function renderPage() {
    switch (page) {
      case 'dashboard':
        return <Dashboard controller={controller} onNavigate={setPage} />
      case 'transactions':
        return <Transactions controller={controller} />
      case 'add':
        return <AddTransaction controller={controller} onSuccess={() => setPage('dashboard')} />
      case 'charts':
        return <Charts controller={controller} />
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">finza</div>
        <nav>
          {NAV.map(item => (
            <button
              key={item.key}
              className={`nav-btn ${page === item.key ? 'active' : ''}`}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <p className="sidebar-month">
          {new Date().toLocaleString('pt-BR', { month: 'short', year: 'numeric' })}
        </p>
      </aside>

      <main className="content">
        {renderPage()}
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
