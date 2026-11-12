// Monta exatamente o artefato publicado em GitHub Pages.
// slides-live.html e seus assets têm CAMINHOS novos para escapar do cache-first
// do Service Worker antigo, inclusive com ignoreSearch:true.
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(), out=path.join(root,'_site');
const copy=(source,target)=>{
  const from=path.join(root,source),to=path.join(out,target);
  if(!fs.existsSync(from)) throw new Error('Arquivo de publicação ausente: '+source);
  fs.mkdirSync(path.dirname(to),{recursive:true});
  fs.cpSync(from,to,{recursive:fs.statSync(from).isDirectory()});
};
fs.rmSync(out,{recursive:true,force:true});
for(const file of ['index.html','slides.html','demo.html','sw.js'])copy(file,file);
for(const file of ['app.css','slides.css','demo.css'])copy('css/'+file,'css/'+file);
for(const file of ['finance.js','slides.js','demo.js','team.js'])copy('js/'+file,'js/'+file);
for(const file of ['Modernize logo.png','Glossy Red and Graphite M Logo.png'])
  copy('assets/brand/'+file,'assets/brand/'+file);
for(const file of ['index.html','styles.css','main.js','vercel.json'])
  copy('landing/'+file,'landing/'+file);
copy('landing/assets','landing/assets');

// Rota de resgate da versão atual: os nomes novos não constam no cache v4/v5.
copy('css/slides.css','css/slides-live.css');
copy('js/finance.js','js/finance-live.js');
copy('js/slides.js','js/slides-live.js');
let html=fs.readFileSync(path.join(root,'slides.html'),'utf8');
const transforms=[
  ['href="css/slides.css"','href="css/slides-live.css"'],
  ['src="js/finance.js"','src="js/finance-live.js"'],
  ['src="js/slides.js"','src="js/slides-live.js"']
];
for(const [from,to] of transforms){
  if(!html.includes(from))throw new Error('Referência esperada ausente em slides.html: '+from);
  html=html.replace(from,to);
}
// A página de resgate deixa de registrar SW e retira os registros antigos
// quando aberta, garantindo que a próxima navegação busque diretamente a rede.
const marker='<script>if (\'serviceWorker\' in navigator && [\'https:\', \'http:\'].includes(location.protocol)) window.addEventListener(\'load\',()=>navigator.serviceWorker.register(\'./sw.js\').catch(()=>{}));</script>';
if(!html.includes(marker))throw new Error('Registro de SW não encontrado em slides.html');
html=html.replace(marker,`<script>
// Este pitch remove registros antigos do próprio projeto. Não remove SWs de outros sites.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    for (const reg of regs) {
      if (new URL(reg.scope).pathname.startsWith('/modernize/')) reg.unregister().catch(() => {});
    }
  }).catch(() => {});
}
</script>`);
if(!html.includes('RECEITA ACUMULADA PROJETADA'))throw new Error('Slide 9 atual não foi incluído no build!');
if(!html.includes('src="js/slides-live.js"'))throw new Error('Scripts da rota de resgate não versionados!');
fs.writeFileSync(path.join(out,'slides-live.html'),html);
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('GitHub Pages: pronto _site/ e slides-live.html com JS/CSS sem cache antigo');
