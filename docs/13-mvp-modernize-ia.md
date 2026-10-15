# Modernize IA — Escopo do MVP 1.0

**Atualizado em:** 15/10/2026  
**Situação:** decisões de produto aprovadas para planejamento; produto ainda não implementado nem validado comercialmente.

## Visão
**Modernize** oferece modernização tecnológica contínua (consultoria, capacitação, implantação e acompanhamento). **Modernize IA** é uma plataforma extensível que acompanha essa oferta, não o portfólio inteiro da empresa.

## Mercado e problema de entrada
- **Público inicial decidido:** imobiliárias, priorizando pequenas e médias operações. Geografia inicial pretendida: Santa Maria/RS.
- **Não há validação local comprovada** de demanda ou disposição a pagar. A escolha é estratégica, não constatação de PMF.
- **Problema:** documentos e rotinas administrativas repetitivas.
- **Primeiro processo automatizado:** cadastro de interessados em locação. Não incluir análise de crédito ou aprovação automática de locatário.

## Jornada do MVP
1. Funcionário autorizado cria uma solicitação, atribui responsável e compartilha um **link individual direto, sem login para o cliente**.
2. Interessado abre o portal e envia **documento de identificação, comprovante de residência e comprovante de renda**; exigências específicas serão parametrizadas posteriormente.
3. IA extrai os dados legíveis, compara campos e documentos, aponta lacunas/divergências e produz **resumo estruturado**.
4. Funcionário revisa e corrige extrações, solicita complementações quando necessário, altera status e **conclui manualmente** o cadastro.
5. Painel registra responsáveis, etapas e histórico das ações.

## Funcionalidades incluídas
- Painel interno com solicitações, etapas, responsáveis, documentos e histórico auditável.
- Perfis **Administrador** (gerencia usuários e configurações da imobiliária) e **Funcionário** (opera cadastros e revisões).
- Login interno **com Google (OpenID Connect/OAuth)** e autorização explícita de usuários vinculados à imobiliária; Google autenticar não concede acesso por si só.
- Portal externo com link secreto, individual, revogável e com expiração; **sem conta/login para interessado**. Posse do link não comprova identidade.
- Extração de informações, conferência sinalizando possíveis inconsistências e resumo automático; revisão humana obrigatória.
- Uma **plataforma compartilhada multi-tenant**, com segregação de dados e autorizações por imobiliária asseguradas no servidor, banco e armazenamento.

## Fluxo de status inicialmente proposto (ajustável no desenho técnico)
Criado → Aguardando documentos → Em processamento → Em revisão ↔ Com pendência → Concluído. Registrar mudanças e responsável. Possibilitar cancelamento.

## Fora do MVP
Análise de crédito; decisões jurídicas; aprovação autônoma de locação; assinatura digital; integrações com ERPs imobiliários; editor genérico de workflows; automação financeira; garantias locatícias complexas; aplicativo mobile nativo.

## Requisitos de segurança e privacidade a especificar
- Links com token aleatório não previsível, expiração, revogação e prevenção de exposição em prévias, logs e ferramentas analíticas.
- HTTPS, proteção contra abuso, arquivos privados, validação de uploads, segregação entre tenants e verificação de permissões backend; testes contra acesso transversal.
- Política de retenção/exclusão, transparência sobre tratamento e eventual envio a provedores de IA, base legal adequada, controles de acesso e registro de ações, observando LGPD.
- Dados usados em demonstrações devem ser fictícios/sintéticos; métricas de ganho devem ser medidas ou explicitamente simuladas.

## Em aberto — não interpretar como aprovado
- Provedor/modelo de IA e estratégia (API, próprio ou híbrido).
- Stack, hospedagem, banco, arquitetura de filas, autenticação, custos operacionais e preço.
- Política concreta de retenção e validade de links; limitações de formatos/tamanho e taxas de erro de IA.
- Plano de acompanhamento tecnológico, níveis de serviço, aquisição de clientes e projeção financeira 12 meses.
- Pesquisa com imobiliárias, concorrentes e evidência de viabilidade comercial em Santa Maria.

## Uso no pitch
Demonstrar um fluxo completo, de geração do link à conclusão supervisionada. Não prometer automação total, precisão perfeita, compliance certificado ou resultados financeiros não medidos.
