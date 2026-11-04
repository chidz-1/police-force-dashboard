"use client";

import { Pie, PieChart, Cell } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import decorateWithChartCard from "@/utils/decorateWithChartCard";
import { formatNumber, formatPercentage } from "@/utils/formatNumber";
import { CHART_EMPHASIS_COLOR } from "@/constants";
import { MeterChartProps } from "./types";

function MeterChartBody({
  ratio,
  centerLabel,
  items,
}: Pick<MeterChartProps, "ratio" | "centerLabel" | "items">) {
  const data = items.map(({ label, value }) => ({ name: label, value }));
  const mutedColor = "var(--muted)";

  const config = items.reduce<ChartConfig>((acc, { label }, index) => {
    acc[label] = {
      label,
      color: index === 0 ? CHART_EMPHASIS_COLOR : mutedColor,
    };
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-36 w-full">
        <ChartContainer config={config} className="aspect-auto h-full w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="88%"
              startAngle={180}
              endAngle={0}
              innerRadius={64}
              outerRadius={88}
              strokeWidth={2}
              stroke="var(--card)"
            >
              <Cell fill={CHART_EMPHASIS_COLOR} />
              <Cell fill={mutedColor} />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-3xl font-bold text-foreground">
            {formatPercentage(ratio)}
          </span>
          {centerLabel && (
            <span className="text-xs text-muted-foreground">{centerLabel}</span>
          )}
        </div>
      </div>
      <ul className="flex items-center gap-4 text-sm">
        {items.map(({ label, value }, index) => (
          <li key={label} className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  index === 0 ? CHART_EMPHASIS_COLOR : mutedColor,
              }}
            />
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono text-foreground tabular-nums">
              {formatNumber(value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default decorateWithChartCard(MeterChartBody);
