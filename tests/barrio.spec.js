import {test,expect} from '@playwright/test'
import {useStory} from '../src/useStory.js'
import {pathTo,blocked} from '../src/paths.js'
import {decodeSave} from '../src/keepsakes.js'

test('Un plan sobrevive a la noche: carta, flor, merienda y lluvia',()=>{
 const v=useStory({lang:'en'});v.start(0)
 const pick=(label)=>{const n=v.nodes.value.find(n=>n.label===label);expect(n,`${v.s.scene}: ${label}`).toBeTruthy();n.run();while(v.dialog.value)v.next()}
 for(const n of ['Find a rental','Ask the receptionist','Through the wall','To the hallway','Knock on 18','Mail a drawing','Garden','Sow a daisy','Plan a picnic','Hallway','No. 15','Sleep','To the hallway','Open mailbox','Garden','Give the first flower','Café','Our picnic','Discover their drink','Order vanilla milk for two','Hallway','Rooftop','Shelter from the rain','Listen to the roof'])pick(n)
 expect(v.s.album.map(c=>c.id)).toEqual(expect.arrayContaining(['song','letter','flower','picnic','drink','rain']))
 expect(decodeSave(JSON.stringify({version:1,route:v.s}))).toMatchObject({actor:0,day:2,scene:'glass',flower:true})
 expect(()=>decodeSave('{"version":1,"route":{"scene":"__proto__"}}')).toThrow()
})
test('Camino alrededor de la mesa',()=>{
 const s={scene:'cafe',x:16,y:78},path=pathTo(s,49,78);expect(path.length).toBeGreaterThan(1)
 let a=s;for(const b of path){for(let i=1;i<=50;i++)expect(blocked(s,a.x+(b.x-a.x)*i/50,a.y+(b.y-a.y)*i/50)).toBe(false);a=b}
})
test('Visita al 15 y un único ritual dominical',()=>{
 const v=useStory({lang:'en'})
 v.start(1);Object.assign(v.s,{scene:'cafe',period:1,points:250,day:7,met:true,key:true,bag:true})
 const pick=label=>{const n=v.nodes.value.find(n=>n.label===label);expect(n,label).toBeTruthy();n.run();while(v.dialog.value)v.next()}
 pick('An invitation home');pick('Hallway');pick('Lift directory');expect(v.map.value).toBe(true);v.map.value=false
 pick('Visit neighbour');pick('The old ticket');expect(v.s.album.at(-1).id).toBe('guest')
 pick('Hallway');pick('No. 18');v.s.wed=true;pick('Sleep');pick('Breakfast at 15');expect(v.s.scene).toBe('guest')
 pick('Hallway');pick('No. 18');expect(v.nodes.value.map(n=>n.label)).not.toContain('Breakfast at 15')
})
test('Descarga sin red y postal PNG',async({page,context})=>{
 await page.goto('/');await page.getByRole('button',{name:/Sonido e idioma/}).click()
 await page.getByRole('button',{name:'Descargar para jugar sin red'}).click()
 await expect(page.getByRole('status')).toContainText('Listo sin red')
 await context.setOffline(true);await page.reload()
 await page.getByRole('button',{name:/Franxito/}).click();await expect(page.locator('.world svg')).toBeVisible()
 await page.locator('.album-btn').click();await page.getByRole('button',{name:'Modo postal'}).click()
 const download=page.waitForEvent('download',{timeout:7000});await page.getByRole('button',{name:'Descargar postal'}).click()
 expect((await download).suggestedFilename()).toMatch(/\.png$/)
})
