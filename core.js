'use strict';
window.onerror=(m,s,l)=>{const e=document.createElement('div');e.id='err';e.textContent=m+' @'+String(s).split('/').pop()+':'+l;document.body.appendChild(e)};
const T=THREE,$=id=>document.getElementById(id);
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,sm=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rnd=rng(20261016);
const hash=(x,y)=>{const h=Math.sin(x*127.1+y*311.7)*43758.5453;return h-Math.floor(h)};
function vn(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
 const a=hash(xi,yi),b=hash(xi+1,yi),c=hash(xi,yi+1),d=hash(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
const fbm=(x,y)=>(vn(x,y)*.5+vn(x*2.1,y*2.1)*.25+vn(x*4.3,y*4.3)*.125)/.875;
const gw=(x,z,cx,cz,r)=>Math.exp(-((x-cx)**2+(z-cz)**2)/(r*r));
const Z={meadow:[0,0,230],forest:[0,-420,230],valley:[430,0,230],rock:[-440,0,230],village:[0,300,90],demon:[470,-470,200]};
const BOSS_POS=[0,-420];
const ARENAS=[{id:'forest',x:0,z:-420,t:6,c:0x7dff8a,ar:30},{id:'valley',x:300,z:-205,t:5,c:0x6ad0ff,ar:30},{id:'rock',x:-380,z:-230,t:30,c:0xffc86a,ar:30},{id:'gate',x:470,z:-440,t:9,c:0xb050ff,ar:30}];
const FIN={x:-515,z:-515};
const ENTR=[[150,-130],[-110,-500],[345,-252],[-470,60],[250,-470],[470,-556]];
function flatP(h,x,z,cx,cz,r0,r1,t){const d=Math.hypot(x-cx,z-cz);const w=d<=r0?1:sm(1-(d-r0)/(r1-r0));return h*(1-w)+t*w}
function flat(h,x,z,cx,cz,r,t){const w=sm(1-Math.hypot(x-cx,z-cz)/r);return h*(1-w)+t*w}
function H(x,z){
 if(x>=800)return 2;
 let h=4+fbm(x*.007,z*.007)*16+fbm(x*.03+50,z*.03)*3.5;
 h+=gw(x,z,-440,0,190)*(55+fbm(x*.011+9,z*.011)*85);
 h+=gw(x,z,470,-470,160)*fbm(x*.02,z*.02)*16;
 h+=sm((Math.max(Math.abs(x),Math.abs(z))-620)/70)*70;
 h=flat(h,x,z,0,0,45,5);h=flat(h,x,z,0,300,75,4.5);for(const a of ARENAS)h=flat(h,x,z,a.x,a.z,52,a.t);h=flatP(h,x,z,470,-565,122,170,9);h=flatP(h,x,z,FIN.x,FIN.z,72,112,14);
 const rx=430+Math.sin(z*.011)*50+Math.sin(z*.031)*12,zw=sm(1-Math.abs(z)/520);
 let w=sm(1-Math.abs(x-rx)/20)*zw;h=h*(1-w)-2.6*w;
 const sx=95+Math.sin(z*.035)*14,sz=sm(1-Math.abs(z-20)/200);w=sm(1-Math.abs(x-sx)/6.5)*sz;h=h*(1-w)-.7*w;
 return h}
// ---------- renderer
const canvas=$('c');
const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
const scene=new T.Scene();scene.fog=new T.Fog(0xcfe9fb,120,620);
const camera=new T.PerspectiveCamera(60,innerWidth/innerHeight,.3,2600);
addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});
const hemi=new T.HemisphereLight(0xcfe8ff,0x7a9a55,1.5);scene.add(hemi);
const sun=new T.DirectionalLight(0xfff1d6,2.8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
{const c=sun.shadow.camera;c.left=-85;c.right=85;c.top=85;c.bottom=-85;c.near=1;c.far=420}
sun.shadow.bias=-.0004;sun.shadow.normalBias=.6;scene.add(sun,sun.target);
// ---------- terrain
const LC=h=>{const c=new T.Color(h);return[c.r,c.g,c.b]};
const PAL={g1:LC(0x78c940),g2:LC(0x9bd94f),forest:LC(0x2f8a3a),sand:LC(0xe6d49a),rock:LC(0x8d857c),rock2:LC(0x6e665f),snow:LC(0xf2f6ff),dark:LC(0x3a2350),valley:LC(0x8fd36a),dirt:LC(0xb58a55)};
const mixc=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
function biome(x,z,h,ny){
 const n=vn(x*.06,z*.06),n2=vn(x*.4,z*.4);
 let c=mixc(PAL.g1,PAL.g2,n);
 c=mixc(c,PAL.forest,Math.min(1,gw(x,z,0,-420,240)*1.5));
 c=mixc(c,PAL.valley,Math.min(1,gw(x,z,430,0,200)*.8));
 if(z>10&&z<300)c=mixc(c,PAL.dirt,sm(1-Math.abs(x-Math.sin(z*.02)*8)/4)*.85);
 c=mixc(c,mixc(PAL.rock,PAL.rock2,n2),clamp((h-30)/25+(1-ny)*2.2,0,1));
 c=mixc(c,PAL.snow,sm((h-95)/20));
 c=mixc(c,PAL.dark,Math.min(1,gw(x,z,470,-470,210)*1.6+gw(x,z,FIN.x,FIN.z,115)*1.6));
 if(h<1.2)c=mixc(c,PAL.sand,sm((1.2-h)/1.5));
 const v=.92+n2*.16;return[c[0]*v,c[1]*v,c[2]*v]}
{
 const SEG=350,geo=new T.PlaneGeometry(1400,1400,SEG,SEG);geo.rotateX(-Math.PI/2);
 const p=geo.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,H(p.getX(i),p.getZ(i)));
 geo.computeVertexNormals();const nm=geo.attributes.normal,col=new Float32Array(p.count*3);
 for(let i=0;i<p.count;i++){const c=biome(p.getX(i),p.getZ(i),p.getY(i),nm.getY(i));col[i*3]=c[0];col[i*3+1]=c[1];col[i*3+2]=c[2]}
 geo.setAttribute('color',new T.BufferAttribute(col,3));
 const m=new T.Mesh(geo,new T.MeshStandardMaterial({vertexColors:true,roughness:1}));m.receiveShadow=true;scene.add(m);
}
const water=new T.Mesh(new T.PlaneGeometry(1500,1500).rotateX(-Math.PI/2),new T.MeshPhongMaterial({color:0x3aa8e0,transparent:true,opacity:.74,shininess:110,specular:0xffffff}));
water.position.y=0;scene.add(water);
// ---------- sky
const skyMat=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,fog:false,uniforms:{top:{value:new T.Color()},hor:{value:new T.Color()},sun:{value:new T.Vector3(0,1,0)},sunCol:{value:new T.Color(0xffe9b0)},glow:{value:1}},
 vertexShader:'varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'uniform vec3 top,hor,sunCol,sun;uniform float glow;varying vec3 vP;void main(){float h=clamp(vP.y,0.,1.);vec3 c=mix(hor,top,pow(h,.55));float d=max(dot(normalize(vP),normalize(sun)),0.);c+=sunCol*(pow(d,700.)*3.+pow(d,10.)*.3)*glow;gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'});
const sky=new T.Mesh(new T.SphereGeometry(1500,32,16),skyMat);sky.frustumCulled=false;sky.renderOrder=-1;scene.add(sky);
const stars=(()=>{const n=700,a=new Float32Array(n*3);for(let i=0;i<n;i++){const u=Math.random()*2-1,t=Math.random()*6.283,r=Math.sqrt(1-u*u);a[i*3]=r*Math.cos(t)*1400;a[i*3+1]=Math.abs(u)*1400;a[i*3+2]=r*Math.sin(t)*1400}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(a,3));const p=new T.Points(g,new T.PointsMaterial({color:0xffffff,size:3.2,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false}));p.frustumCulled=false;scene.add(p);return p})();
const clouds=[];for(let i=0;i<28;i++){const g=new T.Group();const n=3+Math.floor(Math.random()*3);for(let j=0;j<n;j++){const s=new T.Mesh(new T.SphereGeometry(1,10,8),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9,fog:false}));s.scale.set(20+Math.random()*16,9+Math.random()*5,14+Math.random()*8);s.position.set(j*22-n*10,Math.random()*5,Math.random()*8);g.add(s)}
 g.position.set((Math.random()-.5)*1800,170+Math.random()*60,(Math.random()-.5)*1800);scene.add(g);clouds.push(g)}
// ---------- scatter helpers
const D=new T.Object3D();
function inst(geo,mat,items,fn,cast=true){if(!items.length)return null;const m=new T.InstancedMesh(geo,mat,items.length);
 items.forEach((it,i)=>{D.position.set(0,0,0);D.rotation.set(0,0,0);D.scale.set(1,1,1);fn(it,i,m);D.updateMatrix();m.setMatrixAt(i,D.matrix)});
 m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;m.castShadow=cast;m.receiveShadow=true;scene.add(m);return m}
const OB=new Map();
function addObst(x,z,r,g){const k=Math.floor(x/16)+','+Math.floor(z/16);let a=OB.get(k);if(!a)OB.set(k,a=[]);a.push({x,z,r,g})}
function collide(p,pr){const cx=Math.floor(p.x/16),cz=Math.floor(p.z/16);
 for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const a=OB.get((cx+i)+','+(cz+j));if(!a)continue;
  for(const o of a){if(o.g&&S.bk.gate)continue;const dx=p.x-o.x,dz=p.z-o.z,m=o.r+pr,d2=dx*dx+dz*dz;if(d2<m*m&&d2>1e-6){const d=Math.sqrt(d2);p.x=o.x+dx/d*m;p.z=o.z+dz/d*m}}}}
const SHRINES=[[15,15,'はじまりの草原'],[10,284,'おかしな村'],[0,-300,'きらきらの森'],[385,12,'みずの渓谷'],[-380,18,'ごつごつ岩山'],[440,-380,'魔王領の入口'],[255,-130,'滝のほとり'],[-330,-130,'岩山の中腹'],[470,-478,'魔王城の門前'],[-60,-460,'森の遺跡前']];
function freeSpot(x,z){if(Math.hypot(x,z)<36)return false;if(Math.hypot(x,z-300)<88)return false;for(const a of ARENAS)if(Math.hypot(x-a.x,z-a.z)<56)return false;if(Math.hypot(x-470,z+565)<135)return false;if(Math.hypot(x-FIN.x,z-FIN.z)<125)return false;for(const e of ENTR)if(Math.hypot(x-e[0],z-e[1])<14)return false;
 for(const s of SHRINES)if(Math.hypot(x-s[0],z-s[1])<6)return false;return true}
const hsl=(h,s,l)=>new T.Color().setHSL(h,s,l,T.SRGBColorSpace);
// trees
const TR=[];
function trees(n,cx,cz,r,pick){let c=0,t=0;while(c<n&&t<n*40){t++;const a=rnd()*6.283,d=Math.sqrt(rnd())*r,x=cx+Math.cos(a)*d,z=cz+Math.sin(a)*d;
 if(Math.abs(x)>630||Math.abs(z)>630)continue;const h=H(x,z);if(h<1.4||h>48||!freeSpot(x,z))continue;if(Math.abs(H(x+2,z)-h)>2.4)continue;
 TR.push({x,z,y:h,s:.8+rnd()*.7,k:pick(),v:rnd()});c++}}
trees(700,0,-420,235,()=>1);trees(380,0,-420,235,()=>0);trees(170,0,0,230,()=>0);trees(150,430,0,230,()=>0);
trees(100,-440,0,260,()=>1);trees(34,0,300,135,()=>0);trees(160,470,-470,200,()=>2);trees(160,0,0,620,()=>rnd()<.3?1:0);
TR.forEach(t=>addObst(t.x,t.z,.5*t.s));
inst(new T.CylinderGeometry(.35,.55,4,6).translate(0,2,0),new T.MeshStandardMaterial({color:0x6b4a2b,roughness:1}),TR,t=>{D.position.set(t.x,t.y-.2,t.z);D.scale.set(t.s,t.s*(t.k?1.3:1),t.s);D.rotation.y=t.x});
{const r0=TR.filter(t=>t.k===0),r1=TR.filter(t=>t.k!==0);
 inst(new T.IcosahedronGeometry(1,1),new T.MeshStandardMaterial({roughness:.9,flatShading:true}),r0,(t,i,m)=>{D.position.set(t.x,t.y+4.6*t.s,t.z);D.scale.set(3.1*t.s,2.7*t.s,3.1*t.s);D.rotation.y=t.v*6;m.setColorAt(i,hsl(.24+t.v*.09,.55,.36+t.v*.12))});
 inst(new T.ConeGeometry(2.6,7,7),new T.MeshStandardMaterial({roughness:.9,flatShading:true}),r1,(t,i,m)=>{D.position.set(t.x,t.y+(t.k===2?6.2:6.8)*t.s,t.z);D.scale.set(t.s*(t.k===2?.8:1),t.s*(t.k===2?1.3:1.1),t.s*(t.k===2?.8:1));D.rotation.y=t.v*6;m.setColorAt(i,t.k===2?hsl(.77,.3,.16+t.v*.06):hsl(.36,.5,.2+t.v*.09))})}
// rocks
const RK=[];
function rocks(n,cx,cz,r,smin,smax,dark){let c=0,t=0;while(c<n&&t<n*30){t++;const a=rnd()*6.283,d=Math.sqrt(rnd())*r,x=cx+Math.cos(a)*d,z=cz+Math.sin(a)*d;if(Math.abs(x)>640||Math.abs(z)>640)continue;const h=H(x,z);if(h<.8||!freeSpot(x,z))continue;RK.push({x,z,y:h,s:smin+rnd()*(smax-smin),d:dark,v:rnd()});c++}}
rocks(300,-440,0,240,1.5,5,0);rocks(130,0,0,600,.6,1.6,0);rocks(50,470,-470,200,1,3,1);
RK.forEach(r=>addObst(r.x,r.z,r.s*.85));
inst(new T.DodecahedronGeometry(1,0),new T.MeshStandardMaterial({roughness:1,flatShading:true}),RK,(r,i,m)=>{D.position.set(r.x,r.y+r.s*.25,r.z);D.scale.set(r.s*(1+r.v*.4),r.s*.75,r.s*(1.2-r.v*.3));D.rotation.set(r.v,r.v*9,0);m.setColorAt(i,r.d?hsl(.76,.2,.14+r.v*.06):hsl(.09,.07,.4+r.v*.2))});
// grass tufts & flowers
{const G=[];let t=0;while(G.length<9000&&t<60000){t++;const x=(rnd()-.5)*1260,z=(rnd()-.5)*1260,h=H(x,z);if(h<1||h>34)continue;const dz=gw(x,z,470,-470,190);if(dz>.35)continue;
 const f=Math.max(gw(x,z,0,-420,250),gw(x,z,0,0,260),gw(x,z,430,0,240)*.8)+.25;if(rnd()>f)continue;G.push({x,z,y:h,v:rnd()})}
 inst(new T.ConeGeometry(.13,.8,5).translate(0,.4,0),new T.MeshStandardMaterial({roughness:1}),G,(g,i,m)=>{D.position.set(g.x,g.y-.05,g.z);D.scale.set(.6+g.v*.5,.4+g.v*.7,.6+g.v*.5);D.rotation.y=g.v*20;D.rotation.z=(g.v-.5)*.3;m.setColorAt(i,hsl(.22+g.v*.1,.6,.3+g.v*.2))},false);
 const F=[];t=0;while(F.length<900&&t<20000){t++;const a=rnd()*6.283,d=Math.sqrt(rnd())*230,c=rnd()<.7?[0,0]:[430,0],x=c[0]+Math.cos(a)*d,z=c[1]+Math.sin(a)*d,h=H(x,z);if(h<1.2||!freeSpot(x,z))continue;F.push({x,z,y:h,v:rnd()})}
 const fc=[0xffffff,0xfff06a,0xff9ac8,0xffffff,0xb8a0ff];
 inst(new T.CylinderGeometry(.025,.025,.55,4).translate(0,.27,0),new T.MeshStandardMaterial({color:0x4a9a2a}),F,f=>{D.position.set(f.x,f.y,f.z)},false);
 inst(new T.SphereGeometry(.2,8,6),new T.MeshStandardMaterial({roughness:.6}),F,(f,i,m)=>{D.position.set(f.x,f.y+.58,f.z);D.scale.set(1,.55,1);m.setColorAt(i,new T.Color(fc[Math.floor(f.v*5)]))},false)}
// ---------- landmarks
const M=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o||{}));
function house(x,z,rot,roof){const g=new T.Group(),y=H(x,z);g.position.set(x,y,z);g.rotation.y=rot;
 const b=new T.Mesh(new T.BoxGeometry(6,3.8,6),M(0xd9a566));b.position.y=1.9;g.add(b);
 const r=new T.Mesh(new T.ConeGeometry(5.6,3.2,4),M(roof,{roughness:.4}));r.position.y=5.3;r.rotation.y=Math.PI/4;g.add(r);
 const rim=new T.Mesh(new T.TorusGeometry(3.9,.45,8,4),M(0xfff4dc));rim.rotation.set(Math.PI/2,0,Math.PI/4);rim.position.y=3.9;g.add(rim);
 const door=new T.Mesh(new T.BoxGeometry(1.4,2.2,.3),M(0x5a3318));door.position.set(0,1.1,3.05);g.add(door);
 for(const s of[-1,1]){const w=new T.Mesh(new T.BoxGeometry(1,1,.3),M(0xffe08a,{emissive:0xffb040,emissiveIntensity:.5}));w.position.set(s*2,2.3,3.05);g.add(w)}
 for(let i=0;i<7;i++){const c=new T.Mesh(new T.SphereGeometry(.25,6,6),M(0x4a2a14));const a=i*.9;c.position.set(Math.cos(a)*1.6,5.7+Math.sin(a*2)*.3,Math.sin(a)*1.6);g.add(c)}
 g.traverse(o=>{if(o.isMesh)o.castShadow=true});scene.add(g);addObst(x,z,4.3)}
[[-32,282,.4,0xffb8d0],[-34,318,.9,0xfff0b0],[32,284,-.4,0xb8e8ff],[34,322,-.9,0xffb8d0],[-10,345,.1,0xd8f0b0],[16,346,-.2,0xffb8d0],[-52,300,1.2,0xb8e8ff],[54,302,-1.2,0xfff0b0]].forEach(a=>house(...a));
for(let i=0;i<10;i++){const a=i*.63,x=Math.cos(a)*62,z=300+Math.sin(a)*62;const g=new T.Group();g.position.set(x,H(x,z),z);
 const s=new T.Mesh(new T.CylinderGeometry(.12,.12,3.2,6),M(0xffffff));s.position.y=1.6;g.add(s);const l=new T.Mesh(new T.SphereGeometry(.75,12,10),M([0xff6a9a,0xffd23a,0x6ad0ff][i%3],{roughness:.3}));l.position.y=3.5;l.scale.y=.4;g.add(l);l.rotation.x=1.2;g.traverse(o=>{if(o.isMesh)o.castShadow=true});scene.add(g)}

ARENAS.forEach(A=>{const g=new T.Group();g.position.set(A.x,H(A.x,A.z)+.15,A.z);
 const ring=new T.Mesh(new T.RingGeometry(30,33,64).rotateX(-Math.PI/2),new T.MeshBasicMaterial({color:A.c,transparent:true,opacity:.5,fog:false}));g.add(ring);
 for(let i=0;i<10;i++){const a=i/10*6.283,x=A.x+Math.cos(a)*36,z=A.z+Math.sin(a)*36;const s=new T.Mesh(new T.BoxGeometry(2.4,7+(i%3)*1.5,2.4),M(A.id==='demon'?0x3a2a50:0x8d857c,{roughness:1}));s.position.set(Math.cos(a)*36,H(x,z)-g.position.y+3,Math.sin(a)*36);s.castShadow=true;g.add(s);addObst(x,z,1.6)}
 scene.add(g)});
const shrineOrbs=[];
SHRINES.forEach(s=>{const g=new T.Group(),y=H(s[0],s[1]);g.position.set(s[0],y,s[1]);
 const b=new T.Mesh(new T.CylinderGeometry(1.6,2,.8,8),M(0x9a948a,{roughness:1}));b.position.y=.4;g.add(b);
 const p=new T.Mesh(new T.CylinderGeometry(.6,.8,3,6),M(0xb8b2a6,{roughness:1}));p.position.y=2.2;g.add(p);
 const o=new T.Mesh(new T.IcosahedronGeometry(.6,1),M(0x555a66,{emissive:0x000000,emissiveIntensity:1.5}));o.position.y=4.3;g.add(o);shrineOrbs.push(o);
 g.traverse(q=>{if(q.isMesh)q.castShadow=true});scene.add(g);addObst(s[0],s[1],1.6)});
