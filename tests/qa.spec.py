import re, time, json, pathlib, os
from playwright.sync_api import sync_playwright

BASE='http://127.0.0.1:8767'
OUT=pathlib.Path(__file__).parent/'artifacts'
OUT.mkdir(exist_ok=True)
errors=[]

def guard(page):
    page.on('pageerror',lambda e: errors.append(str(e)))

with sync_playwright() as p:
    launch_args={'headless':True,'args':['--no-sandbox']}
    if not os.environ.get('CI') and os.path.exists('/usr/bin/chromium'):
        launch_args['executable_path']='/usr/bin/chromium'
    browser=p.chromium.launch(**launch_args)
    context=browser.new_context(viewport={'width':1366,'height':768},device_scale_factor=1)
    page=context.new_page()
    guard(page)
    page.goto(BASE+'/slides.html',wait_until='networkidle')
    assert page.locator('.slide').count()==10
    assert page.locator('.slide:not([hidden])').count()==1
    assert page.locator('#slide-counter').inner_text()=='01 / 10'
    page.screenshot(path=str(OUT/'slide-01.png'))
    page.keyboard.press('ArrowRight')
    assert page.locator('#slide-counter').inner_text()=='02 / 10'
    page.keyboard.press('Escape'); assert page.locator('#overview').is_visible()
    page.locator('.overview-tile').nth(8).click()
    assert page.locator('#slide-counter').inner_text()=='09 / 10'
    assert '22.136' in page.locator('#finance-revenue').inner_text()
    page.locator('[data-scenario="pessimista"]').click()
    assert '9.572' in page.locator('#finance-revenue').inner_text()
    assert '−' in page.locator('#finance-result').inner_text()
    page.locator('[data-scenario="otimista"]').click()
    assert '34.368' in page.locator('#finance-revenue').inner_text()
    page.screenshot(path=str(OUT/'slide-09-finance.png'))
    page.evaluate('window.ModernizeSlides.goTo(4)')
    page.screenshot(path=str(OUT/'slide-05-demo.png'))
    # inspect layout overflow of each slide at projector resolution
    for i in range(10):
        page.evaluate('(i) => window.ModernizeSlides.goTo(i)',i)
        value=page.locator(f'#slide-{i+1}').evaluate('(el)=>({scroll:el.scrollHeight,client:el.clientHeight,sw:el.scrollWidth,cw:el.clientWidth})')
        if value['scroll']-value['client']>10 or value['sw']-value['cw']>10:
            print('WARN slide overflows',i+1,value)
    page.goto(BASE+'/demo.html',wait_until='networkidle')
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
    portal.goto(BASE+'/demo.html?mode=upload&id='+testid,wait_until='networkidle')
    assert portal.locator('[data-synthetic="missing"]').count()==1
    portal.screenshot(path=str(OUT/'demo-portal.png'))
    portal.locator('[data-synthetic="missing"]').click()
    portal.wait_for_timeout(850)
    print('PORTAL STATUS AFTER UPLOAD', portal.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id)?.status', testid), flush=True)
    page.reload(wait_until='networkidle')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',testid)
    print('MAIN STATUS AFTER RELOAD', page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id)?.status', testid), flush=True)
    page.screenshot(path=str(OUT/'demo-after-missing.png'))
    assert page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id).status', testid) == 'issue'
    assert page.locator('[data-action="complete"]').is_disabled()
    page.screenshot(path=str(OUT/'demo-pending.png'))
    portal.reload(wait_until='networkidle')
    portal.locator('[data-synthetic="complete"]').click()
    portal.wait_for_timeout(850)
    page.reload(wait_until='networkidle')
    page.evaluate('(id)=>window.ModernizeDemo.goto("details",id)',testid)
    assert page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id).status', testid) == 'review'
    assert page.locator('[data-action="complete"]').is_enabled()
    page.locator('input[name="name"]').fill('Pessoa Fictícia QA - REVISADA')
    page.locator('[data-action="complete"]').click()
    assert page.evaluate('(id) => window.ModernizeDemo.getState().cases.find(c=>c.id===id).status', testid) == 'done'
    page.screenshot(path=str(OUT/'demo-complete.png'))
    page.locator('#tenant-select').select_option('aurora')
    assert not page.locator('#view-dashboard').get_by_text('Pessoa Fictícia QA').count()
    assert page.locator('#side-total').inner_text()=='1'
    # Small layout + source accessibility no horizontal overflow
    small=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
    guard(small)
    small.goto(BASE+'/slides.html')
    small.screenshot(path=str(OUT/'slide-01-mobile.png'))
    small.goto(BASE+'/demo.html')
    small.screenshot(path=str(OUT/'demo-mobile.png'))
    print('Browser checks PASS. Errors:',errors)
    assert not errors,errors
    browser.close()