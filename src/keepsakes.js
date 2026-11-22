import {titles} from './useStory.js'
import {extras} from './barrio.js'
export function download(blob,name){
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)
}
export function decodeSave(text){
 if(text.length>200000)throw Error()
 const {version,route:v}=JSON.parse(text)
 if(version!==1||!v||![0,1].includes(v.actor)||!Object.hasOwn(titles,v.scene)||!Number.isInteger(v.day)||v.day<1)throw Error()
 const out={actor:v.actor,scene:v.scene,day:v.day}
 for(const [k,max] of Object.entries({x:100,y:100,period:2,points:1000,decor:3,...Object.fromEntries(Object.entries(extras()).filter(([,v])=>typeof v==='number').map(([k])=>[k,1e7]))})){
  const n=v[k]??0;if(!Number.isFinite(n)||n<0||n>max)throw Error();out[k]=n
 }
 for(const k of ['met','bag','key','bought','wed','gift',...Object.keys(extras()).filter(k=>typeof extras()[k]==='boolean')])out[k]=v[k]===true
 if(!Array.isArray(v.album)||v.album.length>500||!Array.isArray(v.recent)||v.recent.length>5)throw Error()
 out.album=v.album.map(c=>{if(!c||!Object.hasOwn(titles,c.scene)||!Number.isInteger(c.day)||!['id','es','en'].every(k=>typeof c[k]==='string'&&c[k].length<1000))throw Error();return {id:c.id,es:c.es,en:c.en,scene:c.scene,day:c.day}})
 out.recent=v.recent.filter(k=>typeof k==='string'&&k.length<80)
 return out
}
const loadImage=src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src})
export async function photograph(world,scrollLeft,viewportWidth,caption){
 const svg=world.querySelector('.illustration').cloneNode(true);svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width','1600');svg.setAttribute('height','680')
 const img=await loadImage('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg)))
 const width=world.offsetWidth,height=world.offsetHeight,scale=Math.min(2,1600/viewportWidth),pad=24,foot=84,canvas=document.createElement('canvas')
 const sceneW=Math.round(viewportWidth*scale),sceneH=Math.round(height*scale)
 canvas.width=sceneW+pad*2;canvas.height=sceneH+pad+foot
 const ctx=canvas.getContext('2d')
 ctx.fillStyle='#fbf4e4';ctx.fillRect(0,0,canvas.width,canvas.height)
 ctx.strokeStyle='rgba(154,128,92,0.45)';ctx.lineWidth=2;ctx.strokeRect(10,10,canvas.width-20,canvas.height-20)
 ctx.save();ctx.translate(pad,pad);ctx.beginPath();ctx.rect(0,0,sceneW,sceneH);ctx.clip();ctx.scale(scale,scale);ctx.translate(-scrollLeft,0);ctx.drawImage(img,0,0,width,height)
 for(const actor of world.querySelectorAll('.actor')){const cut=actor.querySelector('img');await cut.decode();const h=Math.min(actor.offsetHeight,actor.offsetWidth*cut.naturalHeight/cut.naturalWidth),w=h*cut.naturalWidth/cut.naturalHeight
  ctx.save();ctx.translate(actor.offsetLeft,actor.offsetTop);const transform=getComputedStyle(actor).transform;ctx.scale(transform!=='none'&&new DOMMatrix(transform).a<0?-1:1,1);ctx.drawImage(cut,-w/2,-h,w,h);ctx.restore()}
 ctx.restore()
 ctx.strokeStyle='#d6c3a1';ctx.lineWidth=1.5;ctx.strokeRect(pad,pad,sceneW,sceneH)
 ctx.fillStyle='#2f5448';ctx.font='italic 600 22px Georgia, serif';ctx.fillText(caption,pad+6,canvas.height-32,sceneW-130)
 ctx.save();ctx.translate(canvas.width-pad-44,canvas.height-42);ctx.rotate(-0.14);ctx.strokeStyle='rgba(182,93,67,0.72)';ctx.fillStyle='rgba(182,93,67,0.72)';ctx.lineWidth=1.8
 ctx.beginPath();ctx.arc(0,0,26,0,Math.PI*2);ctx.stroke()
 ctx.beginPath();ctx.arc(0,0,21,0,Math.PI*2);ctx.lineWidth=0.9;ctx.stroke()
 ctx.font='700 8px sans-serif';ctx.textAlign='center';ctx.fillText('VILLA BIGOTES',0,-2);ctx.fillText('ED. 01',0,9);ctx.restore()
 const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));if(!blob)throw Error();download(blob,'villa-bigotes-postal.png')
}
