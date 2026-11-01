import { type FilterItems } from "@/components/PageFilters/types";
import { type OverviewPageSearchParams } from "../../types";
import { type VisualizationProps } from "../../../../types/page-types";

export type OverviewVisualizationsProps = VisualizationProps & {
  searchParams: OverviewPageSearchParams;
  monthFilterMenuItems: FilterItems;
};
