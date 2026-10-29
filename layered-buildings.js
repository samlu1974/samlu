/* Sixth edition: explicit painter's order, richer architectural volume, and floating island name tags above every element. */
// Original flat extrusions and island-bottom labels are retired.
svg.querySelectorAll('.zone').forEach(el=>el.remove());
svg.querySelectorAll('.island-label,.island-subtitle').forEach(el=>el.remove());

// Draw order is deliberate: ground → buildings → bridges → installations → people → principal → labels.
const buildingLayer=E('g',{id:'architectureLayer'});const bridgeReference=document.getElementById('bridgesV2');svg.insertBefore(buildingLayer,bridgeReference);
const roofColors=['#c77957','#4a8da6','#c49e57','#bd765e','#618e86','#778fbf','#a185c0'];
const facadeColors=['#f8e9d0','#e4f1eb','#f6e8ce','#f5e6d8','#e4ebe3','#ebedf7','#f4e8ec'];
const rightColors=['#c4ad94','#a4c9c4','#c6b18a','#caa9a0','#a7bcb1','#b0b7cc','#c7b4c4'];
function building3D(z,i){const X=z.cx-47,Y=z.cy+12,W=94,H=58,D=31;const g=E('g',{class:'zone architecture-3d','data-id':z.id,tabindex:0,role:'button','aria-label':`探索${z.name}立體教學大樓`},buildingLayer);
 // Building footprint, perimeter walkway and cast shadow make it read as grounded in the island.
 E('ellipse',{cx:X+W/2+9,cy:Y+19,rx:71,ry:18,fill:'#426f5c39'},g);
 poly([[X-11,Y+4],[X+W+8,Y+4],[X+W+D+11,Y+D*.64+10],[X+D-13,Y+D*.64+10]],'#dfd8bf',g,{stroke:'#f8efdb','stroke-width':3});
 // Front and side are true quadrilateral walls (not vertical rectangles painted over a map).
 poly([[X,Y-H],[X+W,Y-H-2],[X+W,Y],[X,Y+2]],facadeColors[i],g,{class:'facade'});
 poly([[X+W,Y-H-2],[X+W+D,Y-H-2-D*.63],[X+W+D,Y-D*.63],[X+W,Y]],rightColors[i],g,{class:'facade'});
 poly([[X,Y-H],[X+D,Y-H-D*.63],[X+W+D,Y-H-D*.63-2],[X+W,Y-H-2]],roofColors[i],g,{class:'roof-main'});
 // Subtle roof fascia, overhang and a small parapet.
 poly([[X-5,Y-H+2],[X+W+5,Y-H],[X+W+5,Y-H+7],[X-5,Y-H+9]],'#f2dcc1',g);
 poly([[X+W+5,Y-H],[X+W+D+3,Y-H-D*.63-2],[X+W+D+3,Y-H-D*.63+5],[X+W+5,Y-H+7]],'#bda78f',g);
 E('line',{x1:X-5,y1:Y-H+2,x2:X+W+5,y2:Y-H,class:'roof-edge'},g);
 // Roof-ridge and rooftop glass/skylight render with real projection cues.
 poly([[X+28,Y-H-8],[X+38,Y-H-14],[X+62,Y-H-14],[X+52,Y-H-8]],'#f4f4e4',g,{stroke:'#fff9e8','stroke-width':1});
 poly([[X+35,Y-H-10],[X+42,Y-H-13],[X+57,Y-H-13],[X+49,Y-H-9]],'#8bc4cd',g);
 if(i%3===0){const chimneyX=X+W-18;poly([[chimneyX,Y-H-5],[chimneyX+11,Y-H-5],[chimneyX+11,Y-H-28],[chimneyX,Y-H-28]],'#d4b59b',g);poly([[chimneyX,Y-H-28],[chimneyX+5,Y-H-32],[chimneyX+16,Y-H-31],[chimneyX+11,Y-H-28]],'#f7e6d1',g)}
 // Three floor bands plus repeated windows with visible inset borders and highlighted glazing.
 for(let floor=0;floor<3;floor++){const fy=Y-H+9+floor*17;
  E('line',{x1:X+2,y1:fy+13,x2:X+W-2,y2:fy+11,class:'trim'},g);
  for(let c=0;c<4;c++){const xx=X+8+c*22,yy=fy-c*.16;rect(xx,yy,14,10,'#8dbec4',g,{class:'window',rx:1.5});rect(xx+2,yy+2,3,6,'#d5f6ee',g,{rx:1,opacity:'.75'});E('line',{x1:xx+7,y1:yy+1,x2:xx+7,y2:yy+9,stroke:'#f8f7e7','stroke-width':1},g)}
  // Windows on the right wall are skewed parallelograms matching the side plane.
  for(let c=0;c<2;c++){const xx=X+W+6+c*12,yy=fy-4-c*7.5;poly([[xx,yy],[xx+8,yy-5],[xx+8,yy+4],[xx,yy+9]],'#7eb0bc',g,{stroke:'#f4f1df','stroke-width':1.1})}
 }
 // Entrance canopy, glass doors, two steps and a tiny school sign.
 rect(X+W*.41,Y-17,20,19,'#456f78',g,{class:'door',rx:1});E('line',{x1:X+W*.41+10,y1:Y-17,x2:X+W*.41+10,y2:Y+2,stroke:'#ecf6ec','stroke-width':1.7},g);
 poly([[X+W*.37,Y-20],[X+W*.7,Y-20],[X+W*.7+7,Y-14],[X+W*.37+7,Y-14]],'#7a9e98',g,{stroke:'#e7f0d8','stroke-width':1.5});
 rect(X+W*.36,Y+1,33,5,'#d7ccb2',g,{class:'step',rx:1});rect(X+W*.32,Y+6,42,5,'#c3b59c',g,{class:'step',rx:1});
 rect(X+W*.4,Y-H+1,29,8,'#fffef0',g,{class:'sign',rx:2});txt(X+W*.4+14.5,Y-H+7.2,'TSSH','signtext',g);
 // Building identity is signaled by the programme's distinct icon, not a misplaced oversized label.
 const emblem=E('g',{class:'roof-flag'},g);E('line',{x1:X+W-10,y1:Y-H-18,x2:X+W-10,y2:Y-H-44,stroke:'#6b887b','stroke-width':2},emblem);
 E('circle',{cx:X+W-10,cy:Y-H-48,r:16,fill:'#fffdf0',stroke:roofColors[i],'stroke-width':3},emblem);txt(X+W-10,Y-H-42,z.icon,'',emblem,{'font-size':17});
 g.addEventListener('click',()=>selectZone(z.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectZone(z.id)}});
}
islandData.forEach(building3D);

// Intentionally hoist all names to the final SVG group: absolutely nothing can paint over them.
const labelLayer=E('g',{id:'topmostIslandLabels',class:'island-name-tags'});
islandData.forEach((z,i)=>{const cx=z.cx,top=z.cy+84,tagY=z.id==='inclusive'?z.cy+53:top+12,tagW=z.id==='inclusive'?182:160;
 const g=E('g',{class:'tag-holder',tabindex:0,role:'button','aria-label':`選擇${z.name}學習島`},labelLayer);
 E('line',{x1:cx,y1:top-14,x2:cx,y2:tagY+2,stroke:'#f9fbef','stroke-width':4,'stroke-linecap':'round'},g);
 E('ellipse',{cx,cy:tagY+43,rx:tagW*.45,ry:8,class:'tag-shadow'},g);
 poly([[cx-8,tagY+3],[cx+8,tagY+3],[cx,tagY-6]],'#fffefa',g,{class:'tag-pin'});
 rect(cx-tagW/2,tagY,tagW,46,'#fffefa',g,{rx:20,class:'tag-pill'});
 E('circle',{cx:cx-tagW/2+19,cy:tagY+18,r:12,fill:z.color},g);
 txt(cx-tagW/2+19,tagY+22,String(i+1),'tag-index',g);
 const textX=cx+8;txt(textX,tagY+23,z.name,'tag-text',g);txt(textX,tagY+36,z.en,'tag-en',g);
 g.addEventListener('click',()=>selectZone(z.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectZone(z.id)}});
});

// The panoramic controls now target the new 3D building hit regions and still retain drag-to-pan.
document.querySelector('.hint').innerHTML='🏫 點立體校舍或最上層島名標籤看介紹<br>✋ 拖曳平移 · 雙擊建築近看 · 全景瀏覽';
document.getElementById('enter').addEventListener('click',()=>document.getElementById('hero').classList.add('compact'));
