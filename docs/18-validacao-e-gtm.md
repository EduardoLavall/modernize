# Protocolo de validação e plano go-to-market

**Status 15/10/2026:** instrumento de pesquisa e funil **planejados, não executados**. Evidência secundária geral não é validação do problema documental em imobiliárias.

## 1. Hipóteses e testes falsificáveis

| Hipótese | Teste proposto | Métrica e critério preliminar (H, não regra externa) | Decisão |
| --- | --- | --- | --- |
| H1: existe dor documental relevante | 5–10 entrevistas com responsáveis de imobiliárias, anônimas, sem dados pessoais de clientes | Pelo menos metade relata recorrência semanal + gargalo mensurável | Senão revisar segmento/fluxo |
| H2: o protótipo entrega benefício | Ensaio comparativo com fichas **sintéticas** e cronômetro, mesmo roteiro | Menor tempo com qualidade igual ou melhor; medir erros, p50/p90 e correções | Se erros graves, não automatizar |
| H3: existe disposição a pagar R$ 299 + R$ 990 | Proposta conceitual com escopo, limites, objeções documentadas | Pelo menos 2/10 solicitam proposta/piloto concreto (sinal exploratório, não venda) | Reavaliar precificação |
| H4: entrega financeiramente replicável | Medir minutos de onboarding, suporte, tokens e storage por 10 casos sintéticos | Contribuição positiva com custo de suporte realista | Reduzir escopo/reprecificar |
| H5: isolamento e privacidade são defensáveis | Testes negativos entre tenants e revisão de LGPD | Zero vazamento conhecido em testes controlados; revisão formal exigida na produção | Bloqueio produção se falha |

Não executar os testes com RG/CNH, CPF ou comprovantes reais sem base legal, acordos, necessidade e segurança adequada. Não inventar falas, percentuais, equipe ou dados.

### Roteiro de 8 perguntas não indutivas

1. Conte a última vez que recebeu documentos para uma nova locação; quais etapas ocorreram?
2. Quantos processos desse tipo surgiram nos últimos 30 dias?
3. Quanto tempo a equipe emprega até considerar o cadastro revisável?
4. Quais arquivos chegam com erro ou faltando? Como descobrem isso?
5. Que sistema usam hoje? Quais recursos já contratados resolvem a questão?
6. Qual impacto concreto se o processo demora ou falha?
7. Quem aprovaria uma ferramenta adicional? Que requisitos de segurança precisam ver?
8. O que teria de mudar para considerar um piloto pago e quanto tempo aceitaria investir na implantação?

## 2. Funil comercial sintético que explica oito vendas em 12 meses

**Apenas premissa para o plano**: 12 contatos B2B novos/mês × 30% viram reuniões × 20% dessas reuniões viram contratos = **0,72 contratos/mês em expectativa**, ou **8,64 em 12 meses**. Não são taxas pesquisadas; vendas efetivas inteiras, e a aquisição da planilha está concentrada em oito meses. Em cidade pequena, lista de contatos precisa ser obtida legalmente e evitar repetição abusiva.

**Estratégia de entrada proposta:** prospecção consultiva com responsáveis locais → roteiro de diagnóstico de 20 minutos → demonstração com dados fictícios → proposta de implantação com escopo → piloto contratual e mensuração → retenção por acompanhamento. Parcerias com associações e indicações são hipóteses. Documentar motivo de perda, ciclo de vendas e CAC.

**Exemplo justificado de CAC (H):** 8 horas totais de prospecção/reuniões/preparo por cliente × R$ 50/h = R$ 400 + R$ 150 em mídia/eventos + R$ 50 em transporte/ferramentas = **R$ 600 por novo cliente**. O tempo de pessoas já está incluso nessa composição, mas **não representa salário fixo completo da empresa**; não duplicar horas em outra linha sem explicar.

**Exemplo de custo direto de implantação (H):** 5 horas × R$ 50/h = **R$ 250 por nova imobiliária**, sujeito a medição. Treinamentos mais longos/deslocamentos alteram o custo.

**Exemplo de custo variável de mensalidade (H):** R$ 20 processamento/armazenamento/comunicação + R$ 20 de suporte por imobiliária/mês = R$ 40. É apenas teto/alocação preliminar: sem piloto, o custo do processamento por documento e volume contratual são desconhecidos.

## 3. Medidas corretas e métricas

- *Aquisição:* contatos, reuniões qualificadas, propostas, contratos; conversão e CAC por contrato.
- *Ativação:* primeiro link criado, primeiro conjunto documental recebido, primeiro cadastro revisado.
- *Entrega:* tempo de preparação manual versus assistida, campos corrigidos, taxa de falha, horas de suporte e custo por cadastro.
- *Retenção:* empresas ativas por coorte, churn com denominador correto, uso mensal, cancelamentos e razões.
- *Receita:* implantação recebida, MRR, inadimplência e ARPU por imobiliária; nunca por interessado.
- *Validação PMF:* **não há PMF demonstrado**; só avaliar retenção e questionário de valor após usuários reais.

## 4. Material para pitch SEM entrevistas

Exibir 1 dado secundário do Cetic.br como contexto geral, mostrar concorrentes existentes e declarar: “A existência do problema e do pagamento no nicho local ainda será testada com entrevistas e pilotos; todas as projeções são cenários.” Não afirmar “economizamos 70%”, “clientes aprovaram” ou “já vendemos oito assinaturas”.

## 5. Critérios de avanço após o pitch

**Implementar demo acadêmica agora:** permitido com dados fictícios, sem alegar demanda. **Implantar produto com dados reais:** somente após revisão de segurança e privacidade, teste funcional, contratos, retenção definida e custos documentados. **Escalar comercialmente:** só após mensurar adoção, retenção e ROI.
