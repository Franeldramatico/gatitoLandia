import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Build the offline inventory from Vite's actual hashed files. Downloading it
// is opt-in: opening the menu never starts fetching both routes' artwork.
function offlineEdition(){return {name:'villa-offline',apply:'build',enforce:'post',generateBundle(_,bundle){
 const files=[...Object.keys(bundle),'manifest.webmanifest','icon-192.png','icon-512.png','retrato-franxito.webp','retrato-aranxita.webp']
 this.emitFile({type:'asset',fileName:'sw.js',source:`
const files=${JSON.stringify(files)},scope=self.registration.scope,prefix='villa-offline:'+scope+':',id=prefix+${JSON.stringify(files.find(f=>f.endsWith('.js')))};
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('message',e=>{if(e.data==='download')e.waitUntil((async()=>{try{const c=await caches.open(id);await c.addAll(files.map(f=>new URL(f,scope)));for(const k of await caches.keys())if(k.startsWith(prefix)&&k!==id)await caches.delete(k);e.ports[0].postMessage('ok')}catch{e.ports[0].postMessage('error')}})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(scope))return;e.respondWith((async()=>{const c=await caches.open(id);if(e.request.mode==='navigate'){try{return await fetch(e.request)}catch{const r=await c.match(new URL('index.html',scope),{ignoreVary:true});return r||Response.error()}}return (await c.match(e.request,{ignoreVary:true}))||fetch(e.request)})())});`})
}}}
export default defineConfig({ base: './', plugins: [vue(),offlineEdition()] })
