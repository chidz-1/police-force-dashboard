"use client";

import { Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import decorateWithChartCard from "@/utils/decorateWithChartCard";
import { formatNumber, formatPercentage } from "@/utils/formatNumber";
import { CHART_CATEGORICAL_COLORS } from "@/constants";
import { DonutStatProps } from "./types";

function DonutStatBody({
  data,
  centerLabel,
}: Pick<DonutStatProps, "data" | "centerLabel">) {
  const total = data.reduce((sum, { value }) => sum + value, 0);

  const config = data.reduce<ChartConfig>((acc, { label }, index) => {
    acc[label] = {
      label,
      color: CHART_CATEGORICAL_COLORS[index % CHART_CATEGORICAL_COLORS.length],
    };
    return acc;
  }, {});

  function renderSliceShape(props: PieSectorShapeProps) {
    const { index } = props;
    return (
      <Sector
        {...props}
        fill={CHART_CATEGORICAL_COLORS[index % CHART_CATEGORICAL_COLORS.length]}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative mx-auto aspect-square w-40 md:w-48">
        <ChartContainer config={config} className="h-full w-full">
          <PieChart>
            <ChartTooltip
              wrapperStyle={{ zIndex: 50 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="60%"
              outerRadius="80%"
              strokeWidth={2}
              stroke="var(--card)"
              shape={renderSliceShape}
              animationDuration={500}
              animationEasing="ease-out"
            />
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {formatNumber(total)}
          </span>
          {centerLabel && (
            <span className="text-xs text-muted-foreground">{centerLabel}</span>
          )}
        </div>
      </div>
      <ul className="flex w-full flex-col gap-2">
        {data.map(({ label, value }, index) => (
          <li key={label} className="flex items-center gap-2 text-sm">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  CHART_CATEGORICAL_COLORS[
                    index % CHART_CATEGORICAL_COLORS.length
                  ],
              }}
            />
            <span className="flex-1 truncate text-muted-foreground">
              {label}
            </span>
            <span className="shrink-0 font-mono text-foreground tabular-nums">
              {formatNumber(value)}
            </span>
            <span className="w-12 shrink-0 text-right font-mono text-muted-foreground tabular-nums">
              {total ? formatPercentage(value / total) : "—"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default decorateWithChartCard(DonutStatBody);
