import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { TimePatternsVisualizationsProps } from "./types";
import { TIME_PATTERNS_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";

async function TimePatternsVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: TimePatternsVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    type = TIME_PATTERNS_FILTER_ITEMS.type[0].label,
    object_of_search = TIME_PATTERNS_FILTER_ITEMS.object_of_search[0].label,
    outcome = TIME_PATTERNS_FILTER_ITEMS.outcome[0].label,
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
          menuItems={TIME_PATTERNS_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={TIME_PATTERNS_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={TIME_PATTERNS_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
      </PageFiltersContainer>
      <pre>{JSON.stringify(rawStopData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(TimePatternsVisualizations);
