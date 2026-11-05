import type { Metadata } from "next";

import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { OutcomesPageSearchParams } from "@/features/Outcomes/types";
import OutcomesVisualizations from "@/features/Outcomes/components/OutcomesVisualizations";

export const metadata: Metadata = {
  title: "Outcomes",
};

async function OutcomesPage({
  searchParams,
}: {
  searchParams: OutcomesPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Outcomes</h1>
      <p>
        What happened as a result of each stop and search, from no further
        action to arrest.
      </p>

      <OutcomesVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default OutcomesPage;
