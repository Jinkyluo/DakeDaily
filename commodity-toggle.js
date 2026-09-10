(() => {
  const card = document.querySelector('.commodities');
  if (!card) return;
  const rows = [...card.querySelectorAll('.commodity-grid > article')];
  const domestic = window.dailyDomesticMetals || [['沪金主连','—','元/克'],['沪银主连','—','元/千克']];
  const source = window.dailyDomesticSource || '';
  const originals = rows.slice(0, 2).map(row => row.innerHTML);
  const style = document.createElement('style');
  style.textContent = `.commodities{position:relative}.metal-switch{display:flex;gap:3px;position:absolute;right:25px;top:22px;padding:4px;background:#dfe6da;border-radius:24px}.metal-switch button{border:0;border-radius:20px;padding:8px 15px;background:transparent;color:#43534b;font-size:12px;min-height:36px}.metal-switch button[aria-pressed=true]{background:#ceff63;color:#14212a}.commodities>.eyebrow{padding-right:165px}.commodity-grid article{display:grid;grid-template-columns:minmax(0,1fr) minmax(80px,112px);gap:12px;align-items:center}.commodity-grid article>span,.commodity-grid article>strong,.commodity-grid article>small{grid-column:1/-1}.metal-chart-empty{font-size:11px;color:#69766e;text-align:center}.commodity-copy strong{overflow-wrap:anywhere}.metal-source{font-size:11px}.commodity-grid svg[hidden]{display:none}@media(max-width:520px){.metal-switch{right:20px;top:20px}.commodities>.eyebrow{padding-right:0;padding-top:48px}.commodity-grid{grid-template-columns:1fr}}`;
  document.head.append(style);
  const controls = document.createElement('div');
  controls.className = 'metal-switch';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '金银报价市场');
  controls.innerHTML = '<button type="button" aria-pressed="true" data-market="global">国际</button><button type="button" aria-pressed="false" data-market="domestic">国内</button>';
  card.prepend(controls);
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const local = button.dataset.market === 'domestic';
    controls.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    rows.slice(0, 2).forEach((row, i) => {
      if (!local) { row.innerHTML = originals[i]; return; }
      const [label, value, timing] = domestic[i];
      row.innerHTML = `<div class="commodity-copy"><span>${label}</span><strong>${value}</strong><small>${timing}</small><small>主力合约报价${source ? ` · <a class="metal-source" href="${source}" target="_blank" rel="noopener">来源 ↗</a>` : ''}</small></div><div class="metal-chart-empty">历史走势暂无</div>`;
    });
  });
})();
