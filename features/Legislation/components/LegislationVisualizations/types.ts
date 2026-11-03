import { type FilterItems } from "@/components/PageFilters/types";
import { type LegislationPageSearchParams } from "../../types";
import { type VisualizationProps } from "@/types/page-types";

export type LegislationVisualizationsProps = VisualizationProps & {
  searchParams: LegislationPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
