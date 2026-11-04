import { ChartCardProps } from "@/utils/decorateWithChartCard";

export type DataTableRow = Record<string, string | number>;

export type DataTableColumnFormat =
  "text" | "number" | "percentage" | "share" | "map";

export interface DataTableColumn<TRow extends DataTableRow = DataTableRow> {
  key: keyof TRow & string;
  header: string;
  format: DataTableColumnFormat;
}

export interface DataTableSort<TRow extends DataTableRow = DataTableRow> {
  key: keyof TRow & string;
  desc: boolean;
}

export type DataTableProps<TRow extends DataTableRow> = Omit<
  ChartCardProps,
  "chartAction"
> & {
  data: TRow[];
  columns: readonly DataTableColumn<TRow>[];
  searchable?: boolean;
  defaultPageSize?: number;
  defaultSort?: DataTableSort<TRow>;
};
