# When the Rain Stops

Single-page data visualisation (Vega-Lite) on drought and wheat harvests in Australia's farming regions.

- `index.html` is the page; `css/` and `js/` hold styling and the loader.
- `specs/` holds one human-readable Vega-Lite JSON file per chart (01-10).
- `data/` holds the datasets the specs load (AADI + ABARES AAGIS, region boundaries as TopoJSON).

## Publish on GitHub Pages
1. Create a public repository and upload the contents of this folder (keep the folder structure).
2. Repository Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your page will be at `https://<username>.github.io/<repository>/`.

Charts load their JSON with `fetch`, so open the page through a web server (GitHub Pages, or `python3 -m http.server`), not by double-clicking `index.html`.

## Before submitting
- Replace `[YOUR NAME]` (two places in `index.html`).
- Acknowledge AI assistance in your Moodle submission.
