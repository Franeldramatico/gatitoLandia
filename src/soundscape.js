// Short procedural field sounds; no downloads or autoplay before a gesture.
export function fieldSound(ctx,scene,period,volume){
 if(!ctx||!volume||ctx.state!=='running')return
 const now=ctx.currentTime
 function tone(hz,duration,delay,type='sine',end=hz){
   const o=ctx.createOscillator(),g=ctx.createGain(),at=now+delay
   o.type=type;o.frequency.setValueAtTime(hz,at);o.frequency.exponentialRampToValueAtTime(end,at+duration)
   g.gain.setValueAtTime(.00001,at);g.gain.exponentialRampToValueAtTime(volume*.00024,at+.035);g.gain.exponentialRampToValueAtTime(.00001,at+duration)
   o.connect(g).connect(ctx.destination);o.start(at);o.stop(at+duration+.01)
 }
 function breeze(){
   const len=ctx.sampleRate*2,b=ctx.createBuffer(1,len,ctx.sampleRate),a=b.getChannelData(0)
   for(let i=0;i<len;i++)a[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/len)**2
   const n=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();n.buffer=b;f.type='lowpass';f.frequency.value=scene==='roof'?680:320;g.gain.value=volume*.0012;n.connect(f).connect(g).connect(ctx.destination);n.start()
 }
 if(scene==='rail'){for(let i=0;i<5;i++)tone(110,.13,i*.21,'triangle',61)}
 else if(scene==='cafe'){tone(1520,.27,0);tone(2020,.22,.18)}
 else if(scene==='roof'||scene==='air')breeze()
 else if(scene==='desk'||scene==='hall'){tone(170,.09,0,'triangle',92);tone(185,.08,.49,'triangle',102)}
 else if(scene==='market'){tone(840,.42,0);tone(1120,.32,.09)}
 else if(period===2){tone(360,.38,0);tone(262,.55,.45)}
 else{tone(930,.2,0,'sine',1490);tone(1420,.16,.22,'sine',1080)}
}
