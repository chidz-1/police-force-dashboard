import type { Metadata } from "next";

import DataUnavailable from "@/components/DataUnavailable";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { LocationsPageSearchParams } from "@/features/Locations/types";
import LocationsVisualizations from "@/features/Locations/components/LocationsVisualizations";
import LocationsVisualizationsFallback from "@/features/Locations/components/LocationsVisualizationsFallback";

export const metadata: Metadata = {
  title: "Locations",
};

async function LocationsPage({
  searchParams,
}: {
  searchParams: LocationsPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <DataUnavailable />;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Locations</h1>
      <p>
        Approximate locations of searches. data.police.uk anonymises points to
        the nearest street-level map point.
      </p>

      <LocationsVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<LocationsVisualizationsFallback />}
      />
    </>
  );
}

export default LocationsPage;
