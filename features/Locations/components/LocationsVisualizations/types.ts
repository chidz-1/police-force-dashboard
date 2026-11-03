import { type FilterItems } from "@/components/PageFilters/types";
import { type LocationsPageSearchParams } from "../../types";
import { type VisualizationProps } from "@/types/page-types";

export type LocationsVisualizationsProps = VisualizationProps & {
  searchParams: LocationsPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
