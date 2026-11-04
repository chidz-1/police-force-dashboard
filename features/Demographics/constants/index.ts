import { DataTableColumn } from "@/components/DataTable/types";
import { TABLE_SEARCHES_COLUMN, TABLE_SHARE_COLUMN } from "@/constants";
import { DemographicsTableRow } from "../lib/types";

export const TOP_ETHNICITY_SERIES_COUNT = 5;

export const DEMOGRAPHICS_TABLE_COLUMNS = [
  { key: "label", header: "Ethnicity", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  { key: "maleRate", header: "Male", format: "percentage" },
  { key: "agedTenToSeventeenRate", header: "Aged 10–17", format: "percentage" },
  { key: "arrestRate", header: "Arrest", format: "percentage" },
  { key: "noFurtherActionRate", header: "NFA", format: "percentage" },
] as const satisfies readonly DataTableColumn<DemographicsTableRow>[];
