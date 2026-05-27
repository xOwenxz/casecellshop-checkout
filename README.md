# CaseCellShop Checkout Challenge

Mini aplicação Full Stack simulando um fluxo simples de checkout para e-commerce, incluindo validação de estoque, processamento assíncrono e tratamento de indisponibilidade.

## Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Node.js
- Express
- TypeScript
- Vitest

---

## Funcionalidades

- Checkout simples de capinhas
- Estoque em memória
- Validação de entradas
- Feedback visual no frontend
- Atualização do pedido por etapas
- Tratamento de estados de carregamento
- Simulação de indisponibilidade do ERP (503)
- Fila local simulando processamento assíncrono
- Testes automatizados

---

## Arquitetura

O projeto utiliza:

- dados em memória;
- fila local simulada;
- worker simples representando ERP;
- processamento assíncrono.

Objetivo: demonstrar desacoplamento e resiliência sem dependência de infraestrutura externa.

### Trade-off

A solução prioriza simplicidade e aderência ao escopo do desafio, aceitando limitações como ausência de persistência e fila não durável.

---

## Como Rodar

### Backend

```bash
cd backend
npm install
npm run dev
```

API:

```text
http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:

```text
http://localhost:5173
```

---

## Endpoint Principal

### POST /checkout

Exemplo:

```json
{
  "productId": "case-iphone-15",
  "quantity": 2
}
```

Possíveis respostas:

### 202 — Pedido aceito

```json
{
  "success": true,
  "message": "Pedido recebido e enviado para processamento"
}
```

### 409 — Estoque insuficiente

```json
{
  "success": false,
  "message": "Estoque insuficiente"
}
```

### 503 — ERP indisponível

```json
{
  "success": false,
  "message": "ERP temporariamente indisponível"
}
```

---

## Testes

Backend:

```bash
cd backend
npm run test
```

Resultado esperado:

```text
✓ 3 passed
```

Os testes automatizados validam:

- compra válida;
- estoque insuficiente;
- quantidade inválida.

---

## Como Validar Falha nos Testes

Para confirmar que os testes detectam erro corretamente:

Abrir:

```
backend/src/tests/checkout.test.ts
```

Alterar temporariamente:

De:

```ts
expect(result.status).toBe(409);
```

Para:

```ts
expect(result.status).toBe(200);
```

Executar:

```bash
npm run test
```

Resultado esperado:

```text
FAIL
expected 409 to be 200
```

Depois restaurar:

```ts
expect(result.status).toBe(409);
```

---

## Documentação Complementar

### DECISIONS.md

Registro das decisões técnicas e trade-offs adotados.

### PROMPTS.md

Registro do uso de IA e prompts utilizados durante o desenvolvimento.