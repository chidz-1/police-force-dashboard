"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import decorateWithChartCard from "@/utils/decorateWithChartCard";
import { formatNumber } from "@/utils/formatNumber";
import { CHART_EMPHASIS_COLOR, CHART_MUTED_COLOR } from "@/constants";
import { RankedBarListProps } from "./types";

type SortOrder = "desc" | "asc";

function RankedBarListBody({ items }: Pick<RankedBarListProps, "items">) {
  const maxValue = Math.max(...items.map(({ value }) => value), 1);

  return (
    <ul className="flex flex-col gap-3">
      {items.map(({ label, value }, index) => (
        <li key={label} className="flex items-center gap-3">
          <span
            className="w-28 shrink-0 truncate text-right text-muted-foreground"
            title={label}
          >
            {label}
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className="h-3 shrink-0 rounded-full"
              style={{
                width: `${(value / maxValue) * 100}%`,
                backgroundColor:
                  index === 0 ? CHART_EMPHASIS_COLOR : CHART_MUTED_COLOR,
              }}
            />
            <span className="shrink-0 font-mono text-foreground tabular-nums">
              {formatNumber(value)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

const DecoratedRankedBarList = decorateWithChartCard(RankedBarListBody);

export default function RankedBarList({
  items,
  ...chartCardProps
}: RankedBarListProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.value - b.value);
    return sortOrder === "desc" ? sorted.reverse() : sorted;
  }, [items, sortOrder]);

  return (
    <DecoratedRankedBarList
      {...chartCardProps}
      items={sortedItems}
      chartAction={
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setSortOrder((order) => (order === "desc" ? "asc" : "desc"))
          }
        >
          <ArrowUpDown />
          Sort
        </Button>
      }
    />
  );
}
