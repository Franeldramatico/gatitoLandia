import {test,expect} from '@playwright/test'

for(const mobile of [false,true])test(mobile?'Aranxita: tren, naranjas y memoria en vertical':'Franxito: vuelo, primer saludo y guardados separados',async({page})=>{
 await page.setViewportSize(mobile?{width:390,height:844}:{width:1200,height:760})
 await page.goto('/')
 const cat=mobile?'Aranxita':'Franxito',errors=[]
 page.on('pageerror',e=>errors.push(e.message))
 await page.getByRole('button',{name:new RegExp(cat)}).click()
 const actor=page.locator('.actor.controlled')
 for(const [key,dir] of [['ArrowLeft',-1],['ArrowRight',1]]){
   const before=await actor.evaluate(el=>parseFloat(el.style.left))
   await page.keyboard.down(key)
   await expect.poll(()=>actor.evaluate(el=>parseFloat(el.style.left))).not.toBe(before)
   expect(await actor.evaluate(el=>Number(el.style.getPropertyValue('--face')))).toBe(mobile?-dir:dir)
   await page.keyboard.up(key)
   await expect.poll(()=>actor.evaluate(el=>Number(el.style.getPropertyValue('--face')))).toBe(dir)
 }
 const node=name=>page.locator('.node').filter({hasText:name}).click()
 const speech=page.locator('.speech')
 async function lines(n){for(let i=0;i<n;i++){await expect(speech).toBeVisible();const b=await speech.boundingBox();expect(b.x).toBeGreaterThanOrEqual(-1);expect(b.y).toBeGreaterThanOrEqual(0);expect(b.x+b.width).toBeLessThanOrEqual((mobile?390:1200)+1);await speech.click()}}
 const location=text=>expect(page.locator('.hud h2')).toHaveText(text)
 await node(mobile?'Mirar el celular':'Buscar alquiler');await lines(mobile?3:2)
 await location('Recepción');await node('Hablar con recepción');await lines(3)
 if(mobile){await node('Recoger las naranjas');for(let i=0;i<3;i++)await page.getByRole('button',{name:'Recoger naranja',exact:true}).click();await lines(3)}
 else{await node('Salir al pasillo');await node('Llamar al 18');await lines(3)}
 await expect(page.locator('.hud')).toContainText('Amigos')
 if(mobile){await node('Almacén');await node('Una mandarina');await lines(1);await node('Pasillo')}
 await node('Depto.')
 for(let i=0;i<12;i++){await node('Decorar');await expect(page.locator('.illustration')).toHaveAttribute('data-decor',String(i+1))}
 await expect(page.locator('.illustration')).toHaveAttribute('data-decor','12')
 await expect(page.locator('.node').filter({hasText:/Room complete|Habitación completa/})).toBeVisible()
 await node('Dormir');await lines(1);await expect(page.locator('.hud')).toContainText('DÍA 2')
 await expect(page.getByRole('button',{name:/Dormir/})).toBeFocused()
 await page.locator('.album-btn').click();await expect(page.locator('.album article')).toHaveCount(mobile?2:1)
 await page.getByRole('button',{name:'Cerrar'}).click();await page.locator('.homebtn').click()
 await page.getByRole('button',{name:new RegExp(mobile?'Franxito':'Aranxita')}).click()
 await page.locator('.homebtn').click();await page.reload()
 await page.getByRole('button',{name:new RegExp(cat)}).click()
 await page.getByRole('button',{name:'Continuar',exact:true}).click();await location(`Departamento ${mobile?18:15}`)
 await expect(page.locator('.hud')).toContainText('DÍA 2')
 expect(errors).toEqual([])
})
