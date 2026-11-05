import type { Metadata } from "next";

import getMonthFilterItems from "@/utils/getMonthFilterItems";
import { getAvailability } from "@/utils/stopAvailability";
import { TimePatternsPageSearchParams } from "@/features/TimePatterns/types";
import TimePatternsVisualizations from "@/features/TimePatterns/components/TimePatternsVisualizations";

export const metadata: Metadata = {
  title: "Time Patterns",
};

async function TimePatternsPage({
  searchParams,
}: {
  searchParams: TimePatternsPageSearchParams;
}) {
  const availableMonthRange = await getAvailability();

  if (!availableMonthRange.length) {
    return <h1>TODO: Component for unavailable data for visualizations</h1>;
  }

  const monthFilterMenuItems = getMonthFilterItems(availableMonthRange);

  return (
    <>
      <h1>Time Patterns</h1>
      <p>
        When stop and searches take place by month, day of week and hour of day.
      </p>

      <TimePatternsVisualizations
        monthRange={availableMonthRange}
        searchParams={searchParams}
        monthFilterMenuItems={monthFilterMenuItems}
        fallback={<h1 className="text-5xl">LOADING</h1>}
      />
    </>
  );
}

export default TimePatternsPage;
