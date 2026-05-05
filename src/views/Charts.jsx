import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  ArcElement, Tooltip, Legend,
} from 'chart.js'
import { CATEGORY_META, PALETTE } from '../models/Transaction.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

const GRID   = 'rgba(255,255,255,0.05)'
const TICKS  = '#555566'
const MONTHS = getLast6Months()

function getLast6Months() {
  const now = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    return {
      ym:    d.getFullYear() * 100 + d.getMonth(),
      label: d.toLocaleString('pt-BR', { month: 'short' }),
    }
  })
}

function barOptions(color) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: GRID }, ticks: { color: TICKS, font: { size: 11 } } },
      y: {
        beginAtZero: true,
        grid: { color: GRID },
        ticks: {
          color: TICKS,
          font: { size: 11 },
          callback: v => 'R$' + Number(v).toLocaleString('pt-BR'),
        },
      },
    },
  }
}

export default function Charts({ controller }) {
  const totals      = controller.getMonthlyTotals(MONTHS)
  const labels      = MONTHS.map(m => m.label)
  const incomeData  = totals.map(t => t.income)
  const expenseData = totals.map(t => t.expenses)

  const now     = new Date()
  const curYM   = now.getFullYear() * 100 + now.getMonth()
  const curExp  = controller.getExpensesForMonth(curYM)

  const catMap = curExp.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
  const catLabels = Object.keys(catMap)
  const catValues = catLabels.map(k => catMap[k])
  const catColors = catLabels.map((_, i) => PALETTE[i % PALETTE.length])
  const catTotal  = catValues.reduce((a, b) => a + b, 0)

  const catSorted = Object.entries(catMap).sort((a, b) => b[1] - a[1])
  const maxCatVal = catSorted[0]?.[1] || 1

  return (
    <div className="page">
      <header className="page-header">
        <h1>Gráficos</h1>
        <p className="page-sub">Últimos 6 meses</p>
      </header>

      <div className="chart-row">
        <div className="panel">
          <p className="panel-label">Receitas mensais</p>
          <div className="chart-box">
            <Bar
              data={{
                labels,
                datasets: [{ data: incomeData, backgroundColor: '#4ecb91', borderRadius: 4 }],
              }}
              options={barOptions('#4ecb91')}
            />
          </div>
        </div>

        <div className="panel">
          <p className="panel-label">Despesas mensais</p>
          <div className="chart-box">
            <Bar
              data={{
                labels,
                datasets: [{ data: expenseData, backgroundColor: '#e85a6e', borderRadius: 4 }],
              }}
              options={barOptions('#e85a6e')}
            />
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '1rem' }}>
        <p className="panel-label">Categorias — mês atual</p>

        {catSorted.length === 0 ? (
          <p className="empty">Nenhuma despesa neste mês.</p>
        ) : (
          <div className="cat-grid">
            <div>
              {catSorted.map(([cat, val], i) => {
                const meta  = CATEGORY_META[cat] ?? { emoji: '📋', color: '#707080' }
                const pct   = Math.round(val / maxCatVal * 100)
                const fmt   = 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                return (
                  <div key={cat} className="cat-row">
                    <div className="cat-icon" style={{ background: meta.color + '22' }}>
                      {meta.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="cat-label-row">
                        <span>{cat}</span>
                        <span style={{ color: 'var(--red)', fontWeight: 600 }}>{fmt}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${pct}%`, background: meta.color }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {catLabels.length > 0 && (
              <div className="donut-wrap">
                <Doughnut
                  data={{
                    labels: catLabels,
                    datasets: [{ data: catValues, backgroundColor: catColors, borderWidth: 0 }],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: ctx => ' R$ ' + ctx.parsed.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
