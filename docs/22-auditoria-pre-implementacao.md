# Auditoria final documental — Modernize (15/10/2026)

**Escopo conferido:** PDFs efetivamente disponíveis da disciplina (plano 5 páginas, economia unitária 15), repositório Modernize, código/documentação do GranaXP, pesquisa pública e fórmulas da planilha em três cenários.

## Resultado executivo

**LIBERAÇÃO DOCUMENTAL CONDICIONAL** para começar a construir **slides de até 10 telas e MVP sintético interativo**. **NÃO** libera operação SaaS com documentos reais nem afirma cumprimento integral de validação mercadológica. A documentação está robusta como projeto acadêmico **com hipóteses expressas**, mas não é prova de PMF, viabilidade financeira ou conformidade LGPD.

## Conferências cruzadas executadas

| Questão | Resultado |
| --- | --- |
| Mercado inicial | Imobiliárias em Santa Maria/RS, não exclusividade da Modernize |
| Quem paga | **Imobiliária** paga R$ 990 de implantação + R$ 299 **mensais por imobiliária**, nunca por locatário |
| Fluxo do MVP | Documentos básicos → link de interessado sem login → extração/sinais → revisão humana → conclusão |
| Permissões | Equipe Google OIDC com Admin/Funcionário; cliente externo por token temporário |
| Arquitetura SaaS | Multi-tenant, PostgreSQL, API protegida, storage privado, fila, adapter de IA — **propostos, não implementados** |
| Concorrência | Kenlo/Superlógica comprovadamente oferecem partes do processo; diferencial apenas hipótese |
| Mercado quantitativo | Estatística IBGE populacional ≠ TAM; CRECI histórico 115 ≠ cadastro vigente; TAM/SAM/SOM **em apuração** |
| Preços e meta | D-027 preservado; demanda e oito novos clientes não validados |
| Financeiro de 12 meses | Receitas com implantação separada, 3 cenários, imposto/custos/CAC/churn configuráveis, saldo mensal |
| Remuneração | R$ 1.000 fixos não cobrem pró-labore estrutural; risco crítico explicitado |
| Pitch | 10 slides, 290s, sete elementos P1, demo rotulada sintética |
| GranaXP | Possui **13** slides e demo gamificada offline; reaproveitar shell/testes, não estética nem backend inexistente |
| Fontes | Cetic.br/IBGE/ANPD/competidores referenciados com limites; estimativas não tratadas como fatos |

## Check aritmético (3 cenários; 12 meses; dados esperados/fracionários por churn)

| Indicador | Pessimista | Base | Otimista |
| --- | ---: | ---: | ---: |
| Novos clientes no ano | 4 | 8 | 12 |
| Clientes ativos esperados no mês 12 | 3,22 | 7,19 | 11,36 |
| Entradas (R$) | 9.571,75 | 22.136,25 | 34.367,86 |
| Saídas (R$) | 22.585,69 | 22.030,02 | 24.118,38 |
| Fluxo anual (R$) | −13.013,94 | +106,24 | +10.249,48 |
| Caixa final com R$ 3.000 iniciais (R$) | −10.013,94 | 3.106,24 | 13.249,48 |
| Menor saldo de caixa (R$) | −10.013,94 | 363,61 | 2.311,87 |
| Fluxo anual **incluindo** pró-labore extra R$ 2.500/mês | −43.013,94 | −29.893,76 | −19.750,52 |

**Reprodução:** planilha editável `modernize_projecao_financeira_12_meses.xlsx`; premissas e visão tabular em `finance/`. Suposições: cobranças recebidas no mês da venda, sem atraso/estorno, volumes esperados sob churn percentual fracionário. As 8 empresas novas no ano não significam 8 empresas ativas desde mês 1.

**Diagnóstico honesto:** cenário-base quase empata sob estrutura extremamente enxuta e sem remuneração fixa; não prova negócio sustentável. Pessimista leva caixa abaixo de zero no mês 3. Para este cenário adverso, **capital adicional indicativo ~R$ 12.614** além do caixa inicial R$ 3 mil, com reserva simplificada de 2 meses de custos fixos; sem remuneração adequada a necessidade sobe. Não afirmar “ROI comprovado”.

## Pontos ainda em aberto / decisões do grupo

1. **[BLOCKER PARA ENTREGA ACADÊMICA FINAL]** nomes e atribuições reais dos **3–5 integrantes**; registro de ensaio de 3–5 minutos.
2. **[BLOCKER PARA AFIRMAÇÃO DE VALIDAÇÃO]** nenhuma pesquisa de campo ou teste de disposto a pagar comprovado; não chamar “problema validado”.
3. **[BLOCKER PARA TAM NUMÉRICO FACTUAL]** número atualizado de imobiliárias Santa Maria com fonte e data.
4. **[BLOCKER PARA VIABILIDADE REAL]** custo efetivo de API/arquivos, carga de suporte, folha/pró-labore e regime tributário/caixa inicial.
5. **[BLOCKER PARA PRODUÇÃO]** contratos/controlador-operador, retenção, segurança, isolamento entre tenants, auditoria, políticas IA e teste de dados reais.
6. **[VERIFICADO COMO ARTEFATO EXTERNO]** sumário executivo diagramado em **PDF A4 com uma página**; arquivo disponibilizado para download na conversa, **não enviado como binário ao GitHub**.
7. **[PENDENTE DE IMPLEMENTAÇÃO]** slides HTML, demo/QA/exports e eventual protótipo de operação real ainda não existem no repo Modernize.

## Protocolo de revisão antes de publicar slides

- [ ] Rodar teste de 10 slides exatos e limite visual 16:9 sem overflow.
- [ ] Conferir que números financeiros são extraídos de `finance/`/planilha e que avisos estão visíveis.
- [ ] Checar que Cetic.br “15%” tem segmento/ano; que nenhum dado de CRECI antigo é usado como TAM 2026.
- [ ] Usar logos PNG oficiais, evitar visual do GranaXP e slides com “cara de template de IA”.
- [ ] Testar casos sintéticos com pendências/erro/controle humano; não coletar documentos pessoais.
- [ ] Ensaiar tempo total, demo e plano B offline; validar exportações.
- [ ] Completar equipe, papel, fala final e pedido conforme material P1.

**Parecer final:** documentação **apta a ser usada como briefing de implementação** dos slides e de demonstração acadêmica sintética; não apta a ser apresentada como mercado/produto já validado.

## Complemento pós-implementação — 15/10/2026

O handoff resultou em [slides.html](../slides.html), [demo.html](../demo.html), [CSS](../css/), [JS](../js/) e [workflow CI/CD](../.github/workflows/pages.yml). Foram feitas revisões estáticas de HTML/JS e dos valores do caixa dos três cenários; os scripts para QA de navegador e imagens estão em [tests/](../tests/). O status de **conclusão de deploy do GitHub Pages** depende da configuração no repositório; logs anteriores mostraram que a conta de automação não podia criar o site Pages sem habilitação administrativa. **Nunca confundir disponibilização de código com publicação pública ou teste visual integral.** O bloqueio comercial de validação local, preços, disponibilidade de clientes e segurança de produção permanece.
