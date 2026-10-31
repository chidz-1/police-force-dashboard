import { Temporal } from "temporal-polyfill";
import { AvailabilityHash, YearMonth } from "@/types/crimes-street-dates";

export type MonthsFilter = 3 | 6 | 12;

export default function monthRange(
  availability: AvailabilityHash,
  backDatedMonths: MonthsFilter
): YearMonth[] {
  const months: YearMonth[] = [];
  let currentMonth = Temporal.PlainYearMonth.from(
    Object.values(availability)[0].date
  );
  const lastMonth = Temporal.PlainYearMonth.from(
    currentMonth.subtract({ months: backDatedMonths - 1 })
  );

  while (Temporal.PlainYearMonth.compare(currentMonth, lastMonth) >= 0) {
    months.push(currentMonth.toString());
    currentMonth = currentMonth.subtract({ months: 1 });
  }

  return months;
}
