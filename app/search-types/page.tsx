import type { Metadata } from "next";

import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { SearchTypesPageSearchParams } from "@/features/SearchTypes/types";
import SearchTypesVisualizations from "@/features/SearchTypes/components/SearchTypesVisualizations";
import SearchTypesVisualizationsFallback from "@/features/SearchTypes/components/SearchTypesVisualizationsFallback";

export const metadata: Metadata = {
  title: "Search Types",
};

async function SearchTypesPage({
  searchParams,
}: {
  searchParams: SearchTypesPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Search Types</h1>
      <p>
        Whether a person, a vehicle, or both were searched, and whether searches
        were part of a policing operation.
      </p>

      <SearchTypesVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<SearchTypesVisualizationsFallback />}
      />
    </>
  );
}

export default SearchTypesPage;
