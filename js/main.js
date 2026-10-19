
/* =====================================================================
   main.js: loads every chart and adds the season sliders.
   No chart logic lives here. Each chart is described by a Vega-Lite JSON file in /specs.
   ===================================================================== */

// List of [id of the <div> in index.html, path of the chart's JSON spec]. Add a chart by adding a line here.
const CHARTS = [
  ['c1', 'specs/01_heatmap.json'], ['c2', 'specs/02_choropleth.json'], ['c3', 'specs/03_connected_scatter.json'],
  ['c4', 'specs/04_slope.json'], ['c5', 'specs/05_bivariate_map.json'], ['c6', 'specs/06_symbol_map.json'],
  ['c7', 'specs/07_parallel.json'], ['c8', 'specs/08_ridgeline.json'], ['c9', 'specs/09_waffle.json'], ['c10', 'specs/10_horizon.json'], ['c11', 'specs/11_state_crops.json'], ['c12', 'specs/12_rain_grid_map.json']
];

// ---- Season sliders -------------------------------------------------------------
// Charts 2, 4, 5 and 7 each have a Vega-Lite parameter (a "signal") in their JSON spec, e.g. "yr".
// A slider here sets that parameter and the chart redraws. Region dropdowns and radio buttons
// (charts 1, 3 and 12) use Vega-Lite's own built-in bindings instead, defined inside the spec.
const range = (a, b) => Array.from({length: b - a + 1}, (_, i) => a + i);   // range(1991, 2023) = [1991, ..., 2023]
const seasonName = y => (y - 1) + '-' + String(y).slice(2);                  // 2003 -> '2002-03' (seasons run July to June)

// Which parameter each slider controls, which values it steps through, and how its label is written.
const SLIDERS = {
  c2: {signal: 'yr',  values: range(1991, 2023), label: 'Season (July-June)', fmt: seasonName},
  c4: {signal: 'pickseason', values: ['1994-95', '2002-03', '2006-07', '2018-19', '2019-20'], label: 'Dry season', fmt: s => s},
  c5: {signal: 'byr', values: range(1991, 2023), label: 'Season (July-June)', fmt: seasonName},
  c7: {signal: 'pyr', values: range(1991, 2023), label: 'Season (July-June)', fmt: seasonName}
};

// Builds one slider under a chart. el = the chart's <div>, view = the running Vega view, cfg = entry from SLIDERS.
function addSlider(el, view, cfg) {
  const box = document.createElement('label');
  box.className = 'season-slider';
  // Start the slider at the season the chart opens on (the parameter's default value in the spec)
  const start = Math.max(0, cfg.values.indexOf(view.signal(cfg.signal)));
  box.innerHTML = '<span class="ss-label">' + cfg.label + ': <output></output></span>' +
    '<input type="range" min="0" max="' + (cfg.values.length - 1) + '" step="1" value="' + start + '" aria-label="' + cfg.label + '">' +
    '<span class="ss-ends"><span>' + cfg.fmt(cfg.values[0]) + '</span><span>' + cfg.fmt(cfg.values[cfg.values.length - 1]) + '</span></span>';
  const input = box.querySelector('input'), out = box.querySelector('output');
  // When the slider moves: show the season name, set the Vega parameter, redraw the chart
  const update = () => { const v = cfg.values[+input.value]; out.textContent = cfg.fmt(v); view.signal(cfg.signal, v).run(); };
  input.addEventListener('input', update);
  out.textContent = cfg.fmt(cfg.values[start]);
  el.appendChild(box);
}

// ---- Load every chart -----------------------------------------------------------
// For each entry: fetch the JSON spec, draw it with vega-embed (SVG renderer, no export menu),
// then add a slider if the chart has one. If anything fails, show a short message instead of a blank box.
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
