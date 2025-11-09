async function init(){
  const res = await fetch('data/casinos.json');
  const casinos = await res.json();
  const list = document.getElementById('casinoList');
  const empty = document.getElementById('empty');
  const filters = document.querySelectorAll('.filters button');

  let activeGeo = 'ALL';
  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeGeo = btn.getAttribute('data-geo');
      render();
    });
  });

  function render(){
    list.innerHTML='';
    const filtered = casinos.filter(c=> activeGeo==='ALL' || c.geo.includes(activeGeo));
    if(filtered.length===0){
      empty.style.display='block';
    } else {
      empty.style.display='none';
      filtered.forEach(c=>{
        const el = document.createElement('div');
        el.className='card';
        el.innerHTML = `
          <h3>${c.name} <span style="float:right;color:#9ca3af;font-size:13px">⭐ ${c.rating}</span></h3>
          <div class="meta">${c.license} · ${c.bonus} · Wager ${c.wager}</div>
          <p style="color:#cbd5e1">${c.rationale}</p>
          <div style="margin-top:12px">
            <a class="btn" href="${c.aff_link || '#'}" target="_blank" rel="noopener">Visit</a>
            <a style="margin-left:8px;color:var(--muted);font-size:13px" href="#" onclick="alert('Terms: '+(c.wager||''));return false">Bonus terms</a>
          </div>
        `;
        list.appendChild(el);
      });
    }
  }

  render();
}
init();
