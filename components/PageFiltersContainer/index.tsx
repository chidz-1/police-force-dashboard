"use client";

import { ListFilter, Loader2 } from "lucide-react";

import { PageFiltersContainerProps } from "./types";
import { useFilterChange } from "@/features/Providers/hooks/useFilterChange";

export default function PageFiltersContainer({
  children,
  numOfResults,
}: PageFiltersContainerProps) {
  const { isPending } = useFilterChange();

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 md:flex-row">
      <ListFilter />
      <span>Filters</span>
      {children}
      <span className="flex gap-2">
        <span className="font-bold">{numOfResults}</span>
        matching records
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            <span className="sr-only">Loading...</span>
          </>
        ) : null}
      </span>
    </div>
  );
}
