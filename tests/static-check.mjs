import fs from 'node:fs';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const read = path => fs.readFileSync(path, 'utf8');
const html = read('slides.html');
const css = read('css/slides.css');
const count = (html.match(/<section class="slide\b/g) || []).length;
if (count !== 10) throw Error('Pitch comercial precisa ter 10 slides, encontrou ' + count);
const ids = [...html.matchAll(/\bid="(slide-\d+)"/g)].map(m => m[1]);
if (ids.length !== 10 || ids.some((id, i) => id !== 'slide-' + (i + 1))) throw Error('IDs do pitch inconsistentes');
if ((html.match(/<h1\b/g) || []).length !== 1) throw Error('Pitch deve ter um único h1');
for (let i = 1; i <= 10; i++) {
  if (!html.includes(`id="s${i}-title"`)) throw Error('Slide sem título acessível: ' + i);
}
const required = [
  'O futuro do seu negócio', 'Sua equipe foi contratada para', 'Em modo inteligente',
  'Diagnóstico inteligente', 'IA aplicada ao negócio', 'IA ONDE O TRABALHO ACONTECE',
  'Sua equipe lidera', 'Com método', 'POR QUE A MODERNIZE?',
  'Sua empresa pode continuar como está.'
];
for (const piece of required) if (!html.includes(piece)) throw Error('Mensagem comercial ausente: ' + piece);
for (const forbidden of ['TAM / SAM', 'PostgreSQL', 'R$ 990', 'R$ 299', 'RECEITA ACUMULADA PROJETADA', 'Nome a confirmar', 'DEMO ACADÊMICA']) {
  if (html.includes(forbidden)) throw Error('Conteúdo acadêmico ou técnico vazou para o pitch comercial: ' + forbidden);
}
if (!html.includes('https://eduardolavall.github.io/modernize/#servicos')) throw Error('CTA final precisa apontar para soluções');
if (!html.includes('Exemplos ilustrativos de soluções possíveis')) throw Error('Cautela comercial sobre exemplos está ausente');
if (!css.includes('@media print') || !css.includes('13.333in 7.5in')) throw Error('Exportação 16:9 ausente');
if (!read('js/slides.js').includes('window.ModernizeSlides')) throw Error('API de navegação não encontrada');
if (html.includes('js/finance.js') || html.includes('js/team.js')) throw Error('Pitch comercial não deve carregar scripts acadêmicos');
for (const file of ['js/finance.js', 'js/slides.js', 'js/demo.js', 'landing/main.js', 'scripts/build-pages.mjs']) {
  execFileSync('node', ['--check', file]);
}
execFileSync('node', ['landing/sync-home.mjs', '--check']);
for (const file of ['index.html', 'landing/index.html']) {
  const landing = read(file).toLowerCase();
  for (const forbidden of ['slides.html', 'github.com', 'ver apresentação', 'projeto em desenvolvimento', 'protótipo acadêmico']) {
    if (landing.includes(forbidden)) throw Error('Landing expõe material de bastidores: ' + file + ': ' + forbidden);
  }
  if ((landing.match(/href="[^"]*demo\.html"/g) || []).length !== 1) throw Error('Landing deve ter apenas um link para a demo: ' + file);
}
if (!read('demo.html').includes('AMBIENTE DE DEMONSTRAÇÃO')) throw Error('Aviso da demo sintética ausente');
if (!read('sw.js').includes('modernize-online-v6')) throw Error('Service Worker legado não foi tratado');
if (!read('scripts/build-pages.mjs').includes('slides-live.html')) throw Error('Build não possui rota de resgate');
for (const file of ['assets/brand/Modernize logo.png', 'assets/brand/Glossy Red and Graphite M Logo.png']) {
  if (!fs.existsSync(file)) throw Error('Falta logo: ' + file);
}

// As projeções acadêmicas seguem auditáveis, mas NÃO são parte do pitch de vendas.
const sandbox = { window: {}, Intl, Number };
vm.runInNewContext(read('js/finance.js'), sandbox);
const finance = sandbox.window.ModernizeFinance;
for (const [key, [product, combined]] of Object.entries({
  pessimista: [-13013.94, -33213.94],
  base: [106.24, 2306.24],
  otimista: [10249.48, 32749.48]
})) {
  const p = finance.compute(key);
  const c = finance.computeCompany(key, true);
  if (Math.abs(p.result - product) > .09) throw Error('Projeção histórica do produto alterada: ' + key);
  if (Math.abs(c.result - combined) > .09) throw Error('Projeção histórica da empresa alterada: ' + key);
}
console.log('OK: pitch comercial (10 slides), CTA, PDF 16:9, landing, demo e finanças históricas');
