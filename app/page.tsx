import PageFilters from "@/components/PageFilters";
import { Skeleton } from "@/components/ui/skeleton";
import decorateWithPagePadding from "@/utils/decorateWithPagePadding";
import { getForceFriendlyLabel } from "@/utils/getForce";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { OVERVIEW_FILTER_ITEMS } from "@/constants";
import PageFiltersContainer from "@/components/PageFiltersContainer";

async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; type?: string; ethnicity?: string }>;
}) {
  // const { date = "all", type = "all", ethnicity = "all" } = await searchParams;

  const monthRange = await getAvailability();
  const monthFilterMenuItems = getMonthFilterItems(monthRange);

  if (!monthRange.length) {
    return <h1>TODO: Component for unavailable data</h1>;
  }

  //  getStopData(monthRange);

  return (
    <>
      <h1>Overview</h1>
      <p>
        Headline stop and search figures for {getForceFriendlyLabel()} Police
      </p>
      <PageFiltersContainer>
        <PageFilters
          value={monthFilterMenuItems[0].value}
          menuItems={monthFilterMenuItems}
          urlParamKey="date"
          fallback={<Skeleton className="h-7 w-40" />}
        />
        <PageFilters
          width="w-43"
          value={OVERVIEW_FILTER_ITEMS.types[0].value}
          menuItems={OVERVIEW_FILTER_ITEMS.types}
          urlParamKey="type"
          fallback={<Skeleton className="h-7 w-43" />}
        />
        <PageFilters
          width="w-30"
          value={OVERVIEW_FILTER_ITEMS.ethnicities[0].value}
          menuItems={OVERVIEW_FILTER_ITEMS.ethnicities}
          urlParamKey="ethnicity"
          fallback={<Skeleton className="h-7 w-30" />}
        />
      </PageFiltersContainer>
    </>
  );
}

export default decorateWithPagePadding(OverviewPage);
