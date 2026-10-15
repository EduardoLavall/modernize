# Auditoria de aderência — slides + MVP acadêmico Modernize

**Data:** 15/10/2026. **Estado:** revisão de implementação **sem alterações no produto**. **Branch inspecionada:** `main`; HEAD observado inicialmente: `1d26a2417a500c033e07285a62158120afd11d7e`.

## Escopo e fontes

- **Professor:** `Plano de Negócios - Inovação Tecnológica e Empreendedorismo.pdf` (5 p.) e `Material_Economia_Unitaria_Projecao_Financeira.pdf` (15 p.), comparados com [requisitos](11-requisitos-academicos.md) e [matriz](14-matriz-aderencia-academica.md).
- **Projeto:** [MVP](13-mvp-modernize-ia.md), [mercado](16-mercado-e-concorrencia.md), [arquitetura](17-arquitetura-referencia.md), [finanças](08-plano-financeiro.md), [storyboard](20-storyboard-pitch-final.md), [plano de demo](21-plano-implementacao-granaxp.md).
- **Código:** `slides.html`, `demo.html`, `js/slides.js`, `js/finance.js`, `js/demo.js`, CSS, assets, `sw.js`, `tests/qa.spec.py`, `tests/static-check.mjs`, `.github/workflows/pages.yml`.
- **Evidência automatizada:** [GitHub Actions, run 38783870521](https://github.com/EduardoLavall/modernize/actions/runs/38783870521) passou nos jobs **QA** e **deploy** para commit `1d26a2417a500c033e07285a62158120afd11d7e`. Testes estáticos também passaram na inspeção local; a repetição local de Playwright foi bloqueada pela política do navegador do ambiente, portanto **não** foi considerada um segundo sucesso independente. Foram inspecionadas capturas arquivadas dos slides 1, 5 e 9 e das telas iniciais da demo.
- **Artefatos externos:** sumário executivo em PDF A4 de 1 página verificado; planilha XLSX editável inspecionada com 7 abas, fórmulas e valores; **ambos ainda não estão versionados no repositório**.

## O que atende bem

| Exigência da aula / documento | Evidência de implementação | Parecer |
| --- | --- | --- |
| Pitch no máximo 10 slides | 10 seções `#slide-1` a `#slide-10` | **Conforme** |
| Navegação em apresentação | Teclado, índice, progresso, fullscreen e impressão PDF | **Conforme no fluxo testado** |
| 3–5 minutos | [Storyboard](20-storyboard-pitch-final.md) soma **4min50s**, inclui demo de 60s | **Planejado**, não ensaiado |
| Proposta, problema, solução e papéis B2B | Slides 1–4; imobiliária paga, equipe opera, interessado envia | **Conforme em conteúdo**, dor ainda não validada |
| Modelo de cobrança | Slide 7: R$ 990 implantação + R$ 299/empresa/mês | **Conforme à decisão D-027**; não validado com clientes |
| Concorrência | Slide 6 reconhece Kenlo/Superlógica, sem afirmar exclusividade | **Conforme à documentação** |
| Arquitetura | Slide 8 distingue Google, API, PostgreSQL, armazenamento e IA **propostos** | **Conforme como diagrama de referência**, não implantação |
| Financeiro | Slide 9: receitas, saídas e resultado + três cenários e caixa em 12 meses | **Totais matemáticos corretos**; ver falha no indicador de capital do XLSX |
| Demo | Criar caso → portal fictício → quatro pacotes determinísticos → revisão → conclusão | **Funcional na jornada básica; não é SaaS real** |
| Privacidade no pitch | Avisos de dados fictícios e IA simulada; nenhum upload real | **Correto e transparente** |
| Deploy | Workflow publicado e jobs QA/deploy com sucesso | **Conforme**, conforme logs GitHub Actions |

## Lacunas — classificar antes de apresentar

### P0 — Obrigatórias para a entrega final

1. **Equipe não preenchida no slide 10.** O texto ainda diz *“Adicionar nomes e funções reais antes da banca · 3–5 integrantes”*. O PDF pede equipe de 3–5 membros e que o pitch justifique por que são capazes de executar. **Aceite:** nomes, papéis reais e justificativa curta no slide e no sumário; não inventar integrantes.
2. **Tamanho de mercado não demonstrado no slide 3.** O slide usa o Cetic.br (adoção de IA por porte no Brasil), que **não mede imobiliárias em Santa Maria**, e não explica TAM/SAM/SOM. O documento [16](16-mercado-e-concorrencia.md) contém metodologia e sensibilidades hipotéticas, sem número atual comprovado. **Aceite:** indicar TAM/SAM/SOM com base e data verificáveis ou explicitamente como simulações; não usar população municipal nem notícia histórica CRECI como contagem de 2026.
3. **“Problema validado” e tração ainda não demonstrados.** O professor menciona a Fase 1 como problema validado e pede métricas de tração/testes no pitch. Os slides reconhecem hipótese, mas **não há entrevistas, resultado medido, usuários ou contratos reais**. **Aceite:** executar pelo menos pequeno teste primário se for possível, registrando método/amostra/resultados verdadeiros, ou marcar formalmente a limitação e defender o plano de teste — sem declarar a exigência integral cumprida.
4. **Viabilidade de equipe/custos.** O cenário-base da planilha usa R$ 1.000 de fixos/mês **sem remuneração estrutural**; o lucro anual de ~R$ 106 não sustenta equipe de 3–5 pessoas. O slide 9 sinaliza, mas um cenário-base realista deve incluir remuneração/horas e explicar o capital correspondente. **Aceite:** custo completo do time e impacto nos 12 meses, distinguindo modelo didático enxuto de operacional realista.

### P1 — Corrigir antes de considerar o trabalho robusto

5. **Fórmula de capital adicional da planilha superestima cenários com caixa positivo.** Em `Indicadores!B18:D18`, fórmula atual `=MAX(0,-menor_caixa)+2*fixos`. Para **reservar dois meses de fixos depois de cobrir o pior caixa**, o correto é `=MAX(0,2*fixos-menor_caixa)`. Isso produz aproximadamente **R$ 12.613,94 pessimista (inalterado), R$ 1.636,39 base (em vez de R$ 2.000) e R$ 0 otimista (em vez de R$ 2.000)**. Confirmar o conceito de reserva no texto do indicador e atualizar valores no sumário, se citados.
6. **Métricas financeiras pouco explicadas no deck.** O PDF complementar destaca contribuição, CAC, LTV, LTV:CAC, payback, break-even e runway. O XLSX os calcula, mas o slide 9 expõe principalmente CAC, churn e fluxo. **Aceite:** no slide 9 ou tela auxiliar, mostrar pelo menos break-even e runway, além do aviso de que LTV/churn são hipóteses; manter 10 slides.
7. **Simulação de IA não demonstra extração real de arquivos.** A jornada acadêmica funciona, mas o portal tem quatro botões de cenários sintéticos, sem enviar arquivos; não há OCR, modelo de IA, Google OAuth, PostgreSQL, fila, autorização segura, segregação real nem backend. **Aceite para o pitch:** continuar chamando *demo acadêmica simulada*; se a banca exigir tecnologia funcional real, criar PoC técnica separada com amostras sintéticas e controle de custo, sem dados pessoais reais.
8. **Revisão das inconsistências é simplificada demais.** Em `js/demo.js`, ação `resolve` pode limpar divergência/ilegibilidade só com um clique, e no cenário de nome divergente substitui o campo automaticamente; não exige confirmação de correção baseada na documentação. **Aceite:** exigir conferência/ajuste explícito, registrar o que foi corrigido e não permitir fechar ilegibilidade sem substituição do documento.
9. **Material de entrega fora do repositório.** O sumário em PDF A4 já tem 1 página, e o XLSX existe, mas ainda precisam acompanhar a entrega final. **Aceite:** preservar cópias versionadas ou vinculadas de modo claro, validar abertura em outra máquina e garantir que o professor recebe todos os quatro artefatos solicitados.

### P2 — Qualidade/QA e consistência de documentação

10. **QA visual não é totalmente bloqueante.** `tests/qa.spec.py` verifica dez slides e registra overflow via `print('WARN...')`, mas **não falha** quando encontra excesso. Testa apenas telas capturadas selecionadas e 390px sem asserções de overflow móvel. **Aceite:** assertiva de overflow/clipping/legibilidade em todos os slides a 1366×768 e 1920×1080, mais checagem mobile.
11. **Cenários E2E não cobertos integralmente.** O teste de navegador passa pelo fluxo *documento faltando → reenvio completo → concluir*, mas não verifica de ponta a ponta divergência/ilegibilidade, reprocessamento, falha/ausência de rede, reset, formulário de login real (fora do escopo) ou impressão. **Aceite:** testes para os quatro cenários sintéticos, reset, atalhos e PDF; simular offline após pré-cache.
12. **README de publicação contradiz workflow.** `README-IMPLEMENTACAO.md` ainda instrui GitHub Pages com “Deploy from a branch” apesar de `.github/workflows/pages.yml` exigir **Source: GitHub Actions**, já utilizada. **Aceite:** atualizar README para corresponder à configuração efetiva e registrar versão testada.
13. **Impressão PDF precisa ser visualmente verificada.** CSS contém `@page {size:landscape}`; não garante exportação 16:9 idêntica ao projetor nem impede quebra de elementos em qualquer browser. **Aceite:** abrir PDF exportado, verificar dez páginas, proporção e ausência de cortes.
14. **Visibilidade em projetor:** tipografia principal é forte, mas notas de fontes/rodapés aparecem com 10–12px no CSS, possivelmente pequenas em sala. **Aceite:** inspeção em 1366×768 e legibilidade à distância real; preservar fonte e ressalvas sem escondê-las.
15. **Ensaio e contingência offline.** Roteiro soma 4m50s em papel, com apenas 10s de tolerância; service worker promete offline somente após primeira carga. **Aceite:** ensaiar cronômetro real e preparar fallback local já carregado, especialmente se for abrir aba da demo no slide 5.

## Parecer por critério de nota (sem atribuir nota oficial)

| Critério do professor (25% cada) | Parecer |
| --- | --- |
| Proposta de valor | **Boa definição**, evidência local primária faltante |
| Viabilidade técnica | **Arquitetura de referência sólida** e demo sintética funcional; SaaS real ainda não existe |
| Consistência financeira | **Três cenários coerentes**, mas custos de equipe insuficientes e fórmula do capital adicional requer correção |
| Qualidade do pitch | **Deck moderno e navegável**, equipe ausente, tamanho de mercado incompleto e ensaio não comprovado |

## Decisão recomendada

**Não apresentar como entrega final perfeita.** Está apto para uma rodada curta de correção **antes da banca** e **não precisa recomeçar do zero**. Ordem: (1) equipe e mercado no slide; (2) cenário financeiro com remuneração e fórmula de capital; (3) roteiro/viabilidade da demonstração; (4) ampliar testes e validar exportação; (5) ensaio real. Não misturar “prototipagem acadêmica suficiente para mostrar fluxo” com “software produtivo validado”.

**Esta auditoria é documental e técnica. Nenhuma modificação de slides, demo, planilha ou código foi efetuada neste commit.**

## Errata e fechamento das correções de implementação — 15/10/2026

**Correções efetivamente publicadas no código:**
1. **Slide 3:** exemplo de TAM/SAM/SOM = **120/72/8**, com rótulo visível **"SIMULAÇÃO, NÃO PESQUISA LOCAL"**, explicação de que ainda não existe contagem atual comprovada de imobiliárias de Santa Maria. A meta de oito contratos continua hipótese.
2. **Slide 9:** botão para incluir/excluir custo de equipe de **R$ 2.500/mês adicional** (incluído por padrão), comparativo dos três cenários e break-even/runway recalculados. R$ 2.500 **não é salário integral de uma equipe de 3–5 pessoas**.
3. **Slide 10:** quatro funções organizacionais em `js/team.js`; exibe **"Nome a confirmar"** enquanto não houver identificação real; faltam nomes dos integrantes e eventualmente o ajuste dos papéis pela equipe.
4. **Demo:** conclusão somente após revisão humana registrada; não é mais possível limpar divergência de nome por um botão automático sem corrigir a referência fictícia; documento ausente ou ilegível exige **reenviar pacote sintético completo**.
5. **Exportação e QA:** `@page` com proporção 16:9, teste de exatamente dez páginas em PDF; teste de overflow no projetor passou de aviso para **asserção bloqueante**. O GitHub Actions executou esses testes.
6. **Planilha externa corrigida:** `Indicadores!B18:D18` agora aplica `MAX(0, 2 × custo_fixo - menor_caixa)` e contém aba **Base com equipe**; valores da reserva passam a R$ 12.613,94 (pessimista), R$ 1.636,39 (base) e R$ 0 (otimista). A planilha `.xlsx` revisada foi disponibilizada como arquivo de conversa, mas **não está versionada no GitHub**.
7. **GitHub Pages:** `js/team.js` incorporado ao deploy e ao cache offline; README de publicação corrigido para a modalidade **GitHub Actions**.

**QA independente via GitHub Actions:** as duas jornadas (pendência/reenvio e divergência com correção) e PDF de dez páginas passaram no workflow do commit `dcbf20245729d63e92cc3ecc5b7a0bac0999eec4`, execução [38791238891](https://github.com/EduardoLavall/modernize/actions/runs/38791238891). 

**Questões sem resposta empírica — não registrar como solucionadas:** nomes da equipe (3–5), entrevistas/teste real de interesse, TAM/SAM de Santa Maria com fonte atual, custo integral de pessoal, preço realmente pago, cálculo fiscal verdadeiro, IA/OAuth/backend/segurança de SaaS real. São pendências acadêmicas ou de operação e exigem evidências futuras.
