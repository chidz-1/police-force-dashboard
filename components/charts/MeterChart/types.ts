import { ChartCardProps } from "@/utils/decorateWithChartCard";

export interface MeterChartItem {
  label: string;
  value: number;
}

export type MeterChartProps = ChartCardProps & {
  ratio: number;
  centerLabel?: string;
  items: [MeterChartItem, MeterChartItem];
};
