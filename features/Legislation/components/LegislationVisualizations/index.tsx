import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { LegislationVisualizationsProps } from "./types";
import { LEGISLATION_PAGE_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";

async function LegislationVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: LegislationVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    legislation = LEGISLATION_PAGE_FILTER_ITEMS.legislation[0].label,
    object_of_search = LEGISLATION_PAGE_FILTER_ITEMS.object_of_search[0].label,
    type = LEGISLATION_PAGE_FILTER_ITEMS.type[0].label,
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
          width={PAGE_FILTER_WIDTHS.legislation}
          value={legislation}
          menuItems={LEGISLATION_PAGE_FILTER_ITEMS.legislation}
          urlParamKey="legislation"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={LEGISLATION_PAGE_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.type}
          value={type}
          menuItems={LEGISLATION_PAGE_FILTER_ITEMS.type}
          urlParamKey="type"
        />
      </PageFiltersContainer>
      <pre>{JSON.stringify(rawStopData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(LegislationVisualizations);
