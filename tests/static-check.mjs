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
for(const p of ['assets/brand/Modernize logo.png','assets/brand/Glossy Red and Graphite M Logo.png'])if(!fs.existsSync(p))throw Error('Falta logo '+p);
console.log('OK: 10 slides, sintaxe JS, três cenários e logos');