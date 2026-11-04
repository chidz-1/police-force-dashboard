import { StopAndSearch } from "@/types/stop-and-search";

interface StatValue {
  count: number;
  value: number | null;
  label?: string | null;
}

export type AggregatedStats<K extends string> = Record<K, StatValue>;
export type StopFields<K extends keyof StopAndSearch> = Pick<StopAndSearch, K>;

export type BreakdownSummary = {
  searches: number;
  share: number;
};

export type BreakdownRowWithRates<K extends string> = BreakdownSummary & {
  label: string;
} & Record<K, number>;

export interface PageDataProduct<
  TStatKey extends string,
  TStopKey extends keyof StopAndSearch,
  TTableRow,
> {
  totalNumRecords: number;
  stats?: AggregatedStats<TStatKey>;
  chartData?: StopFields<TStopKey>[];
  tableData?: TTableRow[];
}

export interface PageDataBuilder<
  TStatKey extends string,
  TStopKey extends keyof StopAndSearch,
  TTableRow,
> {
  setStats(): void;
  setChartData(): void;
  setTableData(): void;
  getProduct(): PageDataProduct<TStatKey, TStopKey, TTableRow>;
}
