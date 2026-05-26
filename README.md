# CaseCellShop Checkout Challenge

Mini aplicação Full Stack.

## Stack

Frontend:
- React
- TypeScript
- Vite

Backend:
- Node.js
- Express
- TypeScript

## Funcionalidades

- Checkout simples de capinhas
- Estoque em memória
- Validação de entradas
- Feedback visual no frontend
- Simulação de indisponibilidade do ERP (503)
- Fila local simulando processamento assíncrono
- Testes automatizados

## Arquitetura

O projeto utiliza:

- dados em memória;
- fila local simulada;
- worker simples representando ERP;
- processamento assíncrono.

Objetivo: demonstrar desacoplamento e resiliência sem dependência de infraestrutura externa.

## Como rodar

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Testes

Backend:

```bash
npm run test
```

## Decisões e Trade-offs

Descritos em:

- DECISIONS.md
- PROMPTS.md