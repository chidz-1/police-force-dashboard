"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Bar, BarChart, Rectangle, XAxis } from "recharts";
import type { BarShapeProps, LabelProps } from "recharts";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import decorateWithChartCard from "@/utils/decorateWithChartCard";
import { formatNumber } from "@/utils/formatNumber";
import formatHour from "@/utils/formatHour";
import { CHART_EMPHASIS_COLOR, CHART_MUTED_COLOR } from "@/constants";
import { CategoryBarChartItem, CategoryBarChartProps } from "./types";

const chartConfig = {
  value: { label: "Searches" },
} satisfies ChartConfig;

const CATEGORY_FORMATTERS: Record<
  NonNullable<CategoryBarChartProps["categoryFormat"]>,
  (category: string) => string
> = {
  hour: formatHour,
};

function CategoryBarChartBody({
  data,
  tickInterval = 0,
  categoryFormat,
}: Pick<CategoryBarChartProps, "data" | "tickInterval" | "categoryFormat">) {
  const formatCategory = categoryFormat
    ? CATEGORY_FORMATTERS[categoryFormat]
    : undefined;
  const maxIndex = data.reduce(
    (maxIdx, item, idx, arr) => (item.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );

  function renderMaxValueLabel(props: LabelProps) {
    const { x, y, width, value, index } = props;
    if (
      index !== maxIndex ||
      typeof x !== "number" ||
      typeof width !== "number"
    ) {
      return <></>;
    }

    return (
      <text
        x={x + width / 2}
        y={Number(y) - 6}
        textAnchor="middle"
        className="fill-foreground text-xs font-medium"
      >
        {formatNumber(Number(value))}
      </text>
    );
  }

  function renderBarShape(props: BarShapeProps) {
    const { index } = props;
    return (
      <Rectangle
        {...props}
        fill={index === maxIndex ? CHART_EMPHASIS_COLOR : CHART_MUTED_COLOR}
      />
    );
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
      <BarChart data={data} margin={{ top: 20 }}>
        <XAxis
          dataKey="category"
          tickLine={false}
          axisLine={false}
          interval={tickInterval}
          tickFormatter={formatCategory}
          tick={{ fontSize: 10 }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(label) =>
                formatCategory ? formatCategory(String(label)) : label
              }
            />
          }
        />
        <Bar
          dataKey="value"
          radius={4}
          label={renderMaxValueLabel}
          shape={renderBarShape}
          activeBar={{ fillOpacity: 0.85 }}
          animationDuration={500}
          animationEasing="ease-out"
        />
      </BarChart>
    </ChartContainer>
  );
}

const DecoratedCategoryBarChart = decorateWithChartCard(CategoryBarChartBody);

export default function CategoryBarChart({
  data,
  sortable = false,
  ...chartCardProps
}: CategoryBarChartProps) {
  const [sortedByValue, setSortedByValue] = useState(false);

  const displayData = useMemo<CategoryBarChartItem[]>(() => {
    if (!sortedByValue) {
      return data;
    }
    return [...data].sort((a, b) => b.value - a.value);
  }, [data, sortedByValue]);

  return (
    <DecoratedCategoryBarChart
      {...chartCardProps}
      data={displayData}
      chartAction={
        sortable ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortedByValue((sorted) => !sorted)}
          >
            <ArrowUpDown />
            Sort
          </Button>
        ) : undefined
      }
    />
  );
}
