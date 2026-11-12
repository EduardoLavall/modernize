/* Modernize 2026: Service Worker SEM cache de páginas/scripts.
   Revisão de segurança para impedir pitch antigo após deploy.
   O precache v4/v5 tinha política cache-first e devolvia slides obsoletos. */
const RELEASE='modernize-online-v6';
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Limpa os caches dos SWs anteriores, mesmo quando estavam ativos.
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('modernize-site-'))
      .map(key=>caches.delete(key)));
    await self.clients.claim();
    // Recarrega os slides já abertos após tomar controle, uma única vez
    // nesta ativação. A nova navegação não é servida pelo SW cache-first.
    const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    await Promise.all(clients
      .filter(client=>new URL(client.url).pathname.endsWith('/slides.html'))
      .map(client=>client.navigate(client.url).catch(()=>null)));
  })());
});
// Sem evento de fetch: online o navegador acessa a rede normalmente,
// e nunca há cache persistente de slides HTML/JS controlado por SW.
