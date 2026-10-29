/* Third edition — themed learning islands, bridges, and the principal character. */
const appRoot=document.getElementById('app');
const themeOptions=[{id:'human',label:'人文風',icon:'📖',desc:'溫暖的大地色、閱讀與人文氣息'},{id:'tech',label:'科技風',icon:'💡',desc:'智慧科技的藍色未來感'},{id:'creative',label:'創意風',icon:'🎨',desc:'活潑明亮、充滿想像的彩色島嶼'},{id:'aesthetic',label:'美感風',icon:'🌸',desc:'柔和自然、富有美感的校園氛圍'}];
const styleBar=document.createElement('div');styleBar.className='style-switcher';styleBar.setAttribute('role','group');styleBar.setAttribute('aria-label','切換島嶼風格');styleBar.innerHTML='<span class="style-label">ISLAND STYLE</span>';appRoot.append(styleBar);
const styleCaption=document.createElement('div');styleCaption.className='theme-caption';styleCaption.setAttribute('aria-live','polite');appRoot.append(styleCaption);
const palette={human:['#e7b87e','#f2d59d','#cba87b'],tech:['#64bcd5','#a7e4ec','#5f91c9'],creative:['#f69dbb','#ecc1ef','#f4c87d'],aesthetic:['#a6d3ba','#deddb2','#c5c9e7']};
const islandG=[...svg.querySelectorAll('.island-group')];islandG.forEach(group=>{const p=[...group.children].filter(e=>e.tagName.toLowerCase()==='polygon');if(p[3])p[3].classList.add('island-top');if(p[4])p[4].classList.add('island-meadow')});
const themeIcons=[];islandData.forEach((z,i)=>{const t=txt(z.cx-93,z.cy+20,'◆','theme-icon',svg,{'font-size':19,'fill':'#e5bb6a'});themeIcons.push(t)});
function setIslandTheme(id){for(const v of themeOptions)appRoot.classList.toggle('theme-'+v.id,v.id===id);let current=themeOptions.find(v=>v.id===id)||themeOptions[0];styleCaption.textContent=current.icon+'　'+current.desc;themeIcons.forEach((t,i)=>{t.textContent=[current.icon,'✦','◇','●','✿','✧','✴'][i%7];t.setAttribute('fill',palette[id][i%3])});styleBar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===id)));try{localStorage.setItem('taishan-theme',id)}catch{}}
for(const t of themeOptions){const b=document.createElement('button');b.type='button';b.dataset.theme=t.id;b.textContent=t.label;b.setAttribute('aria-pressed','false');b.onclick=()=>setIslandTheme(t.id);styleBar.append(b)}
let initialTheme='human';try{const v=localStorage.getItem('taishan-theme');if(themeOptions.some(t=>t.id===v))initialTheme=v}catch{}setIslandTheme(initialTheme);
// The principal stands near the center of the learning-island network, wearing a dark suit and pale-blue tie.
const principal=E('g',{id:'principalYu',class:'principal-character',role:'button',tabindex:0,'aria-label':'于賢華校長，點擊認識校長'});principal.setAttribute('transform','translate(637 466)');
const defs=E('defs',{},principal),clip=E('clipPath',{id:'yuFaceClip'},defs);E('circle',{cx:0,cy:0,r:20},clip);
E('ellipse',{cx:2,cy:73,rx:26,ry:8,fill:'#315a4c40'},principal);
poly([[-23,29],[-9,19],[9,19],[23,29],[28,66],[-28,66]],'#243547',principal,{stroke:'#fff9e8','stroke-width':2});
poly([[-10,22],[0,40],[10,22],[2,56]],'#eff3f9',principal);poly([[-2,23],[2,23],[5,40],[0,48],[-5,40]],'#6faad4',principal);
poly([[-23,29],[-9,23],[-1,49],[-14,40]],'#394d60',principal);poly([[23,29],[9,23],[1,49],[14,40]],'#394d60',principal);
E('circle',{cx:0,cy:0,r:21,fill:'#e8c6ac',stroke:'#fff8e6','stroke-width':3},principal);
E('image',{href:'principal-yu.png',x:-81,y:-53,width:164,height:181,preserveAspectRatio:'xMidYMid meet','clip-path':'url(#yuFaceClip)'},principal);
E('rect',{x:-49,y:75,width:98,height:27,rx:13,fill:'#fffdf3',stroke:'#79b69d','stroke-width':2},principal);
txt(0,93,'于賢華 校長','principal-name',principal);
E('circle',{cx:0,cy:-33,r:4,fill:'#ffd46e',class:'pulse'},principal);
function meetPrincipal(){const side=document.getElementById('side');side.classList.remove('hidden');document.getElementById('sideNum').textContent='MEET THE PRINCIPAL';document.getElementById('sideTitle').textContent='于賢華 校長';document.getElementById('sideDesc').textContent='歡迎來到泰山高中七座學習島！從學術探究、專業實作、體育專長到適性學習，邀請你走進每個人的發光舞台。';document.getElementById('sideTag').textContent='校園特別人物';document.getElementById('hero').classList.add('compact');let photo=side.querySelector('.principal-photo');if(!photo){photo=document.createElement('img');photo.className='principal-photo';photo.alt='于賢華校長參考照片';photo.src='principal-yu.png';side.insertBefore(photo,document.getElementById('sideDesc'))}}
principal.addEventListener('click',meetPrincipal);principal.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();meetPrincipal()}});
// Remove portrait only on returning to a subject zone, avoiding incorrect attribution.
const previousSelect=selectZone;selectZone=function(id){const photo=document.querySelector('.principal-photo');if(photo)photo.remove();return previousSelect(id)};
document.querySelector('.intro-card p').innerHTML='七座學習島，十座跨島橋梁。<br>跟著走動的學生、老師與于賢華校長，<br>還可以切換四種風格、蒐集七枚探索徽章！';
document.querySelector('.hint').innerHTML='✋ 拖曳探索七島、跨島橋梁與師生<br>✦ 點選于賢華校長或島上金色星星';
