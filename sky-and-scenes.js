/* Fourth edition: floating sky islands, physically joined bridges, contextual scene changes, and a hand-drawn chibi principal. */
// Six softly tinted cloud masses at different depths; no external assets or video required.
const cloudscape=document.createElement('div');cloudscape.className='cloudscape';cloudscape.setAttribute('aria-hidden','true');cloudscape.innerHTML='<div class="aurora"></div>';
for(let i=0;i<8;i++){const c=document.createElement('div');c.className='cloud '+(i%3===0?'low':'high');c.style.setProperty('--top',`${[7,23,43,68,83,13,57,95][i]}%`);c.style.setProperty('--scale',String([.63,1.2,.9,1.6,.72,1.1,1.35,.65][i]));c.style.setProperty('--duration',`${[52,67,78,85,58,96,73,64][i]}s`);c.style.animationDelay=`-${i*13}s`;cloudscape.append(c)}
appRoot.insertBefore(cloudscape,appRoot.firstChild);

// Correct the original bridges: deck endpoints are ON the island tops, and are drawn AFTER the ground.
svg.querySelectorAll('.bridge').forEach(n=>n.remove());
const bridgesLayer=E('g',{id:'bridgesAboveIslands'});
connections.forEach(([ia,ib],index)=>{
 const a=islandData[ia],b=islandData[ib],ang=Math.atan2(b.cy-a.cy,b.cx-a.cx),ux=Math.cos(ang),uy=Math.sin(ang),nx=-uy,ny=ux;
 // Surface intersection of a hexagonal island in the travel direction; inset to ensure seamless landing.
 const surfaceRadius=(dx,dy)=>{const x=Math.abs(dx),y=Math.abs(dy);return 1/Math.max(y/82,(x+.52*y/82*139)/139)};
 const ra=Math.min(135,surfaceRadius(ux,uy)),rb=Math.min(135,surfaceRadius(-ux,-uy));
 const start={x:a.cx+ux*(ra-16),y:a.cy+uy*(ra-16)},end={x:b.cx-ux*(rb-16),y:b.cy-uy*(rb-16)};
 const length=Math.hypot(end.x-start.x,end.y-start.y);if(length<15)return;
 const bridge=E('g',{class:'bridge-fixed','aria-label':`${a.name}至${b.name}的跨島橋`},bridgesLayer);
 function lineOffset(side,amount,color,width,more={}){E('line',{x1:start.x+nx*side*amount,y1:start.y+ny*side*amount,x2:end.x+nx*side*amount,y2:end.y+ny*side*amount,stroke:color,'stroke-width':width,'stroke-linecap':'round',...more},bridge)}
 lineOffset(0,0,'#5d8e7b',35);lineOffset(0,0,'#ead5aa',27,{class:'wood'});
 for(let p=6;p<length-4;p+=12){const t=p/length,cx=start.x+(end.x-start.x)*t,cy=start.y+(end.y-start.y)*t;E('line',{x1:cx+nx*13,y1:cy+ny*13,x2:cx-nx*13,y2:cy-ny*13,stroke:'#987c61','stroke-width':2,opacity:'.65'},bridge)}
 for(const side of [-1,1]){lineOffset(side,17,'#e9f6da',3);for(let p=10;p<length-5;p+=29){const t=p/length,x=start.x+(end.x-start.x)*t,y=start.y+(end.y-start.y)*t;E('line',{x1:x+nx*side*14,y1:y+ny*side*14,x2:x+nx*side*19,y2:y+ny*side*19,stroke:'#fdf6e4','stroke-width':3},bridge)}}
 if(index%2===0){const x1=start.x+ux*18,y1=start.y+uy*18,x2=end.x-ux*18,y2=end.y-uy*18;if(Math.hypot(x2-x1,y2-y1)>22)walker(bridge,x1,y1,x2,y2,index%4===0?'student':'teacher',index*.13)}
});
// Enrich bridge deck lighting and visual layering: the deck goes ABOVE all island surfaces.

// Four distinct collections of miniature installations. Each is a world, not a color filter.
const scenesLayer=E('g',{id:'themedScenes',class:'scene-layer'});
const sceneDescriptions={human:'舞蹈・音樂・閱讀',tech:'無人機・機器人・智慧科技',creative:'繪畫・STEAM・創作',aesthetic:'花藝・雕塑・美感展覽'};
const motifs={human:['閱讀角','鋼琴舞台','舞蹈廣場'],tech:['智慧機器人','無人機','感測實驗'],creative:['STEAM實驗','繪畫畫架','創意工作室'],aesthetic:['花藝花園','雕塑小徑','美感藝廊']};
function sceneLabel(g,x,y,s){txt(x,y,s,'scene-title',g)}
function miniBook(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);poly([[-19,2],[-2,-3],[-2,12],[-19,16]],'#fef4dc',a,{stroke:'#618d9a','stroke-width':2});poly([[2,-3],[19,2],[19,16],[2,12]],'#ffefce',a,{stroke:'#618d9a','stroke-width':2});E('line',{x1:0,y1:-2,x2:0,y2:14,stroke:'#b97863','stroke-width':2},a);txt(0,-12,'📖','floating-note',a,{'font-size':15})}
function miniPiano(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);rect(-21,-10,44,26,'#222f42',a,{rx:3});rect(-17,-7,36,17,'#fffbef',a,{rx:2});for(let k=1;k<7;k++)E('line',{x1:-17+k*5.1,y1:-7,x2:-17+k*5.1,y2:10,stroke:'#566173','stroke-width':1},a);for(let k of [1,2,4,5])rect(-17+k*5.1-3,-7,5,9,'#283847',a);txt(16,-16,'♪','floating-note',a,{'font-size':18,fill:'#b86d92'})}
function miniDancer(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g),d=E('g',{class:'animated-dancer'},a);E('circle',{cx:0,cy:-20,r:7,fill:'#efbd9f'},d);poly([[0,-12],[-13,3],[0,8],[14,3]],'#d48eab',d);E('line',{x1:-4,y1:6,x2:-12,y2:17,stroke:'#4a6470','stroke-width':3},d);E('line',{x1:4,y1:6,x2:14,y2:14,stroke:'#4a6470','stroke-width':3},d);E('line',{x1:-7,y1:-7,x2:-19,y2:-19,stroke:'#efbd9f','stroke-width':3},d);E('line',{x1:7,y1:-7,x2:20,y2:-13,stroke:'#efbd9f','stroke-width':3},d);txt(19,-25,'♫','floating-note',a,{'font-size':15,fill:'#9665ae'})}
function miniRobot(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);rect(-17,-18,34,32,'#dfeefa',a,{rx:7,stroke:'#478fa3','stroke-width':3});E('circle',{cx:-7,cy:-5,r:4,fill:'#48b7c9',class:'pulse'},a);E('circle',{cx:7,cy:-5,r:4,fill:'#48b7c9',class:'pulse'},a);E('path',{d:'M -8 5 Q 0 12 8 5',fill:'none',stroke:'#607895','stroke-width':2},a);E('line',{x1:0,y1:-18,x2:0,y2:-27,stroke:'#507fa0','stroke-width':3},a);E('circle',{cx:0,cy:-29,r:4,fill:'#e5b96f'},a);rect(-24,-10,8,18,'#7ab0c3',a,{rx:3});rect(16,-10,8,18,'#7ab0c3',a,{rx:3});rect(-12,14,8,8,'#6b8c9d',a,{rx:2});rect(4,14,8,8,'#6b8c9d',a,{rx:2})}
function miniDrone(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`,class:'drone'},g);rect(-13,-7,26,12,'#4c89a8',a,{rx:6});for(const dx of [-22,22]){E('line',{x1:dx<0?-10:10,y1:-2,x2:dx,y2:-9,stroke:'#4d708a','stroke-width':3},a);E('ellipse',{cx:dx,cy:-11,rx:12,ry:3,fill:'#8dcbd6',class:'rotor'},a)}E('circle',{cx:0,cy:5,r:4,fill:'#f1d58c'},a);E('line',{x1:-7,y1:6,x2:-10,y2:13,stroke:'#496c80','stroke-width':2},a);E('line',{x1:7,y1:6,x2:10,y2:13,stroke:'#496c80','stroke-width':2},a)}
function miniSensors(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);rect(-22,-15,44,30,'#297f8e',a,{rx:5});for(let k=0;k<3;k++){E('circle',{cx:-12+k*12,cy:-4+k%2*8,r:4,fill:'#e1d17b',class:'pulse'},a);E('line',{x1:-12+k*12,y1:0+k%2*8,x2:-12+k*12,y2:11,stroke:'#b7e5c1','stroke-width':2},a)}txt(0,-23,'⌁','',a,{'font-size':20,fill:'#4f9baf'})}
function miniEasel(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);E('line',{x1:0,y1:-20,x2:-21,y2:28,stroke:'#ad8057','stroke-width':4},a);E('line',{x1:0,y1:-20,x2:21,y2:28,stroke:'#ad8057','stroke-width':4},a);rect(-20,-20,40,38,'#fffaf1',a,{rx:2,stroke:'#d4a774','stroke-width':3});E('circle',{cx:-5,cy:-4,r:9,fill:'#ffb9ad'},a);poly([[-10,8],[7,-8],[15,9]],'#8ec3b8',a);E('line',{x1:-26,y1:17,x2:27,y2:17,stroke:'#a97d56','stroke-width':3},a);E('line',{x1:14,y1:13,x2:24,y2:-4,stroke:'#7d6ac0','stroke-width':3,class:'paint-brush'},a)}
function miniSteam(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);const atom=E('g',{class:'steam-orbit'},a);for(let k=0;k<3;k++)E('ellipse',{cx:0,cy:0,rx:21,ry:8,fill:'none',stroke:['#de8db1','#8eafcf','#e6be6f'][k],'stroke-width':3,transform:`rotate(${k*60})`},atom);E('circle',{cx:0,cy:0,r:5,fill:'#d9a963'},a);txt(0,31,'STEAM','',a,{'font-size':10,'font-weight':900,fill:'#66769a'})}
function miniMaker(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);rect(-25,-12,50,30,'#ebc6d6',a,{rx:5});for(const [cx,cy,clr] of [[-13,-2,'#e88d91'],[0,-5,'#e7c66b'],[13,-1,'#8dbdc9'],[-7,10,'#98c5a0'],[9,10,'#b4a2d1']])E('circle',{cx,cy,r:5,fill:clr},a);E('line',{x1:17,y1:-17,x2:28,y2:-32,stroke:'#9f805e','stroke-width':3,class:'paint-brush'},a)}
function miniFlowers(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);rect(-22,5,44,17,'#c69b82',a,{rx:5});for(const [dx,col] of [[-14,'#ed97b4'],[0,'#e9cb7b'],[14,'#a1b7e6']]){E('line',{x1:dx,y1:6,x2:dx+3,y2:-16,stroke:'#5eaa82','stroke-width':3},a);for(let k=0;k<5;k++){const theta=k*Math.PI*2/5;E('circle',{cx:dx+3+Math.cos(theta)*8,cy:-16+Math.sin(theta)*8,r:5,fill:col,class:'petal'},a)}E('circle',{cx:dx+3,cy:-16,r:4,fill:'#fff3bb'},a)}}
function miniSculpture(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);rect(-21,15,42,13,'#d7c1a2',a,{rx:2});E('path',{d:'M -8 15 C -31 -5 -9 -30 9 -21 C 29 -10 15 7 5 3 C -6 -1 -2 -13 8 -11',fill:'none',stroke:'#e7e2d7','stroke-width':12,'stroke-linecap':'round'},a);E('circle',{cx:8,cy:-11,r:6,fill:'#d7c5bc'},a)}
function miniGallery(g,x,y){const a=E('g',{transform:`translate(${x} ${y})`},g);for(let k=0;k<2;k++){rect(-26+k*30,-19,26,34,'#e8c8ac',a,{rx:1});rect(-22+k*30,-15,18,26,'#fff6df',a);E('circle',{cx:-13+k*30,cy:-7,r:6,fill:k?'#bbabd6':'#e7a9a7'},a);poly([[-22+k*30,11],[-10+k*30,-3],[ -4+k*30,11]],k?'#a7c8ca':'#a2c2a7',a)}}
const sceneArtists={human:[miniBook,miniPiano,miniDancer],tech:[miniRobot,miniDrone,miniSensors],creative:[miniSteam,miniEasel,miniMaker],aesthetic:[miniFlowers,miniSculpture,miniGallery]};
islandData.forEach((z,i)=>{for(const theme of ['human','tech','creative','aesthetic']){const g=E('g',{class:`scene-${theme}`},scenesLayer);const positions=[[-96,11],[90,-24],[-12,57]];for(let j=0;j<3;j++){const [dx,dy]=positions[j];const artist=sceneArtists[theme][(j+i)%3];artist(g,z.cx+dx,z.cy+dy);if(i===0||i===4)sceneLabel(g,z.cx+dx,z.cy+dy+39,motifs[theme][(j+i)%3])}}});

// Replace the photograph-shaped avatar with a recognizable, hand-illustrated, chibi principal.
const oldPrincipal=document.getElementById('principalYu');if(oldPrincipal)oldPrincipal.remove();
const yu=E('g',{class:'principal-q',id:'principalYuCartoon',tabindex:0,role:'button','aria-label':'Q版于賢華校長，點擊介紹'});yu.setAttribute('transform','translate(646 447)');
E('ellipse',{cx:0,cy:82,rx:30,ry:8,fill:'#164c3f48'},yu);
// Dark formal suit, white collar and pale blue tie; deliberately oversized head and friendly stance.
poly([[-21,43],[-9,35],[10,35],[23,43],[28,78],[-28,78]],'#293a4e',yu,{stroke:'#fdf0de','stroke-width':2});
poly([[-10,38],[0,61],[11,38],[4,75]],'#f7f8fa',yu);poly([[-3,41],[3,41],[6,57],[0,67],[-6,57]],'#72a9d1',yu);
poly([[-21,43],[-8,37],[-1,66],[-14,57]],'#394c61',yu);poly([[21,43],[8,37],[1,66],[14,57]],'#394c61',yu);
E('line',{x1:-17,y1:75,x2:-19,y2:85,stroke:'#233547','stroke-width':9,'stroke-linecap':'round'},yu);E('line',{x1:17,y1:75,x2:19,y2:85,stroke:'#233547','stroke-width':9,'stroke-linecap':'round'},yu);
E('path',{d:'M -22 50 Q -34 58 -24 70',fill:'none',stroke:'#293a4e','stroke-width':10,'stroke-linecap':'round'},yu);
const arm=E('g',{class:'wave'},yu);E('path',{d:'M 22 48 Q 39 35 32 15',fill:'none',stroke:'#293a4e','stroke-width':10,'stroke-linecap':'round'},arm);E('ellipse',{cx:32,cy:13,rx:7,ry:9,fill:'#efc4a7',transform:'rotate(-15 32 13)'},arm);
const head=E('g',{class:'head'},yu);E('ellipse',{cx:-27,cy:0,rx:6,ry:10,fill:'#edbd9e'},head);E('ellipse',{cx:27,cy:0,rx:6,ry:10,fill:'#edbd9e'},head);
E('ellipse',{cx:0,cy:1,rx:30,ry:35,fill:'#f2c8ab',stroke:'#fdf2df','stroke-width':2},head);
// Principal portrait cues: short side-parted black hair, full dark brows, gentle narrow eyes and a calm smile.
E('path',{d:'M -30 -9 Q -36 -30 -18 -36 Q -7 -47 11 -37 Q 31 -38 31 -15 Q 22 -24 10 -29 Q -1 -18 -19 -21 Q -26 -18 -30 -9',fill:'#25333a'},head);
E('path',{d:'M -20 -29 Q -5 -35 8 -36 Q 18 -34 24 -28',fill:'none',stroke:'#405056','stroke-width':3,'stroke-linecap':'round'},head);
E('path',{d:'M -18 -6 Q -10 -11 -3 -7 M 5 -7 Q 14 -11 21 -6',fill:'none',stroke:'#41413c','stroke-width':3.4,'stroke-linecap':'round'},head);
const eyes=E('g',{class:'blink'},head);E('ellipse',{cx:-11,cy:0,rx:3.1,ry:3.8,fill:'#29333a'},eyes);E('ellipse',{cx:13,cy:0,rx:3.1,ry:3.8,fill:'#29333a'},eyes);E('circle',{cx:-12,cy:-1,r:1,fill:'#fff'},eyes);E('circle',{cx:12,cy:-1,r:1,fill:'#fff'},eyes);
E('path',{d:'M 1 6 Q -1 12 4 12',fill:'none',stroke:'#d39d82','stroke-width':2,'stroke-linecap':'round'},head);
E('path',{d:'M -8 18 Q 2 26 13 17',fill:'none',stroke:'#965f59','stroke-width':2.4,'stroke-linecap':'round'},head);
E('ellipse',{cx:-19,cy:12,rx:6,ry:3,fill:'#eeb7a6',opacity:'.45'},head);E('ellipse',{cx:20,cy:12,rx:6,ry:3,fill:'#eeb7a6',opacity:'.45'},head);
E('rect',{x:-56,y:89,width:113,height:28,rx:14,class:'nameplate'},yu);txt(0,108,'于賢華 校長','nametext',yu);E('circle',{cx:0,cy:-47,r:4,fill:'#f5d079',class:'pulse'},yu);
yu.addEventListener('click',meetPrincipal);yu.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();meetPrincipal()}});
// In the information card the original photograph remains as context; the map itself is now fully Q-style.

// Change the four theme selectors to show their actual living exhibit concepts.
const priorTheme=setIslandTheme;setIslandTheme=function(id){priorTheme(id);const desc=sceneDescriptions[id]||sceneDescriptions.human;styleCaption.textContent=(themeOptions.find(v=>v.id===id)?.icon||'✦')+'　'+desc;};
setIslandTheme(initialTheme);
const counter=document.createElement('div');counter.className='scene-counter';counter.textContent='☁　雲端七島・四種實景風格';appRoot.append(counter);
document.querySelector('.intro-card p').innerHTML='漂浮在七彩雲海上的七座學習島。<br>走過相連的橋梁，遇見Q版于賢華校長，<br>體驗人文、科技、創意、美感四種生活場景！';
