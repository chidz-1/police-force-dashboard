import { type FilterItems } from "@/components/PageFilters/types";
import { type OutcomesPageSearchParams } from "../../types";
import { type VisualizationProps } from "@/types/page-types";

export type OutcomesVisualizationsProps = VisualizationProps & {
  searchParams: OutcomesPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
