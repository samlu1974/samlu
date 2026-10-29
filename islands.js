/* Seven independent fantasy learning islands, replacing the first illustrative single-island scene. */
const islandData=[
 {id:'general',name:'普通科',en:'GENERAL STUDIES',tag:'自主學習・探究實作・多元發展',color:'#efb87d',cx:235,cy:245,icon:'📚',desc:'在國文、英文、數學、自然與社會等領域打好基礎，透過跨領域探究、自主學習與多元選修，逐步發現自己的興趣與生涯方向。',feature:'library'},
 {id:'electronics',name:'電子科',en:'ELECTRONICS',tag:'電子電路・程式設計・感測應用',color:'#86c0d1',cx:532,cy:174,icon:'🔌',desc:'從電子電路、微控制器到感測器與物聯網專題，以動手實作串起硬體、程式與創意思考。',feature:'circuit'},
 {id:'electrical',name:'電機科',en:'ELECTRICAL ENGINEERING',tag:'電力系統・電機控制・智慧科技',color:'#e7cd80',cx:826,cy:253,icon:'⚡',desc:'從電工基礎、配線、控制到智慧科技應用，理解電力與設備運作原理，培養精準、安全的實務能力。',feature:'energy'},
 {id:'automotive',name:'汽車科',en:'AUTOMOTIVE TECHNOLOGY',tag:'引擎・車輛檢修・新能源',color:'#dc9e8c',cx:218,cy:493,icon:'🚗',desc:'透過車輛構造、引擎與底盤、檢修實作及新興車輛科技學習，讓喜歡車子的熱情變成專業。',feature:'car'},
 {id:'mechanical',name:'機械科',en:'MECHANICAL ENGINEERING',tag:'機械設計・加工製造・智慧機械',color:'#91baa6',cx:532,cy:425,icon:'⚙️',desc:'從機械製圖、加工與數位製造到機構設計，培養看得懂圖、做得出作品的實作能力。',feature:'gear'},
 {id:'sports',name:'體育班',en:'SPORTS PROGRAM',tag:'運動專長・團隊合作・全人培育',color:'#9db9ea',cx:845,cy:498,icon:'🏀',desc:'結合學科學習與運動專長訓練，在自律、團隊合作、體能與競技精神中持續成長。',feature:'sports'},
 {id:'inclusive',name:'綜合職能班',en:'INCLUSIVE VOCATIONAL LEARNING',tag:'適性學習・生活技能・職涯準備',color:'#c6afe2',cx:532,cy:671,icon:'🌱',desc:'以適性、多元與支持性的學習環境，重視生活技能、職場體驗、社會參與及個別化生涯探索，讓每位學生展現自己的優勢。',feature:'garden'}
];
zones.splice(0,zones.length,...islandData.map(z=>({...z,x:z.cx-64,y:z.cy+15,w:128,h:82,floors:z.id==='sports'?2:3})));
svg.replaceChildren();
// Water accents: dotted sparkles, ripples, and small connections.
for(let i=0;i<75;i++){const x=55+(i*163)%1000,y=55+(i*97)%700;if(Math.abs(x-535)<90&&Math.abs(y-440)<100)continue;E('circle',{cx:x,cy:y,r:i%6===0?2.3:1.1,class:'sea-dot'})}
const connections=[[0,1],[1,2],[0,3],[0,4],[1,4],[2,5],[3,4],[4,5],[4,6],[5,6]];
connections.forEach(([a,b],idx)=>{const A=islandData[a],B=islandData[b],x1=A.cx,y1=A.cy+22,x2=B.cx,y2=B.cy+22,ang=Math.atan2(y2-y1,x2-x1),len=Math.hypot(x2-x1,y2-y1),nx=-Math.sin(ang),ny=Math.cos(ang);
 const bridge=E('g',{class:'bridge','aria-label':`${A.name}通往${B.name}的橋梁`});
 E('line',{x1,y1,x2,y2,stroke:'#477b70','stroke-width':30,'stroke-linecap':'round'},bridge);
 E('line',{x1,y1,x2,y2,stroke:'#e6cfa6','stroke-width':23,'stroke-linecap':'round'},bridge);
 for(let p=12;p<len-7;p+=11){const cx=x1+Math.cos(ang)*p,cy=y1+Math.sin(ang)*p;E('line',{x1:cx+nx*10,y1:cy+ny*10,x2:cx-nx*10,y2:cy-ny*10,stroke:'#b88e64','stroke-width':2,opacity:'.75'},bridge)}
 for(const side of [-1,1])E('line',{x1:x1+nx*16*side,y1:y1+ny*16*side,x2:x2+nx*16*side,y2:y2+ny*16*side,stroke:'#f9f0d5','stroke-width':3,'stroke-linecap':'round','stroke-dasharray':'17 5'},bridge);
 if(idx%2===0)walker(bridge,x1+Math.cos(ang)*105,y1+Math.sin(ang)*105,x2-Math.cos(ang)*103,y2-Math.sin(ang)*103,idx%4===0?'student':'teacher',idx*.17);
});
function hex(cx,cy,rx,ry){return [[cx-rx,cy],[cx-rx*.48,cy-ry],[cx+rx*.48,cy-ry],[cx+rx,cy],[cx+rx*.48,cy+ry],[cx-rx*.48,cy+ry]]}
function island(z,i){const cx=z.cx,cy=z.cy,rx=139,ry=84;const group=E('g',{class:'island-group','data-island':z.id});E('ellipse',{cx,cy:cy+67,rx:136,ry:41,fill:'#4b8f7860'},group);E('ellipse',{cx,cy:cy+76,rx:151,ry:51,class:'water-ring'},group);const pts=hex(cx,cy,rx,ry);const down=pts.map(([x,y])=>[x,y+27]);poly([pts[0],pts[5],down[5],down[0]],'#6d9b7c',group);poly([pts[5],pts[4],down[4],down[5]],'#5c8d77',group);poly([pts[4],pts[3],down[3],down[4]],'#477c6c',group);poly(pts,'#bed9ac',group,{stroke:'#e7f3c8','stroke-width':4});poly(hex(cx,cy-3,rx-14,ry-13),['#e5d6a8','#b8d9c5','#e5dda9','#e8cfae','#b6d7c2','#b7d7df','#d1c5e1'][i],group,{opacity:'.72'});
// meadow tufts, stepping stones, and a distinctive cluster of trees
for(const [tx,ty,s] of [[cx-rx+24,cy-10,.55],[cx-rx*.63,cy-ry*.55,.66],[cx+rx*.66,cy-ry*.4,.58],[cx+rx-30,cy+3,.54],[cx+rx*.44,cy+ry*.64,.46]])tree(tx,ty,s);
for(let j=0;j<4;j++){E('ellipse',{cx:cx-74+j*17,cy:cy+43+j*3,rx:6,ry:3,fill:'#fff4d0',opacity:'.95'},group)}
// independent iconography in each learning environment
feature(z,group);
// building after environment but before walkers
building(zones[i]);
txt(cx,cy+ry-3,z.name,'island-label',group);txt(cx,cy+ry+12,z.en,'island-subtitle',group);
// an interactive collectible sits on each island's edge
treasure(z,group,i);
// Animated pupils and teachers walk through this island.
walker(group,cx-40,cy+22,cx+35,cy+29,i%2===0?'student':'teacher',i*0.27);
walker(group,cx+38,cy-33,cx-22,cy-25,i%2===0?'teacher':'student',i*0.41);
walker(group,cx-76,cy-18,cx-34,cy-43,'student',i*.19+.3);
walker(group,cx+70,cy+28,cx+39,cy+49,'student',i*.13+.8);
walker(group,cx+29,cy-49,cx+70,cy-14,'teacher',i*.24+.5);
}
function feature(z,parent){const x=z.cx,y=z.cy;const g=E('g',{transform:`translate(${x} ${y})`},parent);
if(z.feature==='library'){for(let j=0;j<3;j++){rect(-97+j*13,-3,11,27,['#e18a73','#e8bf6e','#81b6a7'][j],g,{rx:2});}txt(-74,-9,'✏','',g,{'font-size':18})}
if(z.feature==='circuit'){rect(65,-12,42,35,'#358f81',g,{rx:5,stroke:'#fff6','stroke-width':2});for(let i=0;i<3;i++){E('line',{x1:72,y1:-6+i*9,x2:96,y2:-6+i*9,stroke:'#f5dd8f','stroke-width':2},g)}E('circle',{cx:83,cy:4,r:7,fill:'#264f69',class:'pulse'},g)}
if(z.feature==='energy'){for(let a=0;a<2;a++){rect(68+a*16,-25,8,49,'#c3a56f',g,{rx:2});E('line',{x1:64+a*16,y1:-17,x2:83+a*16,y2:-17,stroke:'#fff5c5','stroke-width':3},g)}txt(83,-30,'⚡','pulse',g,{'font-size':19})}
if(z.feature==='car'){const c=E('g',{class:'car'},g);rect(46,7,55,19,'#de7161',c,{rx:7});poly([[55,7],[65,-5],[85,-5],[96,7]],'#ef9e7d',c);rect(65,-2,20,9,'#a1d7dd',c,{rx:3});E('circle',{cx:58,cy:26,r:7,fill:'#3c5c64'},c);E('circle',{cx:88,cy:26,r:7,fill:'#3c5c64'},c)}
if(z.feature==='gear'){txt(83,2,'⚙','gear',g,{'font-size':56,fill:'#5d8b87'});rect(57,18,55,9,'#94aaa1',g,{rx:3})}
if(z.feature==='sports'){rect(53,-11,57,40,'#60a69f',g,{rx:5,stroke:'#fff9e5','stroke-width':3});E('line',{x1:81,y1:-11,x2:81,y2:29,stroke:'#fff9e5','stroke-width':2},g);E('circle',{cx:81,cy:9,r:10,fill:'none',stroke:'#fff9e5','stroke-width':2},g);txt(43,-3,'🏀','ball',g,{'font-size':25})}
if(z.feature==='garden'){rect(52,5,58,24,'#dfb88b',g,{rx:4});for(let k=0;k<3;k++){txt(62+k*18,2,['🌼','🌷','🌿'][k],'',g,{'font-size':21})}txt(-85,-13,'♥','pulse',g,{'font-size':22,fill:'#b07eae'})}
}
function walker(parent,x1,y1,x2,y2,kind,offset){const person=E('g',{class:'walker'},parent);const body=E('g',{class:'body'},person);E('ellipse',{cx:0,cy:3,rx:9,ry:3,fill:'#234b4144',class:'shadow'},body);E('line',{x1:-3,y1:-7,x2:-4,y2:3,stroke:'#3d5d63','stroke-width':3,'stroke-linecap':'round'},body);E('line',{x1:3,y1:-7,x2:4,y2:3,stroke:'#3d5d63','stroke-width':3,'stroke-linecap':'round'},body);rect(-6,-22,12,16,kind==='teacher'?'#d6a46d':'#f7fbeb',body,{rx:4,stroke:kind==='teacher'?'#a67b60':'#4d8579','stroke-width':2});E('circle',{cx:0,cy:-27,r:7,fill:'#f4c6a0'},body);E('path',{d:kind==='teacher'?'M -7,-28 Q -7,-39 2,-36 Q 10,-36 7,-25':'M -7,-29 Q -7,-39 0,-38 Q 8,-38 8,-28',fill:kind==='teacher'?'#5a493f':'#3e4b46'},body);if(kind==='student'){rect(-6,-10,12,4,'#47716f',body,{rx:1});rect(5,-19,4,10,'#edb974',body,{rx:2})}else{rect(5,-18,7,10,'#6a9078',body,{rx:1})}const motion=E('animateMotion',{dur:`${6+offset*2}s`,repeatCount:'indefinite',begin:`-${offset*2}s`,path:`M ${x1},${y1} Q ${(x1+x2)/2},${y1-28} ${x2},${y2} Q ${(x1+x2)/2},${y2+22} ${x1},${y1}`},person);return person}
let found;try{found=JSON.parse(localStorage.getItem('taishan-treasure-v2')||'[]')}catch{found=[]}if(!Array.isArray(found))found=[];
function treasure(z,parent,i){const x=z.cx+95,y=z.cy+42;const g=E('g',{class:'treasure'+(found.includes(z.id)?' found':''),role:'button',tabindex:0,'aria-label':`蒐集${z.name}的尋寶徽章`},parent);E('circle',{cx:x,cy:y,r:17,fill:'#fff8e7',stroke:'#e4bc70','stroke-width':3},g);txt(x,y+5,'✦','treasure-note',g,{fill:'#d9a743','font-size':18});const collect=e=>{e.stopPropagation();if(found.includes(z.id)){toast('這枚徽章已經收藏囉 ✦');return}found.push(z.id);try{localStorage.setItem('taishan-treasure-v2',JSON.stringify(found))}catch{}g.classList.add('found');updateHunt();openAward(z);};g.addEventListener('click',collect);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();collect(e)}})}
islandData.forEach(island);
document.getElementById('indexItems').replaceChildren();islandData.forEach((z,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="dot" style="--dot:${z.color}"></span><span>${String(i+1).padStart(2,'0')}　${z.name}</span>`;b.onclick=()=>selectZone(z.id);document.getElementById('indexItems').append(b)});
document.getElementById('sideTitle').textContent='七座學習島';document.querySelector('.hero h1').innerHTML='七座學習島，<br><span>每一種天賦都發光。</span>';document.querySelector('.hero p').innerHTML='普通科 × 專業群科 × 多元適性<br>探索七座島嶼，找出屬於你的發光路線。';document.querySelector('.intro-card h2').textContent='泰山・七座學習島';document.querySelector('.intro-card p').innerHTML='七座各有特色的學習島嶼，正在等你探索。<br>遇見走動的師生、發現特色場景，<br>蒐集七枚專屬徽章，完成你的校園尋寶！';document.querySelector('.intro-card .credits').textContent='主題式概念場景 · 非實際校園配置';document.getElementById('exploreBtn').textContent='開始七島尋寶　↗';document.querySelector('.hint').innerHTML='✋ 拖曳地圖 · 滾輪縮放 · 點擊建築<br>✦ 找出每座島上的金色星星，集滿 7 枚徽章';document.querySelector('.badge').textContent='✦　SEVEN LEARNING ISLANDS / 創意示意';
const hud=document.createElement('section');hud.className='hunt-hud';hud.setAttribute('aria-label','校園尋寶進度');hud.innerHTML='<div class="cap">CAMPUS TREASURE HUNT</div><div class="main">✦　探索徽章 <strong id="foundCount">0 / 7</strong></div><div class="progress"><span id="huntFill"></span></div><button id="huntHelp">如何尋寶？ ↗</button>';document.getElementById('app').append(hud);
const modal=document.createElement('div');modal.className='hunt-modal';modal.hidden=true;modal.innerHTML='<div class="hunt-card" role="dialog" aria-modal="true" aria-labelledby="awardTitle"><div class="award" id="awardIcon">✦</div><div style="font-size:10px;letter-spacing:3px;color:#6fa58d;font-weight:900">TAISHAN EXPLORER BADGE</div><h2 id="awardTitle">找到新徽章！</h2><p id="awardText"></p><button id="awardClose">繼續探索 →</button></div>';document.getElementById('app').append(modal);document.getElementById('awardClose').onclick=()=>modal.hidden=true;modal.addEventListener('click',e=>{if(e.target===modal)modal.hidden=true});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.hidden=true});document.getElementById('huntHelp').onclick=()=>toast('找出七座島嶼的金色 ✦，點擊蒐集專屬徽章！');
function updateHunt(){document.getElementById('foundCount').textContent=found.length+' / 7';document.getElementById('huntFill').style.width=(found.length/7*100)+'%'}function openAward(z){document.getElementById('awardIcon').textContent=z.icon;document.getElementById('awardTitle').textContent=found.length===7?'恭喜！七島探索完成':'獲得「'+z.name+'」徽章！';document.getElementById('awardText').textContent=found.length===7?'你已蒐集七座學習島所有徽章！每一條路都有自己的精彩，歡迎繼續認識泰山高中。':z.tag+'。已蒐集 '+found.length+' / 7 枚徽章，繼續尋找其他島上的金色星星吧！';modal.hidden=false}updateHunt();render();
