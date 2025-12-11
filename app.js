// Simple starter interactivity for TxAI Designer PWA
document.addEventListener('DOMContentLoaded', ()=>{
  const tools = document.querySelectorAll('.sidebar .tool');
  const panels = document.querySelectorAll('.panel');
  const installBtn = document.getElementById('installBtn');
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
  });
  installBtn.addEventListener('click', async ()=>{
    if (deferredPrompt){ deferredPrompt.prompt(); const choice = await deferredPrompt.userChoice; deferredPrompt = null; installBtn.style.display='none'; }
  });

  tools.forEach(t=> t.addEventListener('click', (ev)=>{
    const tool = ev.target.dataset.tool;
    panels.forEach(p=> p.classList.add('hidden'));
    const panel = document.getElementById('panel-'+tool);
    if (panel) panel.classList.remove('hidden');
  }));

  // Pattern generate placeholder
  document.getElementById('generatePattern').addEventListener('click', ()=>{
    const prompt = document.getElementById('patternPrompt').value || 'Sample pattern';
    const repeat = document.getElementById('repeatSize').value || '16';
    const type = document.getElementById('patternType').value || 'straight';
    const canvas = document.createElement('div');
    canvas.style.width='100%'; canvas.style.height='220px'; canvas.style.display='flex'; canvas.style.alignItems='center'; canvas.style.justifyContent='center'; canvas.style.background='linear-gradient(90deg,#fff,#f3f6ff)'; canvas.style.borderRadius='8px';
    canvas.innerHTML = '<div style="text-align:center;color:#2e3a8c"><h3>'+prompt+'</h3><p>Repeat: '+repeat+'cm • '+type+'</p></div>';
    const res = document.getElementById('patternResult');
    res.innerHTML=''; res.appendChild(canvas);
  });

  // Color palette generator (simple complementary + tints)
  document.getElementById('generatePalette').addEventListener('click', ()=>{
    const base = document.getElementById('baseColor').value || '#2e3a8c';
    const pal = generatePalette(base);
    const node = document.getElementById('paletteResult'); node.innerHTML='';
    pal.forEach(c=>{
      const el = document.createElement('div');
      el.style.display='inline-block'; el.style.width='80px'; el.style.height='80px'; el.style.margin='6px'; el.style.borderRadius='6px'; el.style.background=c; el.title=c;
      node.appendChild(el);
    });
  });

  function generatePalette(hex){
    // very simple: base, complement, lighter, darker, accent
    const comp = complement(hex);
    return [hex, comp, lighten(hex,0.2), darken(hex,0.18), '#FF6B5F'];
  }
  function complement(h){ // naive
    const rgb = hexToRgb(h); return rgb ? rgbToHex(255-rgb.r,255-rgb.g,255-rgb.b) : h;
  }
  function lighten(h, amt){ const rgb=hexToRgb(h); return rgb ? rgbToHex(Math.min(255,Math.round(rgb.r+255*amt)),Math.min(255,Math.round(rgb.g+255*amt)),Math.min(255,Math.round(rgb.b+255*amt))) : h; }
  function darken(h, amt){ const rgb=hexToRgb(h); return rgb ? rgbToHex(Math.max(0,Math.round(rgb.r-255*amt)),Math.max(0,Math.round(rgb.g-255*amt)),Math.max(0,Math.round(rgb.b-255*amt))) : h; }
  function hexToRgb(hex){ if (!hex) return null; hex=hex.replace('#',''); if (hex.length===3) hex=hex.split('').map(c=>c+c).join(''); const bigint=parseInt(hex,16); return {r: (bigint>>16)&255, g:(bigint>>8)&255, b:bigint&255}; }
  function rgbToHex(r,g,b){ return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join(''); }

  // Fabric analyzer placeholder
  document.getElementById('analyzeFabric').addEventListener('click', ()=>{
    const warp = document.getElementById('warpYarn').value || '30';
    const weft = document.getElementById('weftYarn').value || '40';
    const epi = parseInt(document.getElementById('epi').value||0);
    const ppi = parseInt(document.getElementById('ppi').value||0);
    const cover = Math.round((epi/100)*(ppi/100)*1000)/10;
    const res = document.getElementById('fabricResult');
    res.textContent = 'Predicted cover factor: '+cover+'\nSuggested end-use: shirting / light upholstery\nDrape: medium\nEstimated GSM range: 120-180';
  });

  // AI Tutor placeholder (canned responses)
  document.getElementById('askAI').addEventListener('click', ()=>{
    const q = document.getElementById('aiQuestion').value.toLowerCase();
    const out = document.getElementById('aiAnswer');
    if (q.includes('gsm')) out.textContent = 'GSM means grams per square metre. Example: weight(grams)/area(m^2)';
    else if (q.includes('warp')) out.textContent = 'Warp are longitudinal yarns; weft are transverse.';
    else out.textContent = 'This is a starter answer. Connect your AI backend (OpenAI or local LLM) for advanced replies.';
  });

});
