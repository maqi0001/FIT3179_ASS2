# When the Rain Stops

Single-page data visualisation (Vega-Lite) on drought and wheat harvests in Australia's farming regions.

- `index.html` is the page; `css/` and `js/` hold styling and the loader.
- `specs/` holds one human-readable Vega-Lite JSON file per chart (01-10).
- `data/` holds the datasets the specs load (AADI + ABARES AAGIS, region boundaries as TopoJSON).
  
Charts load their JSON with `fetch`, so open the page through a web server (GitHub Pages, or `python3 -m http.server`), not by double-clicking `index.html`.
