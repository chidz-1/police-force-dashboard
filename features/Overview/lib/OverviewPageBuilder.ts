import { omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import getBreakdownRows from "@/utils/getBreakdownRows";
import { isArrest } from "@/utils/stopPredicates";
import { NOT_RECORDED_LABEL } from "@/constants";
import {
  AggregatedStats,
  PageDataBuilder,
  PageDataProduct,
} from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseOverviewPageSearchParams,
  BaseOverviewPageSearchParamsSansDate,
} from "../types";
import {
  OverviewChartStopDataKey,
  OverviewStatsKey,
  OverviewTableRow,
} from "./types";

export default class OverviewPageBuilder implements PageDataBuilder<
  OverviewStatsKey,
  OverviewChartStopDataKey,
  OverviewTableRow
> {
  private _overviewPageData: PageDataProduct<
    OverviewStatsKey,
    OverviewChartStopDataKey,
    OverviewTableRow
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
        accStats.arrests.count += currentStop.outcome === "Arrest" ? 1 : 0;
        accStats.action.count +=
          currentStop.outcome === "A no further action disposal" ? 1 : 0;
        accStats.found.count += currentStop.outcome_linked_to_object_of_search
          ? 1
          : 0;
        return accStats;
      },
      {
        searches: { count: stopTotal, value: null },
        arrests: { count: 0, value: null },
        action: { count: 0, value: null },
        found: { count: 0, value: null },
      } as AggregatedStats<OverviewStatsKey>
    );

    statCardData.arrests.value = getSafeRatio(
      statCardData.arrests.count,
      stopTotal
    );
    statCardData.action.value = getSafeRatio(
      statCardData.action.count,
      stopTotal
    );
    statCardData.found.value = getSafeRatio(
      statCardData.found.count,
      stopTotal
    );

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

  setTableData(): void {
    this._overviewPageData.tableData = getBreakdownRows(
      this._stopData,
      ({ legislation }) => legislation ?? NOT_RECORDED_LABEL,
      { arrestRate: isArrest }
    );
  }

  getProduct(): PageDataProduct<
    OverviewStatsKey,
    OverviewChartStopDataKey,
    OverviewTableRow
  > {
    return this._overviewPageData;
  }
}
