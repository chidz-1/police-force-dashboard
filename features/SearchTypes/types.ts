import { SEARCH_TYPES_FILTER_ITEMS } from "@/constants";
import { YearMonth } from "@/types/crimes-street-dates";

export interface BaseSearchTypesPageSearchParams {
  date: YearMonth;
  type: (typeof SEARCH_TYPES_FILTER_ITEMS)["type"][number]["label"];
  gender: (typeof SEARCH_TYPES_FILTER_ITEMS)["gender"][number]["label"];
  outcome: (typeof SEARCH_TYPES_FILTER_ITEMS)["outcome"][number]["label"];
}

export type BaseSearchTypesPageSearchParamsSansDate = Omit<
  BaseSearchTypesPageSearchParams,
  "date"
>;

export type SearchTypesPageSearchParams = Promise<
  Partial<BaseSearchTypesPageSearchParams>
>;
