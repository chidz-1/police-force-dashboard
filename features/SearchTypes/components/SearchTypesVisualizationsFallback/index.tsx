import {
  DataTableSkeleton,
  DonutChartSkeleton,
  PageFiltersSkeleton,
  StatCardsSkeleton,
  TrendChartSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { SEARCH_TYPES_TABLE_COLUMNS } from "../../constants";

export default function SearchTypesVisualizationsFallback() {
  return (
    <VisualizationsFallback label="search types">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.type,
          PAGE_FILTER_WIDTHS.gender,
          PAGE_FILTER_WIDTHS.outcome,
        ]}
      />
      <StatCardsSkeleton count={4} />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <TrendChartSkeleton />
          </div>
          <DonutChartSkeleton slices={3} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DonutChartSkeleton slices={2} />
          <DonutChartSkeleton slices={3} />
        </div>
        <DataTableSkeleton columns={SEARCH_TYPES_TABLE_COLUMNS} rows={3} />
      </div>
    </VisualizationsFallback>
  );
}
