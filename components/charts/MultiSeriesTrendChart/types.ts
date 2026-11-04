import { ChartCardProps } from "@/utils/decorateWithChartCard";

export interface TrendSeriesConfig {
  key: string;
  label: string;
}

export type TrendMode = "stacked" | "grouped" | "trend";

export type MultiSeriesTrendChartProps = Omit<ChartCardProps, "chartAction"> & {
  data: Record<string, string | number>[];
  series: readonly TrendSeriesConfig[];
  xKey?: string;
  defaultMode?: TrendMode;
};
