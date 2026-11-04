import { range } from "lodash";

const MAX_UNTRUNCATED_PAGES = 7;

export type PaginationRangeItem = number | "start-ellipsis" | "end-ellipsis";

export default function getPaginationRange(
  currentPage: number,
  totalPages: number
): PaginationRangeItem[] {
  if (totalPages <= MAX_UNTRUNCATED_PAGES) {
    return range(1, totalPages + 1);
  }

  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  return [
    1,
    ...(windowStart > 2 ? (["start-ellipsis"] as const) : []),
    ...range(windowStart, windowEnd + 1),
    ...(windowEnd < totalPages - 1 ? (["end-ellipsis"] as const) : []),
    totalPages,
  ];
}
