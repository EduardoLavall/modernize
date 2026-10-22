(() => {
  "use strict";
  const toggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#primary-navigation");
  const header = document.querySelector(".site-header");
  function closeNav() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const next = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(next));
      toggle.setAttribute("aria-label", next ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", next);
      document.body.classList.toggle("nav-open", next);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeNav();
        toggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (innerWidth > 880) closeNav();
    });
  }
  const progress = document.querySelector(".reading-progress");
  let scrollScheduled = false;
  const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 15);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = "scaleX(" + Math.min(1, window.scrollY/max) + ")";
    scrollScheduled = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(handleScroll);
    }
  }, { passive: true });
  handleScroll();

  const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motionOk && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -35px 0px", threshold: 0.06 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  const stages = [
    { label: "ETAPA 01 / DIAGNÓSTICO", title: "Antes de automatizar,\nprecisamos compreender.", text: "A primeira etapa é conhecer as pessoas, os processos e os desafios reais da empresa. Assim, evitamos propor tecnologia sem propósito." },
    { label: "ETAPA 02 / CAPACITAÇÃO", title: "Conhecimento é parte\nda implementação.", text: "Preparamos as pessoas para usar novas ferramentas com autonomia, senso crítico e entendimento dos limites da tecnologia." },
    { label: "ETAPA 03 / IMPLEMENTAÇÃO", title: "A melhor solução é aquela\nque cabe na rotina.", text: "A partir das necessidades identificadas, desenhamos automações, integrações ou sistemas, sempre com segurança e supervisão proporcionais ao risco." },
    { label: "ETAPA 04 / EVOLUÇÃO", title: "Uma entrega não encerra\na transformação.", text: "Acompanhamos a adoção, verificamos o que funciona e buscamos as próximas melhorias. O objetivo é construir capacidade de evoluir continuamente." }
  ];
  const tabs = [...document.querySelectorAll(".method-tab")];
  const panel = document.querySelector("#method-panel");
  const label = document.querySelector("#method-panel-label");
  const title = document.querySelector("#method-panel-title");
  const text = document.querySelector("#method-panel-text");
  const fill = document.querySelector("#method-progress-fill");
  function activateStage(i, focus = false) {
    const step = stages[i];
    if (!step) return;
    tabs.forEach((tab, index) => {
      const active = index === i;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    label.textContent = step.label;
    title.textContent = step.title;
    text.textContent = step.text;
    panel.setAttribute("aria-labelledby", tabs[i].id);
    fill.style.width = ((i + 1) * 25) + "%";
    if (focus) tabs[i].focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activateStage(i));
    tab.addEventListener("keydown", e => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        activateStage((i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length, true);
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        activateStage(e.key === "Home" ? 0 : tabs.length - 1, true);
      }
    });
  });
  const y = document.querySelector("#current-year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Expose a small smoke-test surface; no hidden analytics or data transfer.
  window.ModernizeLanding = Object.freeze({ activateStage, stageCount: stages.length });
})();