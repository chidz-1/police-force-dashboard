import {
  availabilityResponseSchema,
  AvailabilityHash,
  YearMonth,
} from "@/types/crimes-street-dates";
import { cacheLife, cacheTag } from "next/cache";
import fetchWithRetry from "./fetchWithRetry";
import { getForceId } from "./getForce";
import { MAX_AVAILABILITY_MONTH_RANGE } from "@/constants";

export async function fetchAvailability(): Promise<AvailabilityHash> {
  "use cache";
  cacheTag("schema:availability");
  cacheLife("days");

  const response = await fetchWithRetry(
    `${process.env.NEXT_PUBLIC_STOP_AND_SEARCH_API}/crimes-street-dates`
  );

  if (!response.ok) {
    throw new Error(`[fetchAvailability]: request failed ${response.status}`);
  }

  const availability = availabilityResponseSchema.parse(await response.json());
  return Object.fromEntries(availability.map((e) => [e.date, e]));
}

export async function getAvailability(): Promise<YearMonth[]> {
  "use cache";
  cacheTag("schema:availability");
  cacheLife("days");

  const availabilityEntries = await fetchAvailability();
  const dateKeys = Object.keys(availabilityEntries);
  const availableDates: YearMonth[] = [];

  for (let i = 0; i < dateKeys.length; i++) {
    const date = dateKeys[i];
    if (availabilityEntries[date]["stop-and-search"].includes(getForceId())) {
      availableDates.push(date);
    }
  }

  return availableDates.slice(0, MAX_AVAILABILITY_MONTH_RANGE);
}
