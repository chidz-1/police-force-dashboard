import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { OverviewVisualizationsProps } from "./types";
import { OVERVIEW_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import OverviewCharts from "../OverviewCharts";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import OverviewPageBuilder from "../../lib/OverviewPageBuilder";

async function OverviewVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: OverviewVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    type = OVERVIEW_FILTER_ITEMS.type[0].label,
    officer_defined_ethnicity = OVERVIEW_FILTER_ITEMS
      .officer_defined_ethnicity[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);

  const dataBuilder = new OverviewPageBuilder(getRawStopData(stopData, date), {
    officer_defined_ethnicity,
    type,
  });

  const pageDataDirector = new PageDataDirector(dataBuilder);

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
          menuItems={OVERVIEW_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.officer_defined_ethnicity}
          value={officer_defined_ethnicity}
          menuItems={OVERVIEW_FILTER_ITEMS.officer_defined_ethnicity}
          urlParamKey="officer_defined_ethnicity"
        />
      </PageFiltersContainer>
      {/* <OverviewCharts filters={{ date, officer_defined_ethnicity, type }} /> */}
      <pre>{JSON.stringify(pageDataDirector.getFullPageData(), null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(OverviewVisualizations);
