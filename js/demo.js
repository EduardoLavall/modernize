(() => {
  'use strict';
  /* DEMONSTRAÇÃO ACADÊMICA: não enviar documentos, não coletar dados reais, não executar IA.
     O isolamento entre imobiliárias nesta demo é somente um filtro de UI/localStorage. */
  const KEY = 'modernize_demo_v1';
  const $ = id => document.getElementById(id);
  const safe = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const now = () => new Date().toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
  const labels = { awaiting: 'Aguardando documentos', processing:'Em processamento', review:'Em revisão', issue:'Com pendência', done:'Concluído' };
  const classes = { awaiting:'wait', processing:'processing', review:'review', issue:'issue', done:'done' };
  const tenants = {horizonte:'Imobiliária Horizonte',aurora:'Imobiliária Aurora'};
  const kinds = [{key:'identity',label:'Identificação',small:'RG / CNH — exemplo fictício'},{key:'residence',label:'Comprovante de residência',small:'Arquivo de exemplo'},{key:'income',label:'Comprovante de renda',small:'Arquivo de exemplo'}];
  const initials = name => String(name).replace(/\(DEMO\)/gi,'').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase().slice(0,2)||'DM';
  const badge = status => `<span class="badge ${classes[status]||'wait'}">${labels[status]||'Não definida'}</span>`;
  const emptyDocs = () => ({identity:false,residence:false,income:false});
  const today = () => now();
  function evt(action,who='Equipe de exemplo'){return {action,who,at:today()};}
  function newCase(id,tenant,name,assignee,status='awaiting'){
    return {id,tenant,name,assignee,status,created:today(),docs:emptyDocs(),fields:{name:'',id:'',address:'',income:''},issues:[],history:[evt('Solicitação criada e link fictício gerado')],reviewed:false,scenario:null};
  }
  function seed(){
    const a=newCase('MDZ-001','horizonte','Camila Duarte (DEMO)','Ana Martins','awaiting');
    const b=newCase('MDZ-002','horizonte','Pedro Ribeiro (DEMO)','Lucas Pereira','issue');b.docs={identity:true,residence:true,income:false};b.fields={name:'Pedro Ribeiro',id:'***.***.***-** (DEMO)',address:'Rua das Flores, 42 — endereço fictício',income:''};b.issues=['Falta o comprovante de renda.'];b.scenario='missing';b.history.push(evt('IA simulada encontrou documento pendente','Simulação local'));
    const c=newCase('MDZ-003','horizonte','Julia Almeida (DEMO)','Beatriz Costa','done');c.docs={identity:true,residence:true,income:true};c.fields={name:'Julia Almeida',id:'***.***.***-** (DEMO)',address:'Rua do Exemplo, 100 — endereço fictício',income:'Valor de teste (DEMO)'};c.reviewed=true;c.scenario='complete';c.history.push(evt('Documentação revisada manualmente'));c.history.push(evt('Cadastro concluído pela equipe'));
    const d=newCase('MDZ-004','aurora','Rafael Souza (DEMO)','Ana Martins','review');d.docs={identity:true,residence:true,income:true};d.fields={name:'Rafael Souza',id:'***.***.***-** (DEMO)',address:'Av. Fictícia, 11',income:'Valor de teste (DEMO)'};d.scenario='complete';d.history.push(evt('Dados extraídos por motor simulado','Simulação local'));
    return {version:1,tenant:'horizonte',counter:4,cases:[a,b,c,d]};
  }
  function load(){try{const v=JSON.parse(localStorage.getItem(KEY));if(v&&v.version===1&&Array.isArray(v.cases)&&v.tenant in tenants)return v;}catch{}return seed();}
  let state=load();
  let view='dashboard', selectedId=null;
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{toast('Memória local indisponível','A demonstração continua nesta aba, mas pode não persistir após recarregar.');}};
  const cases=()=>state.cases.filter(c=>c.tenant===state.tenant);
  const find=(id)=>state.cases.find(c=>c.id===id);
  function log(c,action,who='Equipe de exemplo'){c.history.unshift(evt(action,who));}
  function toast(title,message){const n=document.createElement('div');n.className='toast';n.innerHTML=`<strong>${safe(title)}</strong>${safe(message)}`;$('toast-stack').append(n);setTimeout(()=>n.remove(),3800);}
  function relPortalUrl(c){const url=new URL('demo.html',location.href);url.search='?mode=upload&id='+encodeURIComponent(c.id);url.hash='';return url.href;}
  function updateChrome(){
    $('tenant-select').value=state.tenant;$('side-total').textContent=cases().length;
    document.querySelectorAll('.nav-item').forEach(btn=>{const a=btn.dataset.view===view;btn.classList.toggle('is-active',a);btn.setAttribute('aria-current',a?'page':'false');});
    $('breadcrumb-current').textContent={dashboard:'Visão geral',applications:'Solicitações',create:'Novo cadastro',details:'Detalhes da solicitação',insights:'Indicadores',about:'Como funciona'}[view]||view;
  }
  function goto(v,id){
    if(v==='details')selectedId=id;
    view=v;
    document.querySelectorAll('.view').forEach(panel=>panel.hidden=panel.id!==`view-${view}`);
    updateChrome(); renderView();
    $('app-sidebar').classList.remove('mobile-open');
    window.scrollTo({top:0,behavior:'instant'});
  }
  function renderView(){if(view==='dashboard')renderDashboard();else if(view==='applications')renderApplications();else if(view==='details')renderDetails();else if(view==='insights')renderInsights();}
  const row=(c,full=false)=>`<button type="button" class="table-row" data-case="${safe(c.id)}" aria-label="Abrir solicitação ${safe(c.id)} de ${safe(c.name)}"><span class="row-person"><span class="person-avatar">${safe(initials(c.name))}</span><span><strong>${safe(c.name)}</strong><small>${safe(c.id)} · ${safe(c.created)}</small></span></span><span class="row-meta">${safe(c.assignee)}</span>${full?`<span class="row-meta col-hidden">Cadastro locação</span>`:''}<span>${badge(c.status)}</span><span class="row-chevron">›</span></button>`;
  function renderDashboard(){
    const list=cases(),count=s=>list.filter(c=>c.status===s).length;
    $('dashboard-stats').innerHTML=[['Solicitações',list.length,'▦'],['Aguardando',count('awaiting'),'◷'],['Revisão / pendência',count('review')+count('issue'),'✳'],['Concluídas',count('done'),'✓']].map(x=>`<div class="stat-card"><div class="stat-card-label">${safe(x[0])}<span class="stat-card-icon">${x[2]}</span></div><strong>${String(x[1]).padStart(2,'0')}</strong><small>Casos fictícios desta imobiliária</small></div>`).join('');
    $('dashboard-list').innerHTML=list.length?list.slice().reverse().slice(0,5).map(c=>row(c)).join(''):'<div class="empty-list"><strong>Nenhuma solicitação</strong>Crie o primeiro caso de demonstração.</div>';
  }
  function renderApplications(){
    const q=$('application-search').value.trim().toLowerCase();const status=$('status-filter').value;
    const filtered=cases().slice().reverse().filter(c=>(status==='all'||c.status===status)&&[c.name,c.id,c.assignee].some(s=>s.toLowerCase().includes(q)));
    $('all-applications').innerHTML=`<div class="table-header"><span>INTERESSADO</span><span class="col-assignee">RESPONSÁVEL</span><span class="col-hidden">TIPO</span><span>ETAPA</span><span></span></div>${filtered.length?filtered.map(c=>row(c,true)).join(''):'<div class="empty-list"><strong>Nenhum resultado</strong>Tente buscar por outro nome ou etapa.</div>'}`;
  }
  const uploadedCount=c=>kinds.filter(k=>c.docs[k.key]).length;
  function renderDetails(){
    const c=find(selectedId);
    if(!c||c.tenant!==state.tenant){goto('applications');return;}
    const url=relPortalUrl(c);
    const completed=uploadedCount(c)===3 && c.issues.length===0 && c.status!=='awaiting' && c.status!=='processing';
    const fields=c.fields||{};
    $('details-content').innerHTML=`
      <button class="details-back" type="button" data-go="applications">← Voltar às solicitações</button>
      <div class="detail-head"><div><div class="workspace-eyebrow">SOLICITAÇÃO / ${safe(c.id)}</div><h1>${safe(c.name)}</h1><p>Responsável: ${safe(c.assignee)} · Cadastro para locação · ${safe(c.created)}</p></div>${badge(c.status)}</div>
      <div class="detail-layout"><div>
        <div class="detail-section"><h2>Documentação recebida</h2><p>Checklist básico. Itens sintéticos, sem bytes de documentos reais.</p>${kinds.map(k=>`<div class="detail-doc-row"><div class="doc-part"><span class="doc-icon">▤</span><div><strong>${k.label}</strong><small>${k.small}</small></div></div><span class="badge ${c.docs[k.key]?'done':'wait'}">${c.docs[k.key]?'Recebido (demo)':'Pendente'}</span></div>`).join('')}</div>
        ${(c.status==='issue'&&c.issues.length)?`<div class="detail-alert"><strong>Pendências identificadas no cenário:</strong><ul>${c.issues.map(x=>`<li>${safe(x)}</li>`).join('')}</ul></div>`:''}
        ${(c.status==='review'||c.status==='issue'||c.status==='done')?`<form id="review-form" class="detail-section"><h2>Resumo da extração <span class="badge processing">IA SIMULADA</span></h2><p>Confira os campos abaixo com os documentos de teste. Nenhum valor foi obtido de uma IA real.</p><div class="field-grid"><label class="field">Nome extraído<input name="name" value="${safe(fields.name)}" ${c.status==='done'?'disabled':''} maxlength="70"/></label><label class="field">Identificação de teste<input name="id" value="${safe(fields.id)}" ${c.status==='done'?'disabled':''} maxlength="70"/></label><label class="field">Endereço extraído<input name="address" value="${safe(fields.address)}" ${c.status==='done'?'disabled':''} maxlength="90"/></label><label class="field">Renda / observação<input name="income" value="${safe(fields.income)}" ${c.status==='done'?'disabled':''} maxlength="70"/></label></div>${c.status==='done'?'<div class="detail-alert detail-success">Cadastro revisado e concluído manualmente nesta simulação.</div>':`<div class="detail-actions"><button class="btn btn-outline" type="submit">Salvar correções <span>✓</span></button>${c.issues.length?'<button class="btn btn-outline" type="button" data-action="resolve">Resolver pendência na simulação <span>↗</span></button>':''}<button class="btn btn-primary" type="button" data-action="complete" ${completed?'':'disabled title="Faltam documentos ou existem pendências"'}>Concluir após revisão <span>✓</span></button></div>`}</form>`:''}
      </div><aside>
        <div class="detail-section"><h2>Portal do interessado</h2><p>Envio por link fictício. Este endereço não é um token seguro nem uma credencial de produção.</p><code class="share-url">${safe(url)}</code><div class="share-options"><button type="button" data-action="open-portal">↗ Abrir portal</button><button type="button" data-action="copy-link">▣ Copiar link</button></div></div>
        <div class="detail-section"><h2>Histórico de ações</h2><ul class="timeline">${c.history.map(e=>`<li><strong>${safe(e.action)}</strong><small>${safe(e.who)} · ${safe(e.at)}</small></li>`).join('')}</ul></div>
        ${(c.status==='awaiting'||c.status==='processing')?'<div class="detail-section"><p>Quando o interessado enviar um pacote sintético, volte a esta solicitação para acompanhar o processamento.</p><button type="button" class="btn-mini" data-action="refresh">↻ Atualizar situação</button></div>':''}
        <p class="detail-note">Acesso isolado por imobiliária aqui é apenas filtragem local. No SaaS real, o isolamento exigirá autenticação, backend e políticas do banco de dados.</p>
      </aside></div>`;
    const form=$('review-form');
    if(form)form.addEventListener('submit',e=>{e.preventDefault();if(c.status==='done')return;const data=new FormData(form);c.fields=Object.fromEntries(['name','id','address','income'].map(k=>[k,String(data.get(k)||'')]));c.reviewed=true;log(c,'Campos conferidos e corrigidos pela equipe');save();toast('Revisão registrada','Os valores foram atualizados manualmente.');renderDetails();});
  }
  function renderInsights(){const list=cases();const groups=[['Aguardando','awaiting'],['Em processamento','processing'],['Em revisão','review'],['Com pendência','issue'],['Concluídos','done']];
    $('insights-content').innerHTML=`<div class="insight-grid"><div class="insight-card"><span>Solicitações da imobiliária</span><strong>${list.length}</strong><p>Volume criado apenas para demonstração.</p></div><div class="insight-card"><span>Documentos simulados</span><strong>${list.reduce((s,c)=>s+uploadedCount(c),0)}</strong><p>Contagem de itens de checklist, sem upload real.</p></div><div class="insight-card"><span>Cadastros concluídos</span><strong>${list.filter(c=>c.status==='done').length}</strong><p>Finalizados por ação de revisão humana simulada.</p></div></div><div class="insight-chart"><h2>Etapas do fluxo — casos fictícios</h2>${groups.map(([label,status])=>{const n=list.filter(c=>c.status===status).length;return `<div class="bar-line"><span>${label}</span><div class="bar-track"><i style="width:${list.length?n/list.length*100:0}%"></i></div><b>${n}</b></div>`;}).join('')}<p class="insight-disclaimer">Estes indicadores não representam clientes reais, produtividade alcançada, economia ou precisão de IA.</p></div>`;
  }
  function createApplication(e){e.preventDefault();const name=$('create-name').value.trim();if(!name){toast('Informe um nome fictício','A solicitação precisa identificar seu caso de demonstração.');return;}
    state.counter+=1;const id=`MDZ-${String(state.counter).padStart(3,'0')}`;const c=newCase(id,state.tenant,name,$('create-assignee').value);state.cases.push(c);save();goto('details',id);toast('Solicitação criada',`O link fictício ${id} está pronto para a simulação.`);
  }
  function simulateUpload(id,scenario){const c=find(id);if(!c||c.status==='done')return;
    c.status='processing';c.scenario=scenario;log(c,'Pacote documental fictício recebido','Portal de demonstração');save();renderPortal();
    setTimeout(()=>{
      const updated=find(id);if(!updated||updated.status!=='processing')return;
      updated.docs={identity:true,residence:true,income:scenario!=='missing'};
      updated.fields={name:scenario==='mismatch'?'Marina Viera (DIVERGENTE)':updated.name.replace(/\s*\(DEMO\)\s*/ig,'').trim(),id:'***.***.***-** (DEMO)',address:'Rua Inventada, 123 — endereço fictício',income:scenario==='missing'?'':'Renda informada — SIMULADA'};
      updated.issues=scenario==='missing'?['Comprovante de renda não enviado.']:scenario==='mismatch'?['Nome extraído diverge do documento de referência fictício.']:scenario==='illegible'?['Documento de identificação possivelmente ilegível.']:[];
      updated.status=updated.issues.length?'issue':'review';updated.reviewed=false;
      log(updated,updated.issues.length?'Motor simulado sinalizou pendência':'Extração fictícia preparada para revisão','Simulação local');save();renderPortal();
      if(view==='details'&&selectedId===id)renderDetails();
    },650);
  }
  function renderPortal(){
    const params=new URLSearchParams(location.search),id=params.get('id'),c=find(id);
    $('app-layout').hidden=true;$('upload-portal').hidden=false;
    const box=$('portal-content');
    if(!c){box.innerHTML='<div class="portal-paper"><h1>Link não encontrado.</h1><p>Volte ao painel para gerar uma solicitação fictícia.</p><a class="btn btn-primary" href="demo.html">Ir ao painel ↗</a></div>';return;}
    if(c.status==='processing'){box.innerHTML=`<div class="portal-result"><div class="result-symbol">✳</div><h1>Organizando documentos…</h1><p>Estamos simulando a extração e a conferência. Nenhuma IA externa é chamada.</p></div>`;return;}
    if(c.status==='review'||c.status==='done'){
      box.innerHTML=`<div class="portal-result"><div class="result-symbol">✓</div><h1>Documentos enviados.</h1><p>Os três itens fictícios foram recebidos nesta simulação. Agora a equipe realizará a conferência humana.</p><a class="btn btn-primary" href="demo.html">Ver painel da equipe <span>↗</span></a></div>`;return;
    }
    box.innerHTML=`<div class="portal-eyebrow">SOLICITAÇÃO ${safe(c.id)} / DADOS FICTÍCIOS</div><h1>Envie sua documentação.<br><span style="color:#b4232f">Simples e organizado.</span></h1><p>Solicitação criada por ${safe(tenants[c.tenant])}. Este é um portal de <strong>demonstração acadêmica</strong>; não envie documentos verdadeiros.</p><div class="portal-paper"><h2>Documentos solicitados</h2><p>Escolha um pacote de exemplo. Não será feito upload de arquivos nem coleta de dados reais.</p><div class="portal-checklist">${kinds.map(k=>`<div class="portal-item"><i>▤</i><div><strong>${k.label}</strong><small>${k.small}</small></div></div>`).join('')}</div><div class="portal-options"><button type="button" class="portal-option" data-synthetic="complete"><span class="option-icon">✓</span><span><strong>Simular envio completo</strong><small>Três documentos fictícios presentes, sem inconsistência.</small></span><span>›</span></button><button type="button" class="portal-option" data-synthetic="missing"><span class="option-icon">!</span><span><strong>Simular documento faltando</strong><small>O comprovante de renda não chega.</small></span><span>›</span></button><button type="button" class="portal-option" data-synthetic="mismatch"><span class="option-icon">≠</span><span><strong>Simular divergência de nome</strong><small>A extração apresenta uma informação diferente.</small></span><span>›</span></button><button type="button" class="portal-option" data-synthetic="illegible"><span class="option-icon">⌁</span><span><strong>Simular documento ilegível</strong><small>O motor fictício indica baixa legibilidade.</small></span><span>›</span></button></div></div><div class="portal-warning">⚠ Não há upload real, autenticação ou análise por IA nesta tela. Em produção, links precisam de expiração, revogação, tratamento de dados pessoais e revisão de segurança.</div>${c.status==='issue'?'<p>Este processo possui uma pendência. Selecione um pacote completo para simular complementação.</p>':''}`;
  }
  function detailAction(action){const c=find(selectedId);if(!c||c.tenant!==state.tenant)return;
    if(action==='open-portal'){window.open(relPortalUrl(c),'_blank','noopener');toast('Portal aberto','Uma nova aba mostra a simulação de upload.');}
    else if(action==='copy-link'){const url=relPortalUrl(c);if(navigator.clipboard?.writeText){navigator.clipboard.writeText(url).then(()=>toast('Link copiado','Endereço de demonstração copiado.')).catch(()=>toast('Link disponível','Selecione o endereço visível e copie manualmente.'));}else toast('Link disponível','Selecione o endereço visível e copie manualmente.');}
    else if(action==='refresh'){renderDetails();toast('Situação atualizada',labels[c.status]);}
    else if(action==='resolve'){
      if(!c.issues.length)return;
      if(uploadedCount(c)<3){toast('Falta documento','Abra o portal e escolha “envio completo” para simular o complemento.');return;}
      c.issues=[];c.status='review';c.reviewed=true;
      if(c.scenario==='mismatch')c.fields.name=c.name.replace(/\s*\(DEMO\)\s*/ig,'').trim();
      log(c,'Pendência corrigida manualmente na simulação');save();renderDetails();toast('Pendência resolvida','Agora confira o resumo e conclua manualmente.');
    }
    else if(action==='complete'){
      if(uploadedCount(c)!==3||c.issues.length||c.status==='processing'||c.status==='awaiting'){toast('Cadastro incompleto','Confira o checklist e resolva as pendências antes de concluir.');return;}
      const form=$('review-form');
      if(form){const data=new FormData(form);c.fields=Object.fromEntries(['name','id','address','income'].map(k=>[k,String(data.get(k)||'')]));}
      c.status='done';c.reviewed=true;log(c,'Cadastro concluído após revisão humana');save();renderDetails();toast('Cadastro concluído','A conclusão foi uma ação humana dentro da simulação.');
    }
  }
  // Eventos globais delegados: HTML de tabelas/detalhes é reconstruído a cada mudança.
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.case){goto('details',b.dataset.case);return;}
    if(b.dataset.view){goto(b.dataset.view);return;}
    if(b.dataset.go){goto(b.dataset.go);return;}
    if(b.dataset.action){detailAction(b.dataset.action);return;}
    if(b.dataset.synthetic){const id=new URLSearchParams(location.search).get('id');simulateUpload(id,b.dataset.synthetic);return;}
  });
  $('tenant-select').addEventListener('change',e=>{state.tenant=e.target.value;save();goto('dashboard');toast('Imobiliária fictícia alterada','Somente seus casos de demonstração aparecem aqui.');});
  $('create-form').addEventListener('submit',createApplication);
  $('create-cancel').addEventListener('click',()=>goto('dashboard'));
  for(const [id,v] of [['dashboard-new','create'],['applications-new','create'],['guide-start','create'],['view-all','applications']])$(id).addEventListener('click',()=>goto(v));
  $('application-search').addEventListener('input',renderApplications);
  $('status-filter').addEventListener('change',renderApplications);
  $('mobile-menu').addEventListener('click',()=>$('app-sidebar').classList.toggle('mobile-open'));
  $('reset-demo').addEventListener('click',()=>$('confirm-dialog').showModal());
  $('confirm-dialog').addEventListener('close',()=>{if($('confirm-dialog').returnValue!=='confirm')return;state=seed();save();goto('dashboard');toast('Exemplo restaurado','A demonstração voltou ao estado inicial.');});
  window.addEventListener('storage',e=>{if(e.key!==KEY||!e.newValue)return;state=load();if(new URLSearchParams(location.search).get('mode')==='upload')renderPortal();else{updateChrome();renderView();}});
  save();
  const params=new URLSearchParams(location.search);
  if(params.get('mode')==='upload')renderPortal();
  else{goto('dashboard');}
  window.ModernizeDemo = {getState:()=>JSON.parse(JSON.stringify(state)),goto,simulateUpload,reset:()=>{state=seed();save();goto('dashboard');}};
})();
