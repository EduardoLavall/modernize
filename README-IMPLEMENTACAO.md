# Modernize — Implementação dos slides + MVP acadêmico (v0.1)

**Status:** protótipo acadêmico com dados inteiramente fictícios, sem backend, sem IA real, sem Google OAuth, sem documentos verdadeiros.

## Acessar

- **Pitch:** `index.html` ou `slides.html` (10 slides, 4min50s planejados). Os slides 1–3 apresentam a **empresa Modernize**, suas quatro frentes de serviço e o diferencial de acompanhamento contínuo. A **Modernize IA** aparece a partir do slide 5 como **primeira aplicação**, e não como toda a empresa.
- **Demo:** `demo.html` (cadastro de interessados, portal de envio fictício, extração predefinida, pendências, revisão manual e conclusão).
- Para rodar localmente a partir da raiz do repositório, use `python -m http.server 8080` e abra `http://localhost:8080/`. **Não use dados pessoais reais.**
- GitHub Pages: Settings → Pages → **Source: GitHub Actions** (`pages.yml`), se o Pages ainda não estiver habilitado. URL esperada após habilitar e publicar: `https://eduardolavall.github.io/modernize/` (verificar no painel, **não tratar como confirmada**).
- Um service worker armazena os arquivos estáticos após a primeira visita em HTTPS/localhost, permitindo repetir a demo sem conexão. Para primeira apresentação offline, prefira rodar o servidor local e carregar tudo antes.

## Controles dos slides

- `→`, `Espaço`: próximo; `←`: anterior; `Home/End`: primeiro/último; `Esc`: visão geral; `F`: tela cheia; `P`: impressão/PDF pelo navegador; `D`: demo.
- Clique em “Abrir demonstração” no **slide 6**; “Voltar ao pitch” direciona ao **slide 7** (diferencial e modelo de negócio).
- Slide 9: alternância dos três cenários financeiros por botões. **Valores calculados de `js/finance.js`** segundo `finance/` e `docs/08-plano-financeiro.md`.

## Percurso funcional da demo

1. Abra “Nova solicitação” e informe somente **nome fictício**.
2. Abra o link “Portal do interessado” na página de detalhes. A URL é **simulada**, não credencial real.
3. Selecione um dos pacotes sintéticos (completo, falta comprovante, divergência ou documento ilegível). Não há campo para enviar arquivo do dispositivo.
4. Aguarde processamento determinístico local; volte ao painel, abra solicitação e veja checklist, campos, alertas e histórico.
5. Com pendência, “Resolver pendência” corrige divergência/ilegibilidade; se faltar comprovante, o portal precisa simular novo envio completo.
6. Clique em “Concluir após revisão” para finalizar **manualmente**. A demo registra o ato no histórico.
7. Troque “Imobiliária Horizonte/Aurora” para ver filtros de casos fictícios: **isso não comprova isolamento entre empresas reais**.
8. Em “Como funciona”, “Restaurar demonstração” apaga alterações locais do protótipo.

## Origem GranaXP

O repositório [GranaXP](https://github.com/EduardoLavall/GranaXP) foi estudado para reaproveitar **padrões de navegação, estado demo local, transições, apresentação web e roteiro de QA**. A implementação da Modernize **foi reescrita**, com estética editorial própria; **não** copiamos a identidade pixel art ou mecânicas de gamificação. GranaXP tinha 13 slides; a Modernize tem exatamente 10 por exigência da disciplina.

## Código e artefatos

```text
index.html                 ponto de entrada
slides.html                pitch 10 slides
css/app.css                tokens/elementos comuns
css/slides.css             telas e impressão em PDF
demo.html                  MVP acadêmico simulado
css/demo.css               UI da demo
js/finance.js              funções da simulação financeira
js/slides.js               navegação, índice e gráfico de caixa
js/demo.js                 estado, portal, processamento fictício, revisão
sw.js                      cache offline após primeiro carregamento
tests/qa.spec.py           roteiro automatizado Playwright (se navegador disponível)
```

**Marcos NÃO implementados:** SaaS de produção, autenticação Google, fila, backend, PostgreSQL, storage privado, validação LGPD, IA externa, integridade dos tokens, custos reais por cadastro, testes com usuários e medição de benefício. Nenhum destes pode ser anunciado como pronto.

## Verificações

- Contagem HTML de 10 slides, ausência de CDN, sintaxe JavaScript com `node --check`, verificação de projeção financeira contra CSV e testes estáticos.
- Roteiro `tests/qa.spec.py` disponível para testes reais de UI, mas depende de executar Chromium sem bloqueio do ambiente. **Sem execução satisfatória, não afirmar que QA visual passou.**
- Recomenda-se executar manualmente em 1366×768 (projetor), 1920×1080 e celular; confirmar que texto, botões, portal e cenários são legíveis sem internet.

## Revisão da auditoria
- Slide 3: TAM/SAM/SOM ilustrativos 120/72/8, não contagem atual local.
- Slide 9: remuneração adicional de R$ 2.500/mês (checkbox, ligada por padrão), break-even e runway; não é folha completa.
- Slide 10: preencher apenas nomes reais em `js/team.js` (3–5 integrantes).
- Demo: salvar revisão humana confirmada, corrigir divergências e reenviar arquivos fictícios ausentes/ilegíveis.
- Planilha XLSX corrigida e sumário PDF devem acompanhar a entrega como artefatos separados.

## Evolução do posicionamento institucional

A apresentação foi reorganizada para colocar **a empresa Modernize** como protagonista. A jornada é: visão da empresa → problema de adoção tecnológica das PMEs → quatro frentes de serviço → mercado e primeiro nicho → produto Modernize IA → demo → diferencial e receitas por oferta → arquitetura → finanças da primeira oferta → equipe e próximos passos. O preço e a projeção **não representam faturamento de todos os serviços**; são hipóteses apenas do piloto com imobiliárias. O SaaS de produção não foi implementado.
