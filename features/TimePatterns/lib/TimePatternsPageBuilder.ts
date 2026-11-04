import { countBy, omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import getBreakdownRows from "@/utils/getBreakdownRows";
import { isArrest } from "@/utils/stopPredicates";
import isNightTime from "../utils/isNightTime";
import formatHour from "@/utils/formatHour";
import { PageDataBuilder, PageDataProduct } from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import { DAY_LABELS } from "@/constants";
import {
  BaseTimePatternsPageSearchParams,
  BaseTimePatternsPageSearchParamsSansDate,
} from "../types";
import {
  TimePatternsChartStopDataKey,
  TimePatternsStatsKey,
  TimePatternsTableRow,
} from "./types";

export default class TimePatternsPageBuilder implements PageDataBuilder<
  TimePatternsStatsKey,
  TimePatternsChartStopDataKey,
  TimePatternsTableRow
> {
  private _timePatternsPageData: PageDataProduct<
    TimePatternsStatsKey,
    TimePatternsChartStopDataKey,
    TimePatternsTableRow
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseTimePatternsPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All search types" ||
        filterValue === "All objects of search" ||
        filterValue === "All outcomes"
    ) as Partial<BaseTimePatternsPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ type, object_of_search, outcome }) =>
        (!activeFilters.type || activeFilters.type === type) &&
        (!activeFilters.object_of_search ||
          activeFilters.object_of_search === object_of_search) &&
        (!activeFilters.outcome || activeFilters.outcome === outcome)
    );

    this._stopData = filteredStopData;

    this._timePatternsPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Peak hour, Busiest day, Night-time, Weekend
  setStats(): void {
    const stopTotal = this._stopData.length;

    const hourCounts = countBy(this._stopData, (stop) =>
      new Date(stop.datetime).getHours()
    );
    const dayCounts = countBy(
      this._stopData,
      (stop) => DAY_LABELS[new Date(stop.datetime).getDay()]
    );

    const [peakHour, peakHourCount] = Object.entries(hourCounts).reduce(
      (largest, current) => (current[1] > largest[1] ? current : largest),
      ["", 0] as [string, number]
    );
    const [busiestDay, busiestDayCount] = Object.entries(dayCounts).reduce(
      (largest, current) => (current[1] > largest[1] ? current : largest),
      ["", 0] as [string, number]
    );

    const nightTimeCount = this._stopData.filter(({ datetime }) =>
      isNightTime(datetime)
    ).length;

    const weekendCount = this._stopData.filter((stop) => {
      const day = new Date(stop.datetime).getDay();
      return day === 0 || day === 6;
    }).length;

    this._timePatternsPageData.stats = {
      peakHour: {
        count: peakHourCount,
        value: getSafeRatio(peakHourCount, stopTotal),
        label: stopTotal ? formatHour(peakHour) : null,
      },
      busiestDay: {
        count: busiestDayCount,
        value: getSafeRatio(busiestDayCount, stopTotal),
        label: stopTotal ? busiestDay : null,
      },
      nightTime: {
        count: nightTimeCount,
        value: getSafeRatio(nightTimeCount, stopTotal),
      },
      weekend: {
        count: weekendCount,
        value: getSafeRatio(weekendCount, stopTotal),
      },
    };
  }

  setChartData(): void {
    this._timePatternsPageData.chartData = this._stopData.map(
      ({ datetime }) => ({ datetime })
    );
  }

  setTableData(): void {
    this._timePatternsPageData.tableData = getBreakdownRows(
      this._stopData,
      ({ datetime }) => DAY_LABELS[new Date(datetime).getDay()],
      {
        nightTimeRate: ({ datetime }) => isNightTime(datetime),
        arrestRate: isArrest,
      }
    );
  }

  getProduct(): PageDataProduct<
    TimePatternsStatsKey,
    TimePatternsChartStopDataKey,
    TimePatternsTableRow
  > {
    return this._timePatternsPageData;
  }
}
