/* Cache estático da apresentação: fica disponível offline DEPOIS da primeira visita bem-sucedida.
   Dados do protótipo permanecem no navegador; nenhum documento real deve ser usado. */
const CACHE='modernize-pitch-v2';
const FILES=['./','./index.html','./slides.html','./demo.html','./css/app.css','./css/slides.css','./css/demo.css','./js/finance.js','./js/team.js','./js/slides.js','./js/demo.js','./assets/brand/Modernize%20logo.png','./assets/brand/Glossy%20Red%20and%20Graphite%20M%20Logo.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;event.respondWith(caches.match(request,{ignoreSearch:true}).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}return response})))})
