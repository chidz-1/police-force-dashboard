import { countBy, omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import getStreetName from "@/utils/getStreetName";
import { PageDataBuilder, PageDataProduct } from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseLocationsPageSearchParams,
  BaseLocationsPageSearchParamsSansDate,
} from "../types";
import { LocationsChartStopDataKey, LocationsStatsKey } from "./types";

export default class LocationsPageBuilder implements PageDataBuilder<
  LocationsStatsKey,
  LocationsChartStopDataKey
> {
  private _locationsPageData: PageDataProduct<
    LocationsStatsKey,
    LocationsChartStopDataKey
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseLocationsPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All search types" ||
        filterValue === "All objects of search" ||
        filterValue === "All outcomes"
    ) as Partial<BaseLocationsPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ type, object_of_search, outcome }) =>
        (!activeFilters.type || activeFilters.type === type) &&
        (!activeFilters.object_of_search ||
          activeFilters.object_of_search === object_of_search) &&
        (!activeFilters.outcome || activeFilters.outcome === outcome)
    );

    this._stopData = filteredStopData;

    this._locationsPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Location recorded, Busiest street, No location
  setStats(): void {
    const stopTotal = this._stopData.length;
    const withLocation = this._stopData.filter(
      (stop) => stop.location !== null
    );
    const noLocationCount = stopTotal - withLocation.length;

    // Frequency counter
    const streetCounts = countBy(withLocation, (stop) =>
      getStreetName(stop.location!.street.name)
    );

    const [busiestStreet, busiestStreetCount] = Object.entries(
      streetCounts
    ).reduce(
      (largest, current) => (current[1] > largest[1] ? current : largest),
      ["", 0] as [string, number]
    );

    this._locationsPageData.stats = {
      locationRecorded: {
        count: withLocation.length,
        value: getSafeRatio(withLocation.length, stopTotal),
      },
      busiestStreet: {
        count: busiestStreetCount,
        value: null,
        label: withLocation.length ? busiestStreet : null,
      },
      noLocation: {
        count: noLocationCount,
        value: null,
      },
    };
  }

  setChartData(): void {
    // TODO: implement chart data aggregation
    this._locationsPageData.chartData = [];
  }

  getProduct(): PageDataProduct<LocationsStatsKey, LocationsChartStopDataKey> {
    return this._locationsPageData;
  }
}
