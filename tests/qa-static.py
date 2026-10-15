"""QA estático básico da Modernize (não substitui testes E2E em navegador).
Executar: python tests/qa-static.py, Node instalado.
"""
from pathlib import Path
from html.parser import HTMLParser
import subprocess,re
root=Path(__file__).resolve().parents[1]
class Parser(HTMLParser):
    def __init__(self): super().__init__();self.slides=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='section' and 'slide' in a.get('class','').split():self.slides.append(a)
p=Parser(); html=(root/'slides.html').read_text(encoding='utf8');p.feed(html)
assert len(p.slides)==10, 'O pitch deve ter exatamente 10 slides'
assert [v['id'] for v in p.slides]==[f'slide-{i}' for i in range(1,11)]
for f in ('js/slides.js','js/demo.js'):subprocess.run(['node','--check',str(root/f)],check=True)
assert 'assets/brand/Modernize%20logo.png' in html
assert 'data-scenario="Pessimista"' in html
assert 'prefers-reduced-motion' in (root/'css/modernize.css').read_text(encoding='utf8')
assert 'IA simulada' in (root/'js/demo.js').read_text(encoding='utf8')
ids=re.findall(r'id="([^"]+)"',html); assert len(ids)==len(set(ids)), 'IDs duplicados'
print('OK: slides, JS, acessibilidade básica e demo simulada')