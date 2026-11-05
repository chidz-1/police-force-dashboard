import {
  DataTableSkeleton,
  DonutChartSkeleton,
  MeterChartSkeleton,
  PageFiltersSkeleton,
  RankedBarListSkeleton,
  StatCardsSkeleton,
  TrendChartSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { OVERVIEW_TABLE_COLUMNS } from "../../constants";

export default function OverviewVisualizationsFallback() {
  return (
    <VisualizationsFallback label="overview">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.type,
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DonutChartSkeleton slices={3} />
          <div className="md:col-span-2">
            <RankedBarListSkeleton rows={8} />
          </div>
        </div>
        <DataTableSkeleton columns={OVERVIEW_TABLE_COLUMNS} rows={5} />
      </div>
    </VisualizationsFallback>
  );
}
