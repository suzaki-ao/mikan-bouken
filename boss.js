'use strict';
const BD=(n,hp,dmg,r,exp,gold,rec,weak,shot,lists,spd,fn,tint)=>({name:n,hp,dmg,r,exp,gold,rec,weak,shot,lists,spd,fn,tint});
const FN=(a,b)=>['','第2形態「'+a+'」','最終形態「'+b+'」'];
const BDEF={
 forest:BD('もりのぬし',9000,55,3.4,1500,600,15,'fire',0x9a6a30,[['charge','roots','seeds'],['charge','roots','seeds','wave','spF'],['charge','rain','seeds','wave','roots','spF']],[1,1.25,1.55],FN('ざわめく森','暴走する大樹'),[0,0x226622,0x882211]),
 valley:BD('たきのまもりがみ',24000,110,4.6,6000,2500,30,'thunder',0x6ad0ff,[['seeds','wave','roots'],['seeds','wave','rain','charge','spV'],['seeds','rain','wave','charge','beam','spV']],[1,1.22,1.5],FN('荒れ狂う水流','大瀑布'),[0,0x1a4a88,0x4422aa]),
 rock:BD('いわやまのきょじん',52000,230,5,20000,8000,48,'',0x8a847c,[['slam','seeds','charge'],['slam','beam','seeds','rain','spR'],['slam','rain','beam','charge','wave','spR']],[1,1.2,1.45],FN('岩砕き','大地の怒り'),[0,0x663300,0xaa2200]),
 gate:BD('魔王城の門番ガーディアン',110000,400,5,80000,30000,80,'light',0xb050ff,[['slam','charge','seeds','beam'],['slam','rain','beam','wave','charge'],['slam','rain','beam','wave','charge','roots','seeds']],[1.1,1.3,1.55],FN('闇の咆哮','終焉の守護者'),[0,0x442288,0xaa1155]),
 emperor:BD('ぷにぷにエンペラー',5000,38,4,600,300,8,'',0x6adf3a,[['charge','seeds'],['charge','seeds','roots'],['charge','rain','seeds','wave']],[1,1.2,1.45],FN('怒れる皇帝','巨大化'),[0,0x226622,0x882211]),
 queen:BD('キノコの女王',14000,75,4.5,3000,1200,18,'fire',0xb060ff,[['seeds','roots','wave'],['seeds','roots','rain','wave'],['seeds','rain','wave','charge','roots']],[1,1.2,1.5],FN('胞子の嵐','毒の女王'),[0,0x552288,0x992266]),
 crabking:BD('ハサミガニ王',30000,150,5,12000,4000,32,'thunder',0xff8a3a,[['charge','slam','seeds'],['charge','slam','roots','wave'],['charge','rain','slam','wave','seeds']],[1,1.25,1.5],FN('大はさみ','怒りの甲殻'),[0,0xaa4400,0xcc1100]),
 golemking:BD('ゴーレムキング',60000,280,6,40000,12000,48,'',0xc08040,[['slam','seeds','beam'],['slam','beam','rain','charge'],['slam','rain','beam','wave','charge']],[1,1.2,1.4],FN('溶岩の巨人','大地震'),[0,0x883300,0xcc2200]),
 deathknight:BD('デスナイト',95000,480,3.6,120000,40000,72,'light',0x4a90ff,[['charge','beam','roots','seeds'],['charge','beam','rain','wave','seeds'],['slam','rain','beam','wave','charge','roots']],[1.1,1.3,1.55],FN('冥界の剣','死神の舞'),[0,0x103080,0x6010a0]),
 demon:Object.assign(BD('やみのまおう',70000,800,3.6,300000,100000,100,'light',0xb040ff,[['charge','seeds','roots','beam'],['charge','seeds','rain','beam','wave'],['slam','rain','beam','wave','charge','roots','seeds']],[1,1.25,1.55],['','最終形態「魔神」','終焉「世界を覆う闇」'],[0,0x660022,0xaa1100]),{gauges:3})};
const SPNAME={spF:'世界樹の怒り',spV:'大瀑布の裁き',spR:'大地割りの極み'};
const REVIVE={forest:{hp:30000,dmg:420},valley:{hp:45000,dmg:520},rock:{hp:65000,dmg:640}};
const bossTgMat=()=>new T.MeshBasicMaterial({color:0xff2a1a,transparent:true,opacity:.35,depthWrite:false,fog:false,side:T.DoubleSide});
function ensureTg(b){if(b.tr)return;b.tr=new T.Mesh(new T.PlaneGeometry(1,1).rotateX(-Math.PI/2),bossTgMat());b.tr.visible=false;scene.add(b.tr);
 b.td=[];for(let i=0;i<14;i++){const m=new T.Mesh(new T.CircleGeometry(3.5,28).rotateX(-Math.PI/2),bossTgMat());m.visible=false;scene.add(m);b.td.push(m)}
 b.wr=new T.Mesh(new T.RingGeometry(.9,1,56).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xffd04a,transparent:true,opacity:.8,depthWrite:false,fog:false,side:T.DoubleSide,blending:T.AdditiveBlending}));b.wr.visible=false;scene.add(b.wr);b.tx=[];for(let i=0;i<3;i++){const m=new T.Mesh(new T.PlaneGeometry(1,1).rotateX(-Math.PI/2),bossTgMat());m.visible=false;scene.add(m);b.tx.push(m)}}
function makeBossObj(id,x,z,ar,def,scale){const m=makeBossModel(id),y=H(x,z);m.g.position.set(x,y,z);scene.add(m.g);
 return{id,def,name:def.name,x,z,ax:x,az:z,hx:x,hz:z,har:ar,ar,xf:false,ultDone:false,sk:0,y,hp:def.hp,max:def.hp,alive:true,engaged:false,st:'fight',t:0,atk:null,stage:'',n:-1,form:0,gauge:0,r:def.r,flash:0,rest:false,boss:true,inv:false,sh:false,g:m.g,fm:m.fm,dx:0,dz:1,hit:false,tg:[],sf:false,wv:0,whit:false,wx:0,wz:0,dieT:undefined,mult:1,minion:false,minions:null}}
const BS=[];
ARENAS.forEach(a=>BS.push(makeBossObj(a.id,a.x,a.z,a.ar,BDEF[a.id])));
DUNS.forEach(d=>BS.push(makeBossObj(d.bossId,d.bx,d.bz,d.bar,BDEF[d.bossId])));
{const dm=BS.find(b=>b.id==='demon');const m=makeBossModel('demon2');m.g.visible=false;m.g.position.set(dm.x,dm.y,dm.z);scene.add(m.g);dm.altG=m.g;dm.altFm=m.fm}
const engagedBosses=()=>BS.filter(b=>b.alive&&b.engaged);
const bossById=id=>BS.find(b=>b.id===id&&!b.minion);
let gateT=-99;
function clearTele(b){if(!b.tr)return;b.tx.forEach(m=>m.visible=false);b.tr.visible=false;b.td.forEach(m=>m.visible=false);b.wr.visible=false}
function resetBoss(b){if(b.xf){const og=b.g,ofm=b.fm;b.g=b.altG;b.fm=b.altFm;b.altG=og;b.altFm=ofm;og.visible=false;b.g.visible=true;b.xf=false}b.ax=b.hx;b.az=b.hz;b.ar=b.har;b.r=b.def.r;b.ultDone=false;b.engaged=false;b.hp=b.max;b.form=0;b.gauge=0;b.atk=null;b.t=0;b.st='fight';b.inv=false;b.sh=false;b.rest=false;b.wv=0;b.x=b.ax;b.z=b.az;b.y=H(b.x,b.z);b.g.scale.setScalar(1);b.g.rotation.set(0,0,0);b.g.position.set(b.x,b.y,b.z);clearTele(b);
 if(b.minions)b.minions.forEach(m=>{m.alive=false;m.engaged=false;m.g.visible=false;m.dieT=undefined;clearTele(m)});if(!engagedBosses().length)$('boss').classList.add('hidden')}
function clampArena(b){const c=Math.hypot(b.x-b.ax,b.z-b.az),L=b.ar;if(c>L){b.x=b.ax+(b.x-b.ax)/c*L;b.z=b.az+(b.z-b.az)/c*L}}
function endBossAtk(b){b.atk=null;b.t=0;b.rest=false;b.g.rotation.x=0}
function launchWave(b){ensureTg(b);b.wv=.001;b.whit=false;b.wx=b.x;b.wz=b.z;b.wr.visible=true;b.wr.position.set(b.x,b.y+.5,b.z);tone(100,.5,'sawtooth',.08,-30)}
function startBossAtk(b,a){ensureTg(b);b.atk=a;b.stage='tele';b.t=0;b.hit=false;b.sf=false;b.rest=false;
 if(a==='charge'||a==='beam'){const l=Math.hypot(P.x-b.x,P.z-b.z)||1;b.dx=(P.x-b.x)/l;b.dz=(P.z-b.z)/l;const len=a==='charge'?24:46,w=a==='charge'?6.5:5.5;
  b.tr.visible=true;b.tr.position.set(b.x+b.dx*len/2,b.y+.4,b.z+b.dz*len/2);b.tr.rotation.y=Math.atan2(b.dx,b.dz);b.tr.scale.set(w,1,len);tone(150,.5,'sawtooth',.06,100)}
 else if(a==='roots'||a==='rain'){b.tg=[];b.td.forEach(m=>m.material.color.setHex(0xff2a1a));const n=Math.min(14,a==='rain'?9+b.form*2:3+b.form*2);
  for(let i=0;i<n;i++){let tx,tz;if(i===0||(a==='roots'&&i<3)){tx=P.x+(i?(Math.random()-.5)*7:0);tz=P.z+(i?(Math.random()-.5)*7:0)}else{const ang=Math.random()*6.283,rr=Math.sqrt(Math.random())*b.ar;tx=b.ax+Math.cos(ang)*rr;tz=b.az+Math.sin(ang)*rr}
   const dd=Math.hypot(tx-b.ax,tz-b.az);if(dd>b.ar+6){tx=b.ax+(tx-b.ax)/dd*(b.ar+6);tz=b.az+(tz-b.az)/dd*(b.ar+6)}
   b.tg.push([tx,tz]);const m=b.td[i];m.visible=true;m.position.set(tx,H(tx,tz)+.4,tz);m.scale.setScalar(.2)}}
 else if(a==='slam'){const m=b.td[0];m.material.color.setHex(0xff2a1a);m.visible=true;m.position.set(b.x,b.y+.4,b.z);m.scale.setScalar(.3)}
 else if(a==='spF'||a==='spV'||a==='spR'){toast('⚠ スペシャル攻撃「'+SPNAME[a]+'」！',2200);tone(70,1.2,'sawtooth',.1,-20);b.sk=0;
  if(a==='spF'){b.tg=[];for(let i=0;i<14;i++){const ang=i/14*6.283*2.3,rr=Math.min(b.ar,6+i*2.4);let tx=b.ax+Math.cos(ang)*rr,tz=b.az+Math.sin(ang)*rr;if(i===0){tx=P.x;tz=P.z}b.tg.push([tx,tz]);const m=b.td[i];m.material.color.setHex(0xff2a1a);m.visible=true;m.position.set(tx,H(tx,tz)+.4,tz);m.scale.setScalar(.2)}}
  else if(a==='spR'){const angs=[0,1.5708,3.1416,4.7124].map(x=>x+(b.form>=2?.785:0));b.spa=angs;[b.tr,...b.tx].forEach((m,i)=>{m.visible=true;const an=angs[i];m.position.set(b.x+Math.sin(an)*23,b.y+.4,b.z+Math.cos(an)*23);m.rotation.y=an;m.scale.set(6,1,46)});const m=b.td[0];m.material.color.setHex(0xff2a1a);m.visible=true;m.position.set(b.x,b.y+.4,b.z);m.scale.setScalar(.3)}}}
function stepBoss(b,dt){
 const d=Math.hypot(P.x-b.x,P.z-b.z),dm=b.def.dmg*b.mult;b.t+=dt*b.def.spd[b.form];
 const face=()=>{b.g.rotation.y=Math.atan2(P.x-b.x,P.z-b.z)};
 if(!b.atk){face();if(b.t>1.5-b.form*.2){const L=b.def.lists[b.form];b.n=(b.n+1)%L.length;startBossAtk(b,L[b.n])}return}
 const a=b.atk;
 if(a==='charge'){
  if(b.stage==='tele'){face();b.g.position.y=b.y+Math.sin(b.t*30)*.15;if(b.t>1){b.stage='act';b.t=0;b.tr.visible=false}}
  else if(b.stage==='act'){b.x+=b.dx*34*dt;b.z+=b.dz*34*dt;clampArena(b);b.g.rotation.y=Math.atan2(b.dx,b.dz);if(!b.hit&&d<b.r+1.8){b.hit=true;hurt(dm,b.x,b.z)}if(b.t>.7){b.stage='rest';b.t=0}}
  else{b.rest=true;b.g.rotation.x=.22;if(b.t>1.7)endBossAtk(b)}}
 else if(a==='beam'){
  if(b.stage==='tele'){if(b.t>1.2){b.stage='act';b.t=0;b.tr.visible=false;const rx=P.x-b.x,rz=P.z-b.z,al=rx*b.dx+rz*b.dz,pp=Math.abs(rx*b.dz-rz*b.dx);
    if(al>0&&al<46&&pp<3.2)hurt(dm*1.1,b.x,b.z);for(let i=0;i<14;i++){const k=3+i*3.2;burst(b.x+b.dx*k,H(b.x+b.dx*k,b.z+b.dz*k)+1,b.z+b.dz*k,b.def.shot,5,5)}tone(900,.4,'sawtooth',.08,-600)}}
  else if(b.t>.9)endBossAtk(b)}
 else if(a==='roots'||a==='rain'){const tl=a==='rain'?1.4:1.1;b.tg.forEach((t,i)=>b.td[i].scale.setScalar(Math.min(1,b.t/tl)));face();
  if(b.t>tl){b.tg.forEach((t,i)=>{b.td[i].visible=false;burst(t[0],H(t[0],t[1])+.5,t[1],a==='rain'?b.def.shot:0x8a5a2a,14,10);if(Math.hypot(P.x-t[0],P.z-t[1])<3.7)hurt(dm*(a==='rain'?.75:.85),t[0],t[1])});tone(80,.3,'sawtooth',.09,-20);endBossAtk(b)}}
 else if(a==='seeds'){face();if(!b.sf&&b.t>.6){b.sf=true;const n=5+b.form*2,a0=Math.atan2(P.x-b.x,P.z-b.z);for(let i=0;i<n;i++){const an=a0+(i-(n-1)/2)*.27;shoot(b.x,b.y+b.r*1.4,b.z,b.x+Math.sin(an)*20,b.z+Math.cos(an)*20,15,dm*.5,b.def.shot,1.5)}tone(400,.2,'sawtooth',.06,-200)}
  if(b.t>1.5)endBossAtk(b)}
 else if(a==='wave'){face();b.g.position.y=b.y+Math.abs(Math.sin(b.t*14))*.4;if(!b.sf&&b.t>.9){b.sf=true;launchWave(b)}if(b.t>1.3)endBossAtk(b)}
 else if(a==='spF'){face();const tl=1.7;b.tg.forEach((t,i)=>{if(b.td[i].visible)b.td[i].scale.setScalar(Math.min(1,b.t/tl))});b.g.position.y=b.y+Math.abs(Math.sin(b.t*10))*.5;
  if(!b.sf&&b.t>tl){b.sf=true;b.tg.forEach((t,i)=>{b.td[i].visible=false;burst(t[0],H(t[0],t[1])+.5,t[1],0x4a8a2a,12,10);if(Math.hypot(P.x-t[0],P.z-t[1])<3.9)hurt(dm*1.1,t[0],t[1])});
   for(let i=0;i<16;i++){const an=i/16*6.283;shoot(b.x,b.y+b.r*1.4,b.z,b.x+Math.sin(an)*20,b.z+Math.cos(an)*20,13,dm*.5,b.def.shot,1.5)}b.hp=Math.min(b.max,b.hp+b.max*.02);tone(60,.6,'sawtooth',.1,-20)}
  if(b.t>tl+.9){b.g.position.y=b.y;endBossAtk(b)}}
 else if(a==='spV'){face();b.g.position.y=b.y+Math.abs(Math.sin(b.t*12))*.6;
  if(b.sk<4&&b.t>.9+b.sk*1.7){b.sk++;launchWave(b);const n=7,a0=Math.atan2(P.x-b.x,P.z-b.z);for(let i=0;i<n;i++){const an=a0+(i-(n-1)/2)*.3;shoot(b.x,b.y+b.r*1.4,b.z,b.x+Math.sin(an)*20,b.z+Math.cos(an)*20,14,dm*.4,b.def.shot,1.3)}}
  if(b.sk>=4&&b.t>.9+4*1.7+.3){b.g.position.y=b.y;endBossAtk(b)}}
 else if(a==='spR'){
  if(b.stage==='tele'){face();b.td[0].scale.setScalar(Math.min(1,b.t/1.8)*3.4);b.g.position.y=b.y+Math.min(1,b.t/1.8)*1.5;
   if(b.t>1.8){b.stage='rest';b.t=0;b.tr.visible=false;b.tx.forEach(m=>m.visible=false);b.td[0].visible=false;b.g.position.y=b.y;
    if(d<b.r+12)hurt(dm*1.2,b.x,b.z);
    b.spa.forEach(an=>{const rx=P.x-b.x,rz=P.z-b.z,dx=Math.sin(an),dz=Math.cos(an),al=rx*dx+rz*dz,pp=Math.abs(rx*dz-rz*dx);if(al>0&&al<46&&pp<3.4)hurt(dm*1.2,b.x,b.z);for(let i=0;i<10;i++){const k=4+i*4.2;burst(b.x+dx*k,H(b.x+dx*k,b.z+dz*k)+1,b.z+dz*k,0xaaa090,4,6)}});
    burst(b.x,b.y+.5,b.z,0xaaa090,30,14);launchWave(b);tone(50,.8,'sawtooth',.12,-20)}}
  else{b.rest=true;b.g.rotation.x=.15;if(b.t>1.8)endBossAtk(b)}}
 else if(a==='slam'){
  if(b.stage==='tele'){face();b.td[0].scale.setScalar(Math.min(1,b.t/1)*2.8);b.g.position.y=b.y+Math.min(1,b.t)*1.2;if(b.t>1){b.stage='rest';b.t=0;b.td[0].visible=false;b.g.position.y=b.y;if(d<b.r+9.5)hurt(dm*1.1,b.x,b.z);burst(b.x,b.y+.5,b.z,0xaaa090,30,14);tone(60,.5,'sawtooth',.1,-20);if(b.form>=1)launchWave(b)}}
  else{b.rest=true;b.g.rotation.x=.15;if(b.t>1.6)endBossAtk(b)}}}
function updBoss(b,dt){
 if(!b.alive){if(b.dieT!==undefined&&b.g.visible){b.dieT+=dt;b.g.scale.setScalar(Math.max(.001,1-b.dieT/1.8));b.g.rotation.z=b.dieT*.6;if(b.dieT>1.8)b.g.visible=false}return}
 const d=Math.hypot(P.x-b.ax,P.z-b.az);
 if(!b.engaged){
  const gated=(b.id==='gate')&&!(S.bk.forest&&S.bk.valley&&S.bk.rock);
  if(gated){if(d<b.ar+12){P.x=b.ax+(P.x-b.ax)/(d||1)*(b.ar+12.5);P.z=b.az+(P.z-b.az)/(d||1)*(b.ar+12.5);if(P.t-gateT>4){gateT=P.t;toast('黒い霧が行く手を阻む…。まず3つの地域のぬしを倒そう',3500)}}return}
  if(d<b.ar+2&&P.dead<=0&&Math.abs(P.y-b.y)<8){b.engaged=true;b.hp=b.max;b.form=0;b.gauge=0;b.ultDone=false;b.n=-1;b.atk=null;b.t=0;b.st='fight';toast('結界が張られた！ 「'+b.def.name+'」が現れた！',3500);tone(90,.8,'sawtooth',.09,-30)}else return}
 const g=b.g;b.rest=b.rest&&b.atk!==null;
 if(b.st==='ult'){b.t+=dt;g.position.set(b.x,b.y+1.5+Math.sin(b.t*18)*.3,b.z);if(Math.random()<.5)burst(b.x,b.y+b.r*2,b.z,0xff2a2a,3,12);
  if(b.t>4){b.st='fight';b.inv=false;b.t=0;b.atk=null;const safe=b.safe.some(s=>Math.hypot(P.x-s[0],P.z-s[1])<5.6);clearTele(b);b.td.forEach(m=>{m.material.color.setHex(0xff2a1a);m.material.opacity=.35});
   if(safe)num(P.x,P.y+2.6,P.z,'SAFE!','h');else hurt(b.def.dmg*b.mult*5,b.x,b.z);burst(b.x,b.y+4,b.z,0xff4040,60,22);tone(40,1.5,'sawtooth',.14,-10);b.hp=b.max;g.position.set(b.x,b.y,b.z);toast('💀 ゲージが1本回復した…！',4000)}
  applyFlash(b);return}
 if(b.st==='trans'){b.t+=dt;g.position.set(b.x,b.y+Math.sin(b.t*40)*.2,b.z);if(Math.random()<.4)burst(b.x,b.y+b.r*1.5,b.z,b.def.tint[b.form]||0xffffff,3,10);if(b.t>2.4){b.st='fight';b.inv=false;b.t=0;b.atk=null}applyFlash(b);return}
 if(!b.def.gauges&&b.form<2&&b.hp<=b.max*[.66,.33][b.form]){b.form++;b.st='trans';b.t=0;b.inv=true;b.atk=null;b.rest=false;clearTele(b);if(!b.minion)PJ.forEach(p=>{p.on=false;p.m.visible=false});g.rotation.x=0;g.scale.setScalar((b.minion?1.12:1)+b.form*.07);
  toast('⚠ '+b.def.name+'：'+b.def.fn[b.form],4000);tone(70,1.2,'sawtooth',.1,-20);burst(b.x,b.y+b.r*1.5,b.z,0xffffff,30,14);return}
 stepBoss(b,dt);
 if(b.wv>0){b.wv+=dt;const R=2+b.wv*20;b.wr.scale.set(R,1,R);b.wr.material.opacity=Math.max(.15,1-R/40);
  if(!b.whit&&Math.abs(Math.hypot(P.x-b.wx,P.z-b.wz)-R)<2&&P.y-Math.max(H(P.x,P.z),-.3)<.9){b.whit=true;hurt(b.def.dmg*b.mult*.8,b.wx,b.wz)}
  if(R>38){b.wv=0;b.wr.visible=false}}
 b.y=H(b.x,b.z);if(!(b.atk==='slam'&&b.stage==='tele'))g.position.set(b.x,b.y,b.z);
 applyFlash(b);
 if(!b.minion&&(d>b.ar+60||P.dead>0))resetBoss(b)}
function applyFlash(b){if(b.flash>0)b.flash-=1/60;for(const[m,hex,int]of b.fm){if(b.flash>0){m.emissive.setHex(0xffffff);m.emissiveIntensity=.8}
  else if(b.rest&&(hex===0||int<1)){m.emissive.setHex(0x553300);m.emissiveIntensity=.5}
  else if(b.sh&&(hex===0||int<1)){m.emissive.setHex(0x8844ff);m.emissiveIntensity=.7}
  else if(b.form>0&&(hex===0||int<1)){m.emissive.setHex(b.def.tint[b.form]);m.emissiveIntensity=.45}
  else{m.emissive.setHex(hex);m.emissiveIntensity=int}}}
function bossZero(b){if(b.def.gauges){if(b.gauge===1&&!b.ultDone){b.ultDone=true;startUlt(b);return}if(b.gauge<b.def.gauges-1){nextGauge(b);return}}bossDie(b)}
function startUlt(b){ensureTg(b);b.st='ult';b.t=0;b.inv=true;b.atk=null;b.rest=false;clearTele(b);PJ.forEach(p=>{p.on=false;p.m.visible=false});
 const big=b.td[0];big.material.color.setHex(0xff1a1a);big.material.opacity=.35;big.visible=true;big.position.set(b.ax,b.y+.5,b.az);big.scale.setScalar((b.ar+10)/3.5);
 b.safe=[];for(let i=0;i<3;i++){const ang=i*2.094+Math.random()*1.0,rr=18+Math.random()*16,x=b.ax+Math.cos(ang)*rr,z=b.az+Math.sin(ang)*rr;b.safe.push([x,z]);const m=b.td[1+i];m.material.color.setHex(0x3aff5a);m.material.opacity=.6;m.visible=true;m.position.set(x,H(x,z)+.7,z);m.scale.setScalar(5.6/3.5)}
 toast('⚠⚠ 超必殺技「終焉の闇」！ 緑の安全地帯に逃げ込め！',4500);tone(55,2,'sawtooth',.12,-10)}
function transformDemon(b){b.xf=true;const og=b.g,ofm=b.fm;b.g=b.altG;b.fm=b.altFm;b.altG=og;b.altFm=ofm;og.visible=false;b.g.visible=true;
 b.ax=FIN.x;b.az=FIN.z;b.ar=55;b.r=4.8;b.x=FIN.x;b.z=FIN.z;b.y=H(b.x,b.z);b.g.position.set(b.x,b.y,b.z);b.g.rotation.set(0,0,0);
 P.dun=-1;P.x=FIN.x;P.z=FIN.z+32;P.y=H(P.x,P.z);P.vx=P.vz=0;camYaw=0;camT.set(P.x,P.y+1.6,P.z);P.draw=0;
 $('fade').style.opacity=1;setTimeout(()=>$('fade').style.opacity=0,1000);burst(b.x,b.y+10,b.z,0xff6a20,60,18);
 toast('⚡ 魔王城が崩れ落ちる！ まおうは魔神の姿となって外の廃墟へ…！',6500)}
function nextGauge(b){b.gauge++;b.form=b.gauge;b.hp=b.max;b.st='trans';b.t=0;b.inv=true;b.atk=null;b.rest=false;clearTele(b);PJ.forEach(p=>{p.on=false;p.m.visible=false});b.g.rotation.x=0;
 if(b.id==='demon'&&b.gauge===1)transformDemon(b);b.g.scale.setScalar(1+(b.xf?0:b.form*.07));
 toast('⚠ ゲージ'+(b.gauge+1)+'/'+b.def.gauges+'：'+b.def.fn[b.form],5000);tone(60,1.4,'sawtooth',.11,-20);burst(b.x,b.y+b.r*2,b.z,0xff4040,50,16);if(b.gauge===b.def.gauges-1)spawnRevived(b)}
function spawnRevived(b){if(!b.minions)b.minions=[];
 ['forest','valley','rock'].forEach((id,i)=>{let m=b.minions[i];const R=REVIVE[id];
  if(!m){const def=Object.assign({},BDEF[id],{name:'復活した'+BDEF[id].name,hp:R.hp,dmg:R.dmg,spd:BDEF[id].spd.map(s=>s*1.2),exp:20000,gold:5000});m=makeBossObj(id,b.ax,b.az,b.ar,def);m.minion=true;m.parent=b;BS.push(m);b.minions[i]=m}
  const a=i*2.094+.5;m.x=b.ax+Math.cos(a)*24;m.z=b.az+Math.sin(a)*24;m.y=H(m.x,m.z);m.alive=true;m.engaged=true;m.hp=m.max=m.def.hp;m.form=2;m.st='fight';m.t=0;m.atk=null;m.inv=false;m.rest=false;m.wv=0;m.dieT=undefined;
  m.g.visible=true;m.g.scale.setScalar(1.12);m.g.rotation.set(0,0,0);m.g.position.set(m.x,m.y,m.z);burst(m.x,m.y+6,m.z,0xffffff,30,14)});
 b.sh=true;toast('⚠ 倒したはずのぬしたちが復活した！ まおうの結界を破るため、3体を倒せ！',6000)}
function giveArm(i){if(i>P.arm){P.arm=i;toast(ARM[i].n+'を手に入れた！ (防御+'+ARM[i].d+')',4000)}}
const BREW={forest:()=>{getWeapon(2);giveArm(3);P.mat.jelly+=20;giveItem('juice',3)},valley:()=>{getWeapon(3);P.mat.jelly+=20;P.mat.ore+=10;giveItem('candy',3);giveItem('tent',1)},
 rock:()=>{getWeapon(4);giveArm(4);P.atkB+=3;P.mat.ore+=25;giveItem('juice',5);giveItem('hij',2);toast('攻撃力アップの実を手に入れた！ (永続+3)',4000)},
 gate:()=>{getWeapon(5);giveArm(6);P.mat.shard+=20;giveItem('hij',5);P.ar.t+=30;P.ar.f+=30},demon:()=>{getWeapon(8);giveArm(9);P.mat.shard+=60;getWeapon(24);toast('伝説の武器「緑茶ソード」を手に入れた！',6000)},
 emperor:()=>{getWeapon(14);P.mat.jelly+=30;P.ar.n+=30},queen:()=>{getWeapon(10);P.mat.jelly+=40;P.ar.f+=20},crabking:()=>{getWeapon(11);P.mat.ore+=30;P.ar.t+=20},
 golemking:()=>{getWeapon(16);giveArm(5);P.mat.ore+=60;giveItem('hij',3)},deathknight:()=>{getWeapon(21);giveArm(7);P.mat.shard+=40;P.ar.l+=20}};
function bossDie(b){b.alive=false;b.engaged=false;b.dieT=0;clearTele(b);const D=b.def;gainExp(D.exp);P.gold+=D.gold;
 if(b.minion){toast('復活した'+b.def.name.replace('復活した','')+'を倒した！ +'+D.exp+'EXP',3000);burst(b.x,b.y+6,b.z,0xffe040,40,14);const p=b.parent;if(p&&p.minions.every(m=>!m.alive)){p.sh=false;toast('✨ まおうの結界が消えた！ 今だ、まおうを攻撃しろ！',5000)}return}
 S.bk[b.id]=1;PJ.forEach(p=>{p.on=false;p.m.visible=false});if(!engagedBosses().length)$('boss').classList.add('hidden');
 toast('🎉 '+D.name+'を倒した！ +'+D.exp+'EXP +'+D.gold+'G',6500);if(BREW[b.id])BREW[b.id]();
 if(BOSSORD.includes(b.id)){if(S.q<2)S.q=2;S.q=nextBoss()?Math.max(S.q,2):6}
 burst(b.x,b.y+6,b.z,0xffe040,40,14);[523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>tone(f,.3,'triangle',.08),i*140));save(true)}
