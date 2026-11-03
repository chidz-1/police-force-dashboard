import { LOCATIONS_FILTER_ITEMS } from "@/constants";
import { YearMonth } from "@/types/crimes-street-dates";

export interface BaseLocationsPageSearchParams {
  date: YearMonth;
  type: (typeof LOCATIONS_FILTER_ITEMS)["type"][number]["label"];
  object_of_search: (typeof LOCATIONS_FILTER_ITEMS)["object_of_search"][number]["label"];
  outcome: (typeof LOCATIONS_FILTER_ITEMS)["outcome"][number]["label"];
}

export type BaseLocationsPageSearchParamsSansDate = Omit<
  BaseLocationsPageSearchParams,
  "date"
>;

export type LocationsPageSearchParams = Promise<
  Partial<BaseLocationsPageSearchParams>
>;
