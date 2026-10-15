# Finanças — simulação acadêmica Modernize

- `premissas.csv`: parâmetros **hipotéticos**, 3 cenários, identificados por coluna; editáveis no .xlsx.
- `fluxo_12_meses.csv`: resultados **calculados** por mês e cenário (36 linhas), 6 casas para auditoria; separador **ponto e vírgula**; separador decimal **ponto**. Apresentar 2 casas no pitch. Colunas de clientes com casas decimais = **quantidades esperadas estatísticas**, nunca fração literal de empresas.
- Planilha editável em Excel `modernize_projecao_financeira_12_meses.xlsx` gerada como artefato da conversa; **o arquivo binário não está versionado neste repositório nesta etapa**. Os CSVs + método abaixo possibilitam reproduzir/auditar a projeção.

## Fórmulas

`ativos_finais = ativos_iniciais * (1 - churn) + novos`  
`receita = novos * implantacao + ativos_finais * mensalidade`  
`saidas = ativos_finais * variavel + novos * custo_implantacao + receita * taxa + novos * CAC + fixos`  
`fluxo = receita - saidas`; `caixa = caixa_anterior + fluxo`.  
`contribuicao_recorrente = mensalidade * (1 - taxa) - custo_variavel_recorrente`; `LTV = contribuicao / churn` (aproximação, não receita de implantação); `payback = CAC / contribuicao`; `break_even = teto(fixos / contribuicao)`; `runway_estatico = caixa_inicial / burn_mes_1`, caso burn positivo.

## Hipóteses importantes

- Preço R$ 299 + implantação R$ 990, oito novos clientes no ano-base, fixos R$ 1.000/mês: **decisões de simulação do grupo, sem validação**.
- CAC base R$ 600, custo de implantação R$ 250, variável recorrente R$ 40, tributos/taxas 6%, churn 2% e caixa inicial R$ 3.000: **exemplos acadêmicos baixa confiança**, não cotação nem legislação fiscal.
- Supõe recebimento à vista no mesmo mês e cobrança da assinatura no mês de ativação; descontos, atraso, impostos reais e custos de implantação não recorrentes podem mudar resultados.
- Receita de implantação não integra o LTV recorrente calculado. **R$ 1.000 fixos/mês não incluem pró-labore integral**; somar R$ 2.500/mês produz stress significativo.
- Plano financeiro narrativo [docs/08-plano-financeiro.md](../docs/08-plano-financeiro.md). Fontes acadêmicas: PDFs originais do curso; preços públicos de fornecedores em [docs/17-arquitetura-referencia.md](../docs/17-arquitetura-referencia.md).

**Este CSV não é apresentação de resultados reais; nenhum cliente está contratado.**

## Indicadores revisados após auditoria

O custo mínimo de equipe foi simulado separadamente do cenário-base original para evidenciar o risco de subestimar salários. Ver [documento financeiro](../docs/08-plano-financeiro.md) e `indicadores_corrigidos.csv` para números de reserva e capital extra. A planilha XLSX editável revisada é fornecida separadamente, pois seu arquivo binário ainda não foi versionado no repositório.
