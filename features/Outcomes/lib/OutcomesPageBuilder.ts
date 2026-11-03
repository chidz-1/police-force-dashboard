import { omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import {
  AggregatedStats,
  PageDataBuilder,
  PageDataProduct,
} from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseOutcomesPageSearchParams,
  BaseOutcomesPageSearchParamsSansDate,
} from "../types";
import { OutcomesChartStopDataKey, OutcomesStatsKey } from "./types";

export default class OutcomesPageBuilder implements PageDataBuilder<
  OutcomesStatsKey,
  OutcomesChartStopDataKey
> {
  private _outcomesPageData: PageDataProduct<
    OutcomesStatsKey,
    OutcomesChartStopDataKey
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseOutcomesPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All outcomes" ||
        filterValue === "All objects of search" ||
        filterValue === "All ethnicities"
    ) as Partial<BaseOutcomesPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ outcome, object_of_search, officer_defined_ethnicity }) =>
        (!activeFilters.outcome || activeFilters.outcome === outcome) &&
        (!activeFilters.object_of_search ||
          activeFilters.object_of_search === object_of_search) &&
        (!activeFilters.officer_defined_ethnicity ||
          activeFilters.officer_defined_ethnicity === officer_defined_ethnicity)
    );

    this._stopData = filteredStopData;

    this._outcomesPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Arrests, Arrest rate, Community resolution, No further action
  setStats(): void {
    const stopTotal = this._stopData.length;
    const statCardData = this._stopData.reduce(
      (accStats, currentStop) => {
        accStats.arrests.count += currentStop.outcome === "Arrest" ? 1 : 0;
        accStats.communityResolution.count +=
          currentStop.outcome === "Community resolution" ? 1 : 0;
        accStats.noFurtherAction.count +=
          currentStop.outcome === "A no further action disposal" ? 1 : 0;
        return accStats;
      },
      {
        arrests: { count: 0, value: null },
        communityResolution: { count: 0, value: null },
        noFurtherAction: { count: 0, value: null },
      } as AggregatedStats<OutcomesStatsKey>
    );

    statCardData.arrests.value = getSafeRatio(
      statCardData.arrests.count,
      stopTotal
    );
    statCardData.communityResolution.value = getSafeRatio(
      statCardData.communityResolution.count,
      stopTotal
    );
    statCardData.noFurtherAction.value = getSafeRatio(
      statCardData.noFurtherAction.count,
      stopTotal
    );

    this._outcomesPageData.stats = statCardData;
  }

  setChartData(): void {
    // TODO: implement chart data aggregation
    this._outcomesPageData.chartData = [];
  }

  getProduct(): PageDataProduct<OutcomesStatsKey, OutcomesChartStopDataKey> {
    return this._outcomesPageData;
  }
}
