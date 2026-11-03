import { countBy, omitBy } from "lodash";

import getSafeRatio from "@/utils/getSafeRatio";
import { PageDataBuilder, PageDataProduct } from "@/lib/PageData/types";
import { RawStopAndSearchData } from "@/types/stop-and-search";
import {
  BaseDemographicsPageSearchParams,
  BaseDemographicsPageSearchParamsSansDate,
} from "../types";
import { DemographicsChartStopDataKey, DemographicsStatsKey } from "./types";

export default class DemographicsPageBuilder implements PageDataBuilder<
  DemographicsStatsKey,
  DemographicsChartStopDataKey
> {
  private _demographicsPageData: PageDataProduct<
    DemographicsStatsKey,
    DemographicsChartStopDataKey
  >;
  private _stopData: RawStopAndSearchData;

  constructor(
    rawStopData: RawStopAndSearchData,
    filters: Omit<BaseDemographicsPageSearchParams, "date">
  ) {
    let filteredStopData = rawStopData;

    const activeFilters = omitBy(
      filters,
      (filterValue) =>
        filterValue === "All genders" ||
        filterValue === "All ages" ||
        filterValue === "All ethnicities"
    ) as Partial<BaseDemographicsPageSearchParamsSansDate>;

    filteredStopData = rawStopData.filter(
      ({ gender, age_range, officer_defined_ethnicity }) =>
        (!activeFilters.gender || activeFilters.gender === gender) &&
        (!activeFilters.age_range || activeFilters.age_range === age_range) &&
        (!activeFilters.officer_defined_ethnicity ||
          activeFilters.officer_defined_ethnicity === officer_defined_ethnicity)
    );

    this._stopData = filteredStopData;

    this._demographicsPageData = {
      totalNumRecords: this._stopData.length,
    };
  }

  // Male, Aged 10-17, Largest group
  setStats(): void {
    const withGender = this._stopData.filter((stop) => stop.gender !== null);
    const withAgeRange = this._stopData.filter(
      (stop) => stop.age_range !== null
    );
    const withEthnicity = this._stopData.filter(
      (stop) => stop.officer_defined_ethnicity !== null
    );

    const maleCount = withGender.filter(
      (stop) => stop.gender === "Male"
    ).length;
    const agedTenToSeventeenCount = withAgeRange.filter(
      (stop) => stop.age_range === "10-17"
    ).length;

    const ethnicityCounts = countBy(withEthnicity, "officer_defined_ethnicity");
    const [largestEthnicity, largestEthnicityCount] = Object.entries(
      ethnicityCounts
    ).reduce(
      (largest, current) => (current[1] > largest[1] ? current : largest),
      ["", 0] as [string, number]
    );

    this._demographicsPageData.stats = {
      male: {
        count: maleCount,
        value: getSafeRatio(maleCount, withGender.length),
      },
      agedTenToSeventeen: {
        count: agedTenToSeventeenCount,
        value: getSafeRatio(agedTenToSeventeenCount, withAgeRange.length),
      },
      largestGroup: {
        count: largestEthnicityCount,
        value: getSafeRatio(largestEthnicityCount, withEthnicity.length),
        label: withEthnicity.length ? largestEthnicity : null,
      },
    };
  }

  setChartData(): void {
    // TODO: implement chart data aggregation
    this._demographicsPageData.chartData = [];
  }

  getProduct(): PageDataProduct<
    DemographicsStatsKey,
    DemographicsChartStopDataKey
  > {
    return this._demographicsPageData;
  }
}
