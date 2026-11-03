import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { LocationsPageSearchParams } from "@/features/Locations/types";
import LocationsVisualizations from "@/features/Locations/components/LocationsVisualizations";

async function LocationsPage({
  searchParams,
}: {
  searchParams: LocationsPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
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
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default LocationsPage;
