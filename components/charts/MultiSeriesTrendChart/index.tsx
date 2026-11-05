"use client";

import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, XAxis } from "recharts";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import decorateWithChartCard from "@/utils/decorateWithChartCard";
import { CHART_SERIES_COLORS } from "@/constants";
import { MultiSeriesTrendChartProps, TrendMode } from "./types";

const TREND_MODE_OPTIONS: { value: TrendMode; label: string }[] = [
  { value: "stacked", label: "Stacked" },
  { value: "grouped", label: "Grouped" },
  { value: "trend", label: "Trend" },
];

function MultiSeriesTrendChartBody({
  data,
  series,
  xKey = "period",
  mode,
}: Pick<MultiSeriesTrendChartProps, "data" | "series" | "xKey"> & {
  mode: TrendMode;
}) {
  const config = series.reduce<ChartConfig>((acc, { key, label }, index) => {
    acc[key] = {
      label,
      color: CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length],
    };
    return acc;
  }, {});

  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      {mode === "trend" ? (
        <AreaChart data={data} margin={{ top: 8 }}>
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10 }}
            minTickGap={16}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {series.map(({ key }) => (
            <Area
              key={key}
              dataKey={key}
              type="monotone"
              stroke={`var(--color-${key})`}
              fill={`var(--color-${key})`}
              fillOpacity={0.15}
              strokeWidth={2}
              activeDot={{ r: 4 }}
              animationDuration={500}
              animationEasing="ease-out"
            />
          ))}
        </AreaChart>
      ) : (
        <BarChart data={data} margin={{ top: 8 }}>
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10 }}
            minTickGap={16}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {series.map(({ key }) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              radius={4}
              maxBarSize={24}
              activeBar={{ fillOpacity: 0.85 }}
              animationDuration={500}
              animationEasing="ease-out"
              {...(mode === "stacked" ? { stackId: "trend" } : {})}
            />
          ))}
        </BarChart>
      )}
    </ChartContainer>
  );
}

const DecoratedMultiSeriesTrendChart = decorateWithChartCard(
  MultiSeriesTrendChartBody
);

export default function MultiSeriesTrendChart({
  defaultMode = "stacked",
  ...chartCardProps
}: MultiSeriesTrendChartProps) {
  const [mode, setMode] = useState<TrendMode>(defaultMode);

  return (
    <DecoratedMultiSeriesTrendChart
      {...chartCardProps}
      mode={mode}
      chartAction={
        <ToggleGroup
          variant="outline"
          size="sm"
          value={[mode]}
          onValueChange={(value) => {
            if (value[0]) {
              setMode(value[0] as TrendMode);
            }
          }}
        >
          {TREND_MODE_OPTIONS.map(({ value, label }) => (
            <ToggleGroupItem key={value} value={value}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      }
    />
  );
}
