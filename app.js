
function filterGlossary(){const q=(document.getElementById('glossarySearch')?.value||'').toLowerCase().trim();document.querySelectorAll('.glossary-item').forEach(el=>{el.style.display=el.innerText.toLowerCase().includes(q)?'block':'none';});}
function toggleDetails(id){const e=document.getElementById(id); if(e)e.hidden=!e.hidden;}
