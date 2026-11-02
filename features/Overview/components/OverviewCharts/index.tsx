"use client";

import { OverviewChartsProps } from "./types";

export default function OverviewCharts({
  filters,
  rawStopData,
}: OverviewChartsProps) {
  return (
    <>
      <h2>📊 Charts go here!</h2>
      <pre>
        {JSON.stringify(
          { filters, rowCount: rawStopData.length, rawStopData },
          null,
          3
        )}
      </pre>
    </>
  );
}
