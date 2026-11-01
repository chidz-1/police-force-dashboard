import decorateWithPagePadding from "@/utils/decorateWithPagePadding";
import { getForceFriendlyLabel } from "@/utils/getForce";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { OverviewPageSearchParams } from "@/features/Overview/types";
import OverviewVisualizations from "@/features/Overview/OverviewVisualizations";

async function OverviewPage({
  searchParams,
}: {
  searchParams: OverviewPageSearchParams;
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

      <OverviewVisualizations
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default decorateWithPagePadding(OverviewPage);
