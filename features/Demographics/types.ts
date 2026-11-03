import { DEMOGRAPHICS_FILTER_ITEMS } from "@/constants";
import { YearMonth } from "@/types/crimes-street-dates";

export interface BaseDemographicsPageSearchParams {
  date: YearMonth;
  gender: (typeof DEMOGRAPHICS_FILTER_ITEMS)["gender"][number]["label"];
  age_range: (typeof DEMOGRAPHICS_FILTER_ITEMS)["age_range"][number]["label"];
  officer_defined_ethnicity: (typeof DEMOGRAPHICS_FILTER_ITEMS)["officer_defined_ethnicity"][number]["label"];
}

export type BaseDemographicsPageSearchParamsSansDate = Omit<
  BaseDemographicsPageSearchParams,
  "date"
>;

export type DemographicsPageSearchParams = Promise<
  Partial<BaseDemographicsPageSearchParams>
>;
