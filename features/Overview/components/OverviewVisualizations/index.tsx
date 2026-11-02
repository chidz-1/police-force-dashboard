import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { OverviewVisualizationsProps } from "./types";
import { OVERVIEW_FILTER_ITEMS } from "@/constants";
import OverviewCharts from "../OverviewCharts";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";

async function OverviewVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: OverviewVisualizationsProps) {
  const allMonthsValue = monthFilterMenuItems[0].value;
  const allSearchTypesValue = OVERVIEW_FILTER_ITEMS.types[0].value;
  const allEthnicitiesValue = OVERVIEW_FILTER_ITEMS.ethnicities[0].value;

  const {
    date = allMonthsValue,
    type = allSearchTypesValue,
    ethnicity = allEthnicitiesValue,
  } = await searchParams;

  // TODO: Massage data for visualizations (+ reduce RSC weight)
  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  return (
    <>
      <PageFiltersContainer>
        <PageFilters
          value={date === allMonthsValue ? allMonthsValue : date}
          menuItems={monthFilterMenuItems}
          urlParamKey="date"
        />
        <PageFilters
          width="w-43"
          value={type === allSearchTypesValue ? allSearchTypesValue : type}
          menuItems={OVERVIEW_FILTER_ITEMS.types}
          urlParamKey="type"
        />
        <PageFilters
          width="w-30"
          value={
            ethnicity === allEthnicitiesValue ? allEthnicitiesValue : ethnicity
          }
          menuItems={OVERVIEW_FILTER_ITEMS.ethnicities}
          urlParamKey="ethnicity"
        />
      </PageFiltersContainer>
      <OverviewCharts
        filters={{ date, ethnicity, type }}
        rawStopData={rawStopData}
      />
    </>
  );
}

export default decorateWithSuspense(OverviewVisualizations);
