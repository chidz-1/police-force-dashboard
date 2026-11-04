import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type OverviewStatsKey = "searches" | "arrests" | "action" | "found";
export type OverviewChartStopDataKey =
  | "datetime"
  | "type"
  | "outcome_linked_to_object_of_search"
  | "object_of_search"
  | "outcome"
  | "legislation";

export type OverviewTableRow = BreakdownRowWithRates<"arrestRate">;
