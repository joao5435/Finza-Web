import { useState } from 'react'
import { CATEGORIES } from '../models/Transaction.js'

const PAYMENTS = ['Pix', 'Débito', 'Crédito', 'Dinheiro', 'Transferência']

const defaultForm = {
  type:        'expense',
  description: '',
  amount:      '',
  date:        new Date().toISOString().split('T')[0],
  category:    CATEGORIES.expense[0],
  payment:     'Pix',
}

export default function AddTransaction({ controller, onSuccess }) {
  const [form,  setForm]  = useState(defaultForm)
  const [error, setError] = useState(null)

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleTypeChange(type) {
    setForm(prev => ({
      ...prev,
      type,
      category: CATEGORIES[type][0],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = controller.add(form)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setForm(defaultForm)
    setError(null)
    onSuccess()
  }

  const categories = CATEGORIES[form.type]

  return (
    <div className="page">
      <header className="page-header">
        <h1>Nova transação</h1>
        <p className="page-sub">Adicione uma receita ou despesa</p>
      </header>

      <form className="panel form-panel" onSubmit={handleSubmit}>
        <div className="tipo-row">
          {['expense', 'income'].map(t => (
            <button
              key={t}
              type="button"
              className={`tipo-btn ${form.type === t ? 'active' : ''}`}
              data-tipo={t}
              onClick={() => handleTypeChange(t)}
            >
              {t === 'expense' ? '💸 Despesa' : '💰 Receita'}
            </button>
          ))}
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-grid">
          <label className="field">
            Descrição
            <input
              type="text"
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              placeholder="Ex: Almoço"
            />
          </label>

          <label className="field">
            Valor (R$)
            <input
              type="number"
              value={form.amount}
              onChange={e => setField('amount', e.target.value)}
              placeholder="0,00"
              min="0.01"
              step="0.01"
            />
          </label>

          <label className="field">
            Data
            <input
              type="date"
              value={form.date}
              onChange={e => setField('date', e.target.value)}
            />
          </label>

          <label className="field">
            Categoria
            <select
              value={form.category}
              onChange={e => setField('category', e.target.value)}
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>

          <label className="field">
            Pagamento
            <select
              value={form.payment}
              onChange={e => setField('payment', e.target.value)}
            >
              {PAYMENTS.map(p => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>

        <button type="submit" className="btn-save">
          Salvar transação
        </button>
      </form>
    </div>
  )
}
