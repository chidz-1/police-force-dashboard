import { DataTableColumn } from "@/components/DataTable/types";
import {
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
} from "@/constants";
import { TimePatternsTableRow } from "../lib/types";

export const DAY_NIGHT_SERIES = [
  { key: "day", label: "Day (06-22)" },
  { key: "night", label: "Night (22-06)" },
] as const;

export const TIME_PATTERNS_TABLE_COLUMNS = [
  { key: "label", header: "Day", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  { key: "nightTimeRate", header: "Night-time", format: "percentage" },
  TABLE_ARREST_RATE_COLUMN,
] as const satisfies readonly DataTableColumn<TimePatternsTableRow>[];
