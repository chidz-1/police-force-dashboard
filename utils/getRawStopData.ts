import { ALL_MONTHS_FILTER_ITEM } from "@/constants";
import {
  StopAndSearch,
  StopAndSearchDatesRecord,
} from "@/types/stop-and-search";

export default function getRawStopData(
  stopData: StopAndSearchDatesRecord,
  timeSpan: string
): StopAndSearch[][] {
  return timeSpan === ALL_MONTHS_FILTER_ITEM.value
    ? Object.values(stopData)
    : [stopData[timeSpan]];
  return [];
}
