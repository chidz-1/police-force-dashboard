import { flatten } from "lodash";

import { ALL_MONTHS_FILTER_ITEM } from "@/constants";
import {
  RawStopAndSearchData,
  StopAndSearchDatesRecord,
} from "@/types/stop-and-search";

export default function getRawStopData(
  stopData: StopAndSearchDatesRecord,
  timeSpan: string
): RawStopAndSearchData {
  return timeSpan === ALL_MONTHS_FILTER_ITEM.value
    ? flatten(Object.values(stopData))
    : stopData[timeSpan];
}
