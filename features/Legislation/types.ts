import { LEGISLATION_PAGE_FILTER_ITEMS } from "@/constants";
import { YearMonth } from "@/types/crimes-street-dates";

export interface BaseLegislationPageSearchParams {
  date: YearMonth;
  legislation: (typeof LEGISLATION_PAGE_FILTER_ITEMS)["legislation"][number]["label"];
  object_of_search: (typeof LEGISLATION_PAGE_FILTER_ITEMS)["object_of_search"][number]["label"];
  type: (typeof LEGISLATION_PAGE_FILTER_ITEMS)["type"][number]["label"];
}

export type BaseLegislationPageSearchParamsSansDate = Omit<
  BaseLegislationPageSearchParams,
  "date"
>;

export type LegislationPageSearchParams = Promise<
  Partial<BaseLegislationPageSearchParams>
>;
