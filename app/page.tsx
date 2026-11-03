import { getForceFriendlyLabel } from "@/utils/getForce";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { OverviewPageSearchParams } from "@/features/Overview/types";
import OverviewVisualizations from "@/features/Overview/components/OverviewVisualizations";

async function OverviewPage({
  searchParams,
}: {
  searchParams: OverviewPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Overview</h1>
      <p>
        Headline stop and search figures for {getForceFriendlyLabel()} Police
      </p>

      {/* TODO: Resolve the fallback granted it might be too fast to notice */}
      {/* fallback={<Skeleton className="h-7 w-40" /> */}
      {/* fallback={<Skeleton className="h-7 w-43" /> */}
      {/* fallback={<Skeleton className="h-7 w-30" /> */}
      <OverviewVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default OverviewPage;
