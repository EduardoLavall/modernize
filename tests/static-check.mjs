import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.cwd();
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const slides=read('slides.html');
const demo=read('demo.html');
const ids=[...slides.matchAll(/<section\b[^>]*\bid="slide-(\d+)"/g)].map(x=>Number(x[1]));
assert.deepEqual(ids,[1,2,3,4,5,6,7,8,9,10],'O pitch deve conter dez slides consecutivos');

for(const name of ['slides.html','demo.html','index.html']){
  const html=read(name);
  for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
    let target=match[1];
    if(!target||/^(?:https?:|mailto:|#|data:)/.test(target))continue;
    target=decodeURIComponent(target.split('?')[0].split('#')[0]);
    assert(fs.existsSync(path.join(root,target)),name+': arquivo ausente: '+target);
  }
}

for(const name of ['js/slides.js','js/demo.js','js/finance.js','sw.js']){
  new vm.Script(read(name),{filename:name});
}
for(const v of ['create-form','portal-content','details-content','tenant-select','reset-demo']){
  assert(demo.includes('id="'+v+'"'),'Componente da demo ausente: '+v);
}

const ctx=vm.createContext({window:{},Intl});
vm.runInContext(read('js/finance.js'),ctx);
const finance=ctx.window.ModernizeFinance;
for(const [key,n,rev,flow] of [
  ['pessimista',4,9571.75,-13013.94],
  ['base',8,22136.25,106.24],
  ['otimista',12,34367.86,10249.48]
]){
  const s=finance.compute(key);
  assert.equal(s.series.length,12);
  assert.equal(s.newClients,n);
  assert(Math.abs(s.revenue-rev)<0.01);
  assert(Math.abs(s.result-flow)<0.01);
}

const rootAssets=['assets/brand/Modernize logo.png','assets/brand/Glossy Red and Graphite M Logo.png'];
for(const f of rootAssets)assert(fs.existsSync(path.join(root,f)), 'Logo oficial ausente: '+f);
console.log('PASS: 10 slides, caminhos dos arquivos, sintaxe JS e três cenários financeiros.');
