import { cacheLife, cacheTag } from "next/cache";

import { YearMonth } from "@/types/crimes-street-dates";
import { stopsForceResponseSchema } from "@/types/stop-and-search";
import { getForceId } from "./getForce";

export default async function getStopData(dates: YearMonth[]) {
  "use cache";
  cacheTag("schema:stop-and-search");
  cacheLife("max");

  const stopDataCollection = Promise.all(
    dates.map(async (date) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STOP_AND_SEARCH_API}/stops-force?force=${getForceId()}&date=${date}`
      );

      if (!response.ok) {
        throw new Error(
          `Could not fetch stop data for month = ${date}, status = ${response.status}, url = ${response.url}`
        );
      }

      return stopsForceResponseSchema.parse(await response.json());
    })
  );

  return stopDataCollection;
}
