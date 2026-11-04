import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type DemographicsStatsKey =
  "male" | "agedTenToSeventeen" | "largestGroup";

export type DemographicsChartStopDataKey =
  "datetime" | "gender" | "age_range" | "officer_defined_ethnicity";

export type DemographicsTableRow = BreakdownRowWithRates<
  "maleRate" | "agedTenToSeventeenRate" | "arrestRate" | "noFurtherActionRate"
>;
