
const CHARTS = [
  ['c1', 'specs/01_heatmap.json'], ['c2', 'specs/02_choropleth.json'], ['c3', 'specs/03_connected_scatter.json'],
  ['c4', 'specs/04_slope.json'], ['c5', 'specs/05_bivariate_map.json'], ['c6', 'specs/06_symbol_map.json'],
  ['c7', 'specs/07_parallel.json'], ['c8', 'specs/08_ridgeline.json'], ['c9', 'specs/09_waffle.json'], ['c10', 'specs/10_horizon.json'], ['c11', 'specs/11_state_crops.json'], ['c12', 'specs/12_tile_map.json']
];
CHARTS.forEach(async ([id, url]) => {
  const el = document.getElementById(id);
  try {
    const spec = await (await fetch(url)).json();
    await vegaEmbed(el, spec, { actions: false, renderer: 'svg' });
  } catch (e) {
    el.innerHTML = '<p class="note">This chart could not load (' + e.message + ').</p>';
    console.error(id, e);
  }
});
