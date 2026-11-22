// Foot-level collision shapes, in the same percentage coordinates as the scene.
export const furniture={cafe:[{x:31,y:78,w:13,h:6}],garden:[{x:54,y:79,w:9,h:6}],room:[{x:67,y:73,w:7,h:4}],guest:[{x:67,y:73,w:7,h:4}]}
export const objects=(s)=>s.scene==='room'&&!s.decor?[]:furniture[s.scene]||[]
export const blocked=(s,x,y)=>objects(s).some(r=>Math.abs(x-r.x)<r.w/2+1&&Math.abs(y-r.y)<r.h/2+1)
export function pathTo(s,x,y){
 const end={x:Math.max(9,Math.min(91,x)),y:Math.max(68,Math.min(94,y))}
 const clear=(a,b)=>{const n=Math.max(1,Math.ceil(Math.hypot(a.x-b.x,a.y-b.y)));for(let i=1;i<=n;i++)if(blocked(s,a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n))return false;return true}
 if(blocked(s,end.x,end.y))while(blocked(s,end.x,end.y)&&end.y<94)end.y++
 if(clear(s,end))return [end]
 const vertices=[{x:s.x,y:s.y},end,...objects(s).flatMap(r=>[-1,1].flatMap(i=>[-1,1].map(j=>({x:r.x+i*(r.w/2+2),y:r.y+j*(r.h/2+2)}))))]
 const queue=[[0]],visited=new Set([0])
 while(queue.length){const p=queue.shift(),last=p.at(-1);for(let i=1;i<vertices.length;i++){if(visited.has(i)||!clear(vertices[last],vertices[i]))continue;if(i===1)return [...p.slice(1),1].map(k=>vertices[k]);visited.add(i);queue.push([...p,i])}}
 return []
}
