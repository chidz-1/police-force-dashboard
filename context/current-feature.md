# Current Feature

Locations mini map

## Status

Completed

## Goals

- Show a small map tile with a location marker in the Lat,Lng column of the All locations table
- Clicking the tile opens a closable dialog with an interactive map
- Respect the light and dark themes and stay responsive

## Notes

- Design pattern: Façade (`getMapTile` hides the coordinate to tile maths)
- OpenStreetMap tiles load directly: this is a private portfolio site, so no tile proxy
- A public launch would need a hosted tile provider and a privacy notice
- Coordinates are parsed from the existing `coordinates` string, so the row payload doesn't grow
- Leaflet is lazy loaded so it adds nothing to the initial page load

## History

<!-- Keep this updated with feature file completed. Earliest to latest -->

- Data tables: reusable `DataTable` on all seven pages with sorting, search, pagination and a `setTableData()` builder step
- Locations mini map: OpenStreetMap tile thumbnails in the All locations table, with a lazy-loaded Leaflet map in a dialog
