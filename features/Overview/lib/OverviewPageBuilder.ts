import {
  AggregatedStats,
  PageDataBuilder,
  PageDataProduct,
} from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import { omitBy } from "lodash";
import {
  BaseOverviewPageSearchParams,
  BaseOverviewPageSearchParamsSansDate,
} from "../types";
import { OverviewChartStopDataKey, OverviewStatsKey } from "./types";

export default class OverviewPageBuilder implements PageDataBuilder<
  OverviewStatsKey,
  OverviewChartStopDataKey
> {
  private _overviewPageData: PageDataProduct<
    OverviewStatsKey,
    OverviewChartStopDataKey
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseOverviewPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All ethnicities" || filterValue === "All search types"
    ) as Partial<BaseOverviewPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ officer_defined_ethnicity, type }) =>
        (!activeFilters.officer_defined_ethnicity ||
          activeFilters.officer_defined_ethnicity ===
            officer_defined_ethnicity) &&
        (!activeFilters.type || activeFilters.type === type)
    );

    this._stopData = filteredStopData;

    this._overviewPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Total searches, arrest rate, no further action, find rate
  setStats(): void {
    const stopTotal = this._stopData.length;
    const statCardData = this._stopData.reduce(
      (accStats, currentStop) => {
        accStats.arrests.value += currentStop.outcome === "Arrest" ? 1 : 0;
        accStats.action.value +=
          currentStop.outcome === "A no further action disposal" ? 1 : 0;
        accStats.found.value += currentStop.outcome_linked_to_object_of_search
          ? 1
          : 0;
        return accStats;
      },
      {
        searches: { value: stopTotal },
        arrests: { value: 0 },
        action: { value: 0 },
        found: { value: 0 },
      } as AggregatedStats<OverviewStatsKey>
    );

    statCardData.arrests.value = statCardData.arrests.value / stopTotal;
    statCardData.action.value = statCardData.action.value / stopTotal;
    statCardData.action.value = statCardData.found.value / stopTotal;

    this._overviewPageData.stats = statCardData;
  }

  setChartData(): void {
    this._overviewPageData.chartData = this._stopData.map(
      ({
        datetime,
        type,
        outcome_linked_to_object_of_search,
        object_of_search,
        outcome,
        legislation,
      }) => ({
        datetime,
        type,
        outcome_linked_to_object_of_search,
        object_of_search,
        outcome,
        legislation,
      })
    );
  }

  getProduct(): PageDataProduct<OverviewStatsKey, OverviewChartStopDataKey> {
    return this._overviewPageData;
  }
}
