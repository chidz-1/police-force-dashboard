import { StopAndSearch } from "@/types/stop-and-search";

export type FilterItems = readonly { label: string; value: string }[];
export type PageFilters = Record<keyof StopAndSearch, FilterItems>;
export type PageFilterWidths = Record<keyof StopAndSearch, string>;

export interface PageFiltersProps {
  value: string;
  urlParamKey: keyof StopAndSearch | "date";
  menuItems: FilterItems;
  width?: string;
}
