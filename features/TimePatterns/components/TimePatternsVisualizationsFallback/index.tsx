import {
  CategoryChartSkeleton,
  DataTableSkeleton,
  PageFiltersSkeleton,
  StatCardsSkeleton,
  TrendChartSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { TIME_PATTERNS_TABLE_COLUMNS } from "../../constants";

export default function TimePatternsVisualizationsFallback() {
  return (
    <VisualizationsFallback label="time patterns">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.type,
          PAGE_FILTER_WIDTHS.object_of_search,
          PAGE_FILTER_WIDTHS.outcome,
        ]}
      />
      <StatCardsSkeleton count={4} />
      <div className="flex flex-col gap-4">
        <CategoryChartSkeleton bars={24} sortable className="h-auto" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CategoryChartSkeleton bars={7} sortable />
          <TrendChartSkeleton />
        </div>
        <DataTableSkeleton columns={TIME_PATTERNS_TABLE_COLUMNS} rows={7} />
      </div>
    </VisualizationsFallback>
  );
}
