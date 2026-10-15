# 07 — Plano tecnológico e arquitetura

Este documento separa **a tecnologia utilizada para apresentar o trabalho** da **tecnologia que a empresa hipotética poderia usar para atender clientes**.

## A. Apresentação acadêmica (decidido)

- Slides como aplicação web interativa, não vídeo e não apresentação tradicional.
- **HTML, CSS e JavaScript/TypeScript**, com **Vite + TypeScript** como preferência inicial.
- Deploy estático no **GitHub Pages**.
- Planejar antes de implementar: documentação → roteiro → construção ampla (one-shot) → microajustes.
- Suporte a navegação por teclado, modo de apresentação, transições moderadas, redução de movimento, leitura em projetor e telas menores.
- Preferir visual com pouco texto, demonstrações e participação da turma.
- O domínio do GitHub Pages e o workflow serão configurados só quando existir código. Para site de projeto, Vite deverá usar a base correta do repositório.

## B. Tecnologia possível para serviços da Modernize (hipótese)

Fluxo conceitual para um piloto futuro:

1. Levantamento da tarefa e dados envolvidos.
2. Autorização e classificação das informações.
3. Escolha de IA, APIs/conectores e limites de acesso.
4. Fluxo automatizado com logs, verificação e aprovação humana nos pontos críticos.
5. Treinamento dos usuários e documentação de operação.
6. Medição, revisão de segurança e suporte.

Exemplos de sistemas: e-mail, armazenamento de arquivos, planilhas e agenda. A disponibilidade concreta de integrações, permissões e preços deve ser verificada por plataforma e plano. **Nenhuma conexão produtiva real está definida ou implementada.**

## Princípios de segurança e LGPD

- Privilégio mínimo, consentimento/base legal adequada, tratamento de dados compatível com a finalidade.
- Não incorporar senhas, tokens, dados pessoais ou informações privadas de empresas ao GitHub Pages.
- Aprovação humana antes de envio de e-mails, alterações em sistemas e decisões sensíveis, conforme risco.
- Usar dados **100% fictícios** e simulações locais no pitch.
- Mapear falhas: alucinações, instruções maliciosas em conteúdo externo, permissões indevidas e dependência de fornecedores.

## Pendências de arquitetura

Escolher o serviço piloto, o fluxo técnico correspondente, stack da implantação, serviços de nuvem necessários, custos de operação, redundância e estratégia de atualização. Incluir um diagrama técnico no entregável acadêmico.
