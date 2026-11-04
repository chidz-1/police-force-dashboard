import { DataTableColumn } from "@/components/DataTable/types";
import { TABLE_SEARCHES_COLUMN, TABLE_SHARE_COLUMN } from "@/constants";
import { OutcomesTableRow } from "../lib/types";

export const OUTCOME_TREND_SERIES = [
  { key: "arrest", label: "Arrest" },
  { key: "noFurtherAction", label: "No further action" },
  { key: "otherAction", label: "Other action" },
] as const;

export const OUTCOMES_TABLE_COLUMNS = [
  { key: "label", header: "Outcome", format: "text" },
  TABLE_SEARCHES_COLUMN,
  TABLE_SHARE_COLUMN,
  {
    key: "linkedToObjectRate",
    header: "Linked to object",
    format: "percentage",
  },
  { key: "drugSearchRate", header: "Drug searches", format: "percentage" },
] as const satisfies readonly DataTableColumn<OutcomesTableRow>[];
