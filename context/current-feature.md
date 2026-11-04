# Current Feature

Data tables on every visualization page

## Status

In Progress

## Goals

- Add a table as the last child of each `*Visualizations` component, using @context/screenshots/tables/ (filename = page)
- Reusable component in @components/, decorated with `decorateWithChartCard`
- Responsive, with sorting, search filtering and pagination
- No-results state per @context/screenshots/tables/no-data-example.png
- Shadcn/ui table + @tanstack/react-table
- New `setTableData()` build step on every page builder

## Notes

- Design pattern: Builder (`setTableData()`) and Decorator (`decorateWithChartCard`)
- Column config is serializable (format names, not cell functions) so it can cross the server -> client boundary
- Locations rows group by `street.id`: 10 street names in Aug 2026 cover several real locations, so a per-name row has no single Lat,Lng
- Mini map on the Lat,Lng column: feasibility only, not implemented
- Verified in headless Chromium against a production build: sorting, search, no results, pagination, page size, 375px, 768px, dark mode

## History

<!-- Keep this updated with feature file completed. Earliest to latest -->
