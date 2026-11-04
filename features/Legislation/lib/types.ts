import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type LegislationStatsKey =
  "misuseOfDrugsAct" | "paceSection1" | "section60";

export type LegislationChartStopDataKey =
  "datetime" | "legislation" | "object_of_search";

export type LegislationTableRow = BreakdownRowWithRates<
  "findRate" | "arrestRate"
>;
