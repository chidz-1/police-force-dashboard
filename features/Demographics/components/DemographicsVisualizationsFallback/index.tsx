import {
  CategoryChartSkeleton,
  DataTableSkeleton,
  DonutChartSkeleton,
  PageFiltersSkeleton,
  RankedBarListSkeleton,
  StatCardsSkeleton,
  TrendChartSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { DEMOGRAPHICS_TABLE_COLUMNS } from "../../constants";

export default function DemographicsVisualizationsFallback() {
  return (
    <VisualizationsFallback label="demographics">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.gender,
          PAGE_FILTER_WIDTHS.age_range,
          PAGE_FILTER_WIDTHS.officer_defined_ethnicity,
        ]}
      />
      <StatCardsSkeleton count={3} className="xl:grid-cols-3" />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DonutChartSkeleton slices={4} />
          <div className="md:col-span-2">
            <CategoryChartSkeleton bars={6} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <RankedBarListSkeleton rows={5} className="h-auto" />
        </div>
        <TrendChartSkeleton className="h-auto" />
        <DataTableSkeleton columns={DEMOGRAPHICS_TABLE_COLUMNS} rows={5} />
      </div>
    </VisualizationsFallback>
  );
}
