import { Temporal } from "temporal-polyfill";
import { YearMonth } from "@/types/crimes-street-dates";
import { FilterItems } from "@/components/PageFilters/types";
import { ALL_MONTHS_FILTER_ITEM } from "@/constants";

export type MonthsFilter = 3 | 6 | 12;

// export default function monthRange(
//   availability: AvailabilityHash,
//   backDatedMonths: MonthsFilter
// ): YearMonth[] {
//   const months: YearMonth[] = [];
//   let currentMonth = Temporal.PlainYearMonth.from(
//     Object.values(availability)[0].date
//   );
//   const lastMonth = Temporal.PlainYearMonth.from(
//     currentMonth.subtract({ months: backDatedMonths - 1 })
//   );

//   while (Temporal.PlainYearMonth.compare(currentMonth, lastMonth) >= 0) {
//     months.push(currentMonth.toString());
//     currentMonth = currentMonth.subtract({ months: 1 });
//   }

//   return months;
// }

export default function getMonthFilterItems(months: YearMonth[]): FilterItems {
  return [
    ALL_MONTHS_FILTER_ITEM,
    ...months.map((month) => ({
      label: Temporal.PlainYearMonth.from(month)
        .toPlainDate({ day: 1 })
        .toLocaleString("en-GB", { month: "long", year: "numeric" }),
      value: month,
    })),
  ];
}
