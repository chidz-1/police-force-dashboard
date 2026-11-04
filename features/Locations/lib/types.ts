import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type LocationsStatsKey =
  "locationRecorded" | "busiestStreet" | "noLocation";

export type LocationsChartStopDataKey = "location";

export type LocationsTableRow = BreakdownRowWithRates<
  "arrestRate" | "drugSearchRate"
> & {
  coordinates: string;
};
