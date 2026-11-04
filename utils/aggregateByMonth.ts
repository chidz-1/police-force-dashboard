import { groupBy } from "lodash";
import formatMonthLabel from "./formatMonthLabel";

export interface MonthlySeriesConfig<T> {
  key: string;
  match: (record: T) => boolean;
}

export type MonthlyTrendPoint = Record<string, string | number>;

export default function aggregateByMonth<T extends { datetime: string }>(
  records: T[],
  seriesConfig: MonthlySeriesConfig<T>[]
): MonthlyTrendPoint[] {
  const buckets = groupBy(records, (record) => record.datetime.slice(0, 7));

  return Object.keys(buckets)
    .sort()
    .map((yearMonth) => {
      const bucketRecords = buckets[yearMonth];

      return seriesConfig.reduce<MonthlyTrendPoint>(
        (point, { key, match }) => {
          point[key] = bucketRecords.filter(match).length;
          return point;
        },
        { period: formatMonthLabel(yearMonth) }
      );
    });
}
