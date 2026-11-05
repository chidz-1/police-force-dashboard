import { cacheLife, cacheTag } from "next/cache";

import { YearMonth } from "@/types/crimes-street-dates";
import {
  StopAndSearchDatesRecord,
  stopsForceResponseSchema,
} from "@/types/stop-and-search";
import fetchWithRetry from "./fetchWithRetry";
import { getForceId } from "./getForce";
import wait from "./wait";
import { API_BURST_MITIGATION_DELAY } from "@/constants";

export default async function getStopData(dates: YearMonth[]) {
  "use cache";
  cacheTag("schema:stop-and-search");
  cacheLife("max");

  const stopDataCollection = await Promise.all(
    dates.map(async (date, phaseIndex) => {
      await wait(phaseIndex * API_BURST_MITIGATION_DELAY);

      const response = await fetchWithRetry(
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

  const stopDataRecord = dates.reduce((accRecord, currentDate, index) => {
    accRecord[currentDate] = stopDataCollection[index];
    return accRecord;
  }, {} as StopAndSearchDatesRecord);

  return stopDataRecord;
}
