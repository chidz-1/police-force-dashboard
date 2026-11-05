import { ListFilter } from "lucide-react";

import StatCardsContainer from "@/components/StatCardsContainer";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "cn";
import {
  CategoryChartSkeletonProps,
  ChartAction,
  ChartCardSkeletonProps,
  DataTableSkeletonProps,
  DonutChartSkeletonProps,
  PageFiltersSkeletonProps,
  RankedBarListSkeletonProps,
  SkeletonCardProps,
  StatCardsSkeletonProps,
  VisualizationsFallbackProps,
} from "./types";
import { DataTableColumnFormat } from "@/components/DataTable/types";

const BAR_HEIGHTS = ["55%", "80%", "70%", "90%", "60%", "75%", "85%", "65%"];
const RANKED_BAR_WIDTHS = ["100%", "62%", "48%", "36%", "28%", "20%", "14%"];
const SMALLEST_RANKED_BAR_WIDTH = "6%";
const TREND_BAR_COUNT = 12;

function getCycled(values: string[], index: number) {
  return values[index % values.length];
}

function isRightAligned(format: DataTableColumnFormat) {
  return format === "number" || format === "percentage";
}

function ActionSkeleton({ action }: { action: ChartAction }) {
  switch (action) {
    case "sort":
      return <Skeleton className="h-6 w-16" />;
    case "toggle":
      return <Skeleton className="h-6 w-40" />;
    case "search":
      return <Skeleton className="h-7 w-40 rounded-full sm:w-56" />;
    default:
      ((_: never) => {
        throw new Error(`[ActionSkeleton]: Unhandled case ${_}`);
      })(action);
  }
}

function ChartCardSkeleton({
  action,
  className = "h-full",
  children,
}: ChartCardSkeletonProps) {
  return (
    <Card className={cn("px-4", className)}>
      <CardHeader>
        <div className="flex min-w-0 items-center gap-2">
          <Skeleton className="size-7 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="my-1 h-3 w-full max-w-48" />
        <Skeleton className="my-1 h-3 w-full max-w-32 lg:hidden" />
        {action && (
          <CardAction>
            <ActionSkeleton action={action} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center">
        {children}
      </CardContent>
    </Card>
  );
}

export function VisualizationsFallback({
  label,
  children,
}: VisualizationsFallbackProps) {
  return (
    <div role="status" aria-busy="true" aria-label={`Loading ${label}`}>
      {children}
    </div>
  );
}

export function PageFiltersSkeleton({ widths }: PageFiltersSkeletonProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-4 md:flex-row">
      <ListFilter />
      <span>Filters</span>
      {widths.map((width, index) => (
        <Skeleton key={index} className={cn("h-7 rounded-full", width)} />
      ))}
      <span className="flex gap-2">
        <Skeleton className="h-6 w-10" />
        matching records
      </span>
    </div>
  );
}

export function StatCardsSkeleton({
  count,
  className,
}: StatCardsSkeletonProps) {
  return (
    <StatCardsContainer className={className}>
      {Array.from({ length: count }, (_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-5 w-24" />
            <CardAction>
              <Skeleton className="size-7 rounded-full" />
            </CardAction>
          </CardHeader>
          <CardContent className="mb-auto">
            <Skeleton className="h-12 w-32" />
          </CardContent>
          <CardFooter>
            <Skeleton className="mb-3 h-4 w-36" />
          </CardFooter>
        </Card>
      ))}
    </StatCardsContainer>
  );
}

export function TrendChartSkeleton({ className }: SkeletonCardProps) {
  return (
    <ChartCardSkeleton action="toggle" className={className}>
      <div className="flex h-64 flex-col gap-3">
        <div className="flex flex-1 items-end justify-around gap-2">
          {Array.from({ length: TREND_BAR_COUNT }, (_, index) => (
            <Skeleton
              key={index}
              className="w-full max-w-6"
              style={{ height: getCycled(BAR_HEIGHTS, index) }}
            />
          ))}
        </div>
        <Skeleton className="mx-auto h-4 w-64 max-w-full" />
      </div>
    </ChartCardSkeleton>
  );
}

export function CategoryChartSkeleton({
  bars,
  sortable,
  className,
}: CategoryChartSkeletonProps) {
  return (
    <ChartCardSkeleton
      action={sortable ? "sort" : undefined}
      className={className}
    >
      <div className="flex h-56 items-end justify-around gap-1 pb-6">
        {Array.from({ length: bars }, (_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-6"
            style={{ height: getCycled(BAR_HEIGHTS, index) }}
          />
        ))}
      </div>
    </ChartCardSkeleton>
  );
}

export function DonutChartSkeleton({
  slices,
  className,
}: DonutChartSkeletonProps) {
  return (
    <ChartCardSkeleton className={className}>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto flex aspect-square w-40 items-center justify-center md:w-48">
          <div className="size-4/5 animate-pulse rounded-full border-[18px] border-muted" />
        </div>
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: slices }, (_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </div>
      </div>
    </ChartCardSkeleton>
  );
}

export function MeterChartSkeleton({ className }: SkeletonCardProps) {
  return (
    <ChartCardSkeleton className={className}>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-36 w-full items-end justify-center overflow-hidden">
          <div className="h-22 w-44 overflow-hidden">
            <div className="size-44 animate-pulse rounded-full border-24 border-muted" />
          </div>
        </div>
        <Skeleton className="h-5 w-48 max-w-full" />
      </div>
    </ChartCardSkeleton>
  );
}

export function RankedBarListSkeleton({
  rows,
  className,
}: RankedBarListSkeletonProps) {
  return (
    <ChartCardSkeleton action="sort" className={className}>
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="h-4 w-28 shrink-0" />
            <div className="min-w-0 flex-1">
              <Skeleton
                className="h-5 rounded-full"
                style={{
                  width: RANKED_BAR_WIDTHS[index] ?? SMALLEST_RANKED_BAR_WIDTH,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCardSkeleton>
  );
}

function TableCellSkeleton({ format }: { format: DataTableColumnFormat }) {
  switch (format) {
    case "text":
      return <Skeleton className="h-4 w-36" />;
    case "number":
    case "percentage":
      return <Skeleton className="ml-auto h-4 w-12" />;
    case "share":
      return (
        <div className="flex items-center gap-2">
          <Skeleton className="h-1.5 w-16 rounded-full" />
          <Skeleton className="h-4 w-10" />
        </div>
      );
    case "map":
      return (
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 shrink-0 rounded-sm" />
          <Skeleton className="h-8 w-24" />
        </div>
      );
    default:
      ((_: never) => {
        throw new Error(`[TableCellSkeleton]: Unhandled case ${_}`);
      })(format);
  }
}

export function DataTableSkeleton({
  columns,
  rows,
  searchable,
}: DataTableSkeletonProps) {
  return (
    <ChartCardSkeleton
      action={searchable ? "search" : undefined}
      className="h-auto"
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                {columns.map(({ header, format }) => (
                  <TableHead
                    key={header}
                    className={cn(
                      "text-[0.625rem] font-semibold",
                      isRightAligned(format) && "text-right"
                    )}
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rows }, (_, index) => (
                <TableRow key={index}>
                  {columns.map(({ header, format }) => (
                    <TableCell key={header}>
                      <TableCellSkeleton format={format} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-6 w-44" />
        </div>
      </div>
    </ChartCardSkeleton>
  );
}
