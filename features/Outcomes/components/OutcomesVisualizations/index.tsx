import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { OutcomesVisualizationsProps } from "./types";
import { OUTCOMES_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";

async function OutcomesVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: OutcomesVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    outcome = OUTCOMES_FILTER_ITEMS.outcome[0].label,
    object_of_search = OUTCOMES_FILTER_ITEMS.object_of_search[0].label,
    officer_defined_ethnicity = OUTCOMES_FILTER_ITEMS
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
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={OUTCOMES_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={OUTCOMES_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.officer_defined_ethnicity}
          value={officer_defined_ethnicity}
          menuItems={OUTCOMES_FILTER_ITEMS.officer_defined_ethnicity}
          urlParamKey="officer_defined_ethnicity"
        />
      </PageFiltersContainer>
      <pre>{JSON.stringify(rawStopData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(OutcomesVisualizations);
