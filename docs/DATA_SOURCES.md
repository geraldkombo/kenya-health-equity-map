# Data sources

## Demo data (included in repository)

| File | Description | License |
|---|---|---|
| `data/boundaries/nairobi_wards.geojson` | 10 synthetic ward polygons with properties | CC-BY-4.0 |
| `data/facilities/facilities.geojson` | 33 health facility points (synthetic) | ODbL |
| `data/indicators/ward_indicators.csv` | 10 ward-level indicator records (synthetic) | CC-BY-4.0 |
| `data/snapshots/wards.json` | Ward metadata snapshot | CC-BY-4.0 |
| `data/snapshots/facilities.json` | Facility snapshot | ODbL |

## Switching to real data

### Wards
Replace `data/boundaries/nairobi_wards.geojson` with real ward polygons from:
- [IEBC](https://www.iebc.or.ke/) (Independent Electoral and Boundaries Commission)
- [Open Admin Data](https://openadmindata.org/api/ke) (centroids only)
- [Humanitarian Data Exchange (HDX)](https://data.humdata.org/)

### Facilities
Replace `data/facilities/facilities.geojson` with:
- [Kenya Master Facility List (MFL)](http://kmfl.health.go.ke/)
- [OpenStreetMap](https://overpass-api.de/) health facility queries

### Indicators
Replace `data/indicators/ward_indicators.csv` with:
- [Kenya National Bureau of Statistics (KNBS)](https://www.knbs.or.ke/) census data
- [Kenya Health Information System (KHIS)](https://hiskenya.org/)
- [WorldPop](https://www.worldpop.org/) population estimates
- [WHO Global Health Observatory](https://www.who.int/data/gho)

## API endpoints (when deployed)

| Endpoint | Description |
|---|---|
| `/api/health` | Health check and build info |
| `/api/wards` | Ward data (from Open Admin Data or snapshot) |
| `/api/facilities` | Facility data (from OSM or snapshot) |
| `/api/proxy?url=...` | Generic proxy for upstream APIs |
