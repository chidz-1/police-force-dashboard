import { TIME_PATTERNS_FILTER_ITEMS } from "@/constants";
import { YearMonth } from "@/types/crimes-street-dates";

export interface BaseTimePatternsPageSearchParams {
  date: YearMonth;
  type: (typeof TIME_PATTERNS_FILTER_ITEMS)["type"][number]["label"];
  object_of_search: (typeof TIME_PATTERNS_FILTER_ITEMS)["object_of_search"][number]["label"];
  outcome: (typeof TIME_PATTERNS_FILTER_ITEMS)["outcome"][number]["label"];
}

export type BaseTimePatternsPageSearchParamsSansDate = Omit<
  BaseTimePatternsPageSearchParams,
  "date"
>;

export type TimePatternsPageSearchParams = Promise<
  Partial<BaseTimePatternsPageSearchParams>
>;
