(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const chapters = ['VISÃO','PROBLEMA','MERCADO','SOLUÇÃO','DEMO','DIFERENCIAL','RECEITA','TECNOLOGIA','FINANÇAS','CONTINUIDADE'];
  const overview = document.getElementById('overview');
  const help = document.getElementById('help-dialog');
  const fromHash = () => { const match = location.hash.match(/^#slide-(\d+)$/); return match ? Math.max(0, Math.min(slides.length-1,Number(match[1])-1)) : 0; };
  let index = fromHash();
  let priorFocus = null;
  const $ = id => document.getElementById(id);
  function goTo(target) {
    if (target < 0 || target >= slides.length) return;
    index = target;
    slides.forEach((slide,i) => {slide.hidden = i !== index; slide.classList.toggle('is-active',i === index); slide.setAttribute('aria-hidden', String(i !== index));});
    $('slide-counter').textContent = `${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    $('chapter-label').textContent = chapters[index];
    $('toolbar-progress-fill').style.width = `${(index+1)/slides.length*100}%`;
    $('slide-prev').disabled = index === 0;
    $('slide-next').disabled = index === slides.length-1;
    history.replaceState(null,'',`#slide-${index+1}`);
    document.title = `Modernize — ${chapters[index]}`;
    document.querySelectorAll('.overview-tile').forEach((n,i) => n.classList.toggle('active',i===index));
  }
  function closeOverview() {overview.hidden=true; document.body.classList.remove('modal-open');(priorFocus||$('overview-open')).focus();}
  function openOverview() {priorFocus=document.activeElement;overview.hidden=false;document.body.classList.add('modal-open');document.querySelector('.overview-tile.active')?.focus();}
  function toggleFullscreen() { if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>{}); }
  const indexGrid=$('overview-grid');
  slides.forEach((slide,i)=>{const btn=document.createElement('button');btn.className='overview-tile';btn.type='button';btn.innerHTML=`<small>${String(i+1).padStart(2,'0')} / 10</small><strong>${chapters[i]}</strong>`;btn.addEventListener('click',()=>{closeOverview();goTo(i);});indexGrid.appendChild(btn);});
  $('slide-next').addEventListener('click',()=>goTo(index+1));
  $('slide-prev').addEventListener('click',()=>goTo(index-1));
  document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>goTo(index+1)));
  $('overview-open').addEventListener('click',openOverview);
  $('overview-close').addEventListener('click',closeOverview);
  overview.addEventListener('click',e=>{if(e.target===overview)closeOverview();});
  $('fullscreen').addEventListener('click',toggleFullscreen);
  $('print-slides').addEventListener('click',()=>window.print());
  $('help-open').addEventListener('click',()=>help.showModal());
  $('help-close').addEventListener('click',()=>help.close());
  document.addEventListener('keydown',e=>{
    const el=e.target;
    if (['INPUT','TEXTAREA','SELECT'].includes(el.tagName) || el.isContentEditable) return;
    if(help.open) return;
    if(!overview.hidden){if(e.key==='Escape'){e.preventDefault();closeOverview();}return;}
    const key=e.key.toLowerCase();
    if(['arrowright','arrowdown','pagedown',' '].includes(key)){e.preventDefault();goTo(index+1);}
    else if(['arrowleft','arrowup','pageup'].includes(key)){e.preventDefault();goTo(index-1);}
    else if(key==='home'){e.preventDefault();goTo(0);}
    else if(key==='end'){e.preventDefault();goTo(slides.length-1);}
    else if(key==='escape'){e.preventDefault();openOverview();}
    else if(key==='f'){toggleFullscreen();}
    else if(key==='p'){e.preventDefault();window.print();}
    else if(key==='d'){location.href='demo.html?from=slides';}
  });
  window.addEventListener('hashchange',()=>goTo(fromHash()));
  const chart=$('finance-chart');
  const svg=(tag,attrs={},text='')=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text)n.textContent=text;return n;};
  function drawFinance(key){
    const s=window.ModernizeFinance.compute(key);
    const money=window.ModernizeFinance.money;
    $('finance-revenue').textContent=money(s.revenue);$('finance-expenses').textContent=money(s.expenses);
    $('finance-result').textContent=(s.result>=0?'+ ':'− ')+money(Math.abs(s.result));
    $('finance-warning').textContent=s.warning;
    $('finance-chart-label').textContent=`Cenário ${s.label.toLowerCase()}`;
    $('finance-customers').textContent=s.newClients;
    $('finance-cac').textContent=money(s.cac);
    $('finance-churn').textContent=(s.churn*100).toFixed(0)+'%';
    document.querySelectorAll('[data-scenario]').forEach(b=>{const on=b.dataset.scenario===key;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',String(on));});
    chart.replaceChildren();
    const values=s.series.map(x=>x.cash);
    const min=Math.min(0,...values)-1600,max=Math.max(3000,...values)+1300;
    const W=650,H=310,left=48,right=12,top=16,bottom=38;
    const x=i=>left+i*(W-left-right)/11;
    const y=v=>top+(max-v)/(max-min)*(H-top-bottom);
    for(let i=0;i<5;i++){
      const value=min+(max-min)*i/4,Y=y(value);
      chart.appendChild(svg('line',{x1:left,x2:W-right,y1:Y,y2:Y,stroke:'#ffffff1c','stroke-width':1}));
      chart.appendChild(svg('text',{x:2,y:Y+4,fill:'#89909a','font-size':11},Math.round(value/1000)+'k'));
    }
    const zeroY=y(0);
    chart.appendChild(svg('line',{x1:left,x2:W-right,y1:zeroY,y2:zeroY,stroke:'#e68b9588','stroke-dasharray':'6 6'}));
    const points=values.map((v,i)=>`${x(i)},${y(v)}`).join(' ');
    const area=svg('polygon',{points:`${x(0)},${y(min)} ${points} ${x(11)},${y(min)}`,fill:'#bd394b18'});chart.appendChild(area);
    chart.appendChild(svg('polyline',{points,fill:'none',stroke:'#ed8290','stroke-width':3.5,'stroke-linejoin':'round','stroke-linecap':'round'}));
    values.forEach((v,i)=>{
      if(i===11||i===0||i===5) chart.appendChild(svg('circle',{cx:x(i),cy:y(v),r:4.5,fill:v>=0?'#ee8191':'#f5bd6f',stroke:'#171c23','stroke-width':2}));
      if(i===0||i===5||i===11)chart.appendChild(svg('text',{x:x(i),y:H-8,'text-anchor':'middle',fill:'#acb0b9','font-size':12},'M'+(i+1)));
    });
    chart.setAttribute('aria-label',`Caixa projetado ${s.label}: ${money(s.lastCash)} no mês 12; menor caixa ${money(s.minCash)}. Simulação.`);
  }
  document.querySelectorAll('[data-scenario]').forEach(button=>button.addEventListener('click',()=>drawFinance(button.dataset.scenario)));
  goTo(index);drawFinance('base');
  window.ModernizeSlides = {goTo,current:()=>index,slideCount:slides.length};
})();
