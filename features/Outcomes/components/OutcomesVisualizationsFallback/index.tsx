import {
  DataTableSkeleton,
  MeterChartSkeleton,
  PageFiltersSkeleton,
  RankedBarListSkeleton,
  StatCardsSkeleton,
  TrendChartSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { OUTCOMES_TABLE_COLUMNS } from "../../constants";

export default function OutcomesVisualizationsFallback() {
  return (
    <VisualizationsFallback label="outcomes">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.outcome,
          PAGE_FILTER_WIDTHS.object_of_search,
          PAGE_FILTER_WIDTHS.officer_defined_ethnicity,
        ]}
      />
      <StatCardsSkeleton count={4} />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <TrendChartSkeleton />
          </div>
          <MeterChartSkeleton />
        </div>
        <RankedBarListSkeleton rows={6} className="h-auto" />
        <DataTableSkeleton columns={OUTCOMES_TABLE_COLUMNS} rows={7} />
      </div>
    </VisualizationsFallback>
  );
}
