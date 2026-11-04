import { ChartCardProps } from "@/utils/decorateWithChartCard";

export interface CategoryBarChartItem {
  category: string;
  value: number;
}

// A function prop can't cross the server -> client boundary, so category
// formatting is selected by name (serializable) and resolved internally.
export type CategoryFormat = "hour";

export type CategoryBarChartProps = Omit<ChartCardProps, "chartAction"> & {
  data: CategoryBarChartItem[];
  sortable?: boolean;
  tickInterval?: number;
  categoryFormat?: CategoryFormat;
};
