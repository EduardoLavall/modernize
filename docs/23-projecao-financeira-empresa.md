# Projeção financeira combinada da Modernize — 12 meses

**Estudo acadêmico hipotético de planejamento, não demonstrativo de vendas.** A Modernize não possui vendas, preços de serviços ou clientes comprovados neste material. A projeção não valida demanda, lucro, capital disponível ou viabilidade.

## Escopo

O estudo histórico [08 — Modernize IA](08-plano-financeiro.md) projeta **somente o produto imobiliário**, com implantação de R$ 990 e mensalidade de R$ 299 por imobiliária. Os CSVs anteriores continuam intactos. O slide 9 apresenta outro cenário: **empresa combinada**, adicionando capacitações e projetos de automação.

O gráfico é intencionalmente de **receita acumulada** nos 12 meses. Essa curva cresce conforme o faturamento hipotético ocorre, independentemente do lucro ou caixa. **Não confundir receita com lucro:** despesas, resultado anual e menor saldo de caixa ficam exibidos separadamente.

## Premissas comerciais não validadas

| Premissa | Valor adotado |
| --- | ---: |
| Workshop / capacitação | R$ 1.500 por evento |
| Projeto de automação | R$ 4.000 por projeto |
| Custos diretos incrementais de serviços | 30% da receita de workshops e projetos |
| Remuneração mensal parcial simulada | R$ 2.500/mês (R$ 30.000/ano) |
| Caixa inicial fictício | R$ 3.000 |

Os 30% de custo direto dos serviços são hipótese simplificada, **não** tributos e folha reais validados. Não foram medidos deslocamentos, horas, retrabalho, impostos específicos, encargos ou inadimplência. O valor da equipe é parcial, não a remuneração integral de 3–5 pessoas.

## Cenários de metas, não realizados

| Indicador | Pessimista | Base | Otimista |
| --- | ---: | ---: | ---: |
| Novas imobiliárias | 4 | 8 | 12 |
| Workshops no ano | 4 | 12 | 18 |
| Projetos de automação no ano | 2 | 7 | 12 |
| Receita de serviços | R$ 14.000 | R$ 46.000 | R$ 75.000 |
| Custo direto de serviços (30%) | R$ 4.200 | R$ 13.800 | R$ 22.500 |
| **Receita total anual** | **R$ 23.571,75** | **R$ 68.136,25** | **R$ 109.367,86** |
| **Despesas anuais com remuneração parcial** | **R$ 56.785,69** | **R$ 65.830,02** | **R$ 76.618,38** |
| **Resultado anual projetado** | **−R$ 33.213,94** | **+R$ 2.306,24** | **+R$ 32.749,48** |

A margem do cenário-base é aproximadamente **3,4%**, com pouco espaço para erros comerciais. O cenário pessimista tem **déficit**, apesar de sua receita acumulada crescer. Nenhum cenário autoriza afirmar que a empresa já é lucrativa.

## Calendário hipotético

- **Pessimista:** workshops nos meses 3, 6, 9, 12; projetos nos meses 4 e 10.
- **Base:** um workshop por mês; projetos nos meses 1, 2, 4, 6, 8, 10 e 12. A antecipação de serviços é uma premissa relevante para o caixa.
- **Otimista:** um workshop por mês e um workshop adicional nos meses 2, 4, 6, 8, 10 e 12; um projeto por mês.

Os recebimentos de cada serviço são supostos no mês da entrega, sem inadimplência, prazos ou estornos. O modelo do produto preserva suas premissas originais de churn, CAC, tributos e custos.

## Fórmulas e critérios de auditoria

Receita de serviços = quantidade de workshops × 1.500 + projetos × 4.000. Custos diretos dos serviços = receita de serviços × 30%. Receita combinada = receita do produto + receita de serviços. Despesa combinada = despesa do produto com remuneração parcial + custos de serviços. Resultado anual = receita combinada − despesas combinadas. Receita acumulada no mês = soma dos recebimentos hipotéticos do mês 1 até o mês atual. Saldo de caixa = capital inicial fictício (R$ 3.000) + fluxos líquidos acumulados.

A implementação de `computeCompany()` em `js/finance.js` é separada de `compute()` do produto isolado. Os testes verificam a aritmética, os três cenários e a natureza **crescente da receita acumulada**. Ainda faltam pesquisas comerciais locais, custos por hora e testes financeiros reais para substituir essas premissas.
