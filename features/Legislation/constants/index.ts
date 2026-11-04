import { DataTableColumn } from "@/components/DataTable/types";
import {
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
} from "@/constants";
import { LegislationTableRow } from "../lib/types";

export const TOP_LEGISLATION_SERIES_COUNT = 5;

export const LEGISLATION_TABLE_COLUMNS = [
  { key: "label", header: "Object of search", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  { key: "findRate", header: "Find rate", format: "percentage" },
  TABLE_ARREST_RATE_COLUMN,
] as const satisfies readonly DataTableColumn<LegislationTableRow>[];
