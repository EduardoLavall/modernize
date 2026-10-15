# Mercado, personas, concorrência e dimensionamento

**Pesquisa secundária: 15/10/2026.** A escolha de imobiliárias é [D]; tamanho do segmento e disposição a pagar são [P]. Não confundir população municipal com número de clientes empresariais.

## 1. Delimitação comercial e personas

- **Cliente/contratante/pagante:** pessoa jurídica imobiliária, representada por proprietário/gestor (decisor e responsável pelo orçamento).
- **Usuário autenticado:** administrador e funcionário da imobiliária. Google identifica usuário, mas autorização depende da empresa vinculada.
- **Interessado em locação:** usuário externo que envia documentos em link individual **sem login**; não paga à Modernize.
- **Segmentação escolhida:** pequenas e médias imobiliárias com fluxo mensal de análise documental, primeiro em Santa Maria, RS. A frequência de cadastros ainda não é conhecida.

### Job-to-be-done — hipótese observável

“Quando chegam documentos de um interessado em locação, preciso centralizar arquivos, verificar se faltam informações e preparar uma ficha revisável, sem perder o histórico ou expor dados a pessoas não autorizadas.”

**Hipóteses não demonstradas:** cadastros são demorados; custo da tarefa é relevante; volume mensal basta para ROI; gestores aceitariam R$ 990 + R$ 299; não existe módulo já contratado que resolva o fluxo.

## 2. Evidências verificadas e limites

| Fonte | Achado sustentado | Limite |
| --- | --- | --- |
| [Cetic.br TIC Empresas 2025](https://cetic.br/pt/noticia/uso-de-inteligencia-artificial-por-empresas-brasileiras-avanca-e-atinge-17-aponta-pesquisa-do-cetic-br/) | IA utilizada por 17% das empresas da pesquisa; 15% das pequenas (10–49 pessoas) e 50% das grandes; publicado jun/2026 | Empresas com 10+ ocupados; não mede imobiliárias ou Santa Maria |
| [OCDE — AI adoption by SMEs (2025)](https://www.oecd.org/en/publications/ai-adoption-by-small-and-medium-sized-enterprises_426399c1-en.html) | Relata barreiras de conhecimentos e competências para uso de IA em PMEs | Pesquisa internacional, não valida preço ou demanda municipal |
| [IBGE — Santa Maria, RS](https://www.ibge.gov.br/cidades-e-estados/rs/santa-maria.html) | Estimativa de **282.397 habitantes em 2026**, contexto geográfico | População **não é TAM de imobiliárias** |
| [CRECI-RS — notícia histórica sobre 9ª sub-região](https://www.creci-rs.gov.br/siteNovo/noticiasDetalhes.php?noticia=2255) | Notícia informa **115 imobiliárias registradas em Santa Maria**, **na ocasião** relatada, sem data anual inequívoca no trecho consultado | **Não usar como cadastro atualizado de 2026** ou número conclusivo de TAM; solicitar total corrente ao órgão |

## 3. Concorrência — evidência de funções, sem teste de paridade

| Concorrente/alternativa | Evidência pública | O que significa |
| --- | --- | --- |
| **Kenlo Imob** | [Ficha de cliente interessado, dados, arquivos e atendimento](https://fresh.kenlo.com.br/support/solutions/articles/156000020527-%E2%97%BE-imob-como-cadastrar-um-cliente-interessado-) | Cadastros/documentos já existem no mercado. Integração é potencial; diferenciação Modernize **não comprovada**. |
| **Kenlo — Esteira Digital** | [Atendimento e pendências](https://fresh.kenlo.com.br/support/solutions/articles/156000020815-imob-ficha-de-atendimento) | Esteiras/histórico também existem, não são inovação exclusiva. |
| **Superlógica Imobiliárias** | [Cadastro de contrato com inquilino](https://imobiliarias.superlogica.com/hc/pt-br/articles/40409180280983-Como-criar-contrato-de-loca%C3%A7%C3%A3o); [anexos/documentos](https://imobiliarias.superlogica.com/hc/pt-br/articles/360033535454-Como-realizar-Anexo-de-documentos-no-cadastro-de-im%C3%B3veis) | ERP abrange várias rotinas; avaliar se o comprador aceita pagar outra plataforma. |
| **Alternativa manual** | E-mail, WhatsApp, planilhas e pastas: hipótese de processo, **não pesquisa de campo** | Concorrente econômico é o processo atual; testar custo de mudança. |
| **Serviços sob demanda** | Assistentes administrativos/consultores: categoria, não fornecedor comparado | Avaliar custo e disponibilidade; não assumir que a IA sempre vence. |

**Posicionamento proposto [H]:** etapa estreita de recebimento + extração + pendências + revisão humana **com implantação e capacitação assistida**. A concorrência pode desenvolver o mesmo recurso; benefício defendível depende de UX, confiabilidade, integração e suporte, não de “IA proprietária”.

**Preços de concorrentes:** não há tabela com serviços rigorosamente equivalentes e preços verificados nesta versão. Não afirmar que Modernize é mais barata.

## 4. TAM/SAM/SOM — procedimento e teste de sensibilidade

- **TAM (empresas):** todas as imobiliárias juridicamente ativas no mercado geográfico definido que poderiam demandar o módulo. Precisamos de **contagem verificável** por município e data (CRECI-RS/cadastro CNPJ/CNAE), descontando duplicatas e escritórios inativos.
- **SAM:** fração operacional do TAM com documentação digital, volume suficiente, orçamento e compatibilidade com a oferta, dentro da capacidade geográfica/comercial.
- **SOM de 12 meses:** imobiliárias efetivamente adquiríveis conforme funil, capacidade de implantação e concorrência. **Meta decidida = 8 novas empresas, não 8 já conquistadas**.
- **Faturamento teórico anual de mercado** depende de número de empresas, preço e permanência. Não multiplicar oito vendas por doze meses como se todas fossem ativas desde janeiro.

### Ilustração estritamente hipotética — NÃO são contagens locais

| TAM sintético | SAM (60% do TAM, hipótese) | SOM 8 / SAM |
| ---: | ---: | ---: |
| 80 imobiliárias | 48 | 16,7% |
| 120 imobiliárias | 72 | 11,1% |
| 160 imobiliárias | 96 | 8,3% |

O teste é útil para demonstrar que a meta de oito contratos pode representar **uma fatia elevada** de um mercado municipal pequeno. Somente usar em pitch com selo **“simulação”**; preferir TAM/SAM “em apuração” se não obtivermos base local auditável.

## 5. Fonte necessária para fechar TAM/SAM factual

Solicitar ao CRECI-RS **imobiliárias/pessoas jurídicas com registro ativo especificamente em Santa Maria na data da consulta**, distinção matriz/filial; confrontar com fonte de CNPJs ativos, data e CNAE. Registrar lista sem dados pessoais e evitar publicar credenciais de profissionais. Para SAM, aplicar critérios em amostra estruturada de empresas (não supor 60% real).

## 6. Hipótese de mercado falsificável

Para seguir ao lançamento comercial, investigar 5–10 imobiliárias reais com consentimento e anotações agregadas: volume de cadastros mensais, tempo por cadastro, ferramentas/contratos já pagos, objeções à segurança, ROI e intenção real de piloto. Se pouco volume ou ERPs incumbentes já resolverem, **pivotar para integração com os sistemas existentes ou ampliar o fluxo**, não maquiar a pesquisa.
