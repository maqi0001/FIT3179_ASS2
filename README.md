# When the Rain Stops

A single-page data visualisation (Vega-Lite) on drought and crop yields in Australia, 1990-91 to 2022-23.
Author: Muhammad Aqila. FIT3179 Data Visualisation 2, Semester 2 2026. Topic: Climate and Agriculture.

## Where to find things

| I want to see... | Open this |
|---|---|
| The page text and layout | `index.html` (comments mark each of the 12 steps) |
| Fonts, colours, grid layout | `css/style.css` (numbered comment sections) |
| How charts are loaded, the season sliders | `js/main.js` |
| One chart's code | `specs/NN_name.json` (the `description` field at the top says what the chart is and how it is built) |
| The data behind a chart | `data/` (table below) |

## Chart guide

| # | Chart idiom | Spec | Data file(s) | Source |
|---|---|---|---|---|
| 1 | Heatmap (small multiples by zone) | `01_heatmap.json` | `regions.json` | AADI |
| 2 | Choropleth map + slider | `02_choropleth.json` | `aagis_regions.topojson`, `wide.json` | AADI |
| 3 | Connected scatterplot | `03_connected_scatter.json` | `regions.json` | SILO + ABARES survey |
| 4 | Slope chart + slider | `04_slope.json` | `slope.json` | ABARES survey |
| 5 | Bivariate choropleth + slider | `05_bivariate_map.json` | `aagis_regions.topojson`, `wide.json` | AADI + ABARES survey |
| 6 | Proportional symbol map | `06_symbol_map.json` | `aagis_regions.topojson`, `summary.json` | ABARES survey + AADI |
| 7 | Parallel coordinates + slider | `07_parallel.json` | `parallel.json` | AADI |
| 8 | Ridgeline (density) | `08_ridgeline.json` | `ridge.json` | ABARES survey + AADI |
| 9 | Waffle chart | `09_waffle.json` | `waffle.json` | ABARES survey + AADI |
| 10 | Horizon chart | `10_horizon.json` | `horizon.json` | ABARES survey |
| 11 | Heatmap of crops by state | `11_state_crops.json` | `state_crops.json` | ABARES Crop Report |
| 12 | Gridded rainfall map (4 panels) | `12_rain_grid_map.json` | `rain_grid.json`, `aagis_regions.topojson` | SILO |

Maps: 2 (choropleth), 5 (bivariate choropleth), 6 (proportional symbols), 12 (gridded). All use the same
conic equal-area projection centred on Australia.

## Data sources

1. **AADI regional dataset** (Hughes 2024, doi:10.17632/8yhcr28wbk.1; ABARES + CSIRO): rainfall, pasture, farm profit and observed ABARES farm-survey wheat yield for 31 farming regions.
2. **ABARES Australian Crop Report, September 2026**, state crop data (doi:10.25814/5s62-8a44).
3. **SILO gridded monthly rainfall** (Queensland Government, CC BY 4.0, longpaddock.qld.gov.au/silo).
4. **ABARES AAGIS region boundaries**, converted from shapefile to TopoJSON for the web.

## How the data files were made (summary)

- `regions.json`, `wide.json`, `slope.json` and the other chart tables come straight from the AADI table. I added three fields: wheat harvest as % of the region's middle (median) harvest, a rainfall class (driest / middle / wettest third of seasons) and a harvest rank within the region.
- `rain_mm` in `regions.json`: SILO monthly rain averaged over each region's boundary, summed over April to October of the calendar year before the season's end year (checked against AADI: correlation 0.95).
- `state_crops.json`: yield = production / area for each state, crop and season, as % of the state's middle yield for that crop.
- `rain_grid.json`: SILO April-October rain averaged into 0.5 degree squares, as % of the 1991-2022 average, for 2002-03, 2010-11, 2018-19 and 2022-23.
- Season labels: seasons run July to June and are named by their start year, so the AADI row for year 2003 is the season "2002-03".

## Running it

Charts load their JSON with `fetch`, so use a web server (GitHub Pages, or `python3 -m http.server` in this folder), not a double-click on `index.html`.

## Acknowledgement of AI use

Claude (Anthropic) was used to help plan the data, write code and text, and check the work.
