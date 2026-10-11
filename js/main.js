
const CHARTS = [
  ['c1', 'specs/01_heatmap.json'], ['c2', 'specs/02_choropleth.json'], ['c3', 'specs/03_connected_scatter.json'],
  ['c4', 'specs/04_slope.json'], ['c5', 'specs/05_bivariate_map.json'], ['c6', 'specs/06_symbol_map.json'],
  ['c7', 'specs/07_parallel.json'], ['c8', 'specs/08_ridgeline.json'], ['c9', 'specs/09_waffle.json'], ['c10', 'specs/10_horizon.json'], ['c11', 'specs/11_state_crops.json'], ['c12', 'specs/12_rain_grid_map.json']
];
// Season sliders: each drives a Vega-Lite parameter (signal) defined in the chart's JSON spec.
const range = (a, b) => Array.from({length: b - a + 1}, (_, i) => a + i);
const seasonName = y => (y - 1) + '-' + String(y).slice(2);
const SLIDERS = {
  c2: {signal: 'yr',  values: range(1991, 2023), label: 'Season (July-June)', fmt: seasonName},
  c4: {signal: 'pickseason', values: ['1994-95', '2002-03', '2006-07', '2018-19', '2019-20'], label: 'Dry season', fmt: s => s},
  c5: {signal: 'byr', values: range(1991, 2023), label: 'Season (July-June)', fmt: seasonName},
  c7: {signal: 'pyr', values: range(1991, 2023), label: 'Season (July-June)', fmt: seasonName}
};
function addSlider(el, view, cfg) {
  const box = document.createElement('label');
  box.className = 'season-slider';
  const start = Math.max(0, cfg.values.indexOf(view.signal(cfg.signal)));
  box.innerHTML = '<span class="ss-label">' + cfg.label + ': <output></output></span>' +
    '<input type="range" min="0" max="' + (cfg.values.length - 1) + '" step="1" value="' + start + '" aria-label="' + cfg.label + '">' +
    '<span class="ss-ends"><span>' + cfg.fmt(cfg.values[0]) + '</span><span>' + cfg.fmt(cfg.values[cfg.values.length - 1]) + '</span></span>';
  const input = box.querySelector('input'), out = box.querySelector('output');
  const update = () => { const v = cfg.values[+input.value]; out.textContent = cfg.fmt(v); view.signal(cfg.signal, v).run(); };
  input.addEventListener('input', update);
  out.textContent = cfg.fmt(cfg.values[start]);
  el.appendChild(box);
}
CHARTS.forEach(async ([id, url]) => {
  const el = document.getElementById(id);
  try {
    const spec = await (await fetch(url)).json();
    const res = await vegaEmbed(el, spec, { actions: false, renderer: 'svg' });
    if (SLIDERS[id]) addSlider(el, res.view, SLIDERS[id]);
  } catch (e) {
    el.innerHTML = '<p class="note">This chart could not load (' + e.message + ').</p>';
    console.error(id, e);
  }
});
