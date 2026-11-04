import { DataTableColumn } from "@/components/DataTable/types";
import {
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
} from "@/constants";
import { SearchTypesTableRow } from "../lib/types";

export const SEARCH_TYPES_TABLE_COLUMNS = [
  { key: "label", header: "Search type", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
  { key: "operationRate", header: "Operation", format: "percentage" },
  {
    key: "clothingRemovedRate",
    header: "Clothing removed",
    format: "percentage",
  },
] as const satisfies readonly DataTableColumn<SearchTypesTableRow>[];
