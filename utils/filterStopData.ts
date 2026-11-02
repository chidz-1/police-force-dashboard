import { PageFilters } from "@/types/page-data";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import { filter } from "lodash";

export default function filterStopData<T extends PageFilters>(
  stopData: RawStopAndSearchData,
  filters: T
): RawStopAndSearchData {
  return filter(stopData, filters);

  return stopData;
}
