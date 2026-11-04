import { omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import {
  AggregatedStats,
  PageDataBuilder,
  PageDataProduct,
} from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseLegislationPageSearchParams,
  BaseLegislationPageSearchParamsSansDate,
} from "../types";
import { LegislationChartStopDataKey, LegislationStatsKey } from "./types";

export default class LegislationPageBuilder implements PageDataBuilder<
  LegislationStatsKey,
  LegislationChartStopDataKey
> {
  private _legislationPageData: PageDataProduct<
    LegislationStatsKey,
    LegislationChartStopDataKey
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseLegislationPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All legislation" ||
        filterValue === "All objects of search" ||
        filterValue === "All search types"
    ) as Partial<BaseLegislationPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ legislation, object_of_search, type }) =>
        (!activeFilters.legislation ||
          activeFilters.legislation === legislation) &&
        (!activeFilters.object_of_search ||
          activeFilters.object_of_search === object_of_search) &&
        (!activeFilters.type || activeFilters.type === type)
    );

    this._stopData = filteredStopData;

    this._legislationPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Misuse of Drugs Act, PACE section 1, Section 60
  setStats(): void {
    const stopTotal = this._stopData.length;
    const statCardData = this._stopData.reduce(
      (accStats, currentStop) => {
        accStats.misuseOfDrugsAct.count +=
          currentStop.legislation === "Misuse of Drugs Act 1971 (section 23)"
            ? 1
            : 0;
        accStats.paceSection1.count +=
          currentStop.legislation ===
          "Police and Criminal Evidence Act 1984 (section 1)"
            ? 1
            : 0;
        accStats.section60.count +=
          currentStop.legislation ===
          "Criminal Justice and Public Order Act 1994 (section 60)"
            ? 1
            : 0;
        return accStats;
      },
      {
        misuseOfDrugsAct: { count: 0, value: null },
        paceSection1: { count: 0, value: null },
        section60: { count: 0, value: null },
      } as AggregatedStats<LegislationStatsKey>
    );

    statCardData.misuseOfDrugsAct.value = getSafeRatio(
      statCardData.misuseOfDrugsAct.count,
      stopTotal
    );
    statCardData.paceSection1.value = getSafeRatio(
      statCardData.paceSection1.count,
      stopTotal
    );
    statCardData.section60.value = getSafeRatio(
      statCardData.section60.count,
      stopTotal
    );

    this._legislationPageData.stats = statCardData;
  }

  setChartData(): void {
    this._legislationPageData.chartData = this._stopData.map(
      ({ datetime, legislation, object_of_search }) => ({
        datetime,
        legislation,
        object_of_search,
      })
    );
  }

  getProduct(): PageDataProduct<
    LegislationStatsKey,
    LegislationChartStopDataKey
  > {
    return this._legislationPageData;
  }
}
