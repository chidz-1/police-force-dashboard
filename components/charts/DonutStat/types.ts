import { ChartCardProps } from "@/utils/decorateWithChartCard";

export interface DonutStatSlice {
  label: string;
  value: number;
}

export type DonutStatProps = ChartCardProps & {
  data: DonutStatSlice[];
  centerLabel?: string;
};
