"""Verifica a landing institucional publicada separadamente dos slides."""
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8788/landing/"
OUT = Path(__file__).parent / "artifacts"
OUT.mkdir(parents=True, exist_ok=True)
errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
    desktop = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    desktop.on("pageerror", lambda e: errors.append(str(e)))
    desktop.goto(BASE, wait_until="domcontentloaded")
    desktop.wait_for_selector(".hero h1")
    assert desktop.title() == "Modernize — Modernização tecnológica contínua"
    assert desktop.locator("h1").count() == 1
    assert desktop.locator("main").count() == 1
    assert desktop.locator(".service-card").count() == 4
    assert desktop.locator(".method-tab").count() == 4
    assert desktop.locator("html").get_attribute("lang") == "pt-BR"
    assert "consultoria" in desktop.locator("#sobre").inner_text().lower()
    assert "Acompanhamento" in desktop.locator("#servicos").inner_text()
    assert "dados fictícios" in desktop.locator("#modernize-ia").inner_text()
    assert "https://eduardolavall.github.io/modernize/demo.html" in desktop.locator(".product-actions a").first.get_attribute("href")
    assert desktop.locator(".nav-brand img").evaluate("(img)=>img.complete&&img.naturalWidth>0")
    assert desktop.locator(".orbit-core img").evaluate("(img)=>img.complete&&img.naturalWidth>0")
    assert desktop.locator(".footer-mark img").evaluate("(img)=>img.complete&&img.naturalWidth>0")
    hrefs = desktop.locator('a[href^="#"]').evaluate_all("(nodes)=>nodes.map(n=>n.getAttribute('href'))")
    assert all(desktop.locator(f'[id="{href[1:]}"]').count() == 1 for href in hrefs if len(href)>1), hrefs

    desktop.locator(".method-tab").nth(1).click()
    assert desktop.locator(".method-tab").nth(1).get_attribute("aria-selected") == "true"
    assert "Conhecimento" in desktop.locator("#method-panel-title").inner_text()
    desktop.locator(".method-tab").nth(1).press("ArrowRight")
    assert desktop.locator(".method-tab").nth(2).get_attribute("aria-selected") == "true"
    assert "solução" in desktop.locator("#method-panel-title").inner_text().lower()
    desktop.locator("details").first.locator("summary").click()
    assert desktop.locator("details").first.evaluate("(node)=>node.open")

    for sel in ["#sobre", "#servicos", "#metodo", "#modernize-ia", "#proximo-passo"]:
        desktop.locator(sel).scroll_into_view_if_needed()
        desktop.wait_for_timeout(110)
    desktop.screenshot(path=str(OUT/"landing-desktop.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1, is_mobile=True, has_touch=True)
    mobile.on("pageerror", lambda e: errors.append(str(e)))
    mobile.goto(BASE, wait_until="domcontentloaded")
    assert mobile.locator("#menu-toggle").is_visible()
    assert mobile.locator("#menu-toggle").get_attribute("aria-expanded") == "false"
    mobile.locator("#menu-toggle").click()
    assert mobile.locator("#menu-toggle").get_attribute("aria-expanded") == "true"
    mobile.locator("#primary-navigation").wait_for(state="visible", timeout=3000)
    mobile.locator("#primary-navigation").get_by_text("Serviços", exact=True).click()
    assert mobile.locator("#menu-toggle").get_attribute("aria-expanded") == "false"
    assert mobile.evaluate("document.documentElement.scrollWidth <= window.innerWidth+3"), "Landing transborda horizontalmente em 390px"
    for sel in ["#sobre", "#servicos", "#metodo", "#modernize-ia", "#proximo-passo"]:
        mobile.locator(sel).scroll_into_view_if_needed()
        mobile.wait_for_timeout(70)
    mobile.screenshot(path=str(OUT/"landing-mobile.png"), full_page=True)

    # Sem biblioteca pesada nem ação externa para preencher um suposto contato.
    assert desktop.locator("form").count() == 0
    assert not errors, errors
    browser.close()

print("LANDING QA OK: desktop/mobile, logos, serviços, navegação, método, FAQ, links e conteúdo honesto.")
