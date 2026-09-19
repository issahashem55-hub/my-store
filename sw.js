const CACHE="abu-akbar-premium-v3";
const CORE=["./","./index.html","./apps.json","./manifest.json","./images/app-icon-192.png","./images/app-icon-512.png","./images/profile.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(u.pathname.endsWith("/apps.json")){
  e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("./apps.json",c));return r}).catch(()=>caches.match("./apps.json")));return;
 }
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){const c2=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c2))}return r}).catch(()=>caches.match("./index.html"))));
});