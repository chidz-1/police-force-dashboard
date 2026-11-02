import { StopAndSearch } from "@/types/stop-and-search";

interface StatValue {
  value: number;
}

export type AggregatedStats<K extends string> = Record<K, StatValue>;
export type StopFields<K extends keyof StopAndSearch> = Pick<StopAndSearch, K>;

export interface PageDataProduct<
  TStatKey extends string,
  TStopKey extends keyof StopAndSearch,
> {
  totalNumRecords: number;
  stats?: AggregatedStats<TStatKey>;
  chartData?: StopFields<TStopKey>[];
}

export interface PageDataBuilder<
  TStatKey extends string,
  TStopKey extends keyof StopAndSearch,
> {
  setStats(): void;
  setChartData(): void;
  getProduct(): PageDataProduct<TStatKey, TStopKey>;
}
