import type { Metadata } from "next";

import DataUnavailable from "@/components/DataUnavailable";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { LegislationPageSearchParams } from "@/features/Legislation/types";
import LegislationVisualizations from "@/features/Legislation/components/LegislationVisualizations";
import LegislationVisualizationsFallback from "@/features/Legislation/components/LegislationVisualizationsFallback";

export const metadata: Metadata = {
  title: "Legislation",
};

async function LegislationPage({
  searchParams,
}: {
  searchParams: LegislationPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <DataUnavailable />;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Legislation</h1>
      <p>
        The powers used to carry out searches and what officers were looking
        for.
      </p>

      <LegislationVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<LegislationVisualizationsFallback />}
      />
    </>
  );
}

export default LegislationPage;
