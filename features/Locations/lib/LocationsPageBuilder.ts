import { countBy, groupBy, omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import { getBreakdownSummary } from "@/utils/getBreakdownRows";
import { isArrest, isDrugSearch } from "@/utils/stopPredicates";
import getStreetName from "@/utils/getStreetName";
import { PageDataBuilder, PageDataProduct } from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseLocationsPageSearchParams,
  BaseLocationsPageSearchParamsSansDate,
} from "../types";
import {
  LocationsChartStopDataKey,
  LocationsStatsKey,
  LocationsTableRow,
} from "./types";

export default class LocationsPageBuilder implements PageDataBuilder<
  LocationsStatsKey,
  LocationsChartStopDataKey,
  LocationsTableRow
> {
  private _locationsPageData: PageDataProduct<
    LocationsStatsKey,
    LocationsChartStopDataKey,
    LocationsTableRow
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
    this._locationsPageData.chartData = this._stopData.map(({ location }) => ({
      location,
    }));
  }

  // Grouped by street id: one street name can cover several real locations
  setTableData(): void {
    const withLocation = this._stopData.filter(
      (stop) => stop.location !== null
    );
    const stopsByStreetId = groupBy(
      withLocation,
      (stop) => stop.location!.street.id
    );

    this._locationsPageData.tableData = Object.values(stopsByStreetId).map(
      (stops) => {
        const { street, latitude, longitude } = stops[0].location!;

        return {
          label: getStreetName(street.name),
          coordinates: `${Number(latitude).toFixed(4)}, ${Number(longitude).toFixed(4)}`,
          ...getBreakdownSummary(stops, withLocation.length, {
            arrestRate: isArrest,
            drugSearchRate: isDrugSearch,
          }),
        };
      }
    );
  }

  getProduct(): PageDataProduct<
    LocationsStatsKey,
    LocationsChartStopDataKey,
    LocationsTableRow
  > {
    return this._locationsPageData;
  }
}
