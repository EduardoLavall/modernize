# Modernize — Pitch Sprint visual (v3: IA + critérios do professor)

Atualizado em **19/11/2026**. Esta é a **fonte editorial da apresentação** em `slides.html` e `slides-live.html`.

## Objetivo

Unir duas necessidades sem deixar o pitch parecer uma apostila:

1. **Vender a Modernize** como empresa de modernização B2B com inteligência artificial, automação, capacitação e acompanhamento contínuo.
2. **Cumprir o enunciado da disciplina**: 3–5 minutos, até 10 slides, problema → solução/MVP → mercado → modelo de negócio → métricas → equipe → pedido, com viabilidade técnica e financeira demonstradas.

**Regra de linguagem visual:** uma frase principal por slide; números e fluxos maiores que parágrafos; legenda curta apenas quando necessária para não induzir a erro. O detalhe e as justificativas ficam nas notas abaixo e nos entregáveis, não na tela.

## Roteiro de fala — aproximadamente 4min30s

| Slide | Tempo | O que aparece | O que explicar oralmente |
|---|---:|---|---|
| 01. Visão | 15s | **Sua empresa. Em modo inteligente.** | A Modernize ajuda empresas a modernizar processos com IA e capacitação, não vende apenas software. |
| 02. Problema | 20s | **Quanto custa continuar no manual?** + 3 ícones | Retrabalho, espera e informação dispersa ocupam equipes; a frequência da dor ainda carece de validação de campo. |
| 03. Proposta | 25s | **IA útil. Negócios mais ágeis.** + ciclo visual | Diagnóstico → automação → capacitação → melhoria contínua. IA não elimina responsabilidade humana. |
| 04. Mercado | 25s | **120 → 72 → 8**, TAM/SAM/SOM | São **hipóteses didáticas para imobiliárias**, sem levantamento local; a proposta da empresa tem ambição multissetorial B2B. Segmentar e validar antes de escalar. |
| 05. MVP e comparação | 45s | **40 h / R$ 1.200 → 14 h / R$ 360** + botão demo | Exemplo puramente hipotético de 120 cadastros documentais: IA faz pré-análise e uma pessoa valida. O sistema demonstrativo usa dados sintéticos, sem IA real. |
| 06. Tecnologia | 30s | **Web → API privada → IA/dados privados** | Arquitetura de referência: TypeScript, Node.js, PostgreSQL, armazenamento privado, autenticação e isolamento por empresa; LGPD e revisão humana como requisitos. **Ainda não implantada.** |
| 07. Receitas | 25s | **R$ 990 / R$ 299 / R$ 1.500 / R$ 4.000** | Implantação e mensalidade por imobiliária; workshops e projetos como serviços da empresa. Preços hipotéticos, não clientes ou contratos realizados. |
| 08. Finanças | 30s | **Receita R$ 68,1 mil / despesa R$ 65,8 mil / resultado +R$ 2,3 mil** | Simulação da empresa combinada, ano 1, cenário-base; margem **3,4%**, remuneração **parcial** R$ 2,5 mil/mês, caixa inicial hipotético R$ 3 mil, menor caixa R$ 1,5 mil. Não confundir faturamento com lucro. Pessimista fecha em **−R$ 33,2 mil**; capital necessário depende do cenário. |
| 09. Equipe + validação | 30s | **Demo pronta / zero clientes comprovados / 3–5 integrantes previstos** | Não inventar tração. Apresentar nomes reais e papéis dos participantes **assim que o grupo fornecer**; produto, tecnologia, comercial, UX são funções planejadas. |
| 10. Pedido | 25s | **O futuro começa com um piloto.** | Pedido simulado à banca: acesso a empresas piloto, mentoria e apoio para validação; não declarar investimento captado. Chamada ao site institucional da Modernize. |

**Total:** 270 s = **4min30s**. Se demonstrar a demo por mais de 45 segundos, reduzir fala de outros slides.

## Como o comparativo do slide 05 foi calculado

**Importante:** isto é um **cenário didático para ilustrar a proposta da Modernize**. Não representa um teste de benchmark, resultado de clientes, cotação de IA ou economia já comprovada.

| Premissa da análise de um cadastro documental | Processo manual | Processo com IA assistiva |
| --- | ---: | ---: |
| Conferência/organização manual | 20 min | 5 min de revisão humana |
| Pré-análise automatizada | 0 min | 2 min |
| Tempo total serial (hipótese) | **20 min** | **7 min** |
| Custo do trabalho humano | R$ 30/h | R$ 30/h |
| Custo de processamento de IA por cadastro | R$ 0 | R$ 0,50 |
| Custo direto resultante | **R$ 10** | **R$ 3** |

**Cálculos auditáveis:** manual = 20/60 × R$ 30 = **R$ 10**. Com IA + pessoa = 5/60 × R$ 30 + R$ 0,50 = **R$ 3**. Tempo com IA = 2 + 5 = **7 min**. Redução de tempo = (20−7)/20 = **65%**. Redução de custo direto = (10−3)/10 = **70%**.

**Novo recorte visual do slide 05:** lote hipotético de **120 cadastros documentais**, com custo e tempo lineares, sem paralelização nem economia de escala. Manual: 120 × 20 min = **2.400 min = 40 h**, custo **120 × R$ 10 = R$ 1.200**. IA assistida: 120 × (2 min de pré-análise + 5 min de revisão humana) = **840 min = 14 h**, custo **120 × R$ 3 = R$ 360**. Reduções proporcionais continuam **65% do tempo e 70% do custo direto**. Não são dados observados em empresas.

**Limites:** não inclui implantação, treinamento, integração, licenças fixas, privacidade, falhas da IA, reprocessamentos, controle de qualidade, revisão jurídica e custos indiretos. A IA pode errar; por isso, a decisão permanece humana. Não generalizar as taxas do exemplo como ganhos assegurados. O protótipo de `demo.html` não executa IA real: ele **simula** a jornada.

## Critérios e entregáveis do enunciado

### Avaliação (cada critério = 25%)

- **Proposta de valor:** slides 1–3 + MVP do 5.
- **Viabilidade técnica:** slides 5 e 6 + [arquitetura de referência](17-arquitetura-referencia.md).
- **Consistência financeira:** slides 7 e 8 + [estudo da empresa](23-projecao-financeira-empresa.md) e [fluxo de caixa 12 meses](../finance/fluxo_12_meses.csv).
- **Qualidade do pitch:** sequência de 10 slides, roteiro de 4min30s, demo navegável, fechamento com pedido e ensaio.

### Quatro entregáveis independentes dos slides

1. [Sumário executivo](15-sumario-executivo.md) — o texto-base existe; confirmar **PDF final de exatamente 1 página**, composição real da equipe e dados atualizados.
2. [Arquitetura de referência](17-arquitetura-referencia.md) — possui diagrama e stack; diferenciar **proposta** de sistema implantado.
3. [Projeção 12 meses](../finance/fluxo_12_meses.csv), [premissas](../finance/premissas.csv) e [cenários](23-projecao-financeira-empresa.md) — planilha XLSX anterior não está versionada neste repositório; conferir a entrega do arquivo editável exigido.
4. [Pitch de 10 slides](../slides.html), com [protótipo](../demo.html) e roteiro de fala acima.

**Não substituir** esses entregáveis por capturas dos slides: o professor explicitamente pede itens separados.

## Fontes e limitações

- Material do professor: `Plano de Negócios - Inovação Tecnológica e Empreendedorismo.pdf`, p. 3–5, e `Material_Economia_Unitaria_Projecao_Financeira.pdf` (economia unitária, CAC/LTV/churn, fluxo, caixa e runway).
- [Matriz acadêmica anterior](14-matriz-aderencia-academica.md), [critérios](11-requisitos-academicos.md), [projeção](23-projecao-financeira-empresa.md).
- **TAM 120/SAM 72/SOM 8:** apenas simulação didática de um recorte imobiliário. **Não** representa pesquisa de empresas locais ou demanda comprovada. TAM/SAM local precisa de fonte/verificação.
- **Tração:** zero clientes *comprovados no material*, não é afirmação de inexistência de contatos ou vendas fora do projeto.
- **Financeiro:** três cenários são estimativas; o otimista não garante crescimento, o pessimista termina negativo. Caixa e runway exigem explicação de premissas; remuneração modelada é apenas parcial.
- **IA do MVP:** não está operando na demo; o fluxo é determinístico e sintético.
- **Equipe:** não atribuir nomes, diplomas, experiência ou funções reais sem confirmação.
- **Segurança e LGPD:** requisitos de projeto, não certificação nem conformidade já implementada.

## Direção de design e uso

Paleta escuro/grafite + vermelho da marca, tipografia grande, números contrastantes e fluxos. Imprimir em 16:9. Navegar por setas e Espaço; `F` para tela cheia, `Esc` para índice e `P` para PDF. Abrir `slides-live.html` quando algum navegador conservar versão antiga.

A landing institucional e o demo histórico são preservados; só a apresentação para a banca recupera mercado, finanças e arquitetura.

## Pendências humanas

- Inserir **3–5 nomes reais** e suas responsabilidades no slide 9 e no sumário.
- Executar pesquisa/entrevistas e substituir TAM/SAM simulados por dados verificados, se possível.
- Conferir a versão final do XLSX de 12 meses e o sumário de 1 página.
- Ensaiar o pitch em até 5 minutos com a demonstração.
