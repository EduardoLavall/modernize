import fs from 'node:fs';import vm from 'node:vm';import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(p,'utf8'),html=read('slides.html');
const count=(html.match(/<section\s+class="slide\b/g)||[]).length;
if(count!==10)throw Error('Pitch precisa ter 10 slides, encontrou '+count);
const ids=[...html.matchAll(/\bid="(slide-\d+)"/g)].map(x=>x[1]);
if(ids.length!==10||ids.some((x,i)=>x!=='slide-'+(i+1)))throw Error('IDs slides inconsistentes');
execFileSync('node',['landing/sync-home.mjs','--check']);
for(const f of ['index.html','landing/index.html']){
 const marketing=read(f).toLowerCase();
 for(const forbidden of ['slides.html','github.com','ver apresentação','projeto em desenvolvimento','protótipo acadêmico']){
  if(marketing.includes(forbidden))throw Error('Landing institucional menciona '+forbidden+' em '+f);
 }
 if((marketing.match(/href="[^"]*demo\.html"/g)||[]).length!==1)throw Error('Landing deve mencionar demo uma só vez: '+f);
}
for(const f of ['js/finance.js','js/slides.js','js/demo.js','js/team.js','landing/main.js'])execFileSync('node',['--check',f]);
if(!html.includes('Glossy%20Red%20and%20Graphite%20M%20Logo.png'))throw Error('Logo oficial ausente');
if(!read('demo.html').includes('AMBIENTE DE DEMONSTRAÇÃO'))throw Error('Aviso fictício ausente');
const context={window:{},Intl,Number};vm.runInNewContext(read('js/finance.js'),context);
const totals={pessimista:[9571.75,22585.69,-13013.94],base:[22136.25,22030.02,106.24],otimista:[34367.86,24118.38,10249.48]};
for(const [scenario,expected] of Object.entries(totals)){
 const v=context.window.ModernizeFinance.compute(scenario);
 for(const [i,k] of ['revenue','expenses','result'].entries())if(Math.abs(v[k]-expected[i])>0.06)throw Error(scenario+' '+k+': '+v[k]);
 const remunerado=context.window.ModernizeFinance.compute(scenario,true);
 if(Math.abs(remunerado.result-(v.result-30000))>0.06)throw Error('Custo extra equipe incorreto '+scenario);
 if(v.series.length!==12)throw Error('Mês inválido '+scenario);
}
if(!html.includes('O QUE A MODERNIZE ENTREGA')||!html.includes('Diagnóstico e consultoria')||!html.includes('Acompanhamento contínuo'))throw Error('Proposta da empresa ausente dos slides');
if(!html.includes('PRIMEIRO PRODUTO · MODERNIZE IA'))throw Error('Produto não está identificado como parte da Modernize');
if(!html.includes('DEMAIS SERVIÇOS DA EMPRESA'))throw Error('Preços não distinguem a primeira oferta e demais serviços');
if(!read('demo.html').includes('href="slides.html#slide-7"'))throw Error('Retorno da demo não acompanha reordenação');
if(!html.includes('SIMULAÇÃO, NÃO PESQUISA LOCAL'))throw Error('TAM sem aviso explícito');
if(!html.includes('finance-include-team'))throw Error('Cenário de equipe não interativo');
if(!html.includes('id="finance-include-team" type="checkbox" checked') || !html.includes('id="finance-revenue">R$ 68.136') || !html.includes('id="finance-expenses">R$ 65.830') || !html.includes('id="finance-result">+ R$ 2.306'))throw Error('Valores iniciais não correspondem ao cenário-base combinado');
if(!html.includes('Receita acumulada — não é lucro'))throw Error('Legenda do gráfico deve informar receita acumulada, não lucro');
if(!read('js/slides.js').includes("stroke:'#4ade80'") || !read('css/slides.css').includes('background:#4ade80'))throw Error('Gráfico do pitch deve usar a paleta verde');
if(!read('js/slides.js').includes('month.cumulativeRevenue') || read('js/slides.js').includes('s.series.map(x=>x.cash)'))throw Error('Gráfico ainda usa saldo de caixa em vez de receita acumulada');
const expectedCompany={pessimista:[23571.75,56785.69,-33213.94,4,2],base:[68136.25,65830.02,2306.24,12,7],otimista:[109367.86,76618.38,32749.48,18,12]};
for(const [scenario,expected] of Object.entries(expectedCompany)){
 const s=context.window.ModernizeFinance.computeCompany(scenario,true);
 for(const [i,k] of ['revenue','expenses','result'].entries())if(Math.abs(s[k]-expected[i])>0.07)throw Error('Projeção combinada '+scenario+' '+k+': '+s[k]);
 if(s.services.workshops!==expected[3] || s.services.projects!==expected[4])throw Error('Metas comerciais '+scenario);
 if(s.series.length!==12 || s.series.some((m,i)=>i>0 && m.cumulativeRevenue+0.001<s.series[i-1].cumulativeRevenue))throw Error('A receita acumulada deve ser crescente: '+scenario);
 if(Math.abs(s.series.at(-1).cumulativeRevenue-s.revenue)>0.01)throw Error('Receita acumulada não fecha o ano '+scenario);
 if(Math.abs(s.lastCash-(3000+s.result))>0.01)throw Error('Caixa e resultado inconsistentes '+scenario);
}
if(!html.includes('Incluir remuneração parcial de R$ 2.500/mês') || !html.includes('id="finance-warning"') || !html.includes('viewBox="0 0 650 240"'))throw Error('Aviso de viabilidade ou gráfico compacto ausente');
for(const p of ['assets/brand/Modernize logo.png','assets/brand/Glossy Red and Graphite M Logo.png'])if(!fs.existsSync(p))throw Error('Falta logo '+p);
console.log('OK: 10 slides, sintaxe JS, três cenários e logos');