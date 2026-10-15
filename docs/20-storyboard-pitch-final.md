# Storyboard de 10 slides — pitch presencial Modernize

**Fonte de requisitos:** Plano de Negócios.pdf, pp.3–4. **Duração alvo:** 4m50s (290 s). **Material visual e dados sintéticos**; slides web HTML/CSS/JS, até 10 quadros, offline sempre que possível, protótipo navegável vinculado. **Status:** conteúdo editorial pronto; montagem e ensaio pendentes.

| # | Tempo | Título/hook | Evidência e mensagem obrigatória | Visual/interação |
| --- | ---: | --- | --- | --- |
| 1 | 15s | Modernize: modernização que continua | Marca e tese da empresa, sem dizer que é empresa operando | Logotipo oficial; abertura limpa |
| 2 | 25s | A tarefa invisível | Hipótese de etapas manuais no cadastro de locação, nunca “dados medidos” | Fluxo antes: documentos dispersos→digitação→pendências |
| 3 | 25s | Primeiro mercado, problema a testar | Quem paga: imobiliária; quem usa: equipe e interessado; Cetic.br 15% pequenas vs 50% grandes **não é dado setorial**; TAM local em apuração | Comparação de papéis + fonte/denominador |
| 4 | 25s | A solução, sem aprovar pessoas | Link → uploads → IA extrai e sinaliza → humano revisa | Fluxograma e limites de IA |
| 5 | 60s | Demonstração: um cadastro completo | Prova de conceito **sintética/offline**, não IA nem cliente real | **Botão Abrir demo**; abrir caso preconfigurado, anexar documentos fictícios, pendência, revisão e concluir |
| 6 | 20s | Não somos o único sistema imobiliário | Kenlo/Superlógica já gerenciam cadastros; diferencial proposto: implantação + treinamento + acompanhamento | Mini matriz com fontes, sem afirmar superioridade comprovada |
| 7 | 25s | Como entra dinheiro | R$ 990 implantação **por imobiliária**, R$ 299 **por imobiliária/mês**; 8 novas empresas **meta hipotética** | Receita recorrente vs pontual |
| 8 | 30s | Como funciona com responsabilidade | Arquitetura multi-tenant, Google para equipe, links controlados, PostgreSQL, IA com revisão humana, LGPD como plano | Diagrama técnico com legendas |
| 9 | 40s | Números que precisamos encarar | Base 12 meses: entradas ~R$ 22,1 mil, saídas ~R$ 22,0 mil, fluxo ~R$ 106, exclui pró-labore integral; mostrar pessimista/base/otimista, CAC/churn e risco | Gráfico 3 cenários com avisos; números da planilha |
| 10 | 25s | Equipe e próximo passo / pedido | Funções dos integrantes **a preencher**; pedido **simulado** por pilotos/mentoria e validação, eventual capital com cálculo e ressalvas | Fechamento e próximos marcos, QR opcional |

**Soma:** 15+25+25+25+60+20+25+30+40+25 = **290 s = 4 min 50 s**. A demo deve levar no máximo um minuto e existir atalho “Voltar ao slide 6”.

## Script falado — versão resumida para ensaio (não decorar literalmente)

1. “A Modernize propõe modernização tecnológica contínua: entender, ensinar, implementar e acompanhar.”
2. “Em uma locação, documentos podem chegar espalhados; nossa hipótese é que isso consome tempo e gera retrabalho.”
3. “Começaremos pelas imobiliárias de Santa Maria. A pesquisa nacional sinaliza diferença na adoção de IA por porte, mas ainda precisamos validar a dor local.”
4. “Modernize IA recebe documentação por link, extrai e aponta pendências. Nenhuma aprovação de locatário é automática.”
5. “Nesta demonstração com dados totalmente fictícios, vemos a solicitação criada, a documentação chegando, um alerta gerado e a correção por um funcionário.”
6. “Kenlo e Superlógica já fazem gestão imobiliária. Nossa proposta é aprofundar um fluxo com acompanhamento tecnológico e treinamento, ainda não validados como diferencial.”
7. “Cobramos uma implantação planejada de R$ 990 e uma mensalidade hipotética de R$ 299 pela imobiliária inteira, não por locatário.”
8. “A plataforma real planejada separa dados de empresas, protege arquivos, usa login Google da equipe e exige revisão humana.”
9. “Nossos oito novos clientes são meta, não tração. A planilha aponta somente R$ 106 de fluxo positivo no primeiro ano sem pró-labore integral; é um risco a resolver, não um sucesso comercial.”
10. “Aqui estão os integrantes e papéis reais [preencher]. Nosso próximo passo é testar o problema com imobiliárias e provar custo/benefício. Buscamos pilotos e avaliação técnica; o investimento seria dimensionado após validação.”

## Critérios visuais

Paleta aprovada: grafite #1F232B, vermelho #B4232F, vinho #7E1E29, marfim #F5F1EE, cinza quente #B8B1AC, azul tecnologia #8FA8C1. Usar os PNGs oficiais de `assets/brand/`, sem redesenhá-los. Proposta Outfit + Inter com fontes licenciadas/legíveis. **Não copiar o pixel art do GranaXP.** Contraste alto e texto grande para projetor 1366×768; evitar mais de um gráfico principal por slide.

## Interações com propósito

- Slide 2 transforma processo manual em fluxo.
- Slide 4 destaca as etapas de IA + intervenção humana.
- Slide 5 abre a demo (retornar para slide 6 sem perder estado).
- Slide 9 alterna pessimista/base/otimista e explica impacto do churn/CAC sem inventar projeções.
- `← →`, Espaço, Home/End, visão geral, F fullscreen, contador, exportação quando estável; suporte a `prefers-reduced-motion`.

## Evidências e ressalvas visíveis

- Número do Cetic.br com **2025**, amostra (empresas 10+ ocupados) e link https://cetic.br/pt/noticia/uso-de-inteligencia-artificial-por-empresas-brasileiras-avanca-e-atinge-17-aponta-pesquisa-do-cetic-br/.
- Mostrar legenda **“hipótese/simulação acadêmica”** junto aos números financeiros e “demonstração com dados fictícios” na demo.
- Se equipe real, TAM local ou testes não estiverem disponíveis, apresentar como pendência, **não esconder no pitch**.

## Perguntas prováveis da banca (respostas honestas)

**“Já validaram o problema?”** Não; há evidência secundária de adoção de IA em empresas, mas o fluxo documental local precisa de entrevistas e pilotos.

**“Por que pagariam se existem ERPs?”** Precisamos comprovar ganho no processo e na implantação acompanhada. Competimos com sistemas e processos existentes.

**“R$ 299 não é caro?”** É por imobiliária, não por locatário. O preço só se justifica com volume e benefício medido; permanece hipótese.

**“É rentável?”** No cenário-base simplificado quase empata, mas não paga pró-labore completo; nosso diagnóstico é condicional e inclui risco de caixa.

**“O protótipo é seguro para RG?”** Não. A demo não aceita documentos reais nem implementa todos os controles. Produção depende de avaliação LGPD e testes de segurança.

**“Por que oito clientes?”** Meta acadêmica e ritmo comercial ilustrativo, não contratos; medir funil real.
