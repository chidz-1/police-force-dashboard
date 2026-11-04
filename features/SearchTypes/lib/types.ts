import { BreakdownRowWithRates } from "@/lib/PageData/types";

export type SearchTypesStatsKey =
  "personOnly" | "personAndVehicle" | "vehicleOnly" | "partOfOperation";

export type SearchTypesChartStopDataKey =
  "datetime" | "type" | "removal_of_more_than_outer_clothing" | "operation";

export type SearchTypesTableRow = BreakdownRowWithRates<
  "arrestRate" | "operationRate" | "clothingRemovedRate"
>;
