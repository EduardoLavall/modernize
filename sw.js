/* Cache offline da Modernize. Online usa a versão ATUAL, não o HTML antigo.
   O SW anterior (v4) era cache-first e podia exibir slides antigos mesmo após deploy. */
const CACHE = 'modernize-site-v5';
const FILES = [
  './','./index.html','./slides.html','./demo.html',
  './landing/','./landing/index.html','./landing/styles.css','./landing/main.js',
  './landing/assets/brand/Modernize%20logo.png',
  './landing/assets/brand/Glossy%20Red%20and%20Graphite%20M%20Logo.png',
  './css/app.css','./css/slides.css','./css/demo.css',
  './js/finance.js','./js/team.js','./js/slides.js','./js/demo.js',
  './assets/brand/Modernize%20logo.png',
  './assets/brand/Glossy%20Red%20and%20Graphite%20M%20Logo.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('modernize-site-')&&key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  event.respondWith(
    // Rede primeiro e cache offline como fallback. Respeita versões novas do deploy.
    fetch(request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));
      }
      return response;
    }).catch(()=>caches.match(request).then(cached=>cached||Response.error()))
  );
});
