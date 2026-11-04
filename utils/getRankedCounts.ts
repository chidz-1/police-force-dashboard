import { countBy } from "lodash";

export interface RankedCount {
  label: string;
  value: number;
}

export default function getRankedCounts<T>(
  records: T[],
  getLabel: (record: T) => string | null
): RankedCount[] {
  const labels = records
    .map(getLabel)
    .filter((label): label is string => label !== null);

  const counts = countBy(labels);

  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}
