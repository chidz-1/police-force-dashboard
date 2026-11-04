import { DataTableColumn } from "@/components/DataTable/types";
import {
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
} from "@/constants";
import { OverviewTableRow } from "../lib/types";

export const OVERVIEW_TABLE_COLUMNS = [
  { key: "label", header: "Legislation", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
] as const satisfies readonly DataTableColumn<OverviewTableRow>[];
