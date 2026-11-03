import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { DemographicsVisualizationsProps } from "./types";
import { DEMOGRAPHICS_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
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
          width={PAGE_FILTER_WIDTHS.gender}
          value={gender}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.gender}
          urlParamKey="gender"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.age_range}
          value={age_range}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.age_range}
          urlParamKey="age_range"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.officer_defined_ethnicity}
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
