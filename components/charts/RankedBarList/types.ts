import { ChartCardProps } from "@/utils/decorateWithChartCard";

export interface RankedBarListItem {
  label: string;
  value: number;
}

export type RankedBarListProps = Omit<ChartCardProps, "chartAction"> & {
  items: RankedBarListItem[];
};
