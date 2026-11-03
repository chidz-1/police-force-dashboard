import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { DemographicsVisualizationsProps } from "./types";
import { DEMOGRAPHICS_FILTER_ITEMS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";

async function DemographicsVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: DemographicsVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    gender = DEMOGRAPHICS_FILTER_ITEMS.gender[0].label,
    age_range = DEMOGRAPHICS_FILTER_ITEMS.age_range[0].label,
    officer_defined_ethnicity = DEMOGRAPHICS_FILTER_ITEMS
      .officer_defined_ethnicity[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  return (
    <>
      <PageFiltersContainer>
        <PageFilters
          value={date}
          menuItems={monthFilterMenuItems}
          urlParamKey="date"
        />
        <PageFilters
          width="w-30"
          value={gender}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.gender}
          urlParamKey="gender"
        />
        <PageFilters
          width="w-30"
          value={age_range}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.age_range}
          urlParamKey="age_range"
        />
        <PageFilters
          width="w-30"
          value={officer_defined_ethnicity}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.officer_defined_ethnicity}
          urlParamKey="officer_defined_ethnicity"
        />
      </PageFiltersContainer>
      <pre>{JSON.stringify(rawStopData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(DemographicsVisualizations);
