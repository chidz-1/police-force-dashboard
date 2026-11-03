import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { SearchTypesVisualizationsProps } from "./types";
import { SEARCH_TYPES_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";

async function SearchTypesVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: SearchTypesVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    type = SEARCH_TYPES_FILTER_ITEMS.type[0].label,
    gender = SEARCH_TYPES_FILTER_ITEMS.gender[0].label,
    outcome = SEARCH_TYPES_FILTER_ITEMS.outcome[0].label,
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
          width={PAGE_FILTER_WIDTHS.type}
          value={type}
          menuItems={SEARCH_TYPES_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.gender}
          value={gender}
          menuItems={SEARCH_TYPES_FILTER_ITEMS.gender}
          urlParamKey="gender"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={SEARCH_TYPES_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
      </PageFiltersContainer>
      <pre>{JSON.stringify(rawStopData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(SearchTypesVisualizations);
