"use client";

import { OverviewChartsProps } from "./types";

export default function OverviewCharts({
  filters,
  stopData,
}: OverviewChartsProps) {
  return (
    <>
      <h2>📊 Charts go here!</h2>
      <pre>{JSON.stringify({ filters, stopData }, null, 3)}</pre>
    </>
  );
}
