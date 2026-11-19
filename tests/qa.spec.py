import pathlib, os
from playwright.sync_api import sync_playwright

BASE='http://127.0.0.1:8767'
OUT=pathlib.Path(__file__).parent/'artifacts'
OUT.mkdir(exist_ok=True)
errors=[]

def guard(page):
    page.on('pageerror', lambda exc: errors.append(str(exc)))

with sync_playwright() as p:
    opts={'headless':True,'args':['--no-sandbox']}
    if not os.environ.get('CI') and os.path.exists('/usr/bin/chromium'):
        opts['executable_path']='/usr/bin/chromium'
    browser=p.chromium.launch(**opts)
    context=browser.new_context(viewport={'width':1366,'height':768},device_scale_factor=1,service_workers='block')
    page=context.new_page()
    guard(page)
    page.goto(BASE+'/slides.html',wait_until='domcontentloaded')
    assert page.locator('.slide').count()==10
    assert page.locator('.slide:not([hidden])').count()==1
    assert page.locator('#slide-counter').inner_text()=='01 / 10'
    assert 'Em modo inteligente.' in page.locator('#s1-title').inner_text()
    page.screenshot(path=str(OUT/'slide-01.png'),animations='disabled')
    page.keyboard.press('ArrowRight')
    assert page.locator('#slide-counter').inner_text()=='02 / 10'
    assert 'continuar no manual' in page.locator('#s2-title').inner_text()
    page.keyboard.press('Escape')
    assert page.locator('#overview').is_visible()
    assert page.locator('.overview-tile').count()==10
    page.locator('.overview-tile').nth(3).click()
    assert page.locator('#slide-counter').inner_text()=='04 / 10'
    assert '120' in page.locator('#slide-4').inner_text()
    assert '72' in page.locator('#slide-4').inner_text()
    assert 'SIMULAÇÃO DIDÁTICA' in page.locator('#slide-4').inner_text()
    page.screenshot(path=str(OUT/'slide-04-mercado.png'),animations='disabled')
    page.evaluate('window.ModernizeSlides.goTo(4)')
    manual=page.locator('.compare-side--manual')
    assisted=page.locator('.compare-side--ai')
    assert '40' in manual.inner_text() and 'R$ 1.200' in manual.inner_text()
    assert '14' in assisted.inner_text() and 'R$ 360' in assisted.inner_text()
    assert '5MIN REVISÃO' in page.locator('.compare-caveat').inner_text()
    assert '−65%' in page.locator('.compare-savings').inner_text()
    assert '−70%' in page.locator('.compare-savings').inner_text()
    assert 'VALORES SIMULADOS' in page.locator('.compare-caveat').inner_text()
    assert page.locator('#slide-5').get_attribute('data-batch-size')=='120'
    assert 'SEM IA REAL' in page.locator('.compare-caveat').inner_text()
    assert page.locator('#launch-demo').get_attribute('href')=='demo.html?from=slides'
    assert 'DADOS FICTÍCIOS' in page.locator('#slide-5').inner_text()
    page.screenshot(path=str(OUT/'slide-05-comparativo-ia.png'),animations='disabled')
    page.evaluate('window.ModernizeSlides.goTo(5)')
    assert 'TypeScript' in page.locator('#slide-6').inner_text()
    assert 'PostgreSQL' in page.locator('#slide-6').inner_text()
    assert 'ainda não implementada' in page.locator('#slide-6').inner_text()
    page.screenshot(path=str(OUT/'slide-06-arquitetura.png'),animations='disabled')
    page.evaluate('window.ModernizeSlides.goTo(6)')
    assert 'R$ 990' in page.locator('#slide-7').inner_text()
    assert 'R$ 299' in page.locator('#slide-7').inner_text()
    page.evaluate('window.ModernizeSlides.goTo(7)')
    for number in ['68,1 mil','65,8 mil','2,3 mil','3,4%']:
        assert number in page.locator('#slide-8').inner_text(), number
    page.screenshot(path=str(OUT/'slide-08-financeiro.png'),animations='disabled')
    page.evaluate('window.ModernizeSlides.goTo(8)')
    assert 'CLIENTES COMPROVADOS' in page.locator('#slide-9').inner_text()
    assert '3–5' in page.locator('#slide-9').inner_text()
    page.screenshot(path=str(OUT/'slide-09-equipe.png'),animations='disabled')
    page.keyboard.press('End')
    assert page.locator('#slide-counter').inner_text()=='10 / 10'
    assert '88%' in page.locator('#slide-10').inner_text()
    assert 'O mercado já está' in page.locator('#s10-title').inner_text()
    assert 'ficar para trás.' in page.locator('#slide-10').inner_text()
    assert 'STANFORD AI INDEX 2026' in page.locator('#slide-10').inner_text()
    assert 'AMOSTRA GLOBAL' in page.locator('#slide-10').inner_text()
    assert page.locator('.market-close-source').get_attribute('href')=='https://hai.stanford.edu/ai-index/2026-ai-index-report/economy'
    assert 'EMPRESAS PILOTO' in page.locator('#slide-10').inner_text()
    page.screenshot(path=str(OUT/'slide-10-mercado-ia.png'),animations='disabled')
    page.keyboard.press('Home')
    assert page.locator('#slide-counter').inner_text()=='01 / 10'

    live=context.new_page()
    guard(live)
    live.goto(BASE+'/slides-live.html#slide-8',wait_until='domcontentloaded')
    assert live.locator('#slide-counter').inner_text()=='08 / 10'
    assert 'R$ 68,1 mil' in live.locator('#slide-8').inner_text()
    assert live.locator('script[src="js/slides-live.js"]').count()==1
    assert live.locator('link[href="css/slides-live.css"]').count()==1
    live.close()

    # Validação de exportação: 10 páginas em 16:9, sem páginas brancas adicionais.
    pdf=page.pdf(print_background=True,prefer_css_page_size=True)
    (OUT/'pitch-10-slides.pdf').write_bytes(pdf)
    from pypdf import PdfReader
    pages=PdfReader(OUT/'pitch-10-slides.pdf').pages
    assert len(pages)==10, f'PDF deveria ter 10 páginas, gerou {len(pages)}'
    assert all(abs(float(pg.mediabox.width)/float(pg.mediabox.height)-16/9)<.04 for pg in pages)

    # Projetor: todos os componentes essenciais devem caber, sem scrolling.
    for i in range(10):
        page.evaluate('(i) => window.ModernizeSlides.goTo(i)',i)
        value=page.locator(f'#slide-{i+1}').evaluate('(el)=>({scroll:el.scrollHeight,client:el.clientHeight,sw:el.scrollWidth,cw:el.clientWidth})')
        assert value['scroll']-value['client']<=10 and value['sw']-value['cw']<=10, f'Slide {i+1} transborda em 1366×768: {value}'
    compact=browser.new_context(viewport={'width':1200,'height':600},device_scale_factor=1,service_workers='block').new_page()
    guard(compact)
    compact.goto(BASE+'/slides.html#slide-8',wait_until='domcontentloaded')
    for idx in [0,3,4,5,7,8,9]:
        compact.evaluate('(i)=>window.ModernizeSlides.goTo(i)',idx)
        v=compact.locator(f'#slide-{idx+1}').evaluate('(el)=>({scroll:el.scrollHeight,client:el.clientHeight,sw:el.scrollWidth,cw:el.clientWidth})')
        assert v['scroll']-v['client']<=10 and v['sw']-v['cw']<=10, f'Slide {idx+1} transborda em 1200×600: {v}'
    compact.screenshot(path=str(OUT/'slide-08-financeiro-compacto.png'),animations='disabled')
    compact.close()

    # Ao sair da demonstração, a sequência continua no slide 7.
    page.goto(BASE+'/demo.html',wait_until='domcontentloaded')
    assert page.locator('.back-to-deck').first.get_attribute('href')=='slides.html#slide-7'
    assert page.locator('#dashboard-stats .stat-card').count()==4
    page.screenshot(path=str(OUT/'demo-dashboard.png'))
    page.locator('#dashboard-new').click()
    page.locator('#create-name').fill('Pessoa Fictícia QA')
    page.locator('#create-form button[type="submit"]').click()
    assert 'Pessoa Fictícia QA' in page.locator('#details-content').inner_text()
    testid=page.evaluate("window.ModernizeDemo.getState().cases.at(-1).id")
    portal=context.new_page()
    portal.set_viewport_size({'width':1200,'height':830})
    guard(portal)
    portal.goto(BASE+'/demo.html?mode=upload&id='+testid,wait_until='domcontentloaded')
    assert portal.locator('[data-synthetic="missing"]').count()==1
    portal.screenshot(path=str(OUT/'demo-portal.png'))
    portal.locator('[data-synthetic="missing"]').click()
    portal.wait_for_timeout(850)
    print('PORTAL STATUS AFTER UPLOAD', portal.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id)?.status', testid), flush=True)
    page.reload(wait_until='domcontentloaded')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',testid)
    print('MAIN STATUS AFTER RELOAD', page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id)?.status', testid), flush=True)
    page.screenshot(path=str(OUT/'demo-after-missing.png'))
    assert page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id).status', testid) == 'issue'
    assert page.locator('[data-action="complete"]').is_disabled()
    page.screenshot(path=str(OUT/'demo-pending.png'))
    portal.reload(wait_until='domcontentloaded')
    portal.locator('[data-synthetic="complete"]').click()
    portal.wait_for_timeout(850)
    page.reload(wait_until='domcontentloaded')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',testid)
    assert page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id).status', testid) == 'review'
    assert page.locator('[data-action="complete"]').is_disabled()
    page.locator('#review-form input[name="name"]').fill('Pessoa Fictícia QA - REVISADA')
    page.locator('#review-form input[name="verified"]').check()
    page.locator('#review-form button[type="submit"]').click()
    assert page.locator('[data-action="complete"]').is_enabled()
    page.locator('[data-action="complete"]').click()
    assert page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id).status', testid) == 'done'
    page.screenshot(path=str(OUT/'demo-complete.png'))

    # Segunda jornada: divergência bloqueia até o nome ser corrigido e confirmado
    page.evaluate('window.ModernizeDemo.goto("create")')
    page.locator('#create-name').fill('Marina Vieira (DEMO)')
    page.locator('#create-form button[type="submit"]').click()
    mismatch_id=page.evaluate("window.ModernizeDemo.getState().cases.at(-1).id")
    problem=context.new_page()
    guard(problem)
    problem.goto(BASE+'/demo.html?mode=upload&id='+mismatch_id,wait_until='domcontentloaded')
    problem.locator('[data-synthetic="mismatch"]').click()
    problem.wait_for_timeout(850)
    problem.close()
    page.reload(wait_until='domcontentloaded')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',mismatch_id)
    assert page.locator('[data-action="complete"]').is_disabled()
    page.locator('[data-action="resolve"]').click()
    assert page.evaluate('(id)=>window.ModernizeDemo.getState().cases.find(c=>c.id===id).status',mismatch_id)=='issue'
    page.locator('#review-form input[name="name"]').fill('Marina Vieira')
    page.locator('#review-form input[name="verified"]').check()
    page.locator('#review-form button[type="submit"]').click()
    page.locator('[data-action="resolve"]').click()
    assert page.locator('[data-action="complete"]').is_enabled()
    page.locator('[data-action="complete"]').click()
    assert page.evaluate('(id)=>window.ModernizeDemo.getState().cases.find(c=>c.id===id).status',mismatch_id)=='done'
    # Terceira jornada: ilegibilidade exige reenvio, não um botão de resolução
    page.evaluate('window.ModernizeDemo.goto("create")')
    page.locator('#create-name').fill('Joana Fictícia (DEMO)')
    page.locator('#create-form button[type="submit"]').click()
    illegible_id=page.evaluate("window.ModernizeDemo.getState().cases.at(-1).id")
    upload=context.new_page()
    guard(upload)
    upload.goto(BASE+'/demo.html?mode=upload&id='+illegible_id,wait_until='domcontentloaded')
    upload.locator('[data-synthetic="illegible"]').click()
    upload.wait_for_timeout(850)
    page.reload(wait_until='domcontentloaded')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',illegible_id)
    assert page.locator('[data-action="complete"]').is_disabled()
    assert page.locator('[data-action="resolve"]').count()==0
    upload.reload(wait_until='domcontentloaded')
    upload.locator('[data-synthetic="complete"]').click()
    upload.wait_for_timeout(850)
    upload.close()
    page.reload(wait_until='domcontentloaded')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',illegible_id)
    page.locator('#review-form input[name="verified"]').check()
    page.locator('#review-form button[type="submit"]').click()
    page.locator('[data-action="complete"]').click()
    assert page.evaluate('(id)=>window.ModernizeDemo.getState().cases.find(c=>c.id===id).status',illegible_id)=='done'
    page.locator('#tenant-select').select_option('aurora')
    assert not page.locator('#view-dashboard').get_by_text('Pessoa Fictícia QA').count()
    assert page.locator('#side-total').inner_text()=='1'
    # Small layout + source accessibility no horizontal overflow
    small=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1, service_workers='block').new_page()
    guard(small)
    small.goto(BASE+'/slides.html')
    small.screenshot(path=str(OUT/'slide-01-mobile.png'))
    small.goto(BASE+'/demo.html')
    small.screenshot(path=str(OUT/'demo-mobile.png'))
    print('Browser checks PASS. Errors:',errors)
    assert not errors,errors
    browser.close()
