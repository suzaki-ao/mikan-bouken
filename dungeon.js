'use strict';
const CS=6,DY=2;
const DUNS=[
 {id:'cave',name:'ひかりのほらあな',ex:150,ez:-130,W:27,H:27,rooms:8,cw:1,bs:11,rs:[4,8],en:['G','Y','K','B'],ne:34,mult:1,chests:7,tier:1,wall:0x7a7a88,floor:0xb0b0bc,wh:9,rec:8,lootW:18,door:0x8a8a96},
 {id:'ruin',name:'もりの古代遺跡',ex:-110,ez:-500,W:31,H:31,rooms:10,cw:1,bs:11,rs:[4,8],en:['L','P','K','Y'],ne:44,mult:2.4,chests:8,tier:2,wall:0x6a7a5a,floor:0x9aaa8a,wh:10,rec:18,lootW:9,door:0x6a8a5a},
 {id:'falls',name:'たきのうらの洞窟',ex:345,ez:-252,W:33,H:33,rooms:11,cw:1,bs:11,rs:[4,9],en:['B','C','E','Y'],ne:50,mult:4.5,chests:9,tier:3,wall:0x4a6a8a,floor:0x7a9aba,wh:10,rec:32,lootW:20,door:0x5a7a9a},
 {id:'mine',name:'ごつごつ坑道',ex:-470,ez:60,W:35,H:35,rooms:12,cw:1,bs:11,rs:[4,9],en:['R','F','E','V'],ne:56,mult:11,chests:10,tier:4,wall:0x6a5a4a,floor:0x8a7a6a,wh:10,rec:48,lootW:15,door:0x7a6a5a},
 {id:'crypt',name:'やみの地下墓所',ex:250,ez:-470,W:39,H:39,rooms:13,cw:1,bs:13,rs:[5,9],en:['S','Z','J','M','X'],ne:60,mult:.45,chests:11,tier:5,wall:0x3a3048,floor:0x6a6078,wh:11,rec:72,lootW:7,door:0x4a3a5a},
 {id:'castle',name:'魔王城',ex:470,ez:-552,W:53,H:53,rooms:18,cw:2,bs:21,rs:[6,11],en:['S','Z','U','J','X','S','Z'],ne:96,mult:1,chests:22,tier:6,wall:0x2b2038,floor:0x584468,wh:15,rec:100,lootW:8,door:0x2b2038}];
const DG=[],DOORS=[];
const inDunX=x=>x>=800;
function dunAt(x,z){for(const d of DG)if(x>=d.ox&&x<d.ox+d.W*CS&&z>=d.oz&&z<d.oz+d.H*CS)return d;return null}
function dunBlocked(x,z){const d=dunAt(x,z);if(!d)return true;return d.g[Math.floor((z-d.oz)/CS)*d.W+Math.floor((x-d.ox)/CS)]===1}
const dunBlockedC=(x,z,r)=>dunBlocked(x-r,z-r)||dunBlocked(x+r,z-r)||dunBlocked(x-r,z+r)||dunBlocked(x+r,z+r);
function genGrid(dg,seed){const r=rng(seed),W=dg.W,Hh=dg.H,g=new Uint8Array(W*Hh).fill(1);
 const open=(x,y)=>{if(x>=1&&y>=1&&x<W-1&&y<Hh-1)g[y*W+x]=0};
 const carve=o=>{for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)open(x,y)};
 const start={x:2,y:2,w:6,h:6,k:'start'},bs=dg.bs,boss={x:W-bs-2,y:Hh-bs-2,w:bs,h:bs,k:'boss'};
 const rooms=[start],rs=dg.rs;let tries=0;
 while(rooms.length<dg.rooms&&tries<800){tries++;const w=rs[0]+Math.floor(r()*(rs[1]-rs[0]+1)),h=rs[0]+Math.floor(r()*(rs[1]-rs[0]+1)),x=2+Math.floor(r()*(W-w-4)),y=2+Math.floor(r()*(Hh-h-4));
  if([...rooms,boss].every(o=>x>o.x+o.w+1||x+w+1<o.x||y>o.y+o.h+1||y+h+1<o.y))rooms.push({x,y,w,h,k:'room'})}
 rooms.push(boss);rooms.forEach(carve);
 const ctr=o=>[Math.floor(o.x+o.w/2),Math.floor(o.y+o.h/2)];
 const cor=(a,b)=>{const[x1,y1]=ctr(a),[x2,y2]=ctr(b),cw=dg.cw||1;
  for(let x=Math.min(x1,x2);x<=Math.max(x1,x2);x++)for(let k=0;k<cw;k++)open(x,y1+k);
  for(let y=Math.min(y1,y2);y<=Math.max(y1,y2);y++)for(let k=0;k<cw;k++)open(x2+k,y)};
 const mid=rooms.filter(o=>o.k==='room'),order=[start];let cur=start;
 while(mid.length){let bi=0,bd=1e9;mid.forEach((o,i)=>{const d=Math.hypot(ctr(o)[0]-ctr(cur)[0],ctr(o)[1]-ctr(cur)[1]);if(d<bd){bd=d;bi=i}});cur=mid.splice(bi,1)[0];order.push(cur)}
 order.push(boss);for(let i=0;i<order.length-1;i++)cor(order[i],order[i+1]);
 for(let i=0;i<Math.floor(order.length/3);i++){const a=order[Math.floor(r()*order.length)],b=order[Math.floor(r()*order.length)];if(a!==b&&a.k!=='boss'&&b.k!=='boss')cor(a,b)}
 carve(boss);return{g,rooms:order,start,boss}}
function buildDungeon(dg,i){dg.ox=1000+i*420;dg.oz=0;Object.assign(dg,genGrid(dg,777+i*13));dg.disc=new Uint8Array(dg.W*dg.H);DG.push(dg);
 const{W,H:Hh,wh,ox,oz}=dg,FY=DY,wx=x=>ox+(x+.5)*CS,wz=y=>oz+(y+.5)*CS,r=rng(4242+i*7);
 const cv=document.createElement('canvas');cv.width=cv.height=128;const c=cv.getContext('2d');c.fillStyle='#c8c8c8';c.fillRect(0,0,128,128);
 for(let k=0;k<260;k++){c.fillStyle='rgba(0,0,0,'+(.04+r()*.08)+')';c.fillRect(r()*128,r()*128,2+r()*6,2+r()*6)}
 c.strokeStyle='#777';c.lineWidth=3;c.strokeRect(1.5,1.5,125,125);c.lineWidth=1.2;c.beginPath();c.moveTo(64,0);c.lineTo(64,128);c.moveTo(0,64);c.lineTo(128,64);c.stroke();
 const tex=new T.CanvasTexture(cv);tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.repeat.set(W*CS/12,Hh*CS/12);tex.colorSpace=T.SRGBColorSpace;
 const fl=new T.Mesh(new T.PlaneGeometry(W*CS,Hh*CS).rotateX(-Math.PI/2),new T.MeshStandardMaterial({map:tex,color:new T.Color(dg.floor).multiplyScalar(1.55),roughness:.9}));fl.position.set(ox+W*CS/2,FY,oz+Hh*CS/2);scene.add(fl);
 const cl=new T.Mesh(new T.PlaneGeometry(W*CS,Hh*CS).rotateX(Math.PI/2),new T.MeshStandardMaterial({color:new T.Color(dg.wall).multiplyScalar(1.1),roughness:1}));cl.position.set(ox+W*CS/2,FY+wh,oz+Hh*CS/2);scene.add(cl);
 const cells=[],g=dg.g,op=(x,y)=>x>=0&&y>=0&&x<W&&y<Hh&&g[y*W+x]===0;
 for(let y=0;y<Hh;y++)for(let x=0;x<W;x++){if(g[y*W+x]!==1)continue;let n=false;for(let a=-1;a<=1&&!n;a++)for(let b=-1;b<=1;b++)if(op(x+a,y+b)){n=true;break}if(n)cells.push([x,y])}
 inst(new T.BoxGeometry(CS,wh,CS).translate(0,wh/2,0),new T.MeshStandardMaterial({color:0xffffff,roughness:.95,flatShading:true}),cells,(q,k,m)=>{D.position.set(wx(q[0]),FY,wz(q[1]));D.scale.y=1+((q[0]*7+q[1]*13)%5)*.01;m.setColorAt(k,new T.Color(dg.wall).multiplyScalar(1.7+((q[0]*7+q[1]*13)%10)/18))},false);
 const torches=[];cells.forEach(q=>{if((q[0]*5+q[1]*11)%9!==0)return;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]])if(op(q[0]+a,q[1]+b)){torches.push([wx(q[0])+a*(CS/2+.15),wz(q[1])+b*(CS/2+.15),a,b]);break}});
 inst(new T.BoxGeometry(.5,1.4,.5),new T.MeshBasicMaterial({color:dg.id==='castle'||dg.id==='crypt'?0xb060ff:0xffa040}),torches,q=>{D.position.set(q[0],FY+4,q[1])},false);
 const pill=[];dg.rooms.forEach(o=>{if(o.k==='start'||o.w<6||o.h<6)return;for(const[a,b]of[[2,2],[o.w-3,2],[2,o.h-3],[o.w-3,o.h-3]])pill.push([wx(o.x+a),wz(o.y+b)])});
 if(dg.id==='castle'){const o=dg.boss;for(let k=0;k<12;k++){const a=k/12*6.283;pill.push([wx(o.x+o.w/2)+Math.cos(a)*50,wz(o.y+o.h/2)+Math.sin(a)*50])}}
 pill.forEach(p=>addObst(p[0],p[1],1.6));
 inst(new T.CylinderGeometry(1.2,1.5,wh,8).translate(0,wh/2,0),new T.MeshStandardMaterial({color:new T.Color(dg.wall).multiplyScalar(1.2),roughness:.8}),pill,q=>{D.position.set(q[0],FY,q[1])},false);
 const sc=dg.start,sx=wx(sc.x+sc.w/2),sz=wz(sc.y+sc.h/2);dg.startPos=[sx,sz+3];dg.exitPos=[sx,sz-3];
 const pg=new T.Group();pg.position.set(sx,FY,sz-3);const ring=new T.Mesh(new T.TorusGeometry(2,.2,8,24),new T.MeshBasicMaterial({color:0x6adfff}));ring.position.y=2.4;pg.add(ring);
 const col=new T.Mesh(new T.CylinderGeometry(1.8,1.8,5,16,1,true),new T.MeshBasicMaterial({color:0x6adfff,transparent:true,opacity:.3,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));col.position.y=2.5;pg.add(col);scene.add(pg);dg.portal=ring;
 const bo=dg.boss;dg.bx=wx(bo.x+bo.w/2);dg.bz=wz(bo.y+bo.h/2);dg.bar=Math.min(55,bo.w*CS/2-5);
 if(dg.id==='castle'){const da=new T.Mesh(new T.CylinderGeometry(12,13,.8,24),new T.MeshStandardMaterial({color:0x201830,roughness:.5,emissive:0x2a0a40,emissiveIntensity:.5}));da.position.set(dg.bx,FY+.4,dg.bz);scene.add(da);
  const rg=new T.Mesh(new T.RingGeometry(14,15,48).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xb050ff,transparent:true,opacity:.7,blending:T.AdditiveBlending}));rg.position.set(dg.bx,FY+.9,dg.bz);scene.add(rg)}
 const rooms=dg.rooms.filter(o=>o.k==='room'),area=rooms.reduce((s,o)=>s+o.w*o.h,0);
 for(let k=0;k<dg.ne;k++){let q=r()*area,o=rooms[0];for(const rm of rooms){q-=rm.w*rm.h;if(q<=0){o=rm;break}}
  const x=wx(o.x+1+r()*(o.w-2)),z=wz(o.y+1+r()*(o.h-2));if(dunBlockedC(x,z,1.2))continue;makeEnemy(dg.en[Math.floor(r()*dg.en.length)],x,z,dg.mult)}
 for(let k=0;k<dg.chests;k++){const o=k===0?bo:rooms[Math.floor(r()*rooms.length)];const x=k===0?wx(bo.x+2):wx(o.x+1+r()*(o.w-2)),z=k===0?wz(bo.y+2):wz(o.y+1+r()*(o.h-2));if(dunBlockedC(x,z,1))continue;addChest(x,z,dg.tier,k===0?{w:dg.lootW}:null)}
 dg.name2=dg.name}
const BIDS=['emperor','queen','crabking','golemking','deathknight','demon'];
DUNS.forEach((d,i)=>{d.bossId=BIDS[i];buildDungeon(d,i)});
// ---------- overworld entrances
function makeDoor(dg,idx,x,z,sc,emi,rot){const g=new T.Group(),y=H(x,z);g.position.set(x,y,z);g.rotation.y=rot||0;g.scale.setScalar(sc||1);
 const rm=sMat(dg.door,{roughness:1,flatShading:true});
 for(const s of[-1,1]){const p=new T.Mesh(new T.BoxGeometry(2.2,7,2.4),rm);p.position.set(s*3.4,3.5,0);g.add(p);for(let k=0;k<3;k++){const r=new T.Mesh(new T.DodecahedronGeometry(1.3,0),rm);r.position.set(s*(3.8+k*.5),.8+k*2,(k%2)*.6);g.add(r)}}
 const l=new T.Mesh(new T.BoxGeometry(9.2,1.8,2.6),rm);l.position.y=7.4;g.add(l);
 const d=new T.Mesh(new T.BoxGeometry(5,6.4,.5),new T.MeshStandardMaterial({color:0x05040a,emissive:emi||0x302060,emissiveIntensity:.8}));d.position.set(0,3.2,-.2);g.add(d);
 const gl=new T.Mesh(new T.BoxGeometry(5.2,.3,.6),new T.MeshBasicMaterial({color:emi||0x8a6aff}));gl.position.set(0,6.5,.3);g.add(gl);
 shadowAll(g);scene.add(g);addObst(x-3.4*sc,z,2*sc);addObst(x+3.4*sc,z,2*sc);DOORS.push({x,z:z+4*sc,dun:idx,name:dg.name,rec:dg.rec})}
DUNS.forEach((d,i)=>{if(d.id==='castle')return;const rot=d.id==='falls'?-.4:0;makeDoor(d,i,d.ex,d.ez,1,d.id==='crypt'?0xb050ff:d.id==='cave'?0x9adfff:d.id==='ruin'?0x6aff8a:d.id==='falls'?0x4ac0ff:0xffa040,rot)});
// ---------- castle exterior (overworld)
function buildCastleExterior(){const CX=470,CZ=-565,Y0=9,g=new T.Group(),dm=sMat(0x2b2038,{roughness:.9,flatShading:true}),dm2=sMat(0x3a2a50,{roughness:.9,flatShading:true}),pm=sMat(0x4b2a6e,{emissive:0x2a1050,emissiveIntensity:.6});
 const box=(w,h,d,x,y,z,m)=>{const b=new T.Mesh(new T.BoxGeometry(w,h,d),m||dm);b.position.set(x,Y0+y,z);g.add(b);return b};
 box(206,26,6,CX,13,CZ-65);box(6,26,136,CX-100,13,CZ);box(6,26,136,CX+100,13,CZ);box(92,26,6,CX-54,13,CZ+65);box(92,26,6,CX+54,13,CZ+65);
 const tw=(x,z,r,h)=>{const t=new T.Mesh(new T.CylinderGeometry(r,r*1.12,h,12),dm2);t.position.set(x,Y0+h/2,z);g.add(t);const c=new T.Mesh(new T.ConeGeometry(r*1.25,r*1.8,12),pm);c.position.set(x,Y0+h+r*.9,z);g.add(c);addObst(x,z,r+1)};
 for(const[x,z]of[[CX-100,CZ-65],[CX+100,CZ-65],[CX-100,CZ+65],[CX+100,CZ+65]])tw(x,z,10,48);
 for(const[x,z]of[[CX-100,CZ],[CX+100,CZ],[CX,CZ-65],[CX-50,CZ+65],[CX+50,CZ+65]])tw(x,z,7,38);
 tw(CX-9,CZ+65,6.5,44);tw(CX+9,CZ+65,6.5,44);
 const keep=box(96,64,56,CX,32,CZ-27,dm2);addObst(CX,CZ-30,26);addObst(CX-30,CZ-30,22);addObst(CX+30,CZ-30,22);
 const sp=new T.Mesh(new T.CylinderGeometry(14,16,110,14),dm);sp.position.set(CX,Y0+55,CZ-40);g.add(sp);const sc=new T.Mesh(new T.ConeGeometry(18,46,14),pm);sc.position.set(CX,Y0+133,CZ-40);g.add(sc);
 for(const[x,z]of[[CX-40,CZ-12],[CX+40,CZ-12],[CX-40,CZ-50],[CX+40,CZ-50]])tw(x,z,6,80);
 const wins=[];for(let r=0;r<4;r++)for(let c=0;c<12;c++)wins.push([CX-44+c*8,Y0+14+r*13,CZ+1.2]);
 inst(new T.BoxGeometry(2,5,.5),new T.MeshBasicMaterial({color:0xff3a2a}),wins,q=>{D.position.set(q[0],q[1],q[2])},false);
 const door=new T.Mesh(new T.BoxGeometry(16,20,1.2),new T.MeshStandardMaterial({color:0x05040a,emissive:0x6a2aff,emissiveIntensity:.8}));door.position.set(CX,Y0+10,CZ+1);g.add(door);
 for(const s of[-1,1]){const p=new T.Mesh(new T.BoxGeometry(3,24,3),dm);p.position.set(CX+s*10,Y0+12,CZ+2);g.add(p)}const lt=new T.Mesh(new T.BoxGeometry(23,4,3),dm);lt.position.set(CX,Y0+22,CZ+2);g.add(lt);
 const path=new T.Mesh(new T.BoxGeometry(14,.3,62),sMat(0x18121f,{roughness:.8}));path.position.set(CX,Y0+.15,CZ+34);g.add(path);
 const mer=[];for(let x=CX-100;x<=CX+100;x+=5){mer.push([x,CZ-65]);if(Math.abs(x-CX)>10||true)mer.push([x,CZ+65])}for(let z=CZ-65;z<=CZ+65;z+=5){mer.push([CX-100,z]);mer.push([CX+100,z])}
 inst(new T.BoxGeometry(3,3,3),dm,mer.filter(q=>!(q[1]===CZ+65&&Math.abs(q[0]-CX)<9)),q=>{D.position.set(q[0],Y0+27.5,q[1])},false);
 for(let i=0;i<10;i++){const fz=CZ+60-i*12;for(const s of[-1,1]){const b=new T.Mesh(new T.CylinderGeometry(.6,.9,3,6),dm);b.position.set(CX+s*9,Y0+1.5,fz);g.add(b);const f=new T.Mesh(new T.ConeGeometry(.9,2.4,6),new T.MeshBasicMaterial({color:0xb050ff}));f.position.set(CX+s*9,Y0+4.2,fz);g.add(f)}}
 for(let i=0;i<6;i++){const bn=new T.Mesh(new T.PlaneGeometry(5,16),new T.MeshStandardMaterial({color:i%2?0x8a1a2a:0x4a1a6a,side:T.DoubleSide,emissive:0x200820,emissiveIntensity:.5}));bn.position.set(CX-30+i*12,Y0+34,CZ+1.4);g.add(bn)}
 shadowAll(g);scene.add(g);
 for(let x=CX-100;x<=CX+100;x+=6){addObst(x,CZ-65,4.2);if(Math.abs(x-CX)>11)addObst(x,CZ+65,4.2)}for(let z=CZ-65;z<=CZ+65;z+=6){addObst(CX-100,z,4.2);addObst(CX+100,z,4.2)}
 for(const dx of[-6,-2,2,6])addObst(CX+dx,CZ+65,3.6,true);
 const bar=new T.Mesh(new T.PlaneGeometry(14,24),new T.MeshBasicMaterial({color:0xa040ff,transparent:true,opacity:.45,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));bar.position.set(CX,Y0+12,CZ+65);g.add(bar);window.castleBar=bar;
 const ci=DUNS.findIndex(d=>d.id==='castle');DOORS.push({x:CX,z:CZ+6,dun:ci,name:'魔王城',rec:100})}
buildCastleExterior();
// ---------- waterfall (valley boss arena)
const WFTEX=(()=>{const cv=document.createElement('canvas');cv.width=64;cv.height=256;const c=cv.getContext('2d');const gr=c.createLinearGradient(0,0,64,0);gr.addColorStop(0,'#7ac8ff');gr.addColorStop(.5,'#ffffff');gr.addColorStop(1,'#7ac8ff');c.fillStyle=gr;c.fillRect(0,0,64,256);
 for(let i=0;i<70;i++){c.fillStyle='rgba(255,255,255,'+(.2+Math.random()*.6)+')';c.fillRect(Math.random()*64,Math.random()*256,1+Math.random()*3,10+Math.random()*50)}
 const t=new T.CanvasTexture(cv);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.repeat.set(1,3);return t})();
{const AX=300,AZ=-205,g=new T.Group(),cl=new T.BoxGeometry(92,64,16,18,12,4),p=cl.attributes.position;
 for(let i=0;i<p.count;i++){const n=vn(p.getX(i)*.12+3,p.getY(i)*.12)*5-2.5,m=vn(p.getZ(i)*.2,p.getY(i)*.1)*3;p.setX(i,p.getX(i)+n*.5);if(p.getZ(i)>0)p.setZ(i,p.getZ(i)+n+m)}cl.computeVertexNormals();
 const cm=new T.Mesh(cl,sMat(0x7a7468,{roughness:1,flatShading:true}));cm.position.set(AX,22,AZ-61);g.add(cm);
 for(const[x,s]of[[AX-52,10],[AX+52,12],[AX-38,7],[AX+40,8]]){const r=new T.Mesh(new T.DodecahedronGeometry(s,0),sMat(0x6a645a,{roughness:1,flatShading:true}));r.position.set(x,s*.4,AZ-52);r.scale.y=1.6;g.add(r)}
 const wm=new T.MeshBasicMaterial({map:WFTEX,transparent:true,opacity:.88,side:T.DoubleSide,depthWrite:false});
 const w1=new T.Mesh(new T.PlaneGeometry(16,52),wm);w1.position.set(AX,27,AZ-52.6);g.add(w1);
 for(const s of[-1,1]){const w=new T.Mesh(new T.PlaneGeometry(6,44),wm);w.position.set(AX+s*14,31,AZ-52.5);g.add(w)}
 const pool=new T.Mesh(new T.CircleGeometry(15,32).rotateX(-Math.PI/2),new T.MeshPhongMaterial({color:0x4ab8ff,transparent:true,opacity:.78,shininess:100}));pool.position.set(AX,H(AX,AZ-44)+.25,AZ-44);g.add(pool);
 const foam=new T.Mesh(new T.RingGeometry(6,12,32).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35,blending:T.AdditiveBlending,depthWrite:false}));foam.position.set(AX,H(AX,AZ-44)+.4,AZ-44);g.add(foam);
 scene.add(g);for(let x=AX-46;x<=AX+46;x+=7)addObst(x,AZ-51,5.5)}

// ---------- final arena: the collapsed demon castle (overworld, NW corner)
function buildFinalArena(){const g=new T.Group(),Y=H(FIN.x,FIN.z),r=rng(99),dm=sMat(0x3a2a4a,{roughness:1,flatShading:true}),dm2=sMat(0x24182f,{roughness:1,flatShading:true}),em=new T.MeshBasicMaterial({color:0xff5a1a});
 const ring=new T.Mesh(new T.RingGeometry(52,58,64).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xff3a1a,transparent:true,opacity:.55,fog:false}));ring.position.set(FIN.x,Y+.2,FIN.z);g.add(ring);
 const ring2=new T.Mesh(new T.RingGeometry(20,21.2,48).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:0xb050ff,transparent:true,opacity:.5,fog:false}));ring2.position.set(FIN.x,Y+.25,FIN.z);g.add(ring2);
 const put=(m,rad,ang,y)=>{m.position.set(FIN.x+Math.cos(ang)*rad,Y+y,FIN.z+Math.sin(ang)*rad);g.add(m)};
 for(let i=0;i<16;i++){const a=i/16*6.283+r()*.2,w=6+r()*12,h=8+r()*20,rad=70+r()*14;const b=new T.Mesh(new T.BoxGeometry(w,h,4+r()*3),i%3?dm:dm2);put(b,rad,a,h/2-1);b.rotation.set((r()-.5)*.35,-a+Math.PI/2+(r()-.5)*.5,(r()-.5)*.4);addObst(FIN.x+Math.cos(a)*rad,FIN.z+Math.sin(a)*rad,Math.max(4,w*.45))}
 for(let i=0;i<5;i++){const a=i*1.26+.4,rad=82,t=new T.Mesh(new T.CylinderGeometry(7,8.5,34,10),dm);put(t,rad,a,5);t.rotation.set((r()-.5)*1.1,0,(r()-.5)*1.1+.7);const c=new T.Mesh(new T.ConeGeometry(9,12,10),sMat(0x4b2a6e,{emissive:0x2a1050,emissiveIntensity:.5}));c.position.set(FIN.x+Math.cos(a)*(rad+14),Y+2,FIN.z+Math.sin(a)*(rad+14));c.rotation.z=1.2;g.add(c);addObst(FIN.x+Math.cos(a)*rad,FIN.z+Math.sin(a)*rad,8)}
 const keep=[[-30,-92,60,40],[22,-96,34,56],[44,-90,22,26]];keep.forEach((k,i)=>{const b=new T.Mesh(new T.BoxGeometry(k[2],k[3],10),i?dm2:dm);b.position.set(FIN.x+k[0],Y+k[3]/2-2,FIN.z+k[1]);b.rotation.z=(i-1)*.08;g.add(b);addObst(FIN.x+k[0],FIN.z+k[1],k[2]*.45)});
 const rub=[],fl=[];for(let i=0;i<110;i++){const a=r()*6.283,rad=36+r()*58;rub.push([FIN.x+Math.cos(a)*rad,FIN.z+Math.sin(a)*rad,.8+r()*2.6,r()])}
 for(let i=0;i<40;i++){const a=r()*6.283,rad=30+r()*60;fl.push([FIN.x+Math.cos(a)*rad,FIN.z+Math.sin(a)*rad,r()])}
 scene.add(g);
 inst(new T.DodecahedronGeometry(1,0),dm,rub,q=>{D.position.set(q[0],H(q[0],q[1])+q[2]*.3,q[1]);D.scale.set(q[2]*(1+q[3]),q[2]*.7,q[2]*(1.3-q[3]*.4));D.rotation.set(q[3]*3,q[3]*9,0)},false);
 inst(new T.ConeGeometry(.9,3.4,5),em,fl,q=>{D.position.set(q[0],H(q[0],q[1])+1.5,q[1]);D.scale.set(1,.6+q[2]*1.2,1)},false)}
buildFinalArena();
