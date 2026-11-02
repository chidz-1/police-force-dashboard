"use client";

import { OverviewChartsProps } from "./types";

export default function OverviewCharts({ filters }: OverviewChartsProps) {
  return (
    <>
      <h2>📊 Charts go here!</h2>
      <pre>{JSON.stringify({ filters }, null, 3)}</pre>
    </>
  );
}
