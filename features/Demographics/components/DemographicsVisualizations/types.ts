import { type FilterItems } from "@/components/PageFilters/types";
import { type DemographicsPageSearchParams } from "../../types";
import { type VisualizationProps } from "@/types/page-types";

export type DemographicsVisualizationsProps = VisualizationProps & {
  searchParams: DemographicsPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
