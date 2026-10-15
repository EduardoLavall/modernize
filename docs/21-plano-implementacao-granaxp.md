# Contrato de implementação futura — slides + MVP Modernize IA a partir do GranaXP

**IMPORTANTE:** esta etapa **NÃO implementa código**. Documento de handoff para o próximo trabalho. Repositório-base de referência: https://github.com/EduardoLavall/GranaXP ; destino: https://github.com/EduardoLavall/modernize . Inspeção do GranaXP feita em 15/10/2026.

## 1. Inventário REAL do repositório GranaXP

- `slides.html` contém **13 slides**, acima do limite **10** da Modernize; reduzir a estrutura.
- `demo.html` é um **jogo financeiro gamificado** sem backend real; não pode ser tratado como motor de cadastro documental.
- `js/slides.js`: navegação por teclado, visão geral, hash, fullscreen e controles; **reaproveitar conceitos/lógica adaptados e rebatizados**, após teste.
- `js/export.js` + `vendor/html2canvas.min.js`, `vendor/jspdf.umd.min.js`, `vendor/pptxgen.bundle.js`: exportação no navegador **candidata a reaproveitamento**, com testes de compatibilidade no novo design.
- `js/storage.js` e `js/demo.js`: armazenamento local e lógica de demonstração; **recriar dados/regras para casos sintéticos de locação**, sem uso como autenticação/backend seguro.
- `css/slides.css`, `css/demo.css`, `css/variables.css`, `css/pixel-ui.css`: arquitetura de estilos como referência, **não transportar estética pixel/8-bit para a marca Modernize**.
- `tests/qa-browser.mjs`: testes via Chrome DevTools Protocol, screenshots 1366×768, verificação de overflow, atalho e exportação; adaptar para **10 slides e novo fluxo**.
- Base GranaXP usa HTML/CSS/JS estático puro, sem package.json/TypeScript/React visíveis na árvore revisada. **Não afirmar que oferece backend, OAuth ou IA.**

## 2. Duas entregas separadas — nunca confundir protótipo com SaaS

**Entrega A — apresentação acadêmica offline + MVP interativo sintético:** uma experiência web completa mostrando criação de solicitação, geração de link fictício, upload **apenas de arquivos de teste sintéticos ou simulação predefinida**, indicadores, extração predefinida e revisão humana. Deve funcionar SEM internet/API Google e jamais conter documentos reais ou credenciais. Links de upload aqui não são tokens seguros de produção; indicar “simulado”.

**Entrega B — MVP real com backend seguro (fase posterior):** frontend, API, banco com RLS, storage privado, login Google, fila, integração IA, contratos e LGPD. Não usar GitHub Pages como servidor de API ou armazenamento privado. Só anunciar entrega B se tiver sido implementada/testada; não é condição para o pitch se banca aceitar protótipo funcional e houver transparência.

## 3. Componentes da demo acadêmica

1. **Deck 10 slides:** modelo moderno editorial em 16:9, logo oficial, progresso, atalhos, fontes e script por slide.
2. **Portal equipe (demo):** seletor de imobiliária **fictícia** (substitui login Google real); filtros de solicitações, status, responsável e histórico.
3. **Nova solicitação:** cria caso na memória/localStorage, exibe um **link fictício**; nunca usar token como credencial real.
4. **Portal interessado (demo):** recebe arquivos de **amostras internas fictícias** ou simula o upload sem persistir bytes de arquivos reais; exibe checklist.
5. **IA simulada explicitamente:** um conjunto de fixtures JSON determinísticas `cadastro-ok`, `falta-comprovante`, `divergencia-nome`, `arquivo-ilegivel`; resultado rotulado “simulação”, revisável.
6. **Revisão:** funcionário corrige campos, aponta/resolve pendências e conclui manualmente.
7. **Painel de indicadores:** contadores derivados do estado local, sem representar clientes reais, logs reais ou taxa de precisão.
8. **Gráfico financeiro:** lê os valores estáticos auditados da planilha/CSV gerado nesta etapa; alterna 3 cenários e explica premissas.
9. **Fluxo pedagógico:** botão “Abrir demo” no slide 5 e “Voltar ao slide 6” no encerramento da demo, sem quebra de navegação.

## 4. Dados fictícios para os testes

Usar apenas pessoas inventadas, CPF de formato não válido/testável marcado como fictício (ou não exibir CPF completo), endereços imaginários, empresa “Imobiliária Horizonte — DEMO”, “Imobiliária Aurora — DEMO”. Não anexar comprovantes verdadeiros; imagens devem ter marca d'água **“DOCUMENTO FICTÍCIO — DEMONSTRAÇÃO”**.

### Cenários de aceite

- **E2E-01:** cria solicitação → link simulado → documentação sintética completa → processamento pré-programado → revisão → concluído.
- **E2E-02:** falta comprovante → mostra pendência → complementação sintética → revisão → concluído.
- **E2E-03:** nome divergente → IA avisa **suspeita**, pessoa corrige manualmente, audit trail registra intervenção.
- **E2E-04:** processo sem documentos não pode ser concluído silenciosamente.
- **E2E-05:** selecionar outra imobiliária fictícia mostra apenas sua própria simulação (isso **não prova segurança multi-tenant real**).
- **E2E-06:** estado resetável + repetir apresentação offline; nenhum dado real persiste.
- **E2E-07:** mobile e 1366×768 sem overflow, slides legíveis em projetor.
- **E2E-08:** teclado, fullscreen, overview, exportação/print ou fallback estático.
- **E2E-09:** controle reduzir animação, contraste e foco visível.
- **E2E-10:** sem rede, export e simulação continuam operando; nenhum pedido secreto de API.

## 5. Sequência de implementação após aprovação do grupo

**Passo 1 — nova identidade/shell:** revisar licenças e copiar apenas elementos reutilizáveis de navegação/exportação para novo código no repo Modernize. Não alterar/riscar GranaXP.

**Passo 2 — deck primeiro:** 10 slides de conteúdo final; ligação para material financeiro e referências, cronômetro/roteiro.

**Passo 3 — demo sintética funcional:** modelo de estado, fixtures, jornadas e auditoria simulada, com indicadores corretos; fluxo convincente e didático.

**Passo 4 — QA:** executar cenários E2E + teste visual 1366×768, 1920×1080, mobile; screenshots, export PDF/PowerPoint e projeto sem rede.

**Passo 5 — deploy:** GitHub Pages para estático, preview e versão fixada para apresentação; informar URLs apenas após confirmação de deploy.

**Passo 6 — MVP produtivo (fora da demo):** integrar auth Google, database, storage, fila e IA sob requisitos de segurança e estimativa de custos; travar entrada real de dados até critérios jurídicos/técnicos cumpridos.

## 6. Arquitetura do código estático candidata a adotar

```text
modernize/
  slides.html
  demo.html
  assets/brand/      # logos oficiais PNG
  src/slides/         # navegação, transições, dados e QA
  src/demo/           # modelos e casos sintéticos
  src/finance/        # cenários gerados/auditados
  styles/             # tokens visuais Modernize
  tests/              # fluxo/QA visual
  docs/               # documentação normativa
```

Stack final pode ser **JS puro a partir do GranaXP** ou **Vite+TypeScript**, preservando UX e possibilidade de hospedagem estática. A escolha de ferramenta não deve causar reescrita desnecessária antes de testar o esqueleto.

## 7. Limites e decisões pendentes que não impedem a demo

Equipe real (nomes/atores), fornecedor final de IA, regime fiscal, dados reais de market sizing, entrevistas e formato de autenticação de produção não bloqueiam a **demonstração acadêmica honesta**; bloqueiam marketing como produto validado/produção. O usuário pediu aguardar autorização antes de escrever slides + MVP.
