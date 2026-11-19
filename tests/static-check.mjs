import fs from 'node:fs';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const read = path => fs.readFileSync(path, 'utf8');
const html = read('slides.html');
const css = read('css/slides.css');
const slides = [...html.matchAll(/<section class="slide\b[\s\S]*?<\/section>/g)].map(m => m[0]);

if (slides.length !== 10) throw Error('O professor limita o pitch a dez slides.');
const ids = [...html.matchAll(/\bid="(slide-\d+)"/g)].map(m => m[1]);
if (ids.length !== 10 || ids.some((id, i) => id !== 'slide-' + (i + 1))) throw Error('IDs dos slides inválidos');
if ((html.match(/<h1\b/g) || []).length !== 1) throw Error('Deve haver um único h1');
for (const [i, slide] of slides.entries()) {
  if (!slide.includes(`id="s${i + 1}-title"`)) throw Error('Slide sem título acessível: ' + (i+1));
  const visibleText = slide.replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
  const words = visibleText.split(/\s+/).length;
  if (words > 62) throw Error(`Slide ${i+1} excessivamente textual: ${words} palavras`);
}
const mustHave = [
  'Em modo inteligente.', 'continuar no manual?', 'IA útil.', 'TAM · POTENCIAL',
  'SAM · ATENDÍVEIS', 'SOM · META', 'SIMULAÇÃO DIDÁTICA', 'DADOS FICTÍCIOS',
  'VALORES SIMULADOS', 'MANUAL', 'IA + HUMANO', '−65%', '−70%', 'TypeScript', 'Node.js', 'PostgreSQL', 'Revisão humana',
  'R$ 990', 'R$ 299', 'R$ 1.500', 'R$ 4.000',
  'R$ 68,1 mil', 'R$ 65,8 mil', '+ R$ 2,3 mil', '3,4%',
  'CLIENTES COMPROVADOS', 'INTEGRANTES PREVISTOS', 'EMPRESAS PILOTO',
  'MENTORIA', 'VALIDAÇÃO'
];
for (const piece of mustHave) if (!html.includes(piece)) throw Error('Critério/prova do pitch ausente: ' + piece);
for (const caution of ['TAM/SAM NÃO VERIFICADOS', 'SEM IA REAL', 'ainda não implementada', 'sem contratos ou vendas confirmadas', 'ainda precisam ser inseridos']) {
  if (!html.includes(caution)) throw Error('Ressalva factual ausente: ' + caution);
}
// Comparativo: valores derivados de hipóteses declaradas, não de medições.
const comparison = slides[4];
const assumption = name => {
  const found = comparison.match(new RegExp(`data-${name}="([0-9.]+)"`));
  if (!found) throw Error('Premissa ausente: ' + name);
  return Number(found[1]);
};
const manualMinutes = assumption('manual-minutes');
const aiMinutes = assumption('ai-minutes');
const reviewMinutes = assumption('review-minutes');
const hourlyBRL = assumption('hourly-cost-brl');
const aiCaseBRL = assumption('ai-cost-brl');
const assistedMinutes = aiMinutes + reviewMinutes;
const manualBRL = manualMinutes / 60 * hourlyBRL;
const assistedBRL = reviewMinutes / 60 * hourlyBRL + aiCaseBRL;
const percentTime = Math.round((1 - assistedMinutes / manualMinutes) * 100);
const percentCost = Math.round((1 - assistedBRL / manualBRL) * 100);
for (const label of [
  `${manualMinutes}<small>min</small>`, `${assistedMinutes}<small>min</small>`,
  `R$ ${manualBRL.toFixed(0)}`, `R$ ${assistedBRL.toFixed(0)}`,
  `−${percentTime}%`, `−${percentCost}%`,
  'SEM IMPLANTAÇÃO', 'SEM IA REAL', '5min REVISÃO'
]) {
  if (!comparison.includes(label)) throw Error('Valor ou ressalva incorreto: ' + label);
}
if (manualMinutes !== 20 || assistedMinutes !== 7 || manualBRL !== 10 || assistedBRL !== 3) {
  throw Error('Premissas alteradas sem atualizar o cenário');
}

if (!html.includes('href="demo.html?from=slides"')) throw Error('Falta link da demonstração');
if (!html.includes('https://eduardolavall.github.io/modernize/#servicos')) throw Error('Falta chamada comercial');
if (!css.includes('@media print') || !css.includes('13.333in 7.5in')) throw Error('PDF 16:9 não configurado');
if (!css.includes('vis-finance') || !css.includes('vis-market')) throw Error('Visualizações do pitch ausentes');
if (!read('js/slides.js').includes('window.ModernizeSlides')) throw Error('API de navegação ausente');
if (html.includes('js/finance.js') || html.includes('js/team.js')) throw Error('Scripts do relatório não devem pesar no pitch');
for (const file of ['js/finance.js', 'js/slides.js', 'js/demo.js', 'landing/main.js', 'scripts/build-pages.mjs']) {
  execFileSync('node', ['--check', file]);
}
execFileSync('node', ['landing/sync-home.mjs', '--check']);
for (const file of ['index.html', 'landing/index.html']) {
  const landing = read(file).toLowerCase();
  for (const forbidden of ['slides.html', 'github.com', 'ver apresentação', 'projeto em desenvolvimento', 'protótipo acadêmico']) {
    if (landing.includes(forbidden)) throw Error('Landing inclui bastidores: ' + file + ' / ' + forbidden);
  }
  if ((landing.match(/href="[^"]*demo\.html"/g) || []).length !== 1) throw Error('Landing precisa manter link único para demo');
}
if (!read('demo.html').includes('AMBIENTE DE DEMONSTRAÇÃO')) throw Error('Demo sem aviso de dados sintéticos');
if (!read('sw.js').includes('modernize-online-v6')) throw Error('Cache legado não tratado');
if (!read('scripts/build-pages.mjs').includes('slides-live.html')) throw Error('Falta rota sem cache legado');
for (const f of ['assets/brand/Modernize logo.png', 'assets/brand/Glossy Red and Graphite M Logo.png']) {
  if (!fs.existsSync(f)) throw Error('Logo ausente: ' + f);
}
const sandbox = { window: {}, Intl, Number };
vm.runInNewContext(read('js/finance.js'), sandbox);
const finance = sandbox.window.ModernizeFinance;
for (const [key, [product, combined]] of Object.entries({
  pessimista: [-13013.94, -33213.94],
  base: [106.24, 2306.24],
  otimista: [10249.48, 32749.48]
})) {
  if (Math.abs(finance.compute(key).result - product) > .09) throw Error('Histórico do produto alterado: ' + key);
  if (Math.abs(finance.computeCompany(key, true).result - combined) > .09) throw Error('Histórico da empresa alterado: ' + key);
}
const base = finance.computeCompany('base', true);
if (Math.abs(base.revenue - 68136.25) > .1 || Math.abs(base.expenses - 65830.02) > .1) throw Error('Indicadores do slide 8 inconsistentes');
if (base.minCash < 1500 || base.minCash > 1550) throw Error('Caixa mínimo do cenário-base inconsistente');
const doc = read('docs/24-pitch-comercial-modernize.md');
for (const item of ['4min30s', 'Sumário executivo', 'Arquitetura de referência', 'Projeção 12 meses', 'Pitch de 10 slides', '25%']) {
  if (!doc.includes(item)) throw Error('Rastreabilidade acadêmica ausente: ' + item);
}
console.log('OK: 10 telas visuais (até 62 palavras), rubrica do professor, números, HTML, PDF, demo e histórico financeiro');
