# Modernize — Landing page institucional

Esta pasta contém o **site institucional** da Modernize, separado dos 10 slides e do protótipo acadêmico do repositório.

## Conteúdo e posicionamento
- Modernize = consultoria, diagnóstico, capacitação, implementação e acompanhamento contínuo para negócios B2B;
- Modernize IA = **primeira linha de produto**, inicialmente aplicada ao cadastro documental de imobiliárias;
- Sem clientes, percentuais de economia, resultados ou depoimentos inventados;
- Os botões externos levam para a apresentação e a demonstração com dados fictícios do GitHub Pages;
- Não foi publicado um endereço de contato, WhatsApp ou e-mail porque o responsável ainda não definiu um canal oficial.

## Tecnologias
Site estático independente, HTML/CSS/JS, sem dependências de build. Inclui navegação adaptável, etapas interativas, FAQ, animação respeitando "reduzir movimento" e links funcionais.

## Vercel
- Criar projeto **separado**, ligado ao repositório \`EduardoLavall/modernize\`;
- **Root Directory:** \`landing\`;
- Framework: \`Other\` / static;
- Build Command: nenhum; Output Directory: \`.\` (ou padrão static root);
- Nome sugerido do projeto: \`modernize-site\`, endereço pretendido \`modernize-site.vercel.app\` (verificar disponibilidade);
- O site não redireciona e **não altera** o GitHub Pages da apresentação.

## Executar localmente
\`\`\`bash
cd landing
python -m http.server 8787
\`\`\`
Abra \`http://127.0.0.1:8787\`.

## Arquivos
- \`index.html\` — conteúdo semântico e imagens de marca.
- \`styles.css\` — identidade visual.
- \`main.js\` — menu, progresso, animações e abas do método.
- \`assets/brand/\` — **cópias dos dois PNGs oficiais já aprovados**, sem alteração visual.
- \`vercel.json\` — configuração do site estático.
