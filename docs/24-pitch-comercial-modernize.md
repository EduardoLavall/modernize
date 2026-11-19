# Pitch comercial Modernize — IA aplicada à modernização de empresas

**Atualizado em 19/11/2026.** Versão de apresentação comercial, não deck de prestação de contas acadêmica. Publicado em `slides.html` e `slides-live.html`.

## Objetivo

Posicionar a **Modernize** como parceira de modernização de empresas, usando IA, automação, integrações, capacitação e evolução tecnológica contínua. **A empresa é a protagonista; nenhum produto vertical ou plataforma imaginada ocupa o pitch.** O foco está na dor do cliente, na transformação potencial e no convite à conversa.

A apresentação foi desenhada para empresários e gestores de pequenas e médias operações, com linguagem simples, visual memorável e ênfase em problemas operacionais concretos. Não é um material de captação de investimento, nem estudo financeiro.

## Sequência de 10 slides

| Slide | Mensagem central | Papel comercial |
| --- | --- | --- |
| 01 | O futuro do seu negócio não espera. | Gancho forte e posicionamento IA-first |
| 02 | Sua equipe foi contratada para pensar, não copiar e colar. | Conexão com dor e retrabalho |
| 03 | A sua empresa em modo inteligente. | Visualizar a mudança antes/depois |
| 04 | A tecnologia certa para o problema certo. | Apresentar as quatro linhas de solução |
| 05 | Menos discurso. Mais aplicação. | Casos de uso ilustrativos de IA no trabalho |
| 06 | A IA apoia. Sua equipe lidera. | Reduzir objeções e valorizar supervisão humana |
| 07 | Sem mágica. Com método. | Dar confiança no processo de implementação |
| 08 | A ferramenta se adapta à empresa, não o contrário. | Versatilidade para setores distintos |
| 09 | Comprar tecnologia é fácil. Fazer a mudança acontecer é o desafio. | Diferencial de acompanhamento e capacitação |
| 10 | Sua empresa pode continuar como está. Ou pode modernizar. | CTA e fechamento |

## Tom, identidade e promessas

- Escrita direta, frases curtas e foco nos efeitos operacionais desejados.
- Visual escuro/grafite, vermelho de marca e contrastes claros. Logo oficial permanece sem alterações.
- Exemplos de processos são ilustrativos. **Não** afirmar clientes, faturamento, economia percentual, produtividade comprovada, IA operando em produção ou cases que ainda não existem.
- Evitar números de mercado sem pesquisa local; TAM/SAM/SOM, métricas de churn e projeções financeiras não pertencem a esta apresentação.
- Não apresentar Modernize IA, imobiliárias, PostgreSQL ou stack técnica como essência da Modernize.
- O método apresentado é a proposta comercial de atuação, sujeita a escopo e negociação.

## Chamada para ação

O último slide aponta para a seção de soluções da landing institucional: `https://eduardolavall.github.io/modernize/#servicos`. **Não existe contato comercial oficial fornecido no projeto**; portanto não foi inventado telefone, WhatsApp, e-mail, link de agendamento ou formulário. Quando esse canal for definido, substituir o CTA por conversão direta (diagnóstico/conversa comercial).

## Implementação

- `slides.html`: HTML semântico, dez seções com IDs previsíveis, exemplos ilustrativos e CTA.
- `css/slides.css`: apresentação 16:9, responsiva, sem bibliotecas ou fontes externas, animação opcional e CSS de impressão.
- `js/slides.js`: navegação por teclado, hash, índice, tela cheia, botão PDF e acessibilidade.
- `scripts/build-pages.mjs`: `_site/slides-live.html` com caminhos alternativos para contornar o cache antigo.
- `tests/static-check.mjs` e `tests/qa.spec.py`: testes de mensagem, fluxo, navegação, impressão, viewport e ausência de erro JS.
- `sw.js`: mantém política sem cache persistente de páginas/scripts.

### Como apresentar

Use `https://eduardolavall.github.io/modernize/slides-live.html` se o navegador tiver guardado slides antigos via Service Worker. Pressione `F` para tela cheia, setas ou Espaço para avançar, `Esc` para índice, `P` para imprimir ou salvar como PDF. O pitch deve ser conduzido por uma pessoa, com exemplos contextualizados ao negócio do público.

## O que permanece arquivado

Os documentos `docs/00–23`, o modelo em `finance/` e o protótipo `demo.html` continuam como material histórico de pesquisa e da primeira proposta de produto para imobiliárias. **Não foram apagados, misturados ao novo pitch nem anunciados como funcionalidades reais.**

## Evoluções recomendadas

1. Definir canal comercial real e conectá-lo ao CTA final.
2. Coletar entrevistas, feedback e problemas frequentes de empresas para ajustar a argumentação.
3. Preparar demonstrações reais de um ou dois fluxos com dados sintéticos antes de afirmar capacidade entregue em produção.
4. Medir adoção e resultado em projetos-piloto antes de usar números ou depoimentos no marketing.
