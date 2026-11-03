import { type FilterItems } from "@/components/PageFilters/types";
import { type TimePatternsPageSearchParams } from "../../types";
import { type VisualizationProps } from "@/types/page-types";

export type TimePatternsVisualizationsProps = VisualizationProps & {
  searchParams: TimePatternsPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
