export type FilterItems = { label: string; value: string }[];
export type PageFilters = Record<string, FilterItems>;

export interface PageFiltersProps {
  value: string;
  urlParamKey: string;
  menuItems: FilterItems;
  width?: string;
}
