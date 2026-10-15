# 08 — Plano financeiro (estrutura, ainda sem estimativas)

**Status:** modelo a preencher depois que a oferta e a unidade de cobrança forem definidas. Valores comerciais não foram inventados.

## Requisitos do material da disciplina

- Preencher cada premissa com **valor + justificativa/fonte + grau de confiança (alto, médio, baixo)**.
- Calcular contribuição unitária, LTV, LTV:CAC, payback do CAC, break-even, burn líquido do mês 1 e runway.
- Projetar **12 meses de fluxo de caixa** (24 meses como aprofundamento opcional).
- Mostrar **cenários pessimista, base e otimista**, variando pelo menos churn e CAC, ou justificando adaptações adequadas ao serviço.
- Diagnosticar viabilidade, mês de fluxo positivo, eventual caixa negativo, premissa crítica e necessidade de capital com reserva.

## Premissas pendentes

| Premissa | Valor | Justificativa/fonte | Confiança |
| --- | --- | --- | --- |
| Unidade de cobrança e preço/ARPU mensal | A definir | Depende da oferta | Baixa |
| Custo variável por cliente/unidade | A definir | Licenças, horas por entrega, taxas e tributos | Baixa |
| Churn mensal (se houver receita recorrente) | A definir | Exige modelo e base recorrente | Baixa |
| CAC | A definir | Tempo comercial, campanhas, comissões, ferramentas | Baixa |
| Novos clientes por mês | A definir | Exige canal, conversão e capacidade de execução | Baixa |
| Custos fixos mensais | A definir | Equipe, ferramentas, contabilidade, operação | Baixa |
| Caixa inicial/investimento | A definir | Fonte de financiamento a especificar | Baixa |

## Fórmulas do exemplo SaaS da disciplina

- **Contribuição unitária mensal = ARPU mensal − custo variável mensal por cliente.**
- **Churn mensal = cancelamentos no mês / base no início do mês.**
- **LTV = contribuição mensal / churn mensal** (aproximação apenas para receita recorrente e premissas estáveis).
- **CAC = gastos de marketing e vendas / novos clientes adquiridos.**
- **LTV:CAC = LTV / CAC.**
- **Payback CAC (meses) = CAC / contribuição mensal.**
- **Break-even operacional (clientes) = custo fixo mensal / contribuição mensal.**
- **Burn líquido = saídas do mês − entradas do mês.**
- **Runway estático = caixa / burn líquido mensal**, se burn for positivo.
- **Fluxo de caixa do mês = receitas recebidas − pagamentos efetivos**; distinguir competência e caixa ao modelar prazos.

As referências LTV:CAC ≥ 3 e payback ≤ 12 meses são heurísticas de SaaS, não leis. Para uma consultoria por projeto, adaptar a unidade (projeto/contrato) e explicar à banca como se mede o retorno; não fingir churn de assinatura.

## Colunas da planilha

Mês; clientes iniciais; perdas/cancelamentos pertinentes; novos clientes; clientes ativos ao final; receita; custos variáveis; custos fixos; aquisição; fluxo líquido; saldo de caixa. Para serviços, acrescentar capacidade da equipe, faturamento por projeto, cronograma de recebimento e carteira recorrente quando aplicável.

## Análise de sensibilidade

Criar cenários documentados que mudem hipóteses relevantes: ritmo de vendas, taxa de renovação (se aplicável), custo de aquisição, horas necessárias para entregar e ticket médio. A análise deve mostrar efeitos e explicar o risco principal.

## Atenção contábil

Salários recorrentes normalmente entram como despesa operacional/saída mensal. Não transformar trabalho da equipe em CAPEX apenas porque o produto envolve tecnologia. Incluir tributos, licenças e custos operacionais para não superestimar a margem.
