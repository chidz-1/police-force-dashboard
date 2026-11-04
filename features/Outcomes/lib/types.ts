import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type OutcomesStatsKey =
  "arrests" | "communityResolution" | "noFurtherAction";

export type OutcomesChartStopDataKey = "datetime" | "outcome";

export type OutcomesTableRow = BreakdownRowWithRates<
  "linkedToObjectRate" | "drugSearchRate"
>;
