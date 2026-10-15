# Matriz de conformidade — TechStartup Business Plan & Pitch Sprint

**Revisão:** 15/10/2026. **Fontes didáticas consultadas diretamente nesta etapa:** (P1) *Plano de Negócios - Inovação Tecnológica e Empreendedorismo.pdf* (5 p.); (P2) *Material_Economia_Unitaria_Projecao_Financeira.pdf* (15 p.). O antigo terceiro material de PMF é citado pelo histórico do projeto, mas não foi recuperado nesta auditoria; não atribuir a ele novos requisitos.

## Enunciado vinculante versus orientação de aprofundamento

- P1, p.4: atividade em **equipes de 3–5 pessoas**, quatro fases: definição/arquitetura, validação/receita, operação/finanças, pitch.
- P1, pp.3–4: **sumário executivo de uma página**, **arquitetura de referência com diagramas e stack**, **planilha com 12 meses**, **pitch deck com máximo 10 slides ou vídeo**; escolheram-se **slides web**.
- P1, pp.3–4: pitch **3 a 5 minutos**, narrativa problema → solução/MVP → tamanho de mercado → modelo de negócio → métricas → equipe → pedido.
- P1, pp.4–5: pesos 25% **proposta de valor**, 25% **viabilidade técnica**, 25% **consistência financeira** e 25% **qualidade do pitch**.
- P1, p.3 §2.5 sugere projeção de **24 meses**; P1, p.4 e P2, p.12 exigem **12 meses** na entrega. **12 = obrigatório; 24 = extensão opcional**. Não há conflito prático.
- P2, pp.11–12: tabela de premissas **valor + fonte/justificativa + confiança**; contribuição, CAC, LTV, LTV:CAC, payback, break-even, burn e runway; fluxo de caixa mensal; **três cenários** variando ao menos churn/CAC; conclusão em 5–10 linhas sobre viabilidade, premissa crítica e capital.
- P2, pp.3,10: salários são normalmente saída operacional, não “CAPEX de talento”; CAC inclui trabalho de vendas; não calcular LTV sobre faturamento bruto; distinguir caixa de receita.
- O professor fala em problema **validado** e demonstração de tecnologia “em funcionamento” (P1, pp.3–4). Como não existem entrevistas nem MVP real, é necessário **deixar a limitação explícita** e realizar testes com dados sintéticos; protótipo navegável não pode ser anunciado como tecnologia produtiva validada.

## Matriz de rastreabilidade dos entregáveis

| Exigência | Onde documentar/entregar | Critério de aceite | Situação documental |
| --- | --- | --- | --- |
| Negócio, problema, solução, mercado, equipe e diferenciais | [Sumário executivo](15-sumario-executivo.md) | 1 página no formato final; sem tração inventada | Texto-base escrito; diagramação final e equipe pendentes |
| Mercado e personas B2B | [Mercado e concorrentes](16-mercado-e-concorrencia.md) | Comprador distinto do usuário; TAM/SAM/SOM com denominadores claros | Pesquisa secundária e cenários, **sem TAM local verificado** |
| Validação do problema | [Protocolo de validação](18-validacao-e-gtm.md) | Evidência de testes/entrevistas ou ausência admitida | Protocolo pronto; **campo não executado** |
| Posicionamento e venda | [Modelo comercial](05-modelo-de-negocio.md), [mercado](16-mercado-e-concorrencia.md) | Contratante, cobrança, implantação e recorrência explicadas | Definido, preços hipotéticos |
| Diagrama e stack de referência | [Arquitetura](17-arquitetura-referencia.md) | Visão lógica, dados, autenticação, IA, cloud, redundância e CI/CD | Projeto de referência escrito, não implantado |
| LGPD, SWOT e riscos | [Operação, segurança e SWOT](19-operacao-riscos-lgpd.md) | Matriz de riscos + mitigadores + mapa de dados | Documentado; revisão jurídica e implementação pendentes |
| Planilha 12 meses | **modernize_projecao_financeira_12_meses.xlsx**, [financeiro](08-plano-financeiro.md) | Três cenários, premissas, indicadores e caixa ligados a fórmulas | Construída; versão editável entregue via ChatGPT; resumo em CSV GitHub |
| Diagnóstico de capital | [Plano financeiro](08-plano-financeiro.md) | Explicar fluxo, menor caixa, necessidade e ressalva da remuneração | Documentado a partir da simulação |
| Pitch até 10 slides | [Storyboard](20-storyboard-pitch-final.md) | 10 ou menos; 3–5 min; sete elementos presentes | Roteiro escrito, implementação pendente |
| Demonstração | [Contrato da demo](21-plano-implementacao-granaxp.md) | Navegável, offline, dados fictícios, nenhuma IA real fingida | Plano e cenários de aceitação prontos |
| Checklist final | [Revisão crítica](22-auditoria-pre-implementacao.md) | Sem inconsistência, claims falsos ou lacunas ocultas | Documentação revisada, itens externos destacados |

## Política obrigatória de evidências

**[D] Decisão do grupo; [F] Fonte pública pesquisada; [H] Hipótese de trabalho; [S] Simulação matemática; [P] Pendente de campo; [I] Implementação.** Qualquer slide com resultado numérico deve trazer [F] ou [H/S] visível, período e denominador. Clientes fictícios da demo não são usuários, vendas nem PMF. Não declarar conformidade LGPD ou segurança garantida antes de auditoria real.

## Limites honestos da conclusão desta etapa

Está pronta a **base documental para IMPLEMENTAR slides e protótipo**; **não** está comprovada a viabilidade de abertura da empresa, nem cumprida uma exigência estrita de validação real do problema. Também dependem do grupo: nomes/atribuições dos 3–5 integrantes, execução eventual do teste de demanda e ensaio final.
