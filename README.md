# 📊 Finza — Web 

O Finza é uma aplicação web leve para gestão de finanças pessoais, criada com foco em simplicidade, performance e zero dependência de backend 🚀

Tudo roda diretamente no navegador: os dados são armazenados via localStorage, sem necessidade de login, servidor ou integração externa. É abrir e usar 💡

A proposta é simples: oferecer uma experiência rápida e direta para acompanhar suas **receitas** 💰, **despesas** 💸 e o **saldo mensal** 📈, sem fricção.

Você registra transações, organiza por categorias, aplica filtros e visualiza tudo com gráficos claros e intuitivos 📊



## 🛠️ Stack

- **React 18** com Vite
- **Chart.js** + react-chartjs-2 para os gráficos
- CSS puro (sem Tailwind, sem styled-components)

---

## ▶️ Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### ⚙️ Outros comandos

```bash
npm run build    # gera a pasta dist/ para produção
npm run preview  # serve o build localmente
```

---

## 🧠 Estrutura

O projeto segue o padrão MVC adaptado para React.

```
src/
├── models/
│   ├── Transaction.js     # entidade, validação e helpers de formatação
│   └── store.js           # leitura e escrita no localStorage
│
├── controllers/
│   └── useFinza.js        # hook que expõe as ações e dados computados
│
├── views/
│   ├── Dashboard.jsx      # resumo do mês + últimas transações
│   ├── Transactions.jsx   # histórico completo com filtros
│   ├── AddTransaction.jsx # formulário de nova transação
│   └── Charts.jsx         # gráficos de barras e categorias
│
├── components/
│   └── TxItem.jsx         # item de transação (usado em Dashboard e Transactions)
│
├── styles/
│   └── app.css
│
└── main.jsx               # raiz da aplicação, monta a navegação
```
---

### 🧩 Arquitetura

### 📦 Model

`Transaction.js` define a estrutura de uma transação e expõe funções puras para validar, formatar e ler os dados. Nenhuma referência a React aqui.

`store.js` é a camada de persistência. Lê e escreve no `localStorage`, e retorna sempre um novo array (sem mutação).

### 🔗 Controller

`useFinza.js` é um hook que serve de intermediário entre as views e os models. Ele mantém o estado das transações com `useState`, chama o store quando precisa persistir, e expõe métodos prontos para cada caso de uso (`add`, `remove`, `getSummaryForMonth`, etc.).

As views nunca importam o store diretamente.

### 🖥️ View

Cada arquivo em `views/` corresponde a uma tela. Eles recebem o `controller` via props e chamam os métodos dele para ler dados ou disparar ações. Não têm lógica de negócio própria.

---

## ⚡Funcionalidades

- ➕ Adicionar receitas e despesas
- 🗑️ Excluir transações com confirmação
- 🔎 Filtrar histórico (todos / receitas / despesas)
- 📅 Resumo automático do mês atual
- 📊 Gráfico de barras (últimos 6 meses)
- 🥧 Ranking de categorias com gráfico de rosca
- 💾 Persistência local (dados sobrevivem ao refresh)

---

## 👨‍💻 Feito por

João Vitor Aguiar Souza