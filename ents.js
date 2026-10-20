'use strict';
const sMat=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.6},o||{}));
function shadowAll(g){g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g}
// ---------- hero model (also used for NPCs)
function makeMikan(o={}){
 const g=new T.Group(),m=new T.Group();g.add(m);
 const body=new T.Mesh(new T.SphereGeometry(.62,28,20),sMat(o.body||0xff9a1a,{roughness:.4}));body.scale.set(1,.92,1);body.position.y=.72;m.add(body);
 const eg=new T.SphereGeometry(.09,12,10),em=sMat(0x1a1010,{roughness:.2});
 for(const s of[-1,1]){const e=new T.Mesh(eg,em);e.position.set(s*.2,.8,.54);e.scale.set(1,1.4,.6);m.add(e);
  const h=new T.Mesh(new T.SphereGeometry(.03,6,6),sMat(0xffffff,{emissive:0xffffff}));h.position.set(s*.2+.03,.86,.58);m.add(h);
  const ch=new T.Mesh(new T.SphereGeometry(.09,8,8),sMat(0xff5a3a));ch.scale.set(1,.6,.3);ch.position.set(s*.38,.62,.5);m.add(ch)}
 const sm1=new T.Mesh(new T.TorusGeometry(.09,.014,6,12,Math.PI),em);sm1.rotation.z=Math.PI;sm1.position.set(0,.64,.585);m.add(sm1);
 if(o.helmet!==false){const hm=new T.Mesh(new T.SphereGeometry(.7,24,14,0,Math.PI*2,0,Math.PI*.5),sMat(0x8a8f98,{roughness:.35,metalness:.7}));hm.position.y=.97;hm.scale.y=.85;m.add(hm);
  const bd=new T.Mesh(new T.TorusGeometry(.7,.045,8,24),sMat(0x4a4f58,{metalness:.6}));bd.rotation.x=Math.PI/2;bd.position.y=.97;m.add(bd);
  for(let i=0;i<5;i++){const a=-.9+i*.45,rv=new T.Mesh(new T.SphereGeometry(.04,6,6),sMat(0xd0d4da,{metalness:.8}));rv.position.set(Math.sin(a)*.7,1.0,Math.cos(a)*.7);m.add(rv)}}
 const leaf=new T.Mesh(new T.SphereGeometry(.2,10,8),sMat(0x4cb83a));leaf.scale.set(1.5,.18,.8);leaf.position.set(.14,o.helmet===false?1.35:1.56,.08);leaf.rotation.set(0,.5,.35);m.add(leaf);
 if(o.pack!==false){const pk=new T.Mesh(new T.BoxGeometry(.6,.55,.3),sMat(0x6a4020));pk.position.set(0,.7,-.62);m.add(pk)}
 const fg=new T.SphereGeometry(.17,10,8),fm=sMat(0x5a3a20),feet=[];
 for(const s of[-1,1]){const f=new T.Mesh(fg,fm);f.scale.set(1,.7,1.3);f.position.set(s*.25,.12,.08);m.add(f);feet.push(f);
  const a=new T.Mesh(new T.SphereGeometry(.14,10,8),sMat(o.body||0xff9a1a));a.position.set(s*.62,.62,.12);m.add(a)}
 const pivot=new T.Group();pivot.position.set(-.64,.66,.16);pivot.rotation.order='YXZ';m.add(pivot);
 const bm=sMat(0x58c83a,{roughness:.25,metalness:.2,emissive:0x1a5a0a,emissiveIntensity:.4});
 const blade=new T.Mesh(new T.CylinderGeometry(.05,.075,1.2,6),bm);blade.position.y=.75;pivot.add(blade);
 const tip=new T.Mesh(new T.ConeGeometry(.05,.25,6),bm);tip.position.y=1.47;pivot.add(tip);
 const guard=new T.Mesh(new T.BoxGeometry(.32,.07,.1),sMat(0x4a3018));guard.position.y=.1;pivot.add(guard);
 const hd=new T.Mesh(new T.CylinderGeometry(.04,.04,.28,6),sMat(0x4a3018));pivot.add(hd);
 pivot.visible=o.sword!==false;
 const shield=new T.Mesh(new T.CylinderGeometry(.46,.46,.07,16),sMat(0x9a6a30,{metalness:.3}));shield.rotation.z=Math.PI/2;shield.rotation.y=.3;shield.position.set(.78,.72,.28);shield.visible=false;m.add(shield);
 shadowAll(g);return{g,m,pivot,bm,feet,shield,body}}
// ---------- enemies
const SLG=(()=>{const g=new T.SphereGeometry(1,24,16),p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);if(y<0)p.setY(i,y*.3)}g.computeVertexNormals();return g})();
function slimeMesh(col,leaf){const g=new T.Group();
 const mt=new T.MeshPhysicalMaterial({color:col,roughness:.12,clearcoat:1,clearcoatRoughness:.1,transparent:true,opacity:.94,emissive:col,emissiveIntensity:.12});
 const b=new T.Mesh(SLG,mt);b.scale.set(1,.9,1);b.position.y=.05;g.add(b);
 const eg=new T.SphereGeometry(.13,10,8),em=sMat(0x1a1010,{roughness:.2});
 for(const s of[-1,1]){const e=new T.Mesh(eg,em);e.position.set(s*.3,.4,.82);e.scale.set(1,1.5,.5);g.add(e)}
 const mo=new T.Mesh(eg,em);mo.position.set(0,.08,.88);mo.scale.set(1.3,.8,.4);g.add(mo);
 const hl=new T.Mesh(new T.SphereGeometry(.14,8,6),new T.MeshBasicMaterial({color:0xffffff}));hl.position.set(-.45,.78,.4);hl.scale.set(1,.6,.6);g.add(hl);
 if(leaf){const l=new T.Mesh(new T.SphereGeometry(.3,8,6),sMat(0x3ab84a));l.scale.set(1.6,.2,.8);l.position.set(0,1,0);l.rotation.z=.4;g.add(l)}
 g.userData.mat=mt;shadowAll(g);return g}
function golemMesh(){const g=new T.Group(),mt=sMat(0x8a847c,{roughness:1,flatShading:true});
 const b=new T.Mesh(new T.DodecahedronGeometry(1,0),mt);b.scale.set(1.1,1.2,.9);b.position.y=1.1;g.add(b);
 const h=new T.Mesh(new T.DodecahedronGeometry(.55,0),mt);h.position.set(0,2.3,.1);g.add(h);
 for(const s of[-1,1]){const a=new T.Mesh(new T.DodecahedronGeometry(.5,0),mt);a.position.set(s*1.35,1.2,.1);a.scale.set(1,1.6,1);g.add(a);
  const e=new T.Mesh(new T.SphereGeometry(.1,6,6),sMat(0xffd23a,{emissive:0xffb000,emissiveIntensity:1.5}));e.position.set(s*.22,2.35,.58);g.add(e)}
 const mo=new T.Mesh(new T.SphereGeometry(.8,8,6),sMat(0x4a9a3a));mo.scale.set(1,.25,1);mo.position.set(0,2,0);g.add(mo);
 g.userData.mat=mt;shadowAll(g);return g}
function mistMesh(){const g=new T.Group(),mt=new T.MeshStandardMaterial({color:0x1a1124,roughness:1,transparent:true,opacity:.88,emissive:0x2a0a40,emissiveIntensity:.5,flatShading:true});
 const b=new T.Mesh(new T.IcosahedronGeometry(1,1),mt);b.position.y=1.1;g.add(b);
 for(const s of[-1,1]){const e=new T.Mesh(new T.SphereGeometry(.14,6,6),sMat(0xff3020,{emissive:0xff2010,emissiveIntensity:2}));e.position.set(s*.34,1.3,.82);e.scale.set(1.4,.7,.5);g.add(e)}
 for(let i=0;i<3;i++){const o=new T.Mesh(new T.IcosahedronGeometry(.35,0),mt);o.userData.o=i;g.add(o)}
 g.userData.mat=mt;return g}
const EDEF={
 G:{n:'ぷにぷにスライム',hp:70,atk:12,spd:3.8,exp:12,gold:6,col:0x55dd33,sc:1,reach:1.9,aggro:16,jelly:.6},
 Y:{n:'ぷにぷにスライム',hp:95,atk:15,spd:4.1,exp:17,gold:9,col:0xffd23a,sc:1,reach:1.9,aggro:16,jelly:.6},
 B:{n:'みずスライム',hp:130,atk:19,spd:3.9,exp:26,gold:14,col:0x3aa0ff,sc:1.1,reach:2,aggro:18,shot:0x6ad0ff,weak:'thunder',jelly:.7},
 L:{n:'もりのスライム',hp:150,atk:23,spd:3.6,exp:32,gold:16,col:0x2fa84a,sc:1.1,reach:2,aggro:18,leaf:1,shot:0x7ad84a,weak:'fire',jelly:.7},
 F:{n:'ほのおスライム',hp:240,atk:34,spd:4.4,exp:58,gold:30,col:0xff3b2a,sc:1.25,reach:2.2,aggro:20,shot:0xff8a2a,weak:'thunder',jelly:.8},
 K:{n:'スライムナイト',hp:260,atk:30,spd:4.6,exp:60,gold:34,col:0x8aa0c8,sc:1.35,reach:2.4,aggro:18,knight:1,lunge:17,jelly:.8},
 P:{n:'おばけキノコ',hp:190,atk:26,spd:2.6,exp:45,gold:24,sc:1.2,reach:2,aggro:18,m:'mush',shot:0xb060ff,weak:'fire'},
 C:{n:'ハサミガニ',hp:280,atk:36,spd:5.6,exp:68,gold:38,sc:1.2,reach:2.6,aggro:17,m:'crab',side:1,weak:'thunder'},
 E:{n:'かみなりスライム',hp:230,atk:32,spd:4,exp:62,gold:36,col:0xffe640,sc:1.2,reach:2.2,aggro:19,shot:0xfff06a,stun:1,jelly:.8},
 V:{n:'やみコウモリ',hp:170,atk:40,spd:7.5,exp:75,gold:40,sc:1,reach:2.2,aggro:24,m:'bat',fly:1,weak:'light',shard:.25},
 Q:{n:'ぷにぷにキング',hp:1100,atk:38,spd:3.2,exp:320,gold:260,col:0xffc830,sc:3.4,reach:4.6,aggro:22,king:1,lunge:10,jelly:3},
 R:{n:'いわゴーレム',hp:650,atk:52,spd:2.2,exp:160,gold:90,col:0x8a847c,sc:2.2,reach:3.8,aggro:16,golem:1,ore:1.5},
 M:{n:'黒いきりの魔物',hp:340,atk:50,spd:4.8,exp:120,gold:70,col:0x1a1124,sc:1.5,reach:3,aggro:22,mist:1,weak:'light',shard:.5},
 S:{n:'闇将軍',hp:16000,atk:380,spd:3.6,exp:5200,gold:900,col:0x5a2a8a,sc:3,reach:4.4,aggro:24,golem:1,tint:0x4a1a7a,weak:'light',shard:3},
 Z:{n:'影の魔導士',hp:9000,atk:340,spd:4.4,exp:4200,gold:700,col:0x2a0a40,sc:2.3,reach:3,aggro:28,mist:1,shot:0xc050ff,weak:'light',shard:2},
 U:{n:'暗黒スライムキング',hp:24000,atk:430,spd:3.4,exp:7000,gold:1200,col:0x3a1a5a,sc:4.4,reach:5.4,aggro:24,king:1,lunge:11,shard:4},
 J:{n:'地獄コウモリ',hp:6000,atk:300,spd:8.5,exp:3000,gold:500,sc:2,reach:3,aggro:30,m:'bat',fly:1,weak:'light',shard:1},
 X:{n:'魔獣クラブ',hp:12000,atk:360,spd:6.4,exp:4600,gold:800,sc:2.8,reach:4,aggro:24,m:'crab',side:1,tint:0x6a2a9a,shard:2}};
function tintMesh(g,hex,k=.7){const c=new T.Color(hex);g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color){const m=o.material;if(m.emissive&&m.emissive.getHex()!==0&&m.emissiveIntensity>=1)return;m.color.lerp(c,k)}})}
function mushMesh(){const g=new T.Group(),cm=sMat(0xb050e0,{emissive:0x4a1a70,emissiveIntensity:.3,roughness:.4});
 const st=new T.Mesh(new T.CylinderGeometry(.35,.45,1.2,8),sMat(0xf3e6c8));st.position.y=.6;g.add(st);
 const cap=new T.Mesh(new T.SphereGeometry(1,16,10,0,Math.PI*2,0,Math.PI*.5),cm);cap.scale.set(1.3,.9,1.3);cap.position.y=1.15;g.add(cap);
 for(let i=0;i<6;i++){const sp=new T.Mesh(new T.SphereGeometry(.14,6,5),sMat(0xffffff));const a=i*1.05;sp.position.set(Math.cos(a)*.7,1.88,Math.sin(a)*.7);g.add(sp)}
 for(const s of[-1,1]){const e=new T.Mesh(new T.SphereGeometry(.09,8,6),sMat(0x1a1010));e.position.set(s*.16,.8,.37);g.add(e)}
 g.userData.mat=cm;shadowAll(g);return g}
function crabMesh(){const g=new T.Group(),cm=sMat(0xe8502a,{roughness:.4});
 const b=new T.Mesh(new T.SphereGeometry(1,16,10),cm);b.scale.set(1.3,.6,1);b.position.y=.7;g.add(b);
 for(const s of[-1,1]){const st=new T.Mesh(new T.CylinderGeometry(.05,.05,.4,5),cm);st.position.set(s*.4,1.2,.6);g.add(st);const ey=new T.Mesh(new T.SphereGeometry(.13,8,6),sMat(0x101010));ey.position.set(s*.4,1.45,.62);g.add(ey);
  const arm=new T.Mesh(new T.SphereGeometry(.5,10,8),cm);arm.scale.set(.6,.5,1);arm.position.set(s*1.3,.8,.8);g.add(arm);
  for(const t of[-1,1]){const p=new T.Mesh(new T.ConeGeometry(.16,.7,5),cm);p.rotation.x=Math.PI/2;p.position.set(s*1.3+t*.16,.8,1.5);g.add(p)}
  for(let i=0;i<3;i++){const l=new T.Mesh(new T.CylinderGeometry(.05,.05,.9,4),cm);l.position.set(s*1.25,.4,-.4+i*.35);l.rotation.z=s*1.0;g.add(l)}}
 g.userData.mat=cm;shadowAll(g);return g}
function batMesh(){const g=new T.Group(),cm=sMat(0x3a2a4a,{emissive:0x200840,emissiveIntensity:.4});
 const b=new T.Mesh(new T.SphereGeometry(.5,12,10),cm);b.scale.set(1,1,1.1);g.add(b);
 for(const s of[-1,1]){const e=new T.Mesh(new T.SphereGeometry(.07,6,6),sMat(0xff3020,{emissive:0xff2010,emissiveIntensity:2}));e.position.set(s*.2,.12,.45);g.add(e);
  const ear=new T.Mesh(new T.ConeGeometry(.14,.4,4),cm);ear.position.set(s*.25,.55,0);g.add(ear);
  const w=new T.Group();w.position.set(s*.4,.1,0);const wb=new T.Mesh(new T.BoxGeometry(1.5,.05,.9),cm);wb.position.x=s*.75;w.add(wb);g.add(w);g.userData[s<0?'wl':'wr']=w}
 g.userData.mat=cm;shadowAll(g);return g}
function enemyMesh(df){const m=enemyMesh0(df);if(df.tint)tintMesh(m,df.tint);return m}
function enemyMesh0(df){if(df.golem)return golemMesh();if(df.mist)return mistMesh();if(df.m==='mush')return mushMesh();if(df.m==='crab')return crabMesh();if(df.m==='bat')return batMesh();
 const g=slimeMesh(df.col,df.leaf);
 if(df.knight){const h=new T.Mesh(new T.SphereGeometry(.78,16,8,0,Math.PI*2,0,Math.PI*.5),sMat(0x9aa0aa,{metalness:.7,roughness:.35}));h.position.y=.5;g.add(h);const pl=new T.Mesh(new T.ConeGeometry(.12,.6,5),sMat(0xff3a3a));pl.position.y=1.5;g.add(pl)}
 if(df.king){for(let i=0;i<6;i++){const a=i*1.047,c=new T.Mesh(new T.ConeGeometry(.16,.5,5),sMat(0xffd23a,{metalness:.8,roughness:.3}));c.position.set(Math.cos(a)*.5,1.05,Math.sin(a)*.5);g.add(c)}}
 return g}
const EN=[];
function makeEnemy(k,x,z,mult=1){const base=EDEF[k],df=Object.assign({},base),am=1+(mult-1)*.45;
 df.hp=Math.round(base.hp*mult);df.atk=Math.round(base.atk*am);df.exp=Math.round(base.exp*mult*.8);df.gold=Math.round(base.gold*mult*.7);
 const mesh=enemyMesh(df),h=H(x,z);mesh.scale.setScalar(df.sc);mesh.position.set(x,h,z);scene.add(mesh);
 const e={k,df,mesh,x,z,y:h,hx:x,hz:z,hp:df.hp,max:df.hp,state:'idle',t:0,cd:1,kx:0,kz:0,flash:0,dt:0,resp:0,r:.9*df.sc,wx:x,wz:z,wt:0,lx:0,lz:0,hit:false,ph:rnd()*6,enemy:true};EN.push(e);return e}
function spawnEnemies(n,cx,cz,r,types,mult=1){let c=0,t=0;while(c<n&&t<n*40){t++;const a=rnd()*6.283,d=Math.sqrt(rnd())*r,x=cx+Math.cos(a)*d,z=cz+Math.sin(a)*d;
 if(Math.abs(x)>620||Math.abs(z)>620)continue;const h=H(x,z);if(h<1.2||!freeSpot(x,z)||Math.hypot(x,z)<60)continue;
 makeEnemy(types[Math.floor(rnd()*types.length)],x,z,mult);c++}}
spawnEnemies(48,0,0,230,['G','G','Y','Y','K']);spawnEnemies(14,95,20,60,['B']);spawnEnemies(2,0,0,230,['Q']);
spawnEnemies(46,0,-420,235,['L','L','P','P','G','K','Y'],1.6);spawnEnemies(2,0,-420,235,['Q'],2);
spawnEnemies(40,430,0,230,['B','B','C','C','E','Y'],3.2);spawnEnemies(14,-440,0,230,['R'],7);spawnEnemies(14,-440,0,230,['F'],7);spawnEnemies(10,-440,0,230,['E'],7);spawnEnemies(10,-440,0,230,['V'],7);
spawnEnemies(40,470,-470,210,['S','Z','U','J','X','S','Z']);spawnEnemies(18,470,-470,210,['M','V'],12);
{let t=0,c=0;while(c<46&&t<800){t++;const x=470+(Math.random()-.5)*190,z=-565+(Math.random()-.5)*110;if(Math.abs(x-470)<10&&z>-545)continue;if(z>-512)continue;makeEnemy(['S','Z','U','J','X'][Math.floor(Math.random()*5)],x,z,1);c++}}
// ---------- projectiles & particles
const PJ=[];for(let i=0;i<24;i++){const m=new T.Mesh(new T.SphereGeometry(.4,8,6),new T.MeshBasicMaterial({color:0xffffff,fog:false}));m.visible=false;scene.add(m);PJ.push({m,on:false,x:0,y:0,z:0,vx:0,vz:0,life:0,dmg:0})}
function shoot(x,y,z,tx,tz,spd,dmg,col,sz,stun){const p=PJ.find(q=>!q.on);if(!p)return;const dx=tx-x,dz=tz-z,d=Math.hypot(dx,dz)||1;
 Object.assign(p,{on:true,x,y,z,vx:dx/d*spd,vz:dz/d*spd,life:3.2,dmg,stun:!!stun});p.m.material.color.setHex(col);p.m.scale.setScalar(sz||1);p.m.visible=true}
const PT=[];{const g=new T.SphereGeometry(.12,5,4);for(let i=0;i<80;i++){const m=new T.Mesh(g,new T.MeshBasicMaterial({color:0xffffff,transparent:true,fog:false}));m.visible=false;scene.add(m);PT.push({m,life:0,vx:0,vy:0,vz:0,max:1})}}
function burst(x,y,z,col,n,sp){for(let i=0;i<n;i++){const p=PT.find(q=>q.life<=0);if(!p)return;const a=Math.random()*6.283,u=Math.random()*.8+.2;
 p.life=p.max=.4+Math.random()*.3;p.vx=Math.cos(a)*sp*u;p.vz=Math.sin(a)*sp*u;p.vy=Math.random()*sp*.8+2;p.m.position.set(x,y,z);p.m.material.color.setHex(col);p.m.visible=true}}
// ---------- chests / fruit / NPC
const CH=[];
function addChest(x,z,tier,loot){const h=H(x,z);const g=new T.Group();g.position.set(x,h,z);g.rotation.y=rnd()*6.283;
 const bm=sMat(tier>=5?0x3a2a50:0x8a5a2a,{roughness:.7}),gm=sMat(tier>=5?0xc080ff:0xffd23a,{metalness:.8,roughness:.3,emissive:tier>=5?0x4a1a80:0,emissiveIntensity:.4});
 const base=new T.Mesh(new T.BoxGeometry(1.5,.9,1),bm);base.position.y=.45;g.add(base);
 const lid=new T.Group();lid.position.set(0,.9,-.5);g.add(lid);const lm=new T.Mesh(new T.BoxGeometry(1.5,.4,1),bm);lm.position.set(0,.2,.5);lid.add(lm);
 for(const s of[-.5,.5]){const b1=new T.Mesh(new T.BoxGeometry(.14,.95,1.04),gm);b1.position.set(s,.45,0);g.add(b1);const b2=new T.Mesh(new T.BoxGeometry(.14,.44,1.04),gm);b2.position.set(s,.2,.5);lid.add(b2)}
 const lk=new T.Mesh(new T.BoxGeometry(.25,.3,.1),gm);lk.position.set(0,.8,.52);g.add(lk);
 shadowAll(g);scene.add(g);CH.push({x,z,y:h,g,lid,tier,open:false,t:0,id:CH.length,loot:loot||null});addObst(x,z,.9)}
function chests(n,zn,tier){const c0=Z[zn];let c=0,t=0;while(c<n&&t<500){t++;const a=rnd()*6.283,d=Math.sqrt(rnd())*c0[2]*.9,x=c0[0]+Math.cos(a)*d,z=c0[1]+Math.sin(a)*d;
 const h=H(x,z);if(h<2||Math.abs(x)>620||Math.abs(z)>620||!freeSpot(x,z))continue;if(zn!=='village'&&Math.abs(H(x+2,z)-h)>2)continue;addChest(x,z,tier);c++}}
chests(10,'meadow',1);chests(3,'village',1);chests(10,'forest',2);chests(9,'valley',3);chests(10,'rock',4);chests(10,'demon',5);
{let c=0,t=0;while(c<16&&t<800){t++;const x=(rnd()-.5)*1240,z=(rnd()-.5)*1240,h=H(x,z);if(h<2||!freeSpot(x,z)||Math.abs(H(x+2,z)-h)>2)continue;
 const tier=Math.hypot(x,z)<230?1:Math.hypot(x,z+420)<240?2:Math.hypot(x-430,z)<240?3:Math.hypot(x+440,z)<240?4:Math.hypot(x-470,z+470)<260?5:2;addChest(x,z,tier);c++}}
const FR=[];{let t=0;while(FR.length<70&&t<4000){t++;const x=(rnd()-.5)*1100,z=(rnd()-.5)*1100,h=H(x,z);if(h<1.5||h>40||!freeSpot(x,z)||gw(x,z,470,-470,200)>.4)continue;
 const g=new T.Group();const f=new T.Mesh(new T.SphereGeometry(.32,12,10),sMat(0xff9a1a,{emissive:0xff6a00,emissiveIntensity:.5}));g.add(f);const l=new T.Mesh(new T.SphereGeometry(.12,6,5),sMat(0x4cb83a));l.scale.set(1.6,.3,1);l.position.y=.32;g.add(l);
 g.position.set(x,h+.8,z);scene.add(g);FR.push({x,z,y:h,g,got:false,id:FR.length})}}
const NPCS=[];
function npc(x,z,o,name,tag,rot){const m=makeMikan(o);const y=H(x,z);m.g.position.set(x,y,z);m.g.rotation.y=rot;m.g.scale.setScalar(o.sc||1.1);scene.add(m.g);NPCS.push({x,z,name,tag,g:m.g,y});addObst(x,z,.8)}
npc(0,296,{body:0xa8d85a,helmet:false,sword:false,sc:1.25},'elder','村長ミカン',Math.PI);
npc(24,306,{body:0xff8ab8,helmet:false,sword:false,pack:false},'shop','おかしやさん',-1.2);
npc(-24,306,{body:0xd0805a,helmet:false,sword:false,pack:false,sc:1.2},'smith','かじや',1.2);
npc(-8,335,{body:0x9ac8ff,helmet:false,sword:false,pack:false},'inn','やどや 🛏',Math.PI);
npc(14,326,{body:0xe8c060,helmet:false,sword:false,pack:false,sc:1.2},'weapons','武器屋 ⚔',-2.2);
{const rk=new T.Group();rk.position.set(18,H(18,328),328);const bs=new T.Mesh(new T.BoxGeometry(4.4,.5,1.2),sMat(0x6a4020));bs.position.y=.25;rk.add(bs);const bk=new T.Mesh(new T.BoxGeometry(4.4,2.6,.3),sMat(0x8a5a2a));bk.position.set(0,1.5,-.4);rk.add(bk);
 for(let i=0;i<4;i++){const b=new T.Mesh(new T.BoxGeometry(.12,2.2,.06),sMat(0xc8ccd4,{metalness:.8,roughness:.3}));b.position.set(-1.6+i*1.05,1.6,-.2);b.rotation.z=(i-1.5)*.08;rk.add(b)}shadowAll(rk);scene.add(rk);addObst(18,328,2.2)}
{const st=new T.Group();st.position.set(27,H(27,306),306);const t=new T.Mesh(new T.BoxGeometry(4,1.2,2),sMat(0xd9a566));t.position.y=.6;st.add(t);
 const aw=new T.Mesh(new T.BoxGeometry(4.4,.3,2.6),sMat(0xff6a9a));aw.position.y=3.2;aw.rotation.x=.25;st.add(aw);
 for(const s of[-1,1]){const p=new T.Mesh(new T.CylinderGeometry(.1,.1,3.2,6),sMat(0xfff4dc));p.position.set(s*2,1.6,1);st.add(p)}shadowAll(st);scene.add(st);addObst(27,306,2)}
{const fg=new T.Group();fg.position.set(-28,H(-28,306),306);const b=new T.Mesh(new T.BoxGeometry(2,1.2,2),sMat(0x4a4a52,{roughness:.9}));b.position.y=.6;fg.add(b);
 const gl=new T.Mesh(new T.BoxGeometry(1.5,.3,1.5),sMat(0xff6a1a,{emissive:0xff4a00,emissiveIntensity:1.6}));gl.position.y=1.3;fg.add(gl);
 const an=new T.Mesh(new T.BoxGeometry(1.2,.7,.6),sMat(0x222226,{metalness:.7,roughness:.4}));an.position.set(-2,.35,1.2);fg.add(an);shadowAll(fg);scene.add(fg);addObst(-28,306,1.6)}
{const bd=new T.Group();bd.position.set(-14,H(-14,338),338);const bs=new T.Mesh(new T.BoxGeometry(2.6,.6,1.3),sMat(0x8a5a2a));bs.position.y=.3;bd.add(bs);
 const bl=new T.Mesh(new T.BoxGeometry(2.4,.3,1.2),sMat(0xff9ac0));bl.position.set(.1,.7,0);bd.add(bl);const pw=new T.Mesh(new T.BoxGeometry(.7,.25,1),sMat(0xffffff));pw.position.set(-.9,.9,0);bd.add(pw);
 const sg=new T.Mesh(new T.BoxGeometry(2.2,.9,.15),sMat(0xfff4dc,{emissive:0xffd070,emissiveIntensity:.5}));sg.position.set(2.8,2.6,0);bd.add(sg);const pl=new T.Mesh(new T.CylinderGeometry(.08,.08,2.4,6),sMat(0x6a4020));pl.position.set(2.8,1.2,0);bd.add(pl);shadowAll(bd);scene.add(bd)}
// ---------- boss models
function demonBody(dmCol,emi,blEm){const g=new T.Group(),dm=sMat(dmCol,{roughness:.6,emissive:emi,emissiveIntensity:.5});
 const rb=new T.Mesh(new T.CylinderGeometry(1.5,3.8,10,12),dm);rb.position.y=5;g.add(rb);
 const to=new T.Mesh(new T.SphereGeometry(2,14,10),dm);to.scale.set(1,1.1,.8);to.position.y=11;g.add(to);
 const hd=new T.Mesh(new T.SphereGeometry(1.4,14,10),dm);hd.position.y=13.8;g.add(hd);
 for(const s of[-1,1]){const h=new T.Mesh(new T.ConeGeometry(.45,2.6,6),sMat(0x2a1a3a));h.position.set(s*.9,15.4,0);h.rotation.z=-s*.5;g.add(h);
  const e=new T.Mesh(new T.SphereGeometry(.26,8,6),sMat(0xff3020,{emissive:0xff2010,emissiveIntensity:2.5}));e.position.set(s*.55,14,1.15);e.scale.set(1.4,.7,.5);g.add(e);
  const sh=new T.Mesh(new T.SphereGeometry(1,10,8),dm);sh.position.set(s*2.5,11.8,0);g.add(sh)}
 const bl=new T.Mesh(new T.BoxGeometry(.5,9,1.2),sMat(0x30303c,{metalness:.8,roughness:.3,emissive:blEm,emissiveIntensity:.6}));bl.position.set(3.4,8,.8);bl.rotation.z=.15;g.add(bl);
 const cp=new T.Mesh(new T.BoxGeometry(4.4,9,.2),sMat(0x120a1c));cp.position.set(0,8,-1.8);g.add(cp);return g}
function slimeBoss(col,emi,sc,crown){const g=new T.Group(),mt=new T.MeshPhysicalMaterial({color:col,roughness:.1,clearcoat:1,transparent:true,opacity:.9,emissive:emi,emissiveIntensity:.25});
 const b=new T.Mesh(SLG,mt);b.scale.set(sc,sc*.88,sc);b.position.y=.6;g.add(b);
 for(const s of[-1,1]){const e=new T.Mesh(new T.SphereGeometry(sc*.12,10,8),sMat(0x101830,{roughness:.2}));e.position.set(s*sc*.36,sc*.68,sc*.86);e.scale.set(1,1.5,.5);g.add(e)}
 const mo=new T.Mesh(new T.SphereGeometry(sc*.14,10,8),sMat(0x101830));mo.position.set(0,sc*.4,sc*.94);mo.scale.set(1.8,.7,.4);g.add(mo);
 if(crown)for(let i=0;i<6;i++){const a=i*1.047,c=new T.Mesh(new T.ConeGeometry(sc*.1,sc*.36,5),sMat(0xffd23a,{metalness:.8,roughness:.3}));c.position.set(Math.cos(a)*sc*.36,sc*1.04,Math.sin(a)*sc*.36);g.add(c)}
 return g}
function makeBossModel(id){const g=new T.Group();
 if(id==='forest'){const bm=sMat(0x6b4a2b,{roughness:1}),gm=sMat(0x3fa84a,{roughness:.8,flatShading:true});
  const tr=new T.Mesh(new T.CylinderGeometry(2.2,3,8,10),bm);tr.position.y=4;g.add(tr);
  for(let i=0;i<3;i++){const c=new T.Mesh(new T.IcosahedronGeometry(1,1),gm);const a=i*2.1;c.position.set(Math.cos(a)*2.4,9.4+(i%2),Math.sin(a)*2.4);c.scale.set(3.6,2.8,3.6);g.add(c)}
  const top=new T.Mesh(new T.IcosahedronGeometry(1,1),gm);top.position.y=11.5;top.scale.set(4,3,4);g.add(top);
  for(const s of[-1,1]){const e=new T.Mesh(new T.SphereGeometry(.5,8,6),sMat(0xffe040,{emissive:0xffc000,emissiveIntensity:2}));e.position.set(s*1,6,2.5);e.scale.set(1,1.3,.5);g.add(e)}
  const mo=new T.Mesh(new T.BoxGeometry(1.8,.8,.4),sMat(0x1a0a05));mo.position.set(0,4.4,2.8);g.add(mo);
  for(let i=0;i<5;i++){const a=i*1.26,r=new T.Mesh(new T.ConeGeometry(.9,5,6),bm);r.position.set(Math.cos(a)*3.2,.8,Math.sin(a)*3.2);r.rotation.set(Math.sin(a)*1.1,0,-Math.cos(a)*1.1);g.add(r)}}
 else if(id==='valley'){g.add(slimeBoss(0x3a8cff,0x1a4aa0,5,true));const rg=new T.Mesh(new T.TorusGeometry(6.4,.5,8,32),sMat(0x9adfff,{emissive:0x4aa8ff,emissiveIntensity:.8}));rg.rotation.x=Math.PI/2;rg.position.y=.6;g.add(rg)}
 else if(id==='rock'){const m=golemMesh();m.scale.setScalar(4.2);g.add(m);
  for(let i=0;i<4;i++){const c=new T.Mesh(new T.ConeGeometry(.9,3.4,5),sMat(0xffb040,{emissive:0xff8000,emissiveIntensity:1.2}));c.position.set(-3+i*2,9.5-(i%2)*.8,-2.4);c.rotation.x=-.5;g.add(c)}}
 else if(id==='gate'){const m=golemMesh();m.scale.setScalar(5);tintMesh(m,0x4a1a7a,.75);g.add(m);
  for(let i=0;i<6;i++){const c=new T.Mesh(new T.ConeGeometry(.8,3.6,5),sMat(0xb050ff,{emissive:0x8a2aff,emissiveIntensity:1.4}));const a=i*1.05;c.position.set(Math.cos(a)*3,10+(i%2)*.8,Math.sin(a)*3-1);c.rotation.x=-.4;g.add(c)}
  const sw=new T.Mesh(new T.BoxGeometry(.9,12,1.8),sMat(0x30303c,{metalness:.8,roughness:.3,emissive:0x6a1aa0,emissiveIntensity:.8}));sw.position.set(7,7,1.5);sw.rotation.z=.2;g.add(sw)}
 else if(id==='demon'){g.add(demonBody(0x1a1026,0x220a44,0x601010))}
 else if(id==='demon2'){const dm=sMat(0x3a0a14,{roughness:.5,emissive:0x601008,emissiveIntensity:.7}),dd=demonBody(0x2a0610,0x701010,0xff4010);dd.scale.setScalar(1.55);g.add(dd);
  for(const s of[-1,1]){for(let k=0;k<3;k++){const w=new T.Mesh(new T.BoxGeometry(.5,15-k*3,5-k),sMat(0x200810,{roughness:.7,emissive:0x501008,emissiveIntensity:.6,flatShading:true}));w.position.set(s*(6+k*3.2),18+k*3.2,-4);w.rotation.z=-s*(.7+k*.18);g.add(w)}}
  const halo=new T.Mesh(new T.TorusGeometry(5,.35,8,32),sMat(0xff6a20,{emissive:0xff4400,emissiveIntensity:1.8}));halo.position.y=29;halo.rotation.x=Math.PI/2;g.add(halo);
  for(let i=0;i<10;i++){const a=i*.628,c=new T.Mesh(new T.ConeGeometry(.9,5,6),sMat(0xff5a1a,{emissive:0xff3a00,emissiveIntensity:1.6}));c.position.set(Math.cos(a)*5,26.5,Math.sin(a)*5);g.add(c)}
  for(const s of[-1,1]){const a=new T.Mesh(new T.CylinderGeometry(.9,.7,11,8),dm);a.position.set(s*7,12,3.5);a.rotation.set(-.9,0,s*.5);g.add(a);const cl=new T.Mesh(new T.ConeGeometry(1.1,3.6,6),sMat(0xff4a20,{emissive:0xff2000,emissiveIntensity:1.5}));cl.position.set(s*9.5,8.5,9);cl.rotation.x=1.5;g.add(cl)}}
 else if(id==='deathknight'){const d=demonBody(0x20263a,0x0a2a50,0x1050a0);d.scale.setScalar(.8);g.add(d)}
 else if(id==='emperor'){g.add(slimeBoss(0x6adf3a,0x2a8a10,4,true))}
 else if(id==='queen'){const m=mushMesh();m.scale.setScalar(5);g.add(m);const c=new T.Mesh(new T.TorusGeometry(2.6,.25,6,16),sMat(0xffd23a,{metalness:.8}));c.rotation.x=Math.PI/2;c.position.y=9.5;g.add(c)}
 else if(id==='crabking'){const m=crabMesh();m.scale.setScalar(6);g.add(m)}
 else if(id==='golemking'){const m=golemMesh();m.scale.setScalar(5.6);tintMesh(m,0xc06020,.7);g.add(m);
  for(let i=0;i<5;i++){const c=new T.Mesh(new T.ConeGeometry(.9,3.4,5),sMat(0xffb040,{emissive:0xff8000,emissiveIntensity:1.3}));c.position.set(-4+i*2,11-(i%2)*.8,-2.6);c.rotation.x=-.5;g.add(c)}}
 shadowAll(g);const fm=[],seen=new Set();g.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissive&&!seen.has(o.material)){seen.add(o.material);fm.push([o.material,o.material.emissive.getHex(),o.material.emissiveIntensity])}});return{g,fm}}
