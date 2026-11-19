# Modernize — Como executar e publicar

**Atualizado em 19/11/2026.** Existem duas experiências diferentes neste repositório. Não misturá-las:

- **Pitch Sprint visual atual** (`slides.html`): dez telas curtas que vendem a Modernize e contemplam a rubrica do professor (mercado, MVP, stack, preços, 12 meses, equipe e pedido). Os números exibidos são **simulações**, não vendas reais.
- **Demo acadêmica histórica** (`demo.html`): jornada simulada de cadastro documental para imobiliárias. Dados fictícios, sem backend, sem IA real, sem OAuth Google e sem upload real de documentos.

A página inicial (`index.html`) é a landing institucional, gerada a partir de `landing/index.html`. A landing também pode ser publicada separadamente na Vercel com Root Directory = `landing`.

## Abrir

Execute a partir da raiz:

```bash
python -m http.server 8080
```

Endereços:

- Landing: `http://localhost:8080/`
- Apresentação comercial: `http://localhost:8080/slides.html`
- Protótipo fictício: `http://localhost:8080/demo.html`

No GitHub Pages, os caminhos correspondentes são `https://eduardolavall.github.io/modernize/`, `/slides.html` e `/demo.html`.

Existe também `/slides-live.html`, com arquivos de CSS/JS de nomes alternativos, para quem teve problemas com versões antigas presas no Service Worker do navegador. O SW atual (v6) não faz cache de HTML ou JavaScript e remove caches antigos.

## Apresentação comercial

Narrativa: impacto → dor → proposta de valor → mercado → MVP → viabilidade técnica → monetização → projeção financeira → tração/equipe → pedido. Duração sugerida: **4min30s** com apresentação demonstrativa curta.

O deck inclui:

- Navegação por setas, `Espaço`, `Home`, `End`.
- `Esc` para visão geral; `F` para tela cheia; `P` para salvar PDF pela impressão.
- Dez páginas 16:9 na exportação em PDF, conteúdo responsivo e preferência por movimento reduzido.
- Sem fontes de CDN ou bibliotecas JS externas.
- Chamada final para `https://eduardolavall.github.io/modernize/#servicos`. Não inventar contato comercial: o canal de vendas ainda precisa ser definido.

Ver [documentação do pitch comercial](docs/24-pitch-comercial-modernize.md).

## Demo sintética preservada

Na `demo.html`, a pessoa pode criar uma solicitação fictícia, usar um link de portal simulado, escolher um dos quatro cenários de documentação, revisar campos, tratar pendências e concluir manualmente. Não enviar dados pessoais reais. Há um seletor de imobiliárias fictícias, mas o isolamento é apenas filtro local, sem autenticação e sem garantias de segurança multi-tenant.

A lógica de `js/demo.js` usa `localStorage` para o estado fictício e `setTimeout` para simular processamento; nenhuma IA externa é chamada.

## Publicação e testes

O workflow `.github/workflows/pages.yml` roda verificações estáticas, Playwright, exportação PDF e testes da landing e da demo. O job de publicação só ocorre no push para `main` ou execução manual, não em pull requests. A publicação inclui uma verificação remota dos arquivos efetivamente servidos.

```bash
node tests/static-check.mjs
node scripts/build-pages.mjs
```

Para Playwright, instalar `playwright`, `pypdf` e Chromium, servir `_site` na porta 8767 e rodar `python tests/qa.spec.py`.

**Não declarar sucesso de deploy, QA visual ou PDF sem verificar o GitHub Actions correspondente.**

## Material histórico

Os relatórios acadêmicos, CSVs financeiros, `js/finance.js` e as decisões sobre Modernize IA continuam versionados. O slide 8 apresenta **somente um resumo visual do cenário-base da empresa**, e a documentação mantém o restante. A arquitetura de produção anteriormente proposta (OAuth, banco, storage privado, processamento assíncrono) permanece **planejamento, não funcionalidade entregue**. Uma evolução real deve exigir segurança, isolamento por empresa, LGPD e validação com clientes.
