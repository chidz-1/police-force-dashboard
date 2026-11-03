import decorateWithPagePadding from "@/utils/decorateWithPagePadding";
import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { SearchTypesPageSearchParams } from "@/features/SearchTypes/types";
import SearchTypesVisualizations from "@/features/SearchTypes/components/SearchTypesVisualizations";

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
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default decorateWithPagePadding(SearchTypesPage);
