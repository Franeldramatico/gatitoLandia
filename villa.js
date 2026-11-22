const el=id=>document.getElementById(id);
let seed=13;const rand=()=> (seed=seed*16807%2147483647)/2147483647;
let garden='<path d="M655 208l6-98h16l10 98Z" fill="#a48560"/>';
for(let i=0;i<150;i++){const a=rand()*6.283,r=Math.sqrt(rand());garden+=`<ellipse cx="${669+Math.cos(a)*78*r}" cy="${96+Math.sin(a)*64*r}" rx="17" ry="13" fill="${['#8eaf78','#95b77b','#a8c789'][i%3]}"/>`}
for(let i=0;i<85;i++){const x=rand()*800,y=226+rand()*114;if(x>140&&x<370)continue;garden+=`<path d="M${x} ${y}l-2 -5m2 5 3 -4" fill="none" stroke="#789a65" stroke-width="2"/>`;if(i%4===0)garden+=`<circle cx="${x-2}" cy="${y-6}" r="3" fill="#fff2c4"/>`}
el('garden').innerHTML=garden;
const initial={xp:0,energy:80,hour:9,home:false,wed:false,pose:'quieta',msg:'Dos amigos, una casita y toda la tarde por delante.'};
let s={...initial};try{Object.assign(s,JSON.parse(localStorage.getItem('villaBigotes1')))}catch{}
const stages=[[0,'Amigos'],[25,'Mejores amigos'],[50,'Haciéndose ojitos'],[75,'Novios']];
// nombre, vínculo, energía, horas, pose, resultado
const patio=[
 ['Buscar tréboles',7,-10,1,'sienta','Aranxita encuentra un trébol de tres hojas. Franxito pone la patita al lado: «¡Ahora tiene cuatro!»'],
 ['Jugar a perseguirse',12,-22,2,'feliz','Dan tres vueltas al árbol. Nadie recuerda quién perseguía a quién.'],
 ['Mirar las nubes',4,10,1,'siesta','Se tumban en el pasto. Los dos ven un pez en la misma nube.']
], casa=[
 ['Hornear galletitas',9,-12,2,'feliz','La primera tanda sale con forma de patitas. La segunda desaparece antes de enfriarse.'],
 ['Charlar en la alfombra',6,-5,1,'sienta','Franxito cuenta un secreto. Aranxita acerca la orejita y le confía uno suyo.'],
 ['Dormir la siesta',2,38,3,'siesta','Se acurrucan al sol de la ventana. La casa entera parece ronronear.']
];
function save(){try{localStorage.setItem('villaBigotes1',JSON.stringify(s))}catch{}}
function stage(){return s.wed?'Casados':stages.filter(([n])=>n<=s.xp).at(-1)[1]}
function add(name,fn,disabled=false){const b=document.createElement('button');b.textContent=name;b.disabled=disabled;b.onclick=fn;el('actions').append(b)}
function draw(){
 el('world').classList.toggle('home',s.home);el('travel').textContent=s.home?'Salir al jardín ↗':'Entrar en casa ↗';
 el('clock').textContent=`Día ${1+Math.floor(s.hour/24)} · ${String(s.hour%24).padStart(2,'0')}:00`;el('location').textContent=s.home?'EN CASA · SALÓN':'AL AIRE LIBRE · JARDÍN';
 for(const [id,cat] of [['catF','franxito'],['catA','aranxita']])el(id).src=`habitantes/${cat}-${s.pose}.png`;
 el('catF').style.left=s.pose==='siesta'?'47%':s.pose==='camina'?'37%':'44%';el('catA').style.left=s.pose==='siesta'?'56%':s.pose==='feliz'?'66%':'60%';
 el('level').textContent=s.xp+'/100';el('xp').value=s.xp;el('energy').textContent=s.energy+'/100';el('stamina').value=s.energy;el('bond').textContent=stage();
 const next=stages.find(([n])=>n>s.xp);el('next').textContent=next?`Nivel ${next[0]} · ${next[1]}`:s.wed?'♡ Siguen escribiendo su vida juntos.':s.xp<100?'Nivel 100 · Boda en el jardín':'¡Ya pueden celebrar su boda en el jardín!';
 el('report').textContent=s.msg;el('actions').replaceChildren();
 const opts=[...(s.home?casa:patio)];
 if(s.xp>=50)opts.push([s.xp>=75?'Darse un besito':'Intercambiar miraditas',8,-4,1,'feliz','Se miran de reojo. Esta vez ninguno aparta la mirada.']);
 for(const [name,x,e,h,p,msg] of opts)add(name,()=>{const was=stage();s.xp=Math.min(100,s.xp+x);s.energy=Math.min(100,s.energy+e);s.hour+=h;s.pose=p;s.msg=msg+(stage()!==was?` ¡Ahora son ${stage().toLowerCase()}!`:'');save();draw()},s.energy+e<0);
 if(!s.wed&&s.xp===100&&!s.home)add('♡ Celebrar la boda',()=>{s.wed=true;s.hour+=2;s.pose='feliz';s.msg='Bajo el árbol del jardín intercambian anillitos de trébol. «Sí, contigo», dicen a la vez. ¡Recién casados!';save();draw()});
}
el('travel').onclick=()=>{s.home=!s.home;s.pose='camina';s.msg=s.home?'Empujan la puerta. Dentro huele a madera y vainilla.':'Salen juntos al pasto fresco del jardín.';save();draw()};draw();
