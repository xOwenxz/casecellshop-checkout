# DECISIONS.md

# Decisões Técnicas e Trade-offs

Este documento registra decisões adotadas durante o desenvolvimento do desafio e os respectivos trade-offs.

---

## 1. Estoque em memória

### Decisão

O estoque foi implementado utilizando dados em memória.

### Motivação

A escolha priorizou simplicidade, velocidade de implementação e aderência ao escopo do desafio, evitando dependência de banco de dados ou infraestrutura externa.

### Trade-off

Vantagens:

- implementação simples;
- fácil execução local;
- menor complexidade.

Limitações:

- ausência de persistência;
- reinicialização do servidor restaura o estoque.

---

## 2. Fila local simulada

### Decisão

O processamento do pedido foi desacoplado utilizando fila local em memória e worker simples simulando ERP.

### Motivação

Demonstrar processamento assíncrono e reduzir acoplamento direto entre checkout e ERP.

### Trade-off

Vantagens:

- representa arquitetura assíncrona;
- melhora resiliência;
- simplifica demonstração do fluxo.

Limitações:

- fila não persistente;
- não possui garantias de entrega.

---

## 3. Simulação de indisponibilidade

### Decisão

Foi adicionada indisponibilidade simulada do ERP através de resposta 503.

### Motivação

Atender ao requisito do desafio relacionado ao tratamento de falhas externas.

### Trade-off

Vantagens:

- demonstra tratamento de erro;
- melhora realismo do fluxo.

Limitações:

- comportamento simplificado;
- não representa cenários completos de timeout ou retry.

---

## 4. Frontend simples

### Decisão

Foi adotada interface leve utilizando React e CSS simples, sem bibliotecas de UI.

### Motivação

Priorizar clareza, rapidez e foco no fluxo de checkout.

### Trade-off

Vantagens:

- menor complexidade;
- rápida execução;
- fácil manutenção.

Limitações:

- menor sofisticação visual;
- menos componentes reutilizáveis.

---

## 5. Testes automatizados

### Decisão

Os testes focaram na lógica principal do checkout.

### Motivação

Validar regras críticas com baixo custo de implementação.

### Trade-off

Vantagens:

- maior confiabilidade;
- prevenção de regressões.

Limitações:

- cobertura parcial;
- ausência de testes E2E.