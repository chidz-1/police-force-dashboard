import { Temporal } from "temporal-polyfill";
import { YearMonth } from "@/types/crimes-street-dates";
import { FilterItems } from "@/components/PageFilters/types";
import { ALL_MONTHS_FILTER_ITEM } from "@/constants";

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
