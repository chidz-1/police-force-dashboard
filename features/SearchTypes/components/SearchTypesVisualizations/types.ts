import { type FilterItems } from "@/components/PageFilters/types";
import { type SearchTypesPageSearchParams } from "../../types";
import { type VisualizationProps } from "@/types/page-types";

export type SearchTypesVisualizationsProps = VisualizationProps & {
  searchParams: SearchTypesPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
