import { OUTCOMES_FILTER_ITEMS } from "@/constants";
import { YearMonth } from "@/types/crimes-street-dates";

export interface BaseOutcomesPageSearchParams {
  date: YearMonth;
  outcome: (typeof OUTCOMES_FILTER_ITEMS)["outcome"][number]["label"];
  object_of_search: (typeof OUTCOMES_FILTER_ITEMS)["object_of_search"][number]["label"];
  officer_defined_ethnicity: (typeof OUTCOMES_FILTER_ITEMS)["officer_defined_ethnicity"][number]["label"];
}

export type BaseOutcomesPageSearchParamsSansDate = Omit<
  BaseOutcomesPageSearchParams,
  "date"
>;

export type OutcomesPageSearchParams = Promise<
  Partial<BaseOutcomesPageSearchParams>
>;
