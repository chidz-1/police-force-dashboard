"use client";

import useStopData from "@/features/Providers/hooks/useStopData";
import { OverviewChartsProps } from "./types";

export default function OverviewCharts({ filters }: OverviewChartsProps) {
  const stopData = useStopData();

  return (
    <>
      <h2>📊 Charts go here!</h2>
      <pre>{JSON.stringify({ filters, stopData }, null, 3)}</pre>
    </>
  );
}
