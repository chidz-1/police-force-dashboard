import { DataTableColumnFormat } from "@/components/DataTable/types";

export type ChartAction = "sort" | "toggle" | "search";

export interface VisualizationsFallbackProps {
  label: string;
  children: React.ReactNode;
}

export interface PageFiltersSkeletonProps {
  widths: readonly string[];
}

export interface StatCardsSkeletonProps {
  count: number;
  className?: string;
}

export interface ChartCardSkeletonProps {
  action?: ChartAction;
  className?: string;
  children: React.ReactNode;
}

export interface SkeletonCardProps {
  className?: string;
}

export interface DonutChartSkeletonProps extends SkeletonCardProps {
  slices: number;
}

export interface RankedBarListSkeletonProps extends SkeletonCardProps {
  rows: number;
}

export interface CategoryChartSkeletonProps extends SkeletonCardProps {
  bars: number;
  sortable?: boolean;
}

export interface DataTableSkeletonProps {
  columns: readonly { header: string; format: DataTableColumnFormat }[];
  rows: number;
  searchable?: boolean;
}
