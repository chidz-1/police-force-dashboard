import { DataTableColumn } from "@/components/DataTable/types";
import {
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
} from "@/constants";
import { LocationsTableRow } from "../lib/types";

export const LOCATIONS_TABLE_COLUMNS = [
  { key: "label", header: "Street", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  TABLE_ARREST_RATE_COLUMN,
  { key: "drugSearchRate", header: "Drug searches", format: "percentage" },
  { key: "coordinates", header: "Coordinates", format: "map" },
] as const satisfies readonly DataTableColumn<LocationsTableRow>[];
