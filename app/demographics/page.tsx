import type { Metadata } from "next";

import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { DemographicsPageSearchParams } from "@/features/Demographics/types";
import DemographicsVisualizations from "@/features/Demographics/components/DemographicsVisualizations";

export const metadata: Metadata = {
  title: "Demographics",
};

async function DemographicsPage({
  searchParams,
}: {
  searchParams: DemographicsPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Demographics</h1>
      <p>
        Gender, age range and officer-defined ethnicity of people searched.
        Vehicle-only searches have no demographic data.
      </p>

      <DemographicsVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default DemographicsPage;
