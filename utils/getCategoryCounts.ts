import { countBy } from "lodash";

export interface CategoryCount {
  category: string;
  value: number;
}

export default function getCategoryCounts<T>(
  records: T[],
  categories: readonly string[],
  getCategory: (record: T) => string | null
): CategoryCount[] {
  const counts = countBy(records, getCategory);

  return categories.map((category) => ({
    category,
    value: counts[category] ?? 0,
  }));
}
