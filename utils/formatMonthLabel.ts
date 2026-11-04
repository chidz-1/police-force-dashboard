import { Temporal } from "temporal-polyfill";

export default function formatMonthLabel(yearMonth: string): string {
  return Temporal.PlainYearMonth.from(yearMonth)
    .toPlainDate({ day: 1 })
    .toLocaleString("en-GB", { month: "short", year: "2-digit" });
}
