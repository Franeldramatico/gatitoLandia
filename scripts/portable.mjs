// A second distribution for file://, where module fetches are blocked. The
// hosted build still loads scene chunks and game artwork only when needed.
import {build} from 'vite'
import vue from '@vitejs/plugin-vue'
import {writeFile} from 'node:fs/promises'

const result=await build({
  configFile:false,publicDir:false,base:'./',plugins:[vue()],logLevel:'error',
  build:{write:false,assetsInlineLimit:Infinity,cssCodeSplit:false,modulePreload:false,
    rollupOptions:{input:'src/main.js',output:{inlineDynamicImports:true,format:'iife',name:'VillaBigotes'}}}
})
const items=result.output,js=items.find(i=>i.type==='chunk').code
const css=items.filter(i=>i.type==='asset'&&i.fileName.endsWith('.css')).map(i=>i.source).join('\n')
const html=`<!DOCTYPE html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Villa Bigotes · Edición portátil</title><style>${css}</style><body><div id="app"></div><script>${js.replace(/<\/script/gi,'<\\/script')}</script></body></html>`
await writeFile('Villa Bigotes.html',html)
await writeFile('dist/Villa Bigotes.html',html)
