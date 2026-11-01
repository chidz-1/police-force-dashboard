import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { OverviewVisualizationsProps } from "./types";
import { OVERVIEW_FILTER_ITEMS } from "@/constants";

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

  if (!monthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
  }

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
      <pre>
        {JSON.stringify(
          {
            date,
            ethnicity,
            type,
          },
          null,
          3
        )}
      </pre>
    </>
  );
}

export default decorateWithSuspense(OverviewVisualizations);
