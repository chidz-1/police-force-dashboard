import { OVERVIEW_FILTER_ITEMS } from "@/constants";
export interface BaseOverviewPageSearchParams {
  date: string;
  type: (typeof OVERVIEW_FILTER_ITEMS)["type"][number]["label"];
  officer_defined_ethnicity: (typeof OVERVIEW_FILTER_ITEMS)["officer_defined_ethnicity"][number]["label"];
}

export type BaseOverviewPageSearchParamsSansDate = Omit<
  BaseOverviewPageSearchParams,
  "date"
>;

export type OverviewPageSearchParams = Promise<
  Partial<BaseOverviewPageSearchParams>
>;
