/* Fifth edition — island-grade bridge geometry, mixed-gender animated cast, miniature walking principal, overview/close-up navigation. */

// Remove older bridge decks. Our new bridges are carefully intersected with the true hexagon outline.
const outdatedBridges=document.getElementById('bridgesAboveIslands');if(outdatedBridges)outdatedBridges.remove();
// Remove previous generic walkers to replace them with distinctive students and teachers.
svg.querySelectorAll('.walker').forEach(n=>n.remove());
const newBridgeLayer=E('g',{id:'bridgesV2'});svg.insertBefore(newBridgeLayer,document.getElementById('themedScenes'));
function cross2(a,b){return a.x*b.y-a.y*b.x}
function surfaceHit(island,dx,dy){const pts=hex(island.cx,island.cy,139,84).map(([x,y])=>({x,y}));const C={x:island.cx,y:island.cy},D={x:dx,y:dy};let closest=null;
 for(let i=0;i<pts.length;i++){const A=pts[i],B=pts[(i+1)%pts.length],E={x:B.x-A.x,y:B.y-A.y},AC={x:A.x-C.x,y:A.y-C.y},den=cross2(D,E);if(Math.abs(den)<1e-7)continue;const t=cross2(AC,E)/den,u=cross2(AC,D)/den;if(t>0&&u>=-1e-6&&u<=1+1e-6&&(!closest||t<closest.t))closest={t,x:C.x+D.x*t,y:C.y+D.y*t}}
 return closest||{x:C.x+dx*115,y:C.y+dy*70};}
const bridgeRoutes=[];
connections.forEach(([a,b],idx)=>{const A=islandData[a],B=islandData[b],vx=B.cx-A.cx,vy=B.cy-A.cy,len=Math.hypot(vx,vy),ux=vx/len,uy=vy/len,nx=-uy,ny=ux;
 const edgeA=surfaceHit(A,ux,uy),edgeB=surfaceHit(B,-ux,-uy),inset=9;
 const start={x:edgeA.x-ux*inset,y:edgeA.y-uy*inset},end={x:edgeB.x+ux*inset,y:edgeB.y+uy*inset},distance=Math.hypot(end.x-start.x,end.y-start.y);
 if(distance<25)return;
 const g=E('g',{class:'bridge-v2','aria-label':`${A.name}與${B.name}的陸面連接橋`},newBridgeLayer);
 // Bridge foundations, side ledgers, and consistent planks. Deck touches the meadow at both ends.
 E('line',{x1:start.x,y1:start.y+8,x2:end.x,y2:end.y+8,class:'deck-shadow'},g);
 E('line',{x1:start.x,y1:start.y,x2:end.x,y2:end.y,class:'deck','stroke-linecap':'butt'},g);
 for(const p of [start,end]){E('ellipse',{cx:p.x,cy:p.y,rx:23,ry:16,transform:`rotate(${Math.atan2(uy,ux)*180/Math.PI} ${p.x} ${p.y})`,class:'landing'},g)}
 E('line',{x1:start.x,y1:start.y,x2:end.x,y2:end.y,class:'deck','stroke-linecap':'butt'},g);
 for(let d=3;d<distance-2;d+=11){const x=start.x+ux*d,y=start.y+uy*d;E('line',{x1:x+nx*13,y1:y+ny*13,x2:x-nx*13,y2:y-ny*13,class:'plank'},g)}
 for(const side of [-1,1]){E('line',{x1:start.x+nx*side*17,y1:start.y+ny*side*17-5,x2:end.x+nx*side*17,y2:end.y+ny*side*17-5,class:'rail'},g);
  for(let d=5;d<distance-2;d+=26){const x=start.x+ux*d+nx*side*17,y=start.y+uy*d+ny*side*17;E('line',{x1:x,y1:y+1,x2:x,y2:y-9,class:'landmarks'},g);E('circle',{cx:x,cy:y-9,r:3,class:'post-cap'},g)}}
 bridgeRoutes.push({start,end,ux,uy,distance,group:g});
});

function littlePerson(parent,kind,x1,y1,x2,y2,index){const female=kind.endsWith('female'),teacher=kind.startsWith('teacher');const palette=teacher?(female?['#ad8a9a','#6f657a']:['#d3a36b','#5a7075']):(female?['#f3d7e2','#bf8caa']:['#e9f4ec','#5a907e']);
 const g=E('g',{class:'person-v2','aria-label':(teacher?'老師':'學生')+'（'+(female?'女':'男')+'）'},parent),body=E('g',{class:'body-bob'},g);
 E('ellipse',{cx:0,cy:1,rx:8,ry:2.7,fill:'#234d3f44'},body);
 for(const s of [-1,1]){const leg=E('g',{class:s===-1?'step-left':'step-right'},body);E('line',{x1:s*3,y1:-8,x2:s*4,y2:3,stroke:'#405568','stroke-width':3.2,'stroke-linecap':'round'},leg)}
 if(female&&!teacher){poly([[-6,-10],[-10,-2],[10,-2],[6,-10]],palette[1],body)}
 rect(-6,-21,12,14,palette[0],body,{rx:3,stroke:palette[1],'stroke-width':1.7});
 for(const s of [-1,1])E('line',{x1:s*7,y1:-17,x2:s*10,y2:-8,stroke:teacher?'#dfb79a':'#e7c3a3','stroke-width':2.8,'stroke-linecap':'round'},body);
 E('circle',{cx:0,cy:-27,r:7.4,fill:'#f0c5a4',class:'head'},body);
 if(female){E('path',{d:'M -7 -25 Q -12 -40 0 -38 Q 12 -39 8 -25 L 9 -12 Q 4 -8 3 -17 L 4 -28 Q -3 -32 -7 -25 Z',fill:teacher?'#544c45':'#433337',class:'hair'},body);E('circle',{cx:8,cy:-23,r:3,fill:teacher?'#675e55':'#4e3d42'},body)}
 else{E('path',{d:'M -7 -27 Q -8 -40 3 -38 Q 10 -37 8 -26 Q 3 -32 -2 -30 Z',fill:teacher?'#555253':'#313e43',class:'hair'},body)}
 if(teacher){rect(5,-18,5,8,'#f2e6c2',body,{rx:1});E('line',{x1:5,y1:-12,x2:9,y2:-13,stroke:'#9b7753','stroke-width':1},body)}else{rect(female?-9:6,-17,4,10,'#e5a46b',body,{rx:2})}
 // Contrasting backpacks and modest outfit differences make silhouettes recognizable.
 if(!teacher)rect(female?5:-9,-19,3,10,female?'#a67aab':'#dc9c56',body,{rx:2});
 const mx=(x1+x2)/2,my=(y1+y2)/2;E('animateMotion',{dur:`${8+index%7}s`,repeatCount:'indefinite',begin:`-${index*1.17}s`,path:`M ${x1} ${y1} Q ${mx} ${my-12} ${x2} ${y2} Q ${mx} ${my+10} ${x1} ${y1}`},g);
 return g}
const types=['student-male','student-female','teacher-male','student-female','teacher-female','student-male'];
let personIndex=0;
islandData.forEach((z,i)=>{const coords=[[-68,-24,-35,-35],[43,-37,75,-14],[-66,36,-20,52],[70,32,33,54],[-27,-61,19,-52],[38,10,-16,32]];
 coords.forEach((p,j)=>{littlePerson(svg,types[(j+i)%types.length],z.cx+p[0],z.cy+p[1],z.cx+p[2],z.cy+p[3],personIndex++);});
});
bridgeRoutes.forEach((r,i)=>{if(r.distance<37)return;const p=13;littlePerson(svg,types[(i+2)%types.length],r.start.x+r.ux*p,r.start.y+r.uy*p,r.end.x-r.ux*p,r.end.y-r.uy*p,personIndex++);});

// Resize Q-principal to the SAME world scale as the teachers and students, and let him walk.
const qPrincipal=document.getElementById('principalYuCartoon');
const principalWalk=E('g',{id:'principalWalking',class:'principal-mini',tabindex:0,role:'button','aria-label':'于賢華校長，正在校園散步，點擊介紹'});
if(qPrincipal){qPrincipal.remove();qPrincipal.setAttribute('transform','scale(.34)');principalWalk.append(qPrincipal);qPrincipal.querySelectorAll('.nameplate,.nametext').forEach(el=>el.remove());}
txt(0,34,'于賢華','principal-walking-label',principalWalk);E('animateMotion',{dur:'17s',repeatCount:'indefinite',path:'M 484 461 Q 515 477 545 463 Q 580 456 604 434 Q 570 416 540 425 Q 500 425 484 461'},principalWalk);
principalWalk.addEventListener('click',meetPrincipal);principalWalk.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();meetPrincipal()}});

// Functional navigation: fit all seven islands, or zoom to an active island and pan freely.
const viewBar=document.createElement('div');viewBar.className='view-buttons';viewBar.setAttribute('role','group');viewBar.setAttribute('aria-label','島嶼觀看模式');
viewBar.innerHTML='<button type="button" id="allView" aria-pressed="true">▦　全景</button><button type="button" id="closeView" aria-pressed="false">⌕　近看</button><button type="button" id="rotateLeft" title="向左旋轉">↶</button><button type="button" id="rotateRight" title="向右旋轉">↷</button>';
appRoot.append(viewBar);const viewCaption=document.createElement('div');viewCaption.className='view-caption';viewCaption.textContent='全景：七島一覽 · 拖曳移動';appRoot.append(viewCaption);
let selectedIslandId='mechanical';
function setViewButtons(mode){document.getElementById('allView').setAttribute('aria-pressed',String(mode==='all'));document.getElementById('closeView').setAttribute('aria-pressed',String(mode==='close'))}
function allIslands(){zoom=.82;dx=dy=0;spin=0;render();setViewButtons('all');viewCaption.textContent='全景：七島一覽 · 拖曳移動'}
function closeTo(id){const z=islandData.find(item=>item.id===id)||islandData[4];selectedIslandId=z.id;const before=svg.getBoundingClientRect(),baseW=before.width/zoom;zoom=1.65;const factor=baseW/1100*zoom;dx=-(z.cx-550)*factor;dy=-(z.cy-410)*factor;spin=0;render();setViewButtons('close');viewCaption.textContent='近看：'+z.name+' · 拖曳觀察人物'}
document.getElementById('allView').onclick=allIslands;document.getElementById('closeView').onclick=()=>closeTo(selectedIslandId);document.getElementById('rotateLeft').onclick=()=>{spin-=12;render();viewCaption.textContent='已旋轉視角 · 仍可拖曳探索'};document.getElementById('rotateRight').onclick=()=>{spin+=12;render();viewCaption.textContent='已旋轉視角 · 仍可拖曳探索'};
// Clicking a building still opens its introduction. Double-click zooms into its island.
const selectBeforeView=selectZone;selectZone=function(id){selectedIslandId=id;return selectBeforeView(id)};
svg.addEventListener('dblclick',e=>{const building=e.target.closest?.('.zone');if(building)closeTo(building.dataset.id);else allIslands()});
document.getElementById('reset').addEventListener('click',()=>{setViewButtons('all');viewCaption.textContent='全景：七島一覽 · 拖曳移動'});
document.querySelector('.hint').innerHTML='✋ 拖曳平移、滾輪縮放、全景／近看<br>👥 男／女學生與老師 · 校長也在島上散步';
document.querySelector('.intro-card p').innerHTML='七座學習島由真正落在地面的橋梁相連。<br>遇見男女學生、男女老師與散步的Q版校長，<br>切換全景與近看，發現雲端校園的小小故事！';
