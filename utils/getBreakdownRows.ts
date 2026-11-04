import { groupBy, mapValues } from "lodash";

import { BreakdownRowWithRates, BreakdownSummary } from "@/lib/PageData/types";
import { StopAndSearch } from "@/types/stop-and-search";

type StopMatchers<K extends string> = Record<
  K,
  (stop: StopAndSearch) => boolean
>;

export function getBreakdownSummary<K extends string>(
  stops: StopAndSearch[],
  totalStops: number,
  matchers: StopMatchers<K>
): BreakdownSummary & Record<K, number> {
  const rates = mapValues(
    matchers,
    (match) => stops.filter(match).length / stops.length
  ) as Record<K, number>;

  return {
    searches: stops.length,
    share: stops.length / totalStops,
    ...rates,
  };
}

export default function getBreakdownRows<K extends string>(
  stops: StopAndSearch[],
  getLabel: (stop: StopAndSearch) => string,
  matchers: StopMatchers<K>
): BreakdownRowWithRates<K>[] {
  return Object.entries(groupBy(stops, getLabel)).map(([label, group]) => ({
    label,
    ...getBreakdownSummary(group, stops.length, matchers),
  }));
}
