import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { LegislationPageSearchParams } from "@/features/Legislation/types";
import LegislationVisualizations from "@/features/Legislation/components/LegislationVisualizations";

async function LegislationPage({
  searchParams,
}: {
  searchParams: LegislationPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
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
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default LegislationPage;
