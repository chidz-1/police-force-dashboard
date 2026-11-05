import type { Metadata } from "next";

import DataUnavailable from "@/components/DataUnavailable";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { OutcomesPageSearchParams } from "@/features/Outcomes/types";
import OutcomesVisualizations from "@/features/Outcomes/components/OutcomesVisualizations";
import OutcomesVisualizationsFallback from "@/features/Outcomes/components/OutcomesVisualizationsFallback";

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
    return <DataUnavailable />;
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
        fallback={<OutcomesVisualizationsFallback />}
      />
    </>
  );
}

export default OutcomesPage;
