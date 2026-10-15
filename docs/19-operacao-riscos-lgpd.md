# Plano operacional, LGPD, SWOT e riscos — Modernize IA

**Status: desenho acadêmico, não laudo de conformidade.** As políticas abaixo são critérios para implementação posterior.

## 1. Oferta operacional — implantação + acompanhamento

**Implantação por imobiliária (R$ 990, preço escolhido, não validado):**
1. reunião de escopo e definição do administrador da empresa;
2. configuração do tenant, usuários convidados e checklist documental básico;
3. demonstração do fluxo com documentos fictícios, treinamento de responsável e funcionário;
4. verificação do acesso, consentimentos/notificações aplicáveis, teste de recebimento sem documento real;
5. aceite formal da operação + plano de suporte.

**Mensalidade (R$ 299/empresa/mês, hipótese):** acesso ao produto no limite de uso pactuado, canal de suporte em horário comercial a definir, acompanhamento de utilização, correções e melhorias da plataforma, atualização do treinamento quando relevante. **Não** pressupõe implementação personalizada ilimitada, consultoria presencial permanente, disponibilidade 24/7 nem serviços de assinatura/score de crédito.

**Cadência sugerida para simulação:** onboarding 5 horas por empresa (estimativa para custo de implantação), análise mensal de indicadores agregados e revisão consultiva trimestral curta (custos adicionais precisam ser medidos e incluídos). Um gestor real deve aprovar SLA, quantidade de documentos e limites contratados.

## 2. Responsabilidades dos dados — proposta sujeita a parecer jurídico

Em regra hipotética, a **imobiliária** determina finalidades de coleta e atua como **controladora**; a Modernize processa dados conforme contrato/instruções e pode atuar como **operadora** no serviço, com eventuais tratamentos próprios sujeitos à análise distinta. Provedor de nuvem/IA pode ser **suboperador**, conforme arranjo contratual e papéis efetivos. Papel jurídico não decorre automaticamente do rótulo SaaS.

**Dado pessoal tratado:** identificação, endereço, renda e arquivos comprobatórios. Um arquivo pode conter dados sensíveis por acidente. Coletar apenas o mínimo, sem exigir documentos indiscriminadamente. A plataforma não deve pontuar “aprovação” da locação.

**Processos necessários antes de produção:**
- definir finalidade, base legal aplicável com assessoria jurídica, aviso de privacidade transparente, direitos do titular e contratos controladora-operadora/suboperadora;
- definir retenção e exclusão efetiva (inclusive backups e logs), canal de atendimento do titular, incident response, termos de acesso e mapa de transferências internacionais;
- registrar categorias de processamento de IA, necessidade de enviar dados para terceiros, configuração de não treinamento quando prevista contratualmente, localização/região de processamento, riscos e salvaguardas;
- mitigação: HTTPS, RBAC e isolamento entre tenants verificados no servidor, storage privado, expiração e revogação de links, hashing de tokens, varredura de upload, cifragem, controle de acesso mínimo, logs sem PII, revisões e testes;
- verificar possíveis tratamentos de dados de crianças/adolescentes em documentos de terceiros anexados; prevenir coleta desnecessária;
- plano de backup, restauração, continuidade e exclusão.

**Fontes normativas e oficiais:** [ANPD — guia de segurança para pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte); [ANPD — guia de agentes de tratamento](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-para-definicoes-dos-agentes-de-tratamento-de-dados-pessoais-e-do-encarregado); [Resolução ANPD 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022). Regime simplificado **não dispensa a LGPD**.

## 3. Matriz de risco qualitativo (P=probabilidade, I=impacto; estimativas internas)

| Risco | P | I | Controles mínimos | Evidência de aceite |
| --- | --- | --- | --- | --- |
| Vazamento entre imobiliárias (IDOR/RLS) | Média | Crítico | tenant_id em backend, políticas de DB/storage, testes negativos automatizados | Tentativas tenant A→B rejeitadas |
| Link de upload vazado | Alta | Alto | token escopado, expiração, revogação, sem dados na URL/logs | Link expirado/revogado rejeitado |
| Extração de IA errada/alucinação | Alta | Alto | esquema validado, origem e evidências por campo, conferência humana | Casos de erro provocados sinalizados |
| Envio inseguro a terceiro/IA | Média | Crítico | avaliação contratual, transparência, minimização e região de dados | Aprovação jurídica/técnica |
| Concorrente incluir mesma automação | Alta | Médio | segmentação, serviços, integrações após demanda, execução superior | Pesquisa de clientes/alternativas |
| CAC ou churn maiores que simulação | Alta | Alto | estudo de sensibilidade, caixa e coortes | Cenário pessimista suportado |
| Dependência de único fornecedor | Média | Médio | provider adapter, export de dados, testes de fallback | Substituição simulada documentada |
| Demanda local insuficiente | Alta | Crítico | entrevistas, piloto e alternativa de segmento/integração | Evidências primárias registradas |
| Equipe sub-remunerada | Alta | Crítico | explicitar pró-labore, precificar horas de suporte/implantação | Plano de custos completo |
| Apresentação sem internet | Média | Médio | slides e demo offline sintética, assets locais | Execução com rede desligada |

## 4. SWOT/FOFA — hipóteses estratégicas, não fatos de mercado comprovados

| Forças internas | Fraquezas internas |
| --- | --- |
| Escopo de MVP focalizado; implantação assistida; produto híbrido com potencial de melhoria | Sem produto real, sem clientes, sem histórico de precisão/ROI; equipe, tempo e capital ainda indefinidos |

| Oportunidades externas | Ameaças externas |
| --- | --- |
| Diferença agregada de adoção de IA entre pequenas e grandes empresas; demanda potencial por integração de processos | ERPs incumbentes oferecem gestão documental/atendimento; mudanças de preços/termos de IA; risco LGPD e confiança |

**Estratégia derivada:** medir uma dor específica e um fluxo sintético antes de ampliar funcionalidades; operar com custo variável controlado; diferenciar-se por acompanhamento e clareza do processo, não por exclusividade tecnológica.

## 5. Equipe, cronograma e marcos de decisão

O PDF exige equipe de **3–5 integrantes**. Não há nomes nem disponibilidade confirmados; atribuir **papéis propostos**, sem inventar integrantes:
- produto/pesquisa (validação, requisitos, narrativa);
- engenharia/segurança (arquitetura, isolamento, MVP);
- comercial/finanças (CAC, concorrência, fluxo de caixa);
- design/pitch/QA (UI, ensaio, publicação).
Os papéis podem ser acumulados pela equipe real. Registrar nomes antes da apresentação.

**Backlog:** (1) documentos/validação sintética → (2) protótipo do fluxo → (3) testes/QA → (4) slides e ensaio → (5) pesquisa primária e produção real apenas quando aprovada.

## 6. Critério de não lançamento real

Não coletar RG/CNH ou comprovantes de pessoas reais com a demo. Não habilitar Google OAuth em produção, uploads reais ou API de IA sobre documentos de clientes sem avaliações de privacidade, autorização, arquitetura implementada e teste de isolamento. Slides e protótipo sintético não equivalem a plataforma certificada.
