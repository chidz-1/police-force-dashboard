import {
  availabilityResponseSchema,
  AvailabilityHash,
  YearMonth,
} from "@/types/crimes-street-dates";
import { cacheLife, cacheTag } from "next/cache";
import monthRange, { MonthsFilter } from "./month-range";
import { getForceId } from "./get-force";

export async function fetchAvailability(): Promise<AvailabilityHash> {
  "use cache";
  cacheTag("schema:availability");
  cacheLife("max");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STOP_AND_SEARCH_API}/crimes-street-dates`
  );

  if (!response.ok) {
    throw new Error(`[fetchAvailability]: request failed ${response.status}`);
  }

  const availability = availabilityResponseSchema.parse(await response.json());
  return Object.fromEntries(availability.map((e) => [e.date, e]));
}

export async function checkAvailability(
  backDatedMonths: MonthsFilter
): Promise<YearMonth[]> {
  const availabilityEntries = await fetchAvailability();
  const userRange = monthRange(availabilityEntries, backDatedMonths);

  const isRangeAvailable = userRange.every(
    (rangeDate) =>
      availabilityEntries[rangeDate] &&
      availabilityEntries[rangeDate]["stop-and-search"].includes(getForceId())
  );

  return isRangeAvailable ? userRange : [];
}
