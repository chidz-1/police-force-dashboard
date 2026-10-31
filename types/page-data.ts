export interface AggregatedStat {
  value: number;
  secondaryValue?: number;
}

type RadialChartPortion = Record<string, number>;
type PieChartSlice = Record<string, number>;
type BarChartLine = Record<string, string | number>;

export interface ChartTypeConfig {
  radialCharts?: Record<string, RadialChartPortion[]>;
  pieCharts?: Record<string, PieChartSlice[]>;
  barCharts?: Record<string, BarChartLine[]>;
}

export type PageData = {
  totalNumRecords: number;
  aggregatedStats: AggregatedStat[];
} & ChartTypeConfig;
