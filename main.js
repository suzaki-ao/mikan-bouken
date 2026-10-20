'use strict';
// ---------- audio
let AC=null;const au=()=>{if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return AC};let muted=false;
function tone(f,d=.12,type='square',v=.05,sl=0){if(muted)return;const a=au();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;
 if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+sl),a.currentTime+d);g.gain.value=v;g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+d);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+d)}
const SCALE=[261.6,293.7,329.6,392,440,523.3,587.3];
setInterval(()=>{if(state==='play'&&!ui&&Math.random()<.7)tone(SCALE[Math.floor(Math.random()*7)]*(Math.random()<.3?.5:1),1.4,'sine',.02)},700);
// ---------- data
const WEP=[
 {n:'木の剣',t:'sword',a:0,c:0x58c83a,el:'',p:0},{n:'みかんの剣',t:'sword',a:6,c:0xff9a1f,el:'',p:400},{n:'きらきらソード',t:'sword',a:10,c:0xfff08a,el:'thunder',p:1500},{n:'ほのおの剣',t:'sword',a:16,c:0xff4a1f,el:'fire',p:3000},{n:'ひかりの剣',t:'sword',a:26,c:0xfff6d0,el:'light',p:0},
 {n:'ミスリルソード',t:'sword',a:48,c:0x9ad8ff,el:'',p:9000},{n:'竜牙の剣',t:'sword',a:75,c:0xff6a2a,el:'fire',p:24000},{n:'ムーンブレード',t:'sword',a:105,c:0xb8c0ff,el:'light',p:0},{n:'聖剣ミカエル',t:'sword',a:160,c:0xffffff,el:'light',p:0},
 {n:'そまつなやり',t:'spear',a:8,c:0xc8c8d0,el:'',p:500},{n:'鉄の槍',t:'spear',a:22,c:0xaab0c0,el:'',p:2200},{n:'みずの槍',t:'spear',a:40,c:0x4ab0ff,el:'thunder',p:6500},{n:'ほのおの槍',t:'spear',a:66,c:0xff7a3a,el:'fire',p:16000},{n:'ひかりの槍',t:'spear',a:100,c:0xfff0b0,el:'light',p:0},
 {n:'石のハンマー',t:'hammer',a:14,c:0x9a948a,el:'',p:900},{n:'いわくだき',t:'hammer',a:34,c:0x8a7a6a,el:'',p:4000},{n:'ドワーフハンマー',t:'hammer',a:66,c:0xc08040,el:'',p:13000},{n:'ギガントハンマー',t:'hammer',a:115,c:0xff9a40,el:'fire',p:0},
 {n:'木の弓',t:'bow',a:8,c:0xb8884a,el:'',p:400},{n:'ながゆみ',t:'bow',a:20,c:0xc89a50,el:'',p:1800},{n:'雷の弓',t:'bow',a:40,c:0xfff06a,el:'thunder',p:5000},{n:'炎の弓',t:'bow',a:66,c:0xff6a2a,el:'fire',p:14000},{n:'風切りの弓',t:'bow',a:90,c:0x8affc0,el:'',p:26000},{n:'光の弓',t:'bow',a:120,c:0xfff6d0,el:'light',p:0},
 {n:'緑茶ソード',t:'sword',a:1000,c:0x7adf6a,el:'',p:0,tea:true},{n:'コマンドソード',t:'sword',a:0,c:0xff40ff,el:'',p:0,cmd:true},{n:'チートアロー',t:'bow',a:1000,c:0xffe040,el:'',p:0,fix:1000,rapid:true}];
const WT={sword:{n:'剣',ad:.4,rng:3.7,dot:.3,m:1},spear:{n:'槍',ad:.44,rng:5.8,dot:.6,m:1.05},hammer:{n:'ハンマー',ad:.66,rng:4.2,dot:-.3,m:1.9},bow:{n:'弓',ad:.4,rng:0,dot:0,m:1}};
const AMMO={n:{n:'木の矢',el:'',p:2},f:{n:'炎の矢',el:'fire',p:10},t:{n:'雷の矢',el:'thunder',p:10},l:{n:'光の矢',el:'light',p:15}};
const ELN={fire:'炎',thunder:'雷',light:'光'};
const ARM=[{n:'なし',d:0,p:0},{n:'ぼうけんのぼうし',d:2,p:120},{n:'みかんのよろい',d:6,p:450},{n:'もりのマント',d:11,p:1200},{n:'いわのたて',d:17,p:2800},{n:'ひかりのかぶと',d:26,p:6000},{n:'ミスリルアーマー',d:45,p:15000},{n:'竜鱗のよろい',d:70,p:36000},{n:'闇祓いのローブ',d:100,p:0},{n:'聖なる鎧',d:140,p:0}];
const ITEMS=[['juice','みかんジュース','🧃'],['candy','スタミナキャンディー','🍬'],['fruit','みかん','🍊'],['tent','キャンプセット','⛺'],['hij','ハイジュース','🍹']];
const MATN={jelly:'スライムゼリー',ore:'いわの鉱石',shard:'やみのかけら'};
const P={x:0,z:3,y:0,vy:0,vx:0,vz:0,yaw:0,hp:100,st:100,lv:1,exp:0,gold:50,items:{juice:2,candy:1,fruit:0,tent:0,hij:0},wep:0,atkB:0,gnd:true,atk:0,combo:0,comboT:0,queued:false,hitDone:false,dodge:0,dx:0,dz:1,inv:0,guard:false,dead:0,flash:0,kills:0,t:0,sp:0,wl:0,arm:0,stun:0,spT:0,mat:{jelly:0,ore:0,shard:0},own:[0],ar:{n:40,f:0,t:0,l:0},am:'n',draw:0,ad:.4,dun:-1};
const S={q:0,qk:0,opened:[],fruit:[],shrines:[0],bk:{},sub:false,tod:.12,wg:{},last:0,pin:null,talk:{},sel:-1,dd:{}};
const maxHP=()=>100+(P.lv-1)*20,ATK=()=>WEP[P.wep].cmd?999999999:10+(P.lv-1)*3+WEP[P.wep].a+P.wl*3+P.atkB,DEF=()=>Math.floor((P.lv-1)*1.5)+ARM[P.arm].d,need=()=>20+P.lv*18+Math.floor(P.lv*P.lv*1.2);
const LVCAP=()=>CHEAT?10000:100,stM=()=>WEP[P.wep].tea?.25:1,spM=()=>WEP[P.wep].tea?3.5:1,dmgOf=(e,b)=>WEP[P.wep].cmd?(e.boss?Math.ceil(e.max/4):Math.ceil(e.hp)+1):b,inDun=()=>P.x>=800,curDun=()=>inDun()?dunAt(P.x,P.z):null,wtype=()=>WEP[P.wep].t;
const isNight=()=>Math.sin(S.tod*6.2832)<-.05;
let CHEAT=false;
let state='load',ui=null,locked=false,camYaw=0,camPitch=.35,camT=new T.Vector3(),NIGHT=false;
const K={};const disc=new Uint8Array(4096);
P.y=H(P.x,P.z);
// ---------- player model & fx
const pl=makeMikan();scene.add(pl.g);
const trMat=new T.MeshBasicMaterial({color:0xfff0a0,transparent:true,opacity:0,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false,fog:false});
const trailA=new T.Mesh(new T.RingGeometry(1,3.7,32,1,-Math.PI/2-.95,1.9).rotateX(-Math.PI/2),trMat),trailB=new T.Mesh(new T.RingGeometry(1,4.4,40).rotateX(-Math.PI/2),trMat.clone());
trailA.frustumCulled=trailB.frustumCulled=false;scene.add(trailA,trailB);
const spRing=new T.Mesh(new T.RingGeometry(.85,1,56).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xffe070,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false,fog:false,side:T.DoubleSide}));spRing.frustumCulled=false;scene.add(spRing);
const mkBeacon=c=>{const m=new T.Mesh(new T.CylinderGeometry(.7,.7,170,10,1,true).translate(0,85,0),new T.MeshBasicMaterial({color:c,transparent:true,opacity:.35,blending:T.AdditiveBlending,depthWrite:false,fog:false,side:T.DoubleSide}));m.frustumCulled=false;m.visible=false;scene.add(m);return m};
const bcn=mkBeacon(0xffd23a),bcnPin=mkBeacon(0xff4a4a);
const lantern=new T.PointLight(0xffd8a0,0,100,1.1);scene.add(lantern);const amb=new T.AmbientLight(0xc0c0e8,0);scene.add(amb);
const rotor=new T.Group();{const mast=new T.Mesh(new T.CylinderGeometry(.06,.06,.7,6),new T.MeshStandardMaterial({color:0x444850}));mast.position.y=2.1;rotor.add(mast);for(let i=0;i<2;i++){const b=new T.Mesh(new T.BoxGeometry(4.2,.05,.28),new T.MeshStandardMaterial({color:0xd8dce4,metalness:.5}));b.position.y=2.5;b.rotation.y=i*Math.PI/2;rotor.add(b)}const tl=new T.Mesh(new T.BoxGeometry(.2,.2,1.2),new T.MeshStandardMaterial({color:0xff6a2a}));tl.position.set(0,1.6,-.9);rotor.add(tl);rotor.visible=false;pl.g.add(rotor)}
const PA=[];for(let i=0;i<64;i++){const m=new T.Mesh(new T.BoxGeometry(.12,.12,1.5),new T.MeshBasicMaterial({color:0xd8c090,fog:false}));m.visible=false;scene.add(m);PA.push({m,on:false,x:0,y:0,z:0,vx:0,vz:0,life:0,dmg:0,el:''})}
// ---------- HUD helpers
const toastEl=$('toasts');
function toast(t,ms=2600){const d=document.createElement('div');d.className='toast t';d.textContent=t;toastEl.appendChild(d);setTimeout(()=>d.remove(),ms);while(toastEl.children.length>5)toastEl.firstChild.remove()}
const NUM=[];const v3=new T.Vector3();
function proj(x,y,z){v3.set(x,y,z).project(camera);return v3.z<1?[(v3.x*.5+.5)*innerWidth,(-v3.y*.5+.5)*innerHeight]:null}
function num(x,y,z,t,c){const e=document.createElement('div');e.className='dmg '+(c||'');e.textContent=t;document.body.appendChild(e);NUM.push({e,x,y,z,t:0})}
const EB=[];for(let i=0;i<12;i++){const d=document.createElement('div');d.className='eb hidden';d.innerHTML='<u></u><i></i>';document.body.appendChild(d);EB.push(d)}
const TG=[];for(let i=0;i<14;i++){const d=document.createElement('div');d.className='tag hidden';document.body.appendChild(d);TG.push(d)}
function vig(){const v=$('vig');v.style.opacity=1;setTimeout(()=>v.style.opacity=0,160)}
// ---------- UI management
function openUI(n){closeUI(true);ui=n;$(n).classList.remove('hidden');if(document.pointerLockElement)document.exitPointerLock();$('cap').classList.add('hidden')}
function closeUI(q){['inv','map','shop','menu','dlg'].forEach(i=>$(i).classList.add('hidden'));const was=ui;ui=null;if(!q&&was&&state==='play')lock()}
function lock(){try{const r=canvas.requestPointerLock();if(r&&r.catch)r.catch(()=>{})}catch(e){}}
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;
 if(!locked&&state==='play'&&!ui&&P.dead<=0)openUI('menu');$('cap').classList.toggle('hidden',locked||state!=='play'||!!ui)});
let dq=[],dcb=null,dnm='';
function dialog(nm,lines,cb){dq=lines.slice();dcb=cb;dnm=nm;showLine();openUI('dlg')}
function showLine(){$('dlg').innerHTML='<h3>'+dnm+'</h3>'+dq[0]+'<div style="text-align:right;font-size:14px;color:#ffd23a">E / クリックで次へ</div>'}
function advance(){dq.shift();if(dq.length)showLine();else{closeUI();if(dcb)dcb()}}
$('dlg').onclick=advance;
// ---------- progression
const swordParts=[...pl.pivot.children],wmats=[];
const wmat=()=>{const m=new T.MeshStandardMaterial({color:0xffffff,roughness:.3,metalness:.5,emissive:0xffffff,emissiveIntensity:.35});wmats.push(m);return m};
const spearG=new T.Group(),hamG=new T.Group(),bowG=new T.Group();
{const sh=new T.Mesh(new T.CylinderGeometry(.04,.04,2.4,6),sMat(0x6a4020));sh.position.y=1.2;spearG.add(sh);const tp=new T.Mesh(new T.ConeGeometry(.11,.6,6),wmat());tp.position.y=2.7;spearG.add(tp);spearG.visible=false;pl.pivot.add(spearG);
 const hd=new T.Mesh(new T.CylinderGeometry(.05,.05,1.5,6),sMat(0x6a4020));hd.position.y=.75;hamG.add(hd);const hh=new T.Mesh(new T.BoxGeometry(.8,.55,.55),wmat());hh.position.y=1.6;hamG.add(hh);hamG.visible=false;pl.pivot.add(hamG);
 const ar=new T.Mesh(new T.TorusGeometry(.75,.045,6,18,Math.PI),wmat());ar.rotation.z=-Math.PI/2;bowG.add(ar);const st=new T.Mesh(new T.CylinderGeometry(.012,.012,1.5,4),new T.MeshBasicMaterial({color:0xffffff}));bowG.add(st);
 bowG.rotation.y=-Math.PI/2;bowG.position.set(.7,.8,.3);bowG.visible=false;pl.m.add(bowG)}
function setWLook(){const w=WEP[P.wep];swordParts.forEach(p=>p.visible=w.t==='sword');spearG.visible=w.t==='spear';hamG.visible=w.t==='hammer';bowG.visible=w.t==='bow';pl.bm.color.setHex(w.c);pl.bm.emissive.setHex(w.c);wmats.forEach(m=>{m.color.setHex(w.c);m.emissive.setHex(w.c)})}
function gainExp(n){if(P.lv>=LVCAP())return;P.exp+=n;while(P.exp>=need()&&P.lv<LVCAP()){P.exp-=need();P.lv++;P.hp=maxHP();toast('レベルアップ！ Lv'+P.lv,3200);[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.25,'triangle',.07),i*110))}}
function giveItem(k,n){P.items[k]=(P.items[k]||0)+n}
function enemiesNear(r){return EN.some(e=>e.state!=='dead'&&e.state!=='idle'&&Math.hypot(e.x-P.x,e.z-P.z)<r)||engagedBosses().length>0}
function useItem(k){if(!P.items[k]||P.dead>0)return;
 if(k==='tent'){if(inDun()){toast('ダンジョンではキャンプできない');return}if(enemiesNear(35)){toast('近くに敵がいてキャンプできない！');return}openRest('tent');return}
 if(k==='juice'){if(P.hp>=maxHP())return;const h=80+P.lv*3;P.hp=Math.min(maxHP(),P.hp+h);num(P.x,P.y+2.5,P.z,'+'+h,'h')}
 else if(k==='hij'){if(P.hp>=maxHP())return;const h=Math.round(maxHP()*.5);P.hp=Math.min(maxHP(),P.hp+h);num(P.x,P.y+2.5,P.z,'+'+h,'h')}
 else if(k==='candy'){if(P.st>=100)return;P.st=100}
 else if(k==='fruit'){if(P.hp>=maxHP())return;P.hp=Math.min(maxHP(),P.hp+30);num(P.x,P.y+2.5,P.z,'+30','h')}
 P.items[k]--;tone(660,.15,'triangle',.06,300);if(ui==='inv')drawInv()}
function equip(i){if(!P.own.includes(i))return;P.wep=i;P.draw=0;P.atk=0;setWLook();toast(WEP[i].n+'を装備した！ ('+WT[WEP[i].t].n+' 攻撃力+'+WEP[i].a+(WEP[i].el?' / '+ELN[WEP[i].el]+'属性':'')+')',3600)}
function getWeapon(i){if(!P.own.includes(i))P.own.push(i);toast('⚔ '+WEP[i].n+'を手に入れた！',3600);if(WEP[i].t===WEP[P.wep].t&&WEP[i].a>WEP[P.wep].a)equip(i);else if(ui!=='inv')toast('(持ち物 I から装備できます)',2500)}
// ---------- quests
const BOSSORD=['forest','valley','rock','gate','demon'];
const BN={forest:'もりのぬし',valley:'たきのまもりがみ',rock:'いわやまのきょじん',gate:'魔王城の門番ガーディアン',demon:'やみのまおう'};
const BWHERE={forest:'北の「きらきらの森」',valley:'東の「みずの渓谷」の大きな滝',rock:'西の「ごつごつ岩山」',gate:'北東の魔王城の前',demon:'魔王城の最奥'};
const nextBoss=()=>BOSSORD.find(b=>!S.bk[b]);
function qText(){if(S.q===0)return'南の「おかしな村」へ行き、村長と話そう';if(S.q===1)return'草原のスライムを5体倒そう ('+Math.min(5,S.qk)+'/5) → 村長に報告';
 if(S.q>=6)return'世界に平和が戻った！ 自由に冒険しよう (ダンジョン・強敵・宝箱探しなど)';const b=nextBoss();return b==='demon'?'魔王城に突入し、最奥のやみのまおうを倒そう (推奨Lv100)':b?BWHERE[b]+'へ行き、'+BN[b]+'を倒そう (推奨Lv'+BDEF[b].rec+')':'村長に報告しよう'}
function objective(){const dg=curDun();if(dg){const b=BS.find(x=>x.id===dg.bossId&&!x.minion);if(b&&b.alive)return[b.ax,b.az,b.def.name];return[dg.exitPos[0],dg.exitPos[1],'出口']}
 if(S.q===0)return[0,298,'おかしな村'];if(S.q===1)return[40,50,'草原のスライム'];if(S.q>=6)return null;const b=nextBoss();if(!b)return[0,298,'村長'];
 if(b==='demon'){const dr=DOORS.find(o=>o.name==='魔王城');return[dr.x,dr.z,'魔王城の入口']}const a=ARENAS.find(x=>x.id===b);return[a.x,a.z,BN[b]]}
const ARR=['↑','↗','→','↘','↓','↙','←','↖'];
function navStr(t,lab){const dx=t[0]-P.x,dz=t[1]-P.z,d=Math.hypot(dx,dz),fx=-Math.sin(camYaw),fz=-Math.cos(camYaw),rx=Math.cos(camYaw),rz=-Math.sin(camYaw);
 const an=Math.atan2(dx*rx+dz*rz,dx*fx+dz*fz),i=((Math.round(an/(Math.PI/4))%8)+8)%8;return ARR[i]+' '+lab+' '+Math.round(d)+'m'}
function questHTML(){const n=S.opened.length,o=objective();let h='<b>▶ クエスト</b><br>'+qText();if(o)h+='<br><span style="color:#ffe27a">'+navStr(o,'⭐ '+o[2])+'</span>';
 if(S.pin&&!inDun())h+='<br><span style="color:#ff9a8a">'+navStr(S.pin,'📍 ピン')+'</span>';
 return h+'<br><span style="font-size:13px">'+(S.sub?'✔ 宝箱を3個開けた':'◇ 宝箱を3個開けよう ('+Math.min(3,n)+'/3)')+'</span>'}
function checkSub(){if(!S.sub&&S.opened.length>=3){S.sub=true;P.gold+=150;toast('サブクエスト達成！ 150G獲得',3200)}}
function clockStr(){const h=(S.tod*24+6)%24,hh=Math.floor(h),mm=Math.floor((h-hh)*60);return String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')}
function todLabel(){const t=S.tod;return t<.1?'🌅 朝':t<.38?'☀ 昼':t<.55?'🌇 夕方':'🌙 夜'}
// ---------- save / load
let KEY='mikan_save_v1';
function save(q){try{let ds='';for(let i=0;i<4096;i++)ds+=disc[i];const dd={};DG.forEach(d=>{let t='';for(let i=0;i<d.disc.length;i++)t+=d.disc[i];dd[d.id]=t});S.dd=dd;
 localStorage.setItem(KEY,JSON.stringify({v:3,P:{x:P.x,z:P.z,hp:P.hp,lv:P.lv,exp:P.exp,gold:P.gold,items:P.items,wep:P.wep,atkB:P.atkB,kills:P.kills,wl:P.wl,arm:P.arm,mat:P.mat,sp:P.sp,own:P.own,ar:P.ar,am:P.am,dun:P.dun},S,ds}));if(!q)toast('💾 セーブしました')}catch(e){if(!q)toast('セーブに失敗しました')}}
function load(){try{const j=JSON.parse(localStorage.getItem(KEY));if(!j||!j.P||!j.S)return false;const p=j.P,n=v=>typeof v==='number'&&isFinite(v);
 if(!n(p.x)||!n(p.z)||!n(p.lv)||p.lv<1)return false;
 Object.assign(P,{x:p.x,z:p.z,lv:Math.min(LVCAP(),p.lv|0),exp:n(p.exp)?p.exp:0,gold:n(p.gold)?p.gold:0,wep:clamp(p.wep|0,0,WEP.length-1),atkB:n(p.atkB)?p.atkB:0,kills:p.kills|0,wl:clamp(p.wl|0,0,30),arm:clamp(p.arm|0,0,9),sp:n(p.sp)?p.sp:0,am:p.am||'n',dun:p.dun===undefined?-1:p.dun|0});
 P.own=Array.isArray(p.own)?p.own.filter(i=>i>=0&&i<WEP.length):[0];if(!P.own.includes(P.wep))P.own.push(P.wep);if(!P.own.includes(0))P.own.push(0);
 P.items=Object.assign({juice:0,candy:0,fruit:0,tent:0,hij:0},p.items||{});P.mat=Object.assign({jelly:0,ore:0,shard:0},p.mat||{});P.ar=Object.assign({n:40,f:0,t:0,l:0},p.ar||{});P.hp=clamp(n(p.hp)?p.hp:maxHP(),1,maxHP());
 Object.assign(S,j.S);S.opened=S.opened||[];S.fruit=S.fruit||[];S.shrines=S.shrines||[0];S.wg=S.wg||{};S.bk=S.bk||{};S.talk=S.talk||{};S.dd=S.dd||{};if(j.S.boss)S.bk.forest=1;S.sel=-1;
 if(j.v!==3){S.opened=[];S.fruit=[];S.wg={};S.dd={};P.dun=-1;if(P.x>=800){P.x=0;P.z=3}if(S.q>=6&&!S.bk.demon)S.q=nextBoss()?2:6}
 if(typeof j.ds==='string')for(let i=0;i<4096;i++)disc[i]=j.ds.charCodeAt(i)===49?1:0;
 DG.forEach(d=>{const t=S.dd[d.id];if(typeof t==='string')for(let i=0;i<d.disc.length&&i<t.length;i++)d.disc[i]=t.charCodeAt(i)===49?1:0});
 P.y=H(P.x,P.z);return true}catch(e){return false}}
function applyWorldState(){S.opened.forEach(i=>{const c=CH[i];if(c){c.open=true;c.lid.rotation.x=-1.9}});S.fruit.forEach(i=>{if(FR[i]){FR[i].got=true;FR[i].g.visible=false}});
 setWLook();BS.forEach(b=>{if(!b.minion&&S.bk[b.id]){b.alive=false;b.g.visible=false}})}
// ---------- combat
function tgtList(){return EN.filter(e=>e.state!=='dead'&&e.mesh.visible).concat(engagedBosses())}
function hurt(raw,sx,sz){if(P.dead>0||P.inv>0||CHEAT)return null;let res='h';
 let d=Math.max(1,Math.round(raw*(.9+Math.random()*.2)*(NIGHT&&!inDun()?1.15:1)*100/(100+DEF())));const ax=sx-P.x,az=sz-P.z,al=Math.hypot(ax,az)||1;
 if(P.guard&&P.st>0&&(Math.sin(P.yaw)*ax+Math.cos(P.yaw)*az)/al>.2){res='g';d=Math.max(1,Math.round(d*.25));P.st=Math.max(0,P.st-14);tone(300,.1,'square',.06);burst(P.x,P.y+1.2,P.z,0xffffff,8,5)}
 else{P.vx-=ax/al*7;P.vz-=az/al*7;tone(110,.18,'sawtooth',.07,-40);vig()}
 P.hp-=d;P.inv=.7;P.flash=.2;P.draw=0;P.sp=Math.min(100,P.sp+3);num(P.x,P.y+2.6,P.z,'-'+d,'p');if(P.hp<=0)die();return res}
function die(){P.hp=0;P.dead=2.6;$('fade').style.opacity=1;toast('ちからつきた…',2500);BS.forEach(b=>{if(b.engaged&&!b.minion)resetBoss(b)});PJ.forEach(p=>{p.on=false;p.m.visible=false});PA.forEach(a=>{a.on=false;a.m.visible=false})}
function respawn(){const s=SHRINES[S.last]||SHRINES[0];P.dun=-1;P.x=s[0]+3;P.z=s[1]+3;P.y=H(P.x,P.z);P.hp=maxHP();P.st=100;P.vx=P.vz=0;P.stun=0;P.gold=Math.floor(P.gold*.9);P.dead=0;P.inv=1.5;camT.set(P.x,P.y+1.6,P.z);
 $('fade').style.opacity=0;if(state==='play')lock()}
function killEnemy(e){const df=e.df;e.state='dead';e.dt=0;e.resp=90;P.kills++;if(S.q===1&&!inDun())S.qk++;gainExp(df.exp);P.gold+=df.gold;let s=df.n+'を倒した！ +'+df.exp+'EXP +'+df.gold+'G';
 for(const k of['jelly','ore','shard']){const v=df[k];if(!v)continue;const n=v>=1?Math.round(v*(1+Math.random())):(Math.random()<v?1:0);if(n){P.mat[k]+=n;s+=' / '+MATN[k]+'×'+n}}
 if(Math.random()<.18){giveItem('fruit',1);s+=' / みかん'}else if(Math.random()<.06){giveItem('candy',1);s+=' / キャンディー'}
 if(Math.random()<.1){const k=['n','n','f','t','l'][Math.floor(Math.random()*5)],c=5+Math.floor(Math.random()*8);P.ar[k]+=c;s+=' / '+AMMO[k].n+'×'+c}
 toast(s,2200);burst(e.x,e.y+1,e.z,df.col||0x888888,16,7);tone(440,.2,'triangle',.06,200)}
const wk=(e,el)=>{const w=e.boss?e.def.weak:e.df.weak;return!!w&&el===w};
function hitT(e,dmg,crit,dx,dz,weak,spc){const d=Math.hypot(dx,dz)||1;
 if(e.boss){if(e.inv||e.sh){num(e.x,e.y+e.r*2.5,e.z,e.sh?'結界！':'無敵','c');return}if(e.rest&&!WEP[P.wep].cmd)dmg=Math.round(dmg*1.5);e.hp-=dmg;e.flash=.12}
 else{e.hp-=dmg;const big=e.df.golem||e.df.king;e.kx=dx/d*(big?3:9);e.kz=dz/d*(big?3:9);e.flash=.12;if(e.state==='idle'||e.state==='ret')e.state='chase';if(e.state==='wind'&&!big){e.state='chase';e.cd=.8}}
 if(!spc)P.sp=Math.min(100,P.sp+(e.boss?4:7)*spM());
 num(e.x,e.y+(e.boss?e.r*2.5:2.3*e.df.sc),e.z,(weak?'弱点！':'')+dmg,crit||weak?'c':'');burst(e.x,e.y+(e.boss?e.r:1.4),e.z,crit?0xfff06a:0xffffff,crit?14:8,6);tone(crit?900:520,.07,'square',.05);
 if(e.boss){if(e.hp<=0)bossZero(e)}else if(e.hp<=0)killEnemy(e)}
function startAtk(){if(P.atk>0||P.dodge>0||P.dead>0||P.stun>0)return;if(P.st<4)return;const ty=wtype();if(ty==='bow')return;
 P.combo=(ty==='hammer')?0:(P.comboT>0?(P.combo+1)%3:0);P.ad=WT[ty].ad;P.atk=P.ad;P.hitDone=false;P.queued=false;P.st-=(ty==='hammer'?8:4)*stM();
 let best=null,bd=7;for(const e of EN){if(e.state==='dead'||!e.mesh.visible)continue;const d=Math.hypot(e.x-P.x,e.z-P.z);if(d<bd){bd=d;best=e}}
 for(const b of engagedBosses())if(Math.hypot(b.x-P.x,b.z-P.z)<bd+4){best=b;bd=Math.hypot(b.x-P.x,b.z-P.z)-4}
 P.yaw=best?Math.atan2(best.x-P.x,best.z-P.z):(Math.hypot(P.vx,P.vz)>1?Math.atan2(P.vx,P.vz):Math.atan2(-Math.sin(camYaw),-Math.cos(camYaw)));
 tone(300+P.combo*120,.1,'sawtooth',.04,200)}
function swingHit(){const ty=wtype(),W_=WT[ty],c=P.combo,mult=(ty==='hammer'?1:[1,1.2,1.9][c])*W_.m,sp3=ty==='sword'&&c===2,range=W_.rng*(sp3?1.25:1),fx=Math.sin(P.yaw),fz=Math.cos(P.yaw),el=WEP[P.wep].el;
 for(const e of tgtList()){const dx=e.x-P.x,dz=e.z-P.z,d=Math.hypot(dx,dz);if(d>range+e.r)continue;if(!sp3&&(dx*fx+dz*fz)/(d||1)<W_.dot&&d>e.r+1.2)continue;
  const crit=Math.random()<.12,weak=wk(e,el);hitT(e,dmgOf(e,Math.round(ATK()*mult*(.9+Math.random()*.2)*(crit?1.8:1)*(weak?1.5:1))),crit,dx,dz,weak)}
 if(ty==='hammer'){burst(P.x+Math.sin(P.yaw)*2.5,P.y+.3,P.z+Math.cos(P.yaw)*2.5,0xaaa090,12,8);tone(80,.2,'sawtooth',.08,-20)}}
function aimInfo(){const fx=-Math.sin(camYaw),fz=-Math.cos(camYaw);let best=null,ba=.3;for(const e of tgtList()){const dx=e.x-P.x,dz=e.z-P.z,d=Math.hypot(dx,dz);if(d>70||d<1)continue;const an=Math.acos(clamp((dx*fx+dz*fz)/d,-1,1));if(an<ba){ba=an;best=e}}
 if(best){const dx=best.x-P.x,dz=best.z-P.z,d=Math.hypot(dx,dz);return[dx/d,dz/d,best]}return[fx,fz,null]}
function fireArrow(){const w=WEP[P.wep];if(w.t!=='bow'){P.draw=0;return}const ch=clamp(P.draw,.2,1);P.draw=0;
 if(!w.rapid&&!(P.ar[P.am]>0)){const k=Object.keys(P.ar).find(k=>P.ar[k]>0);if(!k){toast('矢がない！ 武器屋で買おう');return}P.am=k}
 if(!w.rapid)P.ar[P.am]--;const el=AMMO[P.am].el||w.el;let[ax,az]=aimInfo();if(w.rapid){const sp=(Math.random()-.5)*.1,c=Math.cos(sp),sn=Math.sin(sp);[ax,az]=[ax*c-az*sn,ax*sn+az*c]}P.yaw=Math.atan2(ax,az);const a=PA.find(q=>!q.on);if(!a)return;
 Object.assign(a,{on:true,x:P.x+ax*1.2,z:P.z+az*1.2,y:P.y+1.3,vx:ax*(w.rapid?80:45+ch*25),vz:az*(w.rapid?80:45+ch*25),life:w.rapid?.9:1.4,dmg:w.fix||Math.round(ATK()*(.6+1.4*ch)*(.9+Math.random()*.2)),el,crit:!w.fix&&ch>=1});
 a.m.visible=true;a.m.rotation.y=Math.atan2(ax,az);a.m.material.color.setHex(w.rapid?0xffe040:el==='fire'?0xff6a2a:el==='thunder'?0xfff06a:el==='light'?0xfff6d0:0xd8c090);if(!w.rapid){P.atk=.12;P.ad=.12}tone(700+ch*300,.12,'sawtooth',.05,-300)}
function special(){if(P.sp<100||P.dead>0||P.atk>0||P.dodge>0||P.stun>0||ui)return;P.sp=0;P.inv=1;P.spT=.55;P.draw=0;tone(200,.5,'sawtooth',.08,500);[523,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.2,'triangle',.07),i*70));
 burst(P.x,P.y+1,P.z,0xffd23a,40,12);toast('必殺！ ミカンバースト！',1400);const el=WEP[P.wep].el;
 for(const e of tgtList()){const dx=e.x-P.x,dz=e.z-P.z,d=Math.hypot(dx,dz);if(d>11+e.r)continue;const weak=wk(e,el);hitT(e,dmgOf(e,Math.round(ATK()*3.4*(.9+Math.random()*.2)*(weak?1.5:1))),true,dx,dz,weak,true)}}
// ---------- enemies AI
function updEnemy(e,dt){
 const dx=P.x-e.x,dz=P.z-e.z,d=Math.hypot(dx,dz),df=e.df,m=e.mesh,px0=e.x,pz0=e.z;e.t+=dt;
 if(e.state==='dead'){e.dt+=dt;m.scale.setScalar(Math.max(.001,1-e.dt*2.5)*df.sc);if(e.dt>.4){m.visible=false;e.resp-=dt;if(e.resp<=0&&Math.hypot(P.x-e.hx,P.z-e.hz)>70){e.state='idle';e.hp=e.max;e.x=e.hx;e.z=e.hz;m.visible=true;m.scale.setScalar(df.sc)}}return}
 e.x+=e.kx*dt;e.z+=e.kz*dt;const kd=Math.max(0,1-dt*7);e.kx*=kd;e.kz*=kd;
 let mx=0,mz=0,sp=0;e.cd-=dt;const ag=df.aggro*(NIGHT?1.35:1),big=df.golem||df.king;
 if(e.state==='idle'||e.state==='ret'){e.wt-=dt;if(e.wt<=0){e.wt=2+Math.random()*3;const a=Math.random()*6.283,r=Math.random()*10;e.wx=e.hx+Math.cos(a)*r;e.wz=e.hz+Math.sin(a)*r}
  const wx=e.wx-e.x,wz=e.wz-e.z,wd=Math.hypot(wx,wz);if(wd>1){mx=wx/wd;mz=wz/wd;sp=df.spd*.35}
  if(e.state==='ret'&&Math.hypot(e.hx-e.x,e.hz-e.z)<6)e.state='idle';
  if(d<ag&&P.dead<=0&&e.state==='idle')e.state='chase'}
 else if(e.state==='chase'){if(d>ag*2.4||Math.hypot(e.hx-e.x,e.hz-e.z)>70||P.dead>0){e.state='ret';e.wx=e.hx;e.wz=e.hz}
  else{mx=dx/d;mz=dz/d;sp=df.spd;
   if(df.side&&d<9){const k=Math.sin(e.t*3+e.ph);mx+=-mz*k*.9;mz+=mx*k*.9*0+(dx/d)*k*.0;const l=Math.hypot(mx,mz)||1;mx/=l;mz/=l}
   if(df.fly){const k=Math.sin(e.t*2.4+e.ph);const l=d||1;mx+=-dz/l*k*.7;mz+=dx/l*k*.7}
   if(df.shot&&d>5.5&&d<17&&e.cd<=0){shoot(e.x,e.y+1,e.z,P.x,P.z,13,df.atk*.8*(NIGHT?1.2:1),df.shot,.8,df.stun);e.cd=2.4;tone(700,.08,'sine',.04,-300)}
   else if(d<df.reach+(big?.5:0)&&e.cd<=0){e.state='wind';e.t=0;e.lx=dx/d;e.lz=dz/d;e.hit=false}}}
 else if(e.state==='wind'){sp=0;e.lx=dx/(d||1);e.lz=dz/(d||1);if(e.t>(big?.9:.5)){e.state='atk';e.t=0}}
 else if(e.state==='atk'){const dur=big?.25:.3;e.x+=e.lx*(df.lunge||(big?4:12))*dt;e.z+=e.lz*(df.lunge||(big?4:12))*dt;
  if(!e.hit&&d<df.reach+.9){e.hit=true;hurt(df.atk*(NIGHT?1.2:1),e.x,e.z);if(big)burst(e.x,e.y+.2,e.z,0xaaa090,12,8)}
  if(e.t>dur){e.state='chase';e.cd=big?2.2:1.3}}
 if(sp>0){const l=Math.hypot(mx,mz)||1;e.x+=mx/l*sp*dt;e.z+=mz/l*sp*dt}
 if(e.x>=800){const rr=Math.min(1.6,e.r*.6);if(dunBlockedC(e.x,pz0,rr))e.x=px0;if(dunBlockedC(e.x,e.z,rr))e.z=pz0}else{e.x=clamp(e.x,-640,640);e.z=clamp(e.z,-640,640)}
 const gy=Math.max(H(e.x,e.z),0);e.y=gy+(df.fly?2.4+Math.sin(e.t*5+e.ph)*.5:(sp>0&&!big&&df.m!=='crab'?Math.abs(Math.sin(e.t*7+e.ph))*.35:0));
 m.position.set(e.x,e.y,e.z);const fxx=(e.state==='idle'||e.state==='ret')?mx:dx,fzz=(e.state==='idle'||e.state==='ret')?mz:dz;if(Math.abs(fxx)+Math.abs(fzz)>.01)m.rotation.y=Math.atan2(fxx,fzz);
 let sy=1,sxz=1;if(e.state==='wind'){const w=Math.min(1,e.t/(big?.9:.5));sy=1-.3*w;sxz=1+.2*w}else if(sp>0){sy=1+.1*Math.sin(e.t*14+e.ph)}
 if(big&&e.state==='wind'){sy=1+.3*Math.min(1,e.t/.9)}
 m.scale.set(df.sc*sxz,df.sc*sy,df.sc*sxz);
 if(df.fly&&m.userData.wl){const f=Math.sin(e.t*18)*.8;m.userData.wl.rotation.z=f;m.userData.wr.rotation.z=-f}
 const mt=m.userData.mat;if(mt){if(e.flash>0){e.flash-=dt;mt.emissive.setHex(0xffffff);mt.emissiveIntensity=.9}else if(e.state==='wind'){mt.emissive.setHex(0xff2a1a);mt.emissiveIntensity=.5+.4*Math.sin(e.t*30)}
  else{const col=df.mist?0x2a0a40:df.golem?0x000000:df.m==='mush'?0x4a1a70:df.m==='bat'?0x200840:df.m==='crab'?0x000000:(df.col||0);mt.emissive.setHex(col);mt.emissiveIntensity=df.mist?.5:(df.golem||df.m==='crab')?0:.12}}
 if(df.mist)m.children.forEach(c=>{if(c.userData.o!==undefined){const a=e.t*2+c.userData.o*2.1;c.position.set(Math.cos(a)*1.5,1.1+Math.sin(a*1.7)*.5,Math.sin(a)*1.5)}})}
// ---------- player update
function update(dt){
 P.t+=dt;NIGHT=isNight()&&!inDun();if(P.dead>0){P.dead-=dt;if(P.dead<=0)respawn();return}
 if(CHEAT){P.hp=maxHP();P.st=100;P.sp=100;P.gold=99999999;P.stun=0;for(const k in P.items)P.items[k]=99999;for(const k in P.mat)P.mat[k]=99999;for(const k in P.ar)P.ar[k]=99999}else P.heli=false;
 const fx=-Math.sin(camYaw),fz=-Math.cos(camYaw),rx=Math.cos(camYaw),rz=-Math.sin(camYaw);
 const stunned=P.stun>0;if(stunned){P.stun-=dt;if(Math.random()<.3)burst(P.x,P.y+1.5,P.z,0xfff06a,2,5)}
 const ix=(K.KeyD?1:0)-(K.KeyA?1:0),iz=(K.KeyW?1:0)-(K.KeyS?1:0);let mx=fx*iz+rx*ix,mz=fz*iz+rz*ix;const ml=Math.hypot(mx,mz);if(ml>0){mx/=ml;mz/=ml}if(stunned){mx=0;mz=0}
 const water=!inDun()&&H(P.x,P.z)<-.1;P.guard=!stunned&&!!K.Mouse2&&P.atk<=0&&P.dodge<=0&&P.st>0&&P.draw<=0&&!(wtype()==='bow'&&WEP[P.wep].rapid&&K.Mouse0);
 let spd=8.5;if(P.heli)spd=inDun()?24:60;if(water&&!P.heli)spd=4.5;if(P.guard)spd=3.2;if(P.atk>0&&P.ad>.15)spd=3.4;if(P.draw>0)spd=3.6;
 if(P.dodge>0){P.dodge-=dt;P.vx=P.dx*22;P.vz=P.dz*22}
 else{const k=Math.min(1,dt*12);P.vx+=(mx*spd-P.vx)*k;P.vz+=(mz*spd-P.vz)*k}
 P.inv=Math.max(0,P.inv-dt);P.flash=Math.max(0,P.flash-dt);
 const ox0=P.x,oz0=P.z;P.x+=P.vx*dt;P.z+=P.vz*dt;
 const cbs=engagedBosses(),cb=cbs[0];
 if(cb){const c=Math.hypot(P.x-cb.ax,P.z-cb.az);if(c>cb.ar+10){P.x=cb.ax+(P.x-cb.ax)/c*(cb.ar+10);P.z=cb.az+(P.z-cb.az)/c*(cb.ar+10)}
  for(const b of cbs){const bd=Math.hypot(P.x-b.x,P.z-b.z);if(bd<b.r+.6&&bd>0){P.x=b.x+(P.x-b.x)/bd*(b.r+.6);P.z=b.z+(P.z-b.z)/bd*(b.r+.6)}}}
 if(!(P.heli&&P.y>H(P.x,P.z)+8))collide(P,.55);
 if(P.x>=800){if(dunBlockedC(P.x,oz0,.6))P.x=ox0;if(dunBlockedC(P.x,P.z,.6))P.z=oz0}else{P.x=clamp(P.x,-655,655);P.z=clamp(P.z,-655,655)}
 let gy=H(P.x,P.z);if(gy<-.3)gy=-.3;
 if(P.heli){const up=(K.Space?1:0)-(K.KeyC?1:0),dgh=curDun(),top=dgh?DY+dgh.wh-2.5:700;P.y=clamp(P.y+up*22*dt,gy+1.3,top);P.vy=0;P.gnd=false}
 else{P.vy-=28*dt;P.y+=P.vy*dt;if(P.y<=gy||(P.y-gy<.5&&P.vy<=0)){P.y=gy;P.vy=0;P.gnd=true}else P.gnd=false}
 if(K.Space&&P.gnd&&P.atk<=0&&!stunned&&!P.heli){P.vy=10.5;P.gnd=false;tone(400,.15,'triangle',.05,300)}
 if(P.guard)P.st=Math.max(0,P.st-6*dt*stM());else if(P.atk<=0&&P.dodge<=0&&P.draw<=0)P.st=Math.min(100,P.st+26*dt);
 if(wtype()==='bow'&&WEP[P.wep].rapid){if(K.Mouse0&&!stunned){P.rt=(P.rt||0)-dt;if(P.rt<=0){P.rt=.05;P.draw=1;fireArrow()}}P.draw=0}
 else if(P.draw>0){if(!K.Mouse0||stunned)fireArrow();else P.draw=Math.min(1.3,P.draw+dt)}
 if(P.atk>0){P.atk-=dt;const p=1-P.atk/P.ad;if(!P.hitDone&&p>.35&&wtype()!=='bow'){P.hitDone=true;swingHit()}
  if(P.atk<=0){P.comboT=.55;if(P.queued)startAtk()}}else P.comboT=Math.max(0,P.comboT-dt);
 const moving=Math.hypot(P.vx,P.vz)>1.2;
 if(P.atk<=0&&P.dodge<=0){let ty=P.yaw;if(P.guard||P.draw>0)ty=Math.atan2(fx,fz);else if(moving)ty=Math.atan2(P.vx,P.vz);let df=ty-P.yaw;df=Math.atan2(Math.sin(df),Math.cos(df));P.yaw+=df*Math.min(1,dt*14)}
 for(const f of FR){if(f.got)continue;const dx=f.x-P.x,dz=f.z-P.z;if(dx*dx+dz*dz<3.2){f.got=true;f.g.visible=false;S.fruit.push(f.id);giveItem('fruit',1);toast('みかんを拾った 🍊',1400);tone(880,.1,'triangle',.05)}}
 for(let i=0;i<FR.length;i++)if(!FR[i].got&&FR[i].g.visible)FR[i].g.position.y=FR[i].y+.8+Math.sin(P.t*2+i)*.15;
 for(const p of PJ){if(!p.on)continue;p.life-=dt;p.x+=p.vx*dt;p.z+=p.vz*dt;const g=H(p.x,p.z);p.m.position.set(p.x,Math.max(g,0)+1.1,p.z);
  if(p.x>=800&&dunBlocked(p.x,p.z))p.life=0;
  if(Math.hypot(P.x-p.x,P.z-p.z)<1.2+(p.m.scale.x>1.2?.6:0)&&Math.abs(P.y+.9-(g+1.1))<2){const r=hurt(p.dmg,p.x-p.vx,p.z-p.vz);if(r==='h'&&p.stun){P.stun=1.2;toast('⚡ しびれた！',900)}p.life=0;burst(p.x,g+1,p.z,0xffffff,6,4)}if(p.life<=0){p.on=false;p.m.visible=false}}
 const tl=PA.some(a=>a.on)?tgtList():null;
 for(const a of PA){if(!a.on)continue;a.life-=dt;a.x+=a.vx*dt;a.z+=a.vz*dt;a.m.position.set(a.x,a.y,a.z);if(a.x>=800&&dunBlocked(a.x,a.z))a.life=0;
  for(const e of tl){if(e.state==='dead')continue;if(Math.hypot(e.x-a.x,e.z-a.z)<e.r+.7){const weak=wk(e,a.el);hitT(e,Math.round(a.dmg*(weak?1.5:1)*(a.crit?1.3:1)),a.crit,a.vx,a.vz,weak);a.life=0;break}}
  if(a.life<=0){a.on=false;a.m.visible=false}}
 for(const q of PT){if(q.life<=0)continue;q.life-=dt;q.vy-=18*dt;q.m.position.x+=q.vx*dt;q.m.position.y+=q.vy*dt;q.m.position.z+=q.vz*dt;q.m.material.opacity=Math.max(0,q.life/q.max);if(q.life<=0)q.m.visible=false}
 for(const e of EN){const d=Math.hypot(e.x-P.x,e.z-P.z);e.mesh.visible=d<170&&!(e.state==='dead'&&e.dt>.4);if(d<120||e.state==='dead')updEnemy(e,dt)}
 for(const b of BS)updBoss(b,dt);
 let it=null,bd=99;
 for(const c of CH){if(c.open)continue;const d=Math.hypot(c.x-P.x,c.z-P.z);if(d<3.4&&d<bd){bd=d;it={t:'chest',o:c,s:'E: 宝箱を開ける'}}}
 const NT={elder:'村長と話す',shop:'お店を見る',smith:'武器を強化する',inn:'宿屋に泊まる',weapons:'武器屋を見る (剣・槍・ハンマー・弓・矢)'};
 for(const n of NPCS){const d=Math.hypot(n.x-P.x,n.z-P.z);if(d<4.5&&d<bd){bd=d;it={t:'npc',o:n,s:'E: '+NT[n.name]}}}
 SHRINES.forEach((s,i)=>{const d=Math.hypot(s[0]-P.x,s[1]-P.z);if(d<4.5&&d<bd){bd=d;it={t:'shrine',o:i,s:S.shrines.includes(i)?'E: 祠で休む (HP回復・💾セーブ)':'E: 祠を解放する'}}});
 if(!inDun())for(const dr of DOORS){const d=Math.hypot(dr.x-P.x,dr.z-P.z);if(d<5.5&&d<bd){bd=d;it={t:'door',o:dr,s:'E: 「'+dr.name+'」に入る (推奨Lv'+dr.rec+')'}}}
 const dg=curDun();if(dg){const d=Math.hypot(dg.exitPos[0]-P.x,dg.exitPos[1]-P.z);if(d<4.5){bd=d;it={t:'exit',o:dg,s:'E: ダンジョンから出る'}}}
 P.it=it;const pr=$('prompt');if(it){pr.textContent=it.s;pr.classList.remove('hidden')}else pr.classList.add('hidden');
 for(const c of CH)if(c.open&&c.lid.rotation.x>-1.9)c.lid.rotation.x-=dt*5;
 animPlayer(dt,moving);discover(dt);updBeacons()}
function updBeacons(){const o=objective();if(o&&Math.hypot(o[0]-P.x,o[1]-P.z)>20){bcn.visible=true;bcn.position.set(o[0],Math.max(0,H(o[0],o[1])),o[1])}else bcn.visible=false;
 if(S.pin&&!inDun()&&Math.hypot(S.pin[0]-P.x,S.pin[1]-P.z)>12){bcnPin.visible=true;bcnPin.position.set(S.pin[0],Math.max(0,H(S.pin[0],S.pin[1])),S.pin[1])}else bcnPin.visible=false}
function animPlayer(dt,moving){const m=pl.m,g=pl.g,ty=wtype();g.position.set(P.x,P.y,P.z);g.rotation.y=P.yaw;
 const w=moving&&P.gnd?Math.sin(P.t*16):0;pl.feet[0].position.z=.08+w*.2;pl.feet[1].position.z=.08-w*.2;pl.feet[0].position.y=.12+Math.max(0,w)*.12;pl.feet[1].position.y=.12+Math.max(0,-w)*.12;
 m.position.y=Math.abs(w)*.07+(moving?0:Math.sin(P.t*2.5)*.015);m.rotation.set(0,0,0);
 rotor.visible=!!P.heli;if(P.heli)rotor.rotation.y+=dt*40;pl.shield.visible=P.guard;const pv=pl.pivot;trMat.opacity=0;trailB.material.opacity=0;pv.position.set(-.64,.66,.16);
 if(ty==='bow'){pv.rotation.set(.35,0,.15);bowG.position.z=.3+(P.draw>0?.25:0);bowG.position.y=.8;if(P.draw>0)m.rotation.x=.05}
 else if(P.atk>0){const p=1-P.atk/P.ad,e=p*p*(3-2*p),c=P.combo;
  if(ty==='spear'){pv.rotation.set(1.52,0,0);pv.position.z=.16+Math.sin(Math.PI*p)*1.1}
  else if(ty==='hammer'){pv.rotation.set(lerp(-.7,2.1,e*e),0,0)}
  else{pv.rotation.set(1.35,c===1?lerp(1.3,-1.3,e):lerp(-1.3,1.3,e),0);if(c===2)m.rotation.y=e*Math.PI*2}
  const o=.8*Math.sin(Math.PI*clamp((p-.2)/.6,0,1));trailA.position.set(P.x,P.y+.9,P.z);trailB.position.copy(trailA.position);trailA.rotation.y=P.yaw;
  if(c===2&&ty==='sword')trailB.material.opacity=o;else{trMat.opacity=o*(ty==='hammer'?.3:1);trailA.scale.x=c===1?-1:1}}
 else pv.rotation.set(.35+(P.guard?.5:0),0,.15);
 if(P.dodge>0)m.rotation.x=(1-P.dodge/.28)*Math.PI*2;
 if(P.spT>0){P.spT-=dt;const s=1+(1-P.spT/.55)*11;spRing.position.set(P.x,P.y+.4,P.z);spRing.scale.set(s,1,s);spRing.material.opacity=Math.max(0,P.spT/.55)*.9;m.rotation.y=(1-P.spT/.55)*Math.PI*4}else spRing.material.opacity=0;
 pl.body.material.emissive.setHex(P.flash>0?0xff2a1a:0x000000);pl.body.material.emissiveIntensity=P.flash>0?.9:0;
 if(P.inv>0&&P.flash<=0)g.visible=Math.floor(P.t*20)%2===0||P.inv>.7;else g.visible=true}
function discover(dt){discover.t=(discover.t||0)-dt;if(discover.t>0)return;discover.t=.3;
 const dg=curDun();if(dg){const gx=Math.floor((P.x-dg.ox)/CS),gz=Math.floor((P.z-dg.oz)/CS);for(let i=-5;i<=5;i++)for(let j=-5;j<=5;j++){if(i*i+j*j>26)continue;const x=gx+i,z=gz+j;if(x>=0&&x<dg.W&&z>=0&&z<dg.H)dg.disc[z*dg.W+x]=1}return}
 const gx=Math.floor((P.x+700)/1400*64),gz=Math.floor((P.z+700)/1400*64);
 for(let i=-4;i<=4;i++)for(let j=-4;j<=4;j++){if(i*i+j*j>17)continue;const x=gx+i,z=gz+j;if(x>=0&&x<64&&z>=0&&z<64)disc[z*64+x]=1}}
// ---------- interactions
const TIERW={1:1,2:2,3:3,4:5,5:6};
function enterDun(i){const d=DG[i];$('fade').style.opacity=1;setTimeout(()=>{P.dun=i;P.x=d.startPos[0];P.z=d.startPos[1];P.y=H(P.x,P.z);P.vx=P.vz=0;P.yaw=0;camYaw=0;camT.set(P.x,P.y+1.6,P.z);$('fade').style.opacity=0;toast('【'+d.name+'】 推奨Lv'+d.rec,4500);tone(300,.6,'sine',.07,-100);save(true)},450)}
function exitDun(){const i=P.dun,dr=DOORS.find(o=>o.dun===i);$('fade').style.opacity=1;setTimeout(()=>{P.dun=-1;if(dr){P.x=dr.x;P.z=dr.z+3}else{P.x=0;P.z=3}P.y=H(P.x,P.z);P.vx=P.vz=0;camT.set(P.x,P.y+1.6,P.z);$('fade').style.opacity=0;save(true)},450)}
function interact(){const it=P.it;if(!it||P.dead>0||P.stun>0)return;
 if(it.t==='chest'){const c=it.o,t=c.tier;c.open=true;S.opened.push(c.id);tone(700,.2,'triangle',.07,500);
  const g=Math.round((25+t*30+Math.random()*40)*(t>=4?t*t/3:1));P.gold+=g;let s='宝箱：'+g+'G';
  const pool=t>=3?['juice','candy','fruit','hij']:['juice','candy','fruit'];const k=pool[Math.floor(Math.random()*pool.length)],n=1+Math.floor(Math.random()*2);giveItem(k,n);s+=' / '+ITEMS.find(i=>i[0]===k)[1]+'×'+n;
  const mk=['jelly','jelly','ore','ore','shard','shard'][t-1],mn=(1+Math.floor(Math.random()*3))*(t>=4?3:1);P.mat[mk]+=mn;s+=' / '+MATN[mk]+'×'+mn;
  if(Math.random()<.5){const ak=['n','f','t','l'][Math.floor(Math.random()*(t>=3?4:2))],ac=(5+Math.floor(Math.random()*10))*(t>=4?2:1);P.ar[ak]+=ac;s+=' / '+AMMO[ak].n+'×'+ac}
  toast(s,3600);
  if(c.loot&&c.loot.w!=null){getWeapon(c.loot.w);if(c.loot.w===8)giveArm(8)}else if(!S.wg[t]&&TIERW[t]&&!P.own.includes(TIERW[t])){S.wg[t]=1;getWeapon(TIERW[t])}else S.wg[t]=1;
  gainExp(5*t*t);checkSub();burst(c.x,c.y+1,c.z,0xffd23a,16,6)}
 else if(it.t==='shrine'){const i=it.o;if(!S.shrines.includes(i)){S.shrines.push(i);toast('ファストトラベル地点を解放！ 「'+SHRINES[i][2]+'」',3500);tone(880,.4,'triangle',.07)}
  S.last=i;P.hp=maxHP();P.st=100;save();setOrbs()}
 else if(it.t==='door')enterDun(DG.findIndex((d,i)=>i===it.o.dun));
 else if(it.t==='exit')exitDun();
 else if(it.t==='npc'){const n=it.o.name;if(n==='shop')openShop();else if(n==='smith')openSmith();else if(n==='inn')openRest('inn');else if(n==='weapons')openWShop();else elder()}}
function elder(){const nm='村長ミカン',T_=S.talk;
 if(S.q===0)return dialog(nm,['おお、旅のミカンよ！ よく来てくれた。','最近、世界に黒い霧が広がって、スライムたちが凶暴になっておる。','まずは草原のスライムを5体ほど倒して、腕試しをしてきてくれんか？','これは少ないが、準備金じゃ。(20G)','この村には「祠」(💾セーブ)、宿屋、かじや、武器屋、お店がある。いつでも頼るがよい。'],()=>{S.q=1;S.qk=0;P.gold+=20;toast('クエスト受注：スライムを5体倒そう');save(true)});
 if(S.q===1){if(S.qk>=5)return dialog(nm,['見事じゃ！ やはりお主は頼りになる！','報酬の100Gとジュースを受け取っておくれ。','次は北の「きらきらの森」じゃ。森のぬしが霧に呑まれておる…頼んだぞ！','マップ(Tab)の⭐が次の目的地じゃ。ピン📍も立てられるぞ。洞窟(ダンジョン)にも宝があるそうじゃ。'],()=>{S.q=2;P.gold+=100;giveItem('juice',2);gainExp(40);toast('クエスト達成！ 100G・ジュース×2・40EXP',3500);save(true)});
  return dialog(nm,['スライムはあと'+(5-S.qk)+'体じゃな。草原を探してみなされ。無理は禁物じゃぞ！'])}
 if(S.bk.forest&&!T_.f)return dialog(nm,['おお…！ 森に光が戻っておる！ ありがとう、小さな勇者よ！','次は東の「みずの渓谷」じゃ。滝の前に「たきのまもりがみ」がおる。雷の力が効くと聞くぞ。','これは礼じゃ。(300G)'],()=>{T_.f=1;P.gold+=300;save(true)});
 if(S.bk.valley&&!T_.v)return dialog(nm,['渓谷にも水の清らかさが戻ったのう！','次は西の岩山。「いわやまのきょじん」は、大技のあとに弱点をさらすそうじゃ。','キャンプセットも使うとよい。どこでも休めるぞ。(500G)'],()=>{T_.v=1;P.gold+=500;giveItem('tent',1);save(true)});
 if(S.bk.rock&&!T_.r)return dialog(nm,['岩山の巨人まで倒すとは…！ もはや伝説じゃ！','残るは北東の魔王城…。城の前には強力な門番「ガーディアン」が立ちはだかっておる。','最後の旅に、これを持っていけ。(1000G)'],()=>{T_.r=1;P.gold+=1000;giveItem('hij',3);save(true)});
 if(S.bk.gate&&!T_.g)return dialog(nm,['門番まで倒したか！ ついに魔王城の扉が開いたのう。','城の中は恐ろしい魔物の巣じゃ。中には「やみのまおう」…そして倒したはずの者たちまで甦るという噂じゃ。','レベルは100が目安じゃ。装備を整え、矢も忘れるでないぞ！(3000G)'],()=>{T_.g=1;P.gold+=3000;giveItem('hij',5);save(true)});
 if(S.bk.demon&&!T_.d)return dialog(nm,['世界を包んでいた黒い霧が、晴れていく…！','小さなミカンの勇者よ、本当にありがとう！','『みかんの大冒険』— 完。','(これからも自由に冒険して、ダンジョンや強敵、宝箱を探してみよう)'],()=>{T_.d=1;P.gold+=30000;toast('🎊 エンディング！ 30000G獲得',6000);save(true)});
 const b=nextBoss();if(b)return dialog(nm,['次の目的地は'+BWHERE[b]+'、「'+BN[b]+'」じゃ。(推奨Lv'+BDEF[b].rec+')','準備は万全かの？ 祠で休み、宿屋で眠り、かじやで剣を鍛え、武器屋で装備を整えるのじゃ。']);
 dialog(nm,['世界を救う旅は、終わった。じゃが冒険はいつまでも続く。気をつけてな！'])}
const SHOP=[['juice','みかんジュース (HP回復)',30],['hij','ハイジュース (HP50%回復)',400],['candy','スタミナキャンディー',20],['fruit','みかん (HP+30)',10],['tent','キャンプセット (どこでも休める)',80],['atk','攻撃力アップの実 (永続+3)',150]];
function openShop(){openUI('shop');drawShop()}
function drawShop(){let h='<h2>🍬 おかしやさん</h2><div style="margin-bottom:8px">所持金：<b>'+P.gold+'G</b></div>';
 SHOP.forEach((s,i)=>{const dis=P.gold<s[2]||(s[0]==='atk'&&P.atkB>=30);h+='<div class="row"><span>'+s[1]+'</span><span>'+s[2]+'G <button class="b" data-i="'+i+'" '+(dis?'disabled':'')+'>買う</button></span></div>'});
 const na=ARM[P.arm+1];if(na&&na.p)h+='<div class="row"><span>🛡 '+na.n+' (防御+'+na.d+')</span><span>'+na.p+'G <button class="b" data-a="1" '+(P.gold<na.p?'disabled':'')+'>買う</button></span></div>';
 h+='<div style="text-align:right"><button class="b" id="shc">閉じる</button></div>';$('shopp').innerHTML=h;
 $('shopp').querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const s=SHOP[+b.dataset.i];if(P.gold<s[2])return;P.gold-=s[2];if(s[0]==='atk')P.atkB+=3;else giveItem(s[0],1);tone(900,.1,'triangle',.06);drawShop()});
 $('shopp').querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=ARM[P.arm+1];if(!a||P.gold<a.p)return;P.gold-=a.p;P.arm++;toast(a.n+'を装備した！',2500);tone(900,.1,'triangle',.06);drawShop()});$('shc').onclick=()=>closeUI()}
const ammoStr=()=>Object.keys(AMMO).map(k=>AMMO[k].n+P.ar[k]).join(' ');
function openWShop(){openUI('shop');drawWShop()}
function drawWShop(){let h='<h2>⚔ 武器屋</h2><div>所持金：<b>'+P.gold+'G</b>　矢：'+ammoStr()+'</div><div style="font-size:13px;margin:4px 0">剣・槍・ハンマー・弓。弓は左クリック長押しで引き、離すと発射(F:矢の種類切替)。R:武器切替。強い武器はダンジョンの宝箱やボスの報酬でも手に入ります。</div>';
 WEP.forEach((w,i)=>{const own=P.own.includes(i);if(!w.p&&!own)return;const cur=P.wep===i;h+='<div class="row"><span>'+(cur?'★ ':'')+w.n+' <small>['+WT[w.t].n+' 攻撃+'+w.a+(w.el?' '+ELN[w.el]+'属性':'')+']</small></span>'+(own?'<button class="b" data-e="'+i+'" '+(cur?'disabled':'')+'>装備</button>':'<span>'+w.p+'G <button class="b" data-b="'+i+'" '+(P.gold<w.p?'disabled':'')+'>買う</button></span>')+'</div>'});
 h+='<hr><div><b>矢（20本セット）</b></div>';Object.keys(AMMO).forEach(k=>{const a=AMMO[k],pr=a.p*20;h+='<div class="row"><span>'+a.n+' (所持 '+P.ar[k]+')'+(a.el?' <small>'+ELN[a.el]+'属性</small>':'')+'</span><span>'+pr+'G <button class="b" data-a="'+k+'" '+(P.gold<pr?'disabled':'')+'>買う</button></span></div>'});
 h+='<div style="text-align:right"><button class="b" id="shc">閉じる</button></div>';$('shopp').innerHTML=h;const q=$('shopp');
 q.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{equip(+b.dataset.e);drawWShop()});
 q.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const i=+b.dataset.b,w=WEP[i];if(P.gold<w.p)return;P.gold-=w.p;P.own.push(i);equip(i);tone(900,.1,'triangle',.06);drawWShop()});
 q.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const k=b.dataset.a,pr=AMMO[k].p*20;if(P.gold<pr)return;P.gold-=pr;P.ar[k]+=20;tone(900,.1,'triangle',.06);drawWShop()});$('shc').onclick=()=>closeUI()}
function smithReq(){const n=P.wl;return{g:80*(n+1)+n*n*20,k:n<5?'jelly':n<12?'ore':'shard',n:n<5?(n+1)*4:n<12?(n-4)*3:(n-11)*3+3}}
function openSmith(){openUI('shop');drawSmith()}
function drawSmith(){const r=smithReq(),max=P.wl>=30,ok=!max&&P.gold>=r.g&&P.mat[r.k]>=r.n;
 let h='<h2>🔨 かじや</h2><div>装備中：<b>'+WEP[P.wep].n+'</b>　武器の強化 <b>+'+P.wl+'</b>　攻撃力 <b>'+ATK()+'</b></div><div style="margin:8px 0;font-size:15px">所持：💰'+P.gold+'G　ゼリー'+P.mat.jelly+'　鉱石'+P.mat.ore+'　かけら'+P.mat.shard+'</div>';
 h+=max?'<div>これ以上は強化できません (最大+30)</div>':'<div class="row"><span>+'+(P.wl+1)+' に強化 (攻撃力+3)<br><small>必要：'+r.g+'G ＋ '+MATN[r.k]+'×'+r.n+'</small></span><button class="b" id="smb" '+(ok?'':'disabled')+'>強化する</button></div>';
 h+='<div style="font-size:13px;margin-top:6px">強化はすべての武器(剣・槍・ハンマー・弓)に効きます。素材は敵の落とし物や宝箱から。</div><div style="text-align:right"><button class="b" id="shc">閉じる</button></div>';$('shopp').innerHTML=h;$('shc').onclick=()=>closeUI();
 if($('smb'))$('smb').onclick=()=>{if(!ok)return;P.gold-=r.g;P.mat[r.k]-=r.n;P.wl++;tone(500,.3,'square',.07,500);[784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.2,'triangle',.07),i*100));toast('武器が +'+P.wl+' に強化された！ (攻撃力'+ATK()+')',3000);drawSmith()}}
function openRest(kind){openUI('shop');drawRest(kind)}
function drawRest(kind){const price=kind==='inn'?30:0;
 let h='<h2>'+(kind==='inn'?'🛏 やどや':'⛺ キャンプ')+'</h2><div>ぐっすり休んで、好きな時間帯に起きられます。HPとスタミナが全回復し、セーブもされます。'+(price?'(1泊 '+price+'G)':'(キャンプセットを1つ使います)')+'</div><div style="margin:10px 0">現在：<b>'+todLabel()+' '+clockStr()+'</b></div>';
 [['🌅 朝まで寝る',.05],['☀ 昼まで寝る',.2],['🌇 夕方まで寝る',.42],['🌙 夜まで寝る',.65]].forEach(x=>{h+='<button class="b" data-t="'+x[1]+'" '+(P.gold<price?'disabled':'')+'>'+x[0]+'</button>'});
 h+='<div style="text-align:right"><button class="b" id="shc">やめる</button></div>';$('shopp').innerHTML=h;$('shc').onclick=()=>closeUI();
 $('shopp').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{P.gold-=price;if(kind==='tent')P.items.tent--;S.tod=+b.dataset.t;P.hp=maxHP();P.st=100;W.tg=0;W.wet=0;W.t=90;
  $('fade').style.opacity=1;setTimeout(()=>$('fade').style.opacity=0,700);closeUI();toast('ぐっすり眠った… '+todLabel()+' '+clockStr(),3000);tone(523,.6,'sine',.06);save(true)})}
function drawInv(){let h='<h2>🎒 持ち物</h2><div class="row"><span>Lv '+P.lv+'　EXP '+P.exp+'/'+need()+'</span><span>'+P.gold+' G</span></div>'+
 '<div class="row"><span>HP '+Math.ceil(P.hp)+'/'+maxHP()+'</span><span>攻撃力 '+ATK()+'　防御力 '+DEF()+'</span></div><div class="row"><span>武器：'+WEP[P.wep].n+' +'+P.wl+'</span><span>防具：'+ARM[P.arm].n+'</span></div>'+
 '<div class="row"><span>素材：ゼリー'+P.mat.jelly+'　鉱石'+P.mat.ore+'　かけら'+P.mat.shard+'</span><span>倒した数 '+P.kills+'</span></div><div class="row"><span>矢：'+ammoStr()+'</span><span>使用中：'+AMMO[P.am].n+'</span></div><hr>';
 ITEMS.forEach(i=>{h+='<div class="row"><span>'+i[2]+' '+i[1]+' × '+(P.items[i[0]]||0)+'</span><button class="b" data-k="'+i[0]+'" '+((P.items[i[0]]||0)?'':'disabled')+'>使う</button></div>'});
 h+='<hr><div><b>武器</b> (R:切替)</div>';P.own.slice().sort((a,b)=>a-b).forEach(i=>{const w=WEP[i];h+='<div class="row"><span>'+(P.wep===i?'★ ':'')+w.n+' <small>['+WT[w.t].n+' +'+w.a+(w.el?' '+ELN[w.el]:'')+']</small></span><button class="b" data-w="'+i+'" '+(P.wep===i?'disabled':'')+'>装備</button></div>'});
 h+='<div style="text-align:right"><button class="b" id="ivc">閉じる (I)</button></div>';$('invp').innerHTML=h;$('invp').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(b.dataset.k==='tent')closeUI(true);useItem(b.dataset.k)});$('invp').querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{equip(+b.dataset.w);drawInv()});$('ivc').onclick=()=>closeUI()}
// ---------- maps
const base=document.createElement('canvas');base.width=base.height=512;
{const N=256,c=base.getContext('2d'),im=c.createImageData(N,N),cs=1400/N;
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const x=-700+i*cs,z=-700+j*cs,h=H(x,z),hx=H(x+cs,z)-h,hz=H(x,z+cs)-h,ny=1/Math.sqrt(1+(hx/cs)**2+(hz/cs)**2);let col=h<-.05?[.18,.45,.75]:biome(x,z,h,ny);
  const sh=h<-.05?1:clamp(1-hx*.04-hz*.02,.7,1.25);const o=(j*N+i)*4;for(let k=0;k<3;k++)im.data[o+k]=Math.min(255,Math.pow(Math.min(1,col[k]*sh),1/2.2)*255);im.data[o+3]=255}
 const t=document.createElement('canvas');t.width=t.height=N;t.getContext('2d').putImageData(im,0,0);c.imageSmoothingEnabled=true;c.drawImage(t,0,0,512,512)}
const seen=(a,b)=>disc[Math.floor((b+700)/1400*64)*64+Math.floor((a+700)/1400*64)];
function marks(x,tw,full){x.textAlign='center';x.textBaseline='middle';
 const lab=(a,b,ch,t,force)=>{if(!force&&!seen(a,b))return;const px=tw(a),py=tw(b);x.font='20px sans-serif';x.fillStyle='#fff';x.fillText(ch,px,py);if(t){x.font='bold 13px sans-serif';x.lineWidth=3;x.strokeStyle='#000';x.strokeText(t,px,py+18);x.fillText(t,px,py+18)}};
 lab(0,300,'🏠','おかしな村');ARENAS.forEach(a=>lab(a.x,a.z,S.bk[a.id]?'✅':'💀',BN[a.id]));lab(470,-505,'🏰','魔王城');
 SHRINES.forEach((s,i)=>{if(!seen(s[0],s[1])&&!S.shrines.includes(i))return;const a=tw(s[0]),b=tw(s[1]);x.beginPath();x.arc(a,b,8,0,6.283);x.fillStyle=S.shrines.includes(i)?(S.sel===i?'#fff':'#4ac8ff'):'#888';x.fill();x.strokeStyle='#fff';x.lineWidth=2;x.stroke()});
 x.fillStyle='#ffd23a';CH.forEach(c=>{if(c.open||!seen(c.x,c.z))return;x.fillRect(tw(c.x)-3,tw(c.z)-3,6,6)});
 if(S.pin)lab(S.pin[0],S.pin[1],'📍','ピン',true);const o=objective();if(o)lab(o[0],o[1],'⭐','目的地: '+o[2],true);
 const a=tw(P.x),b=tw(P.z);x.save();x.translate(a,b);x.rotate(-P.yaw+Math.PI);x.fillStyle='#ff3a2a';x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(0,-10);x.lineTo(7,8);x.lineTo(0,4);x.lineTo(-7,8);x.closePath();x.fill();x.stroke();x.restore()}
function dseen(dg,x,z){const cx=Math.floor((x-dg.ox)/CS),cz=Math.floor((z-dg.oz)/CS);return cx>=0&&cz>=0&&cx<dg.W&&cz<dg.H&&dg.disc[cz*dg.W+cx]===1}
function drawDunMap(dg){const c=$('mapc'),x=c.getContext('2d'),SZ=640;x.fillStyle='#0e0a14';x.fillRect(0,0,SZ,SZ);const k=SZ/(dg.W*CS),cw=CS*k;
 for(let y=0;y<dg.H;y++)for(let xx=0;xx<dg.W;xx++){if(!dg.disc[y*dg.W+xx])continue;x.fillStyle=dg.g[y*dg.W+xx]?'#2a2438':'#80789a';x.fillRect(xx*cw,y*cw,cw+.6,cw+.6)}
 const tw=(wx,wz)=>[(wx-dg.ox)*k,(wz-dg.oz)*k];x.textAlign='center';x.textBaseline='middle';x.font='20px sans-serif';
 let q=tw(dg.exitPos[0],dg.exitPos[1]);x.fillStyle='#6adfff';x.beginPath();x.arc(q[0],q[1],8,0,6.283);x.fill();x.fillStyle='#fff';x.font='bold 13px sans-serif';x.fillText('出口',q[0],q[1]+16);x.font='20px sans-serif';
 CH.forEach(c=>{if(c.open||c.x<dg.ox||c.x>dg.ox+dg.W*CS||c.z<dg.oz||c.z>dg.oz+dg.H*CS||!dseen(dg,c.x,c.z))return;const p=tw(c.x,c.z);x.fillStyle='#ffd23a';x.fillRect(p[0]-4,p[1]-4,8,8)});
 const b=BS.find(o=>o.id===dg.bossId&&!o.minion);if(b&&b.alive){q=tw(b.ax,b.az);x.fillStyle='#fff';x.fillText('⭐',q[0],q[1]);x.font='bold 13px sans-serif';x.fillText(b.def.name,q[0],q[1]+18)}
 q=tw(P.x,P.z);x.save();x.translate(q[0],q[1]);x.rotate(-P.yaw+Math.PI);x.fillStyle='#ff3a2a';x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(0,-10);x.lineTo(7,8);x.lineTo(0,4);x.lineTo(-7,8);x.closePath();x.fill();x.stroke();x.restore();
 x.fillStyle='#fff';x.font='bold 18px sans-serif';x.textAlign='left';x.fillText(dg.name+'　推奨Lv'+dg.rec,10,18)}
function drawMap(){if(inDun()){const dg=curDun();if(dg)return drawDunMap(dg)}const c=$('mapc'),x=c.getContext('2d'),W_=640;x.drawImage(base,0,0,W_,W_);const cw=W_/64;x.fillStyle='rgba(18,12,6,.93)';
 for(let j=0;j<64;j++)for(let i=0;i<64;i++)if(!disc[j*64+i])x.fillRect(i*cw-.5,j*cw-.5,cw+1,cw+1);
 marks(x,v=>(v+700)/1400*W_,true)}
$('mapc').onclick=e=>{if(inDun())return;const r=e.target.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width*1400-700,mz=(e.clientY-r.top)/r.height*1400-700;
 let bi=-1,bd=34;SHRINES.forEach((s,i)=>{const d=Math.hypot(s[0]-mx,s[1]-mz);if(S.shrines.includes(i)&&d<bd){bd=d;bi=i}});
 if(bi>=0){if(S.sel===bi){closeUI(true);const s=SHRINES[bi];P.x=s[0]+3;P.z=s[1]+3;P.y=H(P.x,P.z);P.vx=P.vz=0;S.sel=-1;toast('ファストトラベル：'+s[2]);tone(600,.4,'sine',.07,600);lock()}else{S.sel=bi;toast('もう一度クリックで「'+SHRINES[bi][2]+'」へ移動',1800);drawMap()}}
 else{S.sel=-1;S.pin=[mx,mz];toast('📍 ピンを立てました (光の柱が目印です)',2000);tone(800,.1,'triangle',.05);drawMap()}};
$('mapc').oncontextmenu=e=>{e.preventDefault();S.pin=null;drawMap();toast('ピンを消しました',1200)};
$('pinclr').onclick=()=>{S.pin=null;drawMap();toast('ピンを消しました',1200)};
function drawDunMini(dg){const c=$('mm'),x=c.getContext('2d');x.clearRect(0,0,170,170);x.fillStyle='#0e0a14';x.fillRect(0,0,170,170);const sp=110,k=170/sp;
 x.save();x.beginPath();x.arc(85,85,85,0,6.283);x.clip();const gx0=Math.floor((P.x-sp/2-dg.ox)/CS),gx1=Math.floor((P.x+sp/2-dg.ox)/CS),gz0=Math.floor((P.z-sp/2-dg.oz)/CS),gz1=Math.floor((P.z+sp/2-dg.oz)/CS);
 for(let z=gz0;z<=gz1;z++)for(let xx=gx0;xx<=gx1;xx++){if(xx<0||z<0||xx>=dg.W||z>=dg.H||!dg.disc[z*dg.W+xx])continue;x.fillStyle=dg.g[z*dg.W+xx]?'#2a2438':'#80789a';x.fillRect(85+(dg.ox+xx*CS-P.x)*k,85+(dg.oz+z*CS-P.z)*k,CS*k+.6,CS*k+.6)}
 const dot=(wx,wz,col,r)=>{x.fillStyle=col;x.beginPath();x.arc(85+(wx-P.x)*k,85+(wz-P.z)*k,r,0,6.283);x.fill()};
 dot(dg.exitPos[0],dg.exitPos[1],'#6adfff',4);CH.forEach(c=>{if(!c.open&&Math.abs(c.x-P.x)<sp&&Math.abs(c.z-P.z)<sp&&dseen(dg,c.x,c.z))dot(c.x,c.z,'#ffd23a',3)});
 EN.forEach(e=>{if(e.state!=='dead'&&Math.abs(e.x-P.x)<sp/2&&Math.abs(e.z-P.z)<sp/2&&dseen(dg,e.x,e.z))dot(e.x,e.z,'#f33',2.5)});BS.forEach(b=>{if(b.alive&&b.engaged||(b.alive&&b.id===dg.bossId&&dseen(dg,b.ax,b.az)))dot(b.x,b.z,'#f0f',6)});
 x.translate(85,85);x.rotate(-P.yaw+Math.PI);x.fillStyle='#fff';x.strokeStyle='#e22';x.lineWidth=2;x.beginPath();x.moveTo(0,-9);x.lineTo(6,7);x.lineTo(0,3);x.lineTo(-6,7);x.closePath();x.fill();x.stroke();x.restore()}
function drawMini2(){const dgm=curDun();if(dgm)return drawDunMini(dgm);const c=$('mm'),x=c.getContext('2d'),sp=300,s=sp/1400*512,sx=(P.x+700)/1400*512-s/2,sz=(P.z+700)/1400*512-s/2;
 x.clearRect(0,0,170,170);x.fillStyle='#142';x.fillRect(0,0,170,170);x.drawImage(base,sx,sz,s,s,0,0,170,170);
 const k=170/sp;x.save();x.beginPath();x.arc(85,85,85,0,6.283);x.clip();const px=P.x,pz=P.z;
 const dot=(wx,wz,col,r)=>{const a=85+(wx-px)*k,b=85+(wz-pz)*k;x.fillStyle=col;x.beginPath();x.arc(a,b,r,0,6.283);x.fill()};
 const edge=(wx,wz,ch)=>{let a=(wx-px)*k,b=(wz-pz)*k;const l=Math.hypot(a,b);if(l>74){a=a/l*74;b=b/l*74}x.font='15px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.fillText(ch,85+a,85+b)};
 SHRINES.forEach((s,i)=>dot(s[0],s[1],S.shrines.includes(i)?'#4ac8ff':'#999',4));CH.forEach(c=>{if(!c.open&&seen(c.x,c.z))dot(c.x,c.z,'#ffd23a',3)});
 EN.forEach(e=>{if(e.state!=='dead'&&Math.hypot(e.x-px,e.z-pz)<130)dot(e.x,e.z,'#f33',2.5)});BS.forEach(b=>{if(b.alive)dot(b.x,b.z,'#f0f',6)});dot(0,300,'#fff',5);
 const o=objective();if(o)edge(o[0],o[1],'⭐');if(S.pin)edge(S.pin[0],S.pin[1],'📍');
 x.translate(85,85);x.rotate(-P.yaw+Math.PI);x.fillStyle='#fff';x.strokeStyle='#e22';x.lineWidth=2;x.beginPath();x.moveTo(0,-9);x.lineTo(6,7);x.lineTo(0,3);x.lineTo(-6,7);x.closePath();x.fill();x.stroke();x.restore()}
// ---------- environment
const mk=(t,h,f,s,g,l,li,hi)=>({top:new T.Color(t),hor:new T.Color(h),fog:new T.Color(f),hs:new T.Color(s),hg:new T.Color(g),lc:new T.Color(l),li,hi});
const PN=mk(0x0a1230,0x28407a,0x28407a,0x4a60a8,0x20253a,0x9ab0ff,1.2,1.1),PD=mk(0x39508f,0xff9a5c,0xe8a477,0xffc79a,0x5a4a3a,0xff9d5a,1.5,.9),PY=mk(0x3b8be0,0xbfe4ff,0xcfe9fb,0xcfe8ff,0x7a9a55,0xfff1d6,2.8,1.5);
const PO={top:new T.Color(),hor:new T.Color(),fog:new T.Color(),hs:new T.Color(),hg:new T.Color(),lc:new T.Color(),li:0,hi:0};
function blend(a,b,t){for(const k of['top','hor','fog','hs','hg','lc'])PO[k].copy(a[k]).lerp(b[k],t);PO.li=lerp(a.li,b.li,t);PO.hi=lerp(a.hi,b.hi,t)}
const GRAY=new T.Color(0x7f8a96),PUR=new T.Color(0x3a2058),HAZE=new T.Color(0x6a8a70),WHITE=new T.Color(0xffffff),RED=new T.Color(0x5a1a14),RED2=new T.Color(0xa03a14),RED3=new T.Color(0x401010);
const W={wet:0,tg:0,t:70};
const rain=(()=>{const n=1300,a=new Float32Array(n*6);for(let i=0;i<n;i++){a[i*6]=(Math.random()-.5)*60;a[i*6+1]=Math.random()*30;a[i*6+2]=(Math.random()-.5)*60;a[i*6+3]=a[i*6];a[i*6+4]=a[i*6+1]-1.2;a[i*6+5]=a[i*6+2]}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(a,3));const l=new T.LineSegments(g,new T.LineBasicMaterial({color:0xaec8ff,transparent:true,opacity:0,fog:false}));l.frustumCulled=false;scene.add(l);return l})();
const sunV=new T.Vector3(),ldir=new T.Vector3(),moonD=new T.Vector3(-.4,.8,-.3).normalize();
function setOrbs(){shrineOrbs.forEach((o,i)=>{const on=S.shrines.includes(i);o.material.emissive.setHex(on?0x2ab8ff:0x000000);o.material.color.setHex(on?0x8adfff:0x555a66)})}
function updateEnv(dt,fx,fy,fz){
 if(state==='play'&&!ui){S.tod=(S.tod+dt/420)%1;W.t-=dt;if(W.t<=0){W.tg=W.tg?0:(Math.random()<.45?1:0);W.t=W.tg?45+Math.random()*50:80+Math.random()*100}}
 W.wet+=(W.tg-W.wet)*Math.min(1,dt*.3);
 const a=S.tod*6.2832,s=Math.sin(a);sunV.set(Math.cos(a)*.55,s,.45).normalize();
 if(s<0)blend(PN,PD,sm((s+.25)/.25));else blend(PD,PY,sm(s/.45));
 const fa=fx<800?Math.min(1,gw(fx,fz,FIN.x,FIN.z,130)*1.5):0,dd=Math.min(1,gw(fx,fz,470,-470,230)*1.5)*(S.bk.demon?.2:1),fh=S.bk.forest?0:Math.min(1,gw(fx,fz,0,-420,200)*1.2)*.45,wt=W.wet;
 for(const k of['top','hor','fog','hs'])PO[k].lerp(GRAY,.5*wt);PO.fog.lerp(PUR,dd).lerp(HAZE,fh).lerp(RED,fa);PO.hor.lerp(PUR,dd*.8).lerp(RED2,fa*.8);PO.top.lerp(RED3,fa*.7);
 skyMat.uniforms.top.value.copy(PO.top);skyMat.uniforms.hor.value.copy(PO.hor);skyMat.uniforms.sun.value.copy(sunV);skyMat.uniforms.glow.value=clamp(s*4+.6,0,1)*(1-wt*.85);
 scene.fog.color.copy(PO.fog);scene.fog.near=lerp(lerp(140,90,wt),50,dd);scene.fog.far=lerp(lerp(640,330,wt),230,dd)*(1-fh*.35);
 hemi.color.copy(PO.hs);hemi.groundColor.copy(PO.hg);hemi.intensity=PO.hi*(1-.25*wt)*(1-.12*dd);
 const w=sm(-s/.25);ldir.set(lerp(sunV.x,moonD.x,w),lerp(Math.max(s,.17),moonD.y,w),lerp(sunV.z,moonD.z,w)).normalize();
 sun.color.copy(PO.lc);sun.intensity=PO.li*(1-.55*wt)*(1-.2*dd);sun.target.position.set(fx,fy,fz);sun.position.set(fx+ldir.x*160,fy+ldir.y*160,fz+ldir.z*160);
 stars.material.opacity=sm((-s-.05)/.25)*(1-wt);sky.position.set(fx,0,fz);stars.position.set(fx,0,fz);
 const cc=PO.fog.clone().lerp(WHITE,.5);
 for(const c of clouds){c.position.x+=dt*3;if(c.position.x>fx+950)c.position.x-=1900;if(c.position.x<fx-950)c.position.x+=1900;
  c.children.forEach(m=>{m.material.color.copy(cc);m.material.opacity=.92-.3*(1-sm(s+.3))})}
 rain.visible=wt>.03;if(rain.visible){rain.material.opacity=.55*wt;const p=rain.geometry.attributes.position.array;rain.position.set(fx,fy,fz);
  for(let i=0;i<1300;i++){let y=p[i*6+1]-45*dt;if(y<-6){y+=36}p[i*6+1]=y;p[i*6+4]=y-1.4}rain.geometry.attributes.position.needsUpdate=true}
 {const dgE=fx>=800?dunAt(fx,fz):null;if(dgE){const th=new T.Color(dgE.wall).multiplyScalar(.55);scene.fog.color.copy(th);scene.fog.near=14;scene.fog.far=dgE.id==='castle'?190:150;hemi.color.set(0xc8c8f0);hemi.groundColor.set(0x6a6078);hemi.intensity=2.4;sun.intensity=0;amb.intensity=1.5;lantern.intensity=8;renderer.toneMappingExposure=1.55;lantern.position.set(fx,fy+4,fz);skyMat.uniforms.top.value.copy(th);skyMat.uniforms.hor.value.copy(th);stars.material.opacity=0;rain.visible=false}else{lantern.intensity=0;amb.intensity=0;renderer.toneMappingExposure=1.0}}
 WFTEX.offset.y-=dt*.9;if(window.castleBar)castleBar.visible=!S.bk.gate;
 water.material.opacity=.7+.04*Math.sin(performance.now()*.001);water.position.y=Math.sin(performance.now()*.0012)*.05;
 shrineOrbs.forEach((o,i)=>{o.position.y=4.3+Math.sin(performance.now()*.002+i)*.2;o.rotation.y+=dt})}
// ---------- HUD refresh
let hudT=0;
function hud(dt){const mh=maxHP();$('hpf').style.width=clamp(P.hp/mh*100,0,100)+'%';$('stf').style.width=P.st+'%';$('exf').style.width=P.exp/need()*100+'%';$('spf').style.width=P.sp+'%';$('spt').textContent=P.sp>=100?'必殺技 Q':'';
 const eb=engagedBosses();$('boss').classList.toggle('hidden',!eb.length);$('xh').classList.toggle('hidden',wtype()!=='bow');
 hudT-=dt;if(hudT<=0){hudT=.1;$('hpt').textContent='HP '+Math.ceil(P.hp)+' / '+mh;$('lv').textContent='Lv '+P.lv+(P.lv>=100?' (MAX)':'　EXP '+P.exp+'/'+need());$('gold').textContent='💰 '+P.gold+' G';
  const w=WEP[P.wep];$('wep').textContent='⚔ '+w.n+(P.wl?' +'+P.wl:'')+' (攻撃力 '+(ATK()>1e8?'∞':w.fix?w.fix:ATK())+')　🛡 防御 '+DEF()+(w.t==='bow'?'　🏹 '+AMMO[P.am].n+' ×'+P.ar[P.am]:'');
  const dg=curDun();$('tod').textContent=(dg?'🏰 '+dg.name+' (推奨Lv'+dg.rec+')':todLabel()+' '+clockStr()+(W.wet>.4?' ☔':''))+(CHEAT?(P.heli?' 🚁':'')+' 🛠CHEAT':'');
  $('quest').innerHTML=questHTML();ITEMS.forEach((it,i)=>{$('s'+(i+1)).innerHTML='<big>'+it[2]+'</big>'+(i+1)+': <em>×'+(P.items[it[0]]||0)+'</em>'});drawMini2();
  let bh='';eb.forEach(b=>{const D=b.def;let bars='';const col='linear-gradient(#ff8a7a,#c01e1e)';
   if(D.gauges){for(let g=0;g<D.gauges;g++){const wv=g<b.gauge?0:g===b.gauge?Math.max(0,b.hp/b.max*100):100;bars+='<div class="bar" style="height:12px;margin-top:3px"><i style="width:'+wv+'%;background:'+col+'"></i></div>'}}
   else bars='<div class="bar" style="height:18px;margin-top:3px"><i style="width:'+Math.max(0,b.hp/b.max*100)+'%;background:'+col+'"></i></div>';
   bh+='<div class="t" style="font-size:16px;font-weight:800;margin-top:6px">👑 '+D.name+(b.form?'　'+['','第2形態','最終形態'][b.form]:'')+(b.sh?'　🛡結界中':'')+'　<small>推奨Lv'+D.rec+'</small></div>'+bars});
  $('boss').innerHTML=bh}
 for(let i=NUM.length-1;i>=0;i--){const n=NUM[i];n.t+=dt;const p=proj(n.x,n.y+n.t*1.6,n.z);if(p){n.e.style.left=p[0]+'px';n.e.style.top=p[1]+'px';n.e.style.opacity=Math.max(0,1-n.t/.9);n.e.style.display=''}else n.e.style.display='none';if(n.t>.9){n.e.remove();NUM.splice(i,1)}}
 let bi=0;for(const e of EN){if(bi>=EB.length)break;if(e.state==='dead'||!e.mesh.visible)continue;const d=Math.hypot(e.x-P.x,e.z-P.z);if(d>28||(e.hp>=e.max&&e.state==='idle'))continue;const p=proj(e.x,e.y+2.6*e.df.sc,e.z);if(!p)continue;const b=EB[bi++];b.classList.remove('hidden');b.style.left=p[0]+'px';b.style.top=p[1]+'px';b.firstChild.textContent=e.df.n;b.lastChild.style.width=Math.max(0,e.hp/e.max*100)+'%'}
 for(;bi<EB.length;bi++)EB[bi].classList.add('hidden');
 let k=0;const add=(x,y,z,t)=>{if(k>=TG.length)return;const p=proj(x,y,z);if(!p)return;const e=TG[k++];e.classList.remove('hidden');e.style.left=p[0]+'px';e.style.top=p[1]+'px';e.textContent=t};
 const dgT=curDun();
 if(!dgT){for(const n of NPCS)if(Math.hypot(n.x-P.x,n.z-P.z)<45)add(n.x,n.y+3.6,n.z,n.tag);
  SHRINES.forEach((s,i)=>{if(Math.hypot(s[0]-P.x,s[1]-P.z)<80)add(s[0],H(s[0],s[1])+6.2,s[1],(S.shrines.includes(i)?'💾 ':'◇ ')+'祠「'+s[2]+'」')});
  for(const dr of DOORS)if(Math.hypot(dr.x-P.x,dr.z-P.z)<90)add(dr.x,H(dr.x,dr.z)+9,dr.z,'🕳 '+dr.name+' (推奨Lv'+dr.rec+')')}
 else add(dgT.exitPos[0],DY+5,dgT.exitPos[1],'出口');
 for(;k<TG.length;)TG[k++].classList.add('hidden')}
// ---------- input
addEventListener('keydown',e=>{if(e.code==='Tab'||e.code==='Space'||e.code.startsWith('Arrow'))e.preventDefault();if(e.repeat)return;K[e.code]=true;if(state!=='play')return;
 if(ui==='dlg'){if(e.code==='KeyE'||e.code==='Space'||e.code==='Enter')advance();return}
 if(e.code==='Escape'){if(ui)closeUI();else if(!locked)openUI('menu');return}
 if(e.code==='Tab'){if(ui==='map')closeUI();else if(!ui){S.sel=-1;drawMap();openUI('map')}return}
 if(e.code==='KeyI'){if(ui==='inv')closeUI();else if(!ui){drawInv();openUI('inv')}return}
 if(e.code==='KeyM'){muted=!muted;toast(muted?'サウンド OFF':'サウンド ON',900);return}
 if(ui)return;
 if(e.code==='KeyE')interact();else if(e.code==='KeyQ')special();
 else if(e.code==='KeyH'){if(CHEAT){P.heli=!P.heli;toast(P.heli?'🚁 ヘリコプター装備！ Space:上昇 C:下降':'ヘリコプターを降りた',2000);if(!P.heli)P.vy=0}}
 else if(e.code==='KeyR'){const o=P.own.slice().sort((a,b)=>a-b),i=o.indexOf(P.wep);equip(o[(i+1)%o.length])}
 else if(e.code==='KeyF'){const ks=Object.keys(AMMO).filter(k=>P.ar[k]>0);if(ks.length){P.am=ks[(Math.max(0,ks.indexOf(P.am))+1)%ks.length];toast('矢：'+AMMO[P.am].n+' ×'+P.ar[P.am],1200)}}
 else if(e.code==='ShiftLeft'||e.code==='ShiftRight'){if(P.dodge<=0&&P.st>=25*stM()&&P.dead<=0&&P.stun<=0){P.st-=25*stM();P.dodge=.28;P.inv=.4;P.draw=0;const fx=-Math.sin(camYaw),fz=-Math.cos(camYaw),rx=Math.cos(camYaw),rz=-Math.sin(camYaw),ix=(K.KeyD?1:0)-(K.KeyA?1:0),iz=(K.KeyW?1:0)-(K.KeyS?1:0);let mx=fx*iz+rx*ix,mz=fz*iz+rz*ix;const l=Math.hypot(mx,mz);if(l>0){P.dx=mx/l;P.dz=mz/l}else{P.dx=Math.sin(P.yaw);P.dz=Math.cos(P.yaw)}P.atk=0;P.yaw=Math.atan2(P.dx,P.dz);tone(200,.2,'sine',.06,300)}}
 else if(e.code==='Digit1')useItem('juice');else if(e.code==='Digit2')useItem('candy');else if(e.code==='Digit3')useItem('fruit');else if(e.code==='Digit4')useItem('tent');else if(e.code==='Digit5')useItem('hij')});
addEventListener('keyup',e=>{K[e.code]=false});
addEventListener('blur',()=>{for(const k in K)K[k]=false});
addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('mousedown',e=>{if(state!=='play')return;if(ui==='dlg'){advance();return}if(ui)return;if(!locked){lock();return}
 if(e.button===0){K.Mouse0=true;if(wtype()==='bow'){if(P.draw<=0&&P.atk<=0&&P.dodge<=0&&P.stun<=0&&P.dead<=0)P.draw=.01}else if(P.atk>0){if(P.atk<P.ad*.6)P.queued=true}else startAtk()}else if(e.button===2)K.Mouse2=true});
addEventListener('mouseup',e=>{if(e.button===0)K.Mouse0=false;if(e.button===2)K.Mouse2=false});
addEventListener('mousemove',e=>{if(!locked||ui)return;camYaw-=e.movementX*.0025;camPitch=clamp(camPitch+e.movementY*.002,-.25,1.15)});
$('mres').onclick=()=>closeUI();$('msave').onclick=()=>save();$('mquit').onclick=()=>{save(true);window.close()};
// ---------- loop
const clock=new T.Clock();let titleA=0;
function frame(){requestAnimationFrame(frame);const dt=Math.min(clock.getDelta(),.05);
 if(state==='play'){if(!ui)update(dt);
  const tx=P.x,ty=P.y+1.6,tz=P.z;camT.x+=(tx-camT.x)*Math.min(1,dt*14);camT.y+=(ty-camT.y)*Math.min(1,dt*8);camT.z+=(tz-camT.z)*Math.min(1,dt*14);
  const dgC=curDun(),dist=dgC?6:7.8,cp=Math.cos(camPitch);let cx=camT.x+Math.sin(camYaw)*cp*dist,cy=camT.y+Math.sin(camPitch)*dist,cz=camT.z+Math.cos(camYaw)*cp*dist;
  if(dgC){let kk=1;for(let k=1;k<=12;k++){const t=k/12;if(dunBlocked(camT.x+(cx-camT.x)*t,camT.z+(cz-camT.z)*t)){kk=(k-1)/12*.92;break}}
   cx=camT.x+(cx-camT.x)*kk;cz=camT.z+(cz-camT.z)*kk;cy=clamp(camT.y+(cy-camT.y)*kk,DY+1,DY+dgC.wh-.8)}
  else{const gh=Math.max(H(cx,cz),0)+1.2;if(cy<gh)cy=gh}
  camera.position.set(cx,cy,cz);camera.lookAt(camT);camera.updateMatrixWorld();
  hud(dt);updateEnv(ui?0:dt,P.x,P.y,P.z);
  save.t=(save.t||0)+dt;if(save.t>45){save.t=0;save(true)}}
 else{titleA+=dt*.06;const r=55,cx=Math.sin(titleA)*r,cz=Math.cos(titleA)*r;camera.position.set(cx,H(cx,cz)+16,cz);camera.lookAt(0,10,0);updateEnv(dt*8,0,10,0)}
 renderer.render(scene,camera)}
// ---------- start
function begin(cont,cheat){CHEAT=!!cheat;KEY=cheat?'mikan_cheat_v1':'mikan_save_v1';S.cheat=CHEAT;
 if(cont&&!load()){toast('セーブデータを読み込めませんでした。はじめからを始めます');cont=false}
 if(CHEAT){P.lv=10000;P.own=WEP.map((w,i)=>i);if(!cont)P.wep=25;P.wep=clamp(P.wep,0,WEP.length-1);S.shrines=SHRINES.map((s,i)=>i);P.heli=false}
 applyWorldState();setOrbs();camYaw=0;camT.set(P.x,P.y+1.6,P.z);P.dead=0;P.inv=1;P.hp=Math.min(P.hp,maxHP());if(CHEAT)P.hp=maxHP();
 $('title').classList.add('hidden');$('hud').classList.remove('hidden');state='play';au();lock();
 if(!cont)setTimeout(()=>toast(CHEAT?'🛠 チートモード！ H:ヘリコプター / Space上昇・C下降 / R:武器切替(コマンドソード・チートアロー)':'WASDで移動、左クリックで攻撃！ 村は南にあります (⭐と光の柱が目印)',6000),400);
 $('cap').classList.toggle('hidden',locked)}
$('bnew').onclick=()=>{KEY='mikan_save_v1';try{localStorage.removeItem(KEY)}catch(e){}begin(false,false)};$('bcont').onclick=()=>begin(true,false);
$('bcheat').onclick=()=>{KEY='mikan_cheat_v1';try{localStorage.removeItem(KEY)}catch(e){}begin(false,true)};$('bcheatc').onclick=()=>begin(true,true);
try{if(!localStorage.getItem('mikan_cheat_v1'))$('bcheatc').disabled=true}catch(e){$('bcheatc').disabled=true}
setOrbs();state='title';$('tsub').textContent='草原を駆ける、小さなミカンの大冒険';$('tbtn').classList.remove('hidden');
try{if(!localStorage.getItem('mikan_save_v1'))$('bcont').disabled=true}catch(e){$('bcont').disabled=true}
frame();
