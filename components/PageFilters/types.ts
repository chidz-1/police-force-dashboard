import { StopAndSearch } from "@/types/stop-and-search";

export type FilterItems = { label: string; value: string }[];
export type PageFilters = Record<keyof StopAndSearch, FilterItems>;

export interface PageFiltersProps {
  value: string;
  urlParamKey: keyof StopAndSearch | "date";
  menuItems: FilterItems;
  width?: string;
}
