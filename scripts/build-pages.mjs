// GitHub Pages — artefato publicado, sem ferramentas de build externas.
// Mantém landing e demo legadas; o pitch combina narrativa comercial e critérios do professor.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, '_site');
const copy = (source, target = source) => {
  const from = path.join(root, source);
  const to = path.join(out, target);
  if (!fs.existsSync(from)) throw new Error('Arquivo ausente na publicação: ' + source);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: fs.statSync(from).isDirectory() });
};
fs.rmSync(out, { recursive: true, force: true });
for (const file of ['index.html', 'slides.html', 'demo.html', 'sw.js']) copy(file);
for (const file of ['app.css', 'slides.css', 'demo.css']) copy('css/' + file);
for (const file of ['finance.js', 'slides.js', 'demo.js', 'team.js']) copy('js/' + file);
copy('assets/brand');
for (const file of ['index.html', 'styles.css', 'main.js', 'vercel.json'])
  copy('landing/' + file);
copy('landing/assets');

// Rota de emergência para navegadores que ainda guardem o service worker v4/v5.
copy('css/slides.css', 'css/slides-live.css');
copy('js/slides.js', 'js/slides-live.js');
let html = fs.readFileSync(path.join(root, 'slides.html'), 'utf8');
for (const [from, to] of [
  ['href="css/slides.css"', 'href="css/slides-live.css"'],
  ['src="js/slides.js"', 'src="js/slides-live.js"']
]) {
  if (!html.includes(from)) throw new Error('Referência ausente do pitch: ' + from);
  html = html.replace(from, to);
}
if (!html.includes('O futuro começa')) {
  throw new Error('O pitch comercial novo não foi incluído no build');
}
const cleanup = `<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    for (const reg of regs) {
      if (new URL(reg.scope).pathname.startsWith('/modernize/')) reg.unregister().catch(() => {});
    }
  }).catch(() => {});
}
</script>`;
html = html.replace('</body>', cleanup + '\n</body>');
fs.writeFileSync(path.join(out, 'slides-live.html'), html);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('OK: publicação GitHub Pages com pitch comercial e rota sem cache legado');
