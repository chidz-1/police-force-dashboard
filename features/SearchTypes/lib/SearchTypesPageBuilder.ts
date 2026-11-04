import { omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import {
  AggregatedStats,
  PageDataBuilder,
  PageDataProduct,
} from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseSearchTypesPageSearchParams,
  BaseSearchTypesPageSearchParamsSansDate,
} from "../types";
import { SearchTypesChartStopDataKey, SearchTypesStatsKey } from "./types";

export default class SearchTypesPageBuilder implements PageDataBuilder<
  SearchTypesStatsKey,
  SearchTypesChartStopDataKey
> {
  private _searchTypesPageData: PageDataProduct<
    SearchTypesStatsKey,
    SearchTypesChartStopDataKey
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseSearchTypesPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All search types" ||
        filterValue === "All genders" ||
        filterValue === "All outcomes"
    ) as Partial<BaseSearchTypesPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ type, gender, outcome }) =>
        (!activeFilters.type || activeFilters.type === type) &&
        (!activeFilters.gender || activeFilters.gender === gender) &&
        (!activeFilters.outcome || activeFilters.outcome === outcome)
    );

    this._stopData = filteredStopData;

    this._searchTypesPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Person searches, Person & vehicle, Vehicle only, Part of an operation
  setStats(): void {
    const stopTotal = this._stopData.length;
    const statCardData = this._stopData.reduce(
      (accStats, currentStop) => {
        accStats.personOnly.count +=
          currentStop.type === "Person search" ? 1 : 0;
        accStats.personAndVehicle.count +=
          currentStop.type === "Person and Vehicle search" ? 1 : 0;
        accStats.vehicleOnly.count +=
          currentStop.type === "Vehicle search" ? 1 : 0;
        accStats.partOfOperation.count += currentStop.operation ? 1 : 0;
        return accStats;
      },
      {
        personOnly: { count: 0, value: null },
        personAndVehicle: { count: 0, value: null },
        vehicleOnly: { count: 0, value: null },
        partOfOperation: { count: 0, value: null },
      } as AggregatedStats<SearchTypesStatsKey>
    );

    statCardData.partOfOperation.value = getSafeRatio(
      statCardData.partOfOperation.count,
      stopTotal
    );

    this._searchTypesPageData.stats = statCardData;
  }

  setChartData(): void {
    this._searchTypesPageData.chartData = this._stopData.map(
      ({ datetime, type, removal_of_more_than_outer_clothing, operation }) => ({
        datetime,
        type,
        removal_of_more_than_outer_clothing,
        operation,
      })
    );
  }

  getProduct(): PageDataProduct<
    SearchTypesStatsKey,
    SearchTypesChartStopDataKey
  > {
    return this._searchTypesPageData;
  }
}
