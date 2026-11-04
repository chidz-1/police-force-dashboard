import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type TimePatternsStatsKey =
  "peakHour" | "busiestDay" | "nightTime" | "weekend";

export type TimePatternsChartStopDataKey = "datetime";

export type TimePatternsTableRow = BreakdownRowWithRates<
  "nightTimeRate" | "arrestRate"
>;
