# Plano financeiro — Modernize IA (15/10/2026)

**Simulação acadêmica; não são faturamento, contratos nem preços validados.** Atende PDF *Economia Unitária e Projeção Financeira*, pp. 11–12: unidade de cobrança, premissas justificadas, CAC, LTV, payback, break-even, runway, 12 meses e 3 cenários. **Unidade: uma imobiliária pagante**, não um locatário ou imóvel.

## Premissas — toda a confiança é baixa

| Premissa | Pessimista | **Base escolhida** | Otimista | Justificativa |
| --- | ---: | ---: | ---: | --- |
| Novos contratos/ano | 4 | **8** | 12 | Meta de vendas, não clientes existentes |
| Assinatura por imobiliária/mês | 299 | **299** | 299 | D-027, preço não validado |
| Implantação por nova imobiliária | 990 | **990** | 990 | D-027, preço não validado |
| Churn mensal | 5% | **2%** | 1% | Hipóteses de sensibilidade, sem coortes reais |
| CAC por nova imobiliária | 900 | **600** | 450 | Base: 8h comerciais × R$ 50 + R$ 150 mídia + R$ 50 deslocamento/ferramentas |
| Custos fixos mês | 1.300 | **1.000** | 1.000 | R$ 1.000 foi escolhido pelo grupo como placeholder; pró-labore integral **não incluído** |
| Custo variável por imobiliária/mês | 65 | **40** | 30 | Base: R$ 20 processamento/infra + R$ 20 suporte, ainda sem teste |
| Custo de cada implantação | 350 | **250** | 200 | Base: 5h × R$ 50/h, tempo não medido |
| Tributos/taxas sobre receita | 8% | **6%** | 6% | Alíquota ilustrativa, **não** regime fiscal validado |
| Caixa inicial ilustrativo | 3.000 | **3.000** | 3.000 | Premissa de simulação, não capital comprovado |

Fonte de preços de referência apenas (USD, precisam de câmbio/uso): [Supabase](https://supabase.com/pricing), [Cloud Run](https://cloud.google.com/run) e [OpenAI API](https://developers.openai.com/api/docs/pricing). Não usar tabela de provedor para afirmar custo real por documento sem medição.

## Fórmulas e cronograma

`ativos_final = ativos_inicio − (ativos_inicio × churn) + novos`; `implantacao_recebida = novos × 990`; `assinaturas_recebidas = ativos_final × 299`; `saidas = ativos_final × variavel + novos × custo_implantacao + (receita_total × taxa) + novos × CAC + fixos`; `fluxo = entradas − saídas`; `caixa = caixa_anterior + fluxo`.

**Hipótese de recebimento:** implantação e assinatura integralmente recebidas no mês do novo contrato, sem inadimplência, estorno ou prazo. Os clientes fracionários por churn são **valor esperado probabilístico** em uma simulação, não empresas fracionadas.

**Distribuição base dos oito novos contratos:** meses 2, 3, 4, 6, 7, 9, 10 e 12. Cenário pessimista: meses 3, 6, 9, 12; otimista: um novo por mês.

## Resultado de 12 meses

| Indicador | Pessimista | **Base** | Otimista |
| --- | ---: | ---: | ---: |
| Novos contratos no ano | 4 | **8** | 12 |
| Ativos esperados no mês 12 | 3,22 | **7,19** | 11,36 |
| Entradas anuais | R$ 9.571,75 | **R$ 22.136,25** | R$ 34.367,86 |
| Saídas anuais | R$ 22.585,69 | **R$ 22.030,02** | R$ 24.118,38 |
| **Fluxo líquido anual** | **–R$ 13.013,94** | **+R$ 106,24** | **+R$ 10.249,48** |
| Saldo final (inclui R$ 3 mil iniciais) | –R$ 10.013,94 | **R$ 3.106,24** | R$ 13.249,48 |
| Menor caixa do ano | –R$ 10.013,94 | **R$ 363,61** | R$ 2.311,87 |
| Fluxo anual com R$ 2.500/mês de remuneração extra | –R$ 43.013,94 | **–R$ 29.893,76** | –R$ 19.750,52 |

A versão mês a mês para os três cenários está em [finance/fluxo_12_meses.csv](../finance/fluxo_12_meses.csv). A **planilha XLSX editável de 12 meses** foi entregue por download nesta conversa, com abas `Leia primeiro`, `Premissas`, `Pessimista`, `Base`, `Otimista`, `Indicadores` e `Fontes`; **o arquivo binário XLSX ainda não está versionado no GitHub**, apenas CSVs e documentação.

## Indicadores econômicos recorrentes (base)

- **Contribuição mensal:** `299 × (1 − 0,06) − 40 = R$ 241,06` por imobiliária.
- **LTV recorrente simplificado:** `241,06 / 0,02 = R$ 12.053`. **Alto e não validado**, pois pressupõe churn 2% constante por muitos meses; implantação não entra no LTV recorrente.
- **LTV:CAC:** `12.053/600 = 20,09×` (hipótese; não prova PMF).
- **Payback do CAC** apenas sobre margem recorrente: `600/241,06 ≈ 2,49 meses`.
- **Break-even apenas dos fixos**: `arredondar_cima(1000/241,06) = 5 imobiliárias ativas`. Não inclui remuneração extra nem orçamento de aquisição adicional.
- **Burn líquido no mês 1:** R$ 1.000, porque não há vendas no mês 1 da base; **runway estático** `3.000/1.000 = 3 meses`. O caixa dinâmico base não fica negativo no ano, porém atinge mínimo R$ 363,61.
- **Pessimista:** mês 1 consome R$ 1.300 e o **primeiro caixa negativo é no mês 3**. Pior saldo projetado –R$ 10.013,94. Capital **adicional ilustrativo** ≈ R$ 10.013,94 para eliminar déficit + reserva de 2 meses de fixos (R$ 2.600) = **R$ 12.613,94**, além dos R$ 3 mil iniciais. Não cobre possível remuneração extra.
- **Premissa crítica:** remuneração/tempo de equipe, junto de CAC/churn, custo de IA por cadastro e prazos de recebimento.

## Diagnóstico gerencial (oito frases)

1. A plataforma cobra por imobiliária, não por locatário.
2. R$ 299 e R$ 990 são hipóteses, não preços testados com pagamento real.
3. O cenário-base traz só R$ 106 positivos em doze meses sob equipe extremamente enxuta.
4. O menor caixa base de R$ 364 oferece pouca tolerância a atrasos ou imprevistos.
5. O cenário pessimista precisa de mais capital e pode ficar negativo no mês 3.
6. LTV:CAC elevado não prova saúde financeira porque custo e churn são estimados.
7. Adicionar R$ 2.500/mês de remuneração torna os três cenários negativos no ano 1.
8. É preciso validar horas, volume de documentos, retenção, CAC, tributação e valor percebido antes de dizer que o negócio é viável.

**Alinhamento acadêmico:** PDF principal §2.5 sugere 24 meses como aprofundamento; entregável explícito requer **12 meses**, conforme PDF de finanças p.12. A conclusão honesta é **viabilidade ainda não demonstrada**, com necessidade de revisão antes de escalar.
