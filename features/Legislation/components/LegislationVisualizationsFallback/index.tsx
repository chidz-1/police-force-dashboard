import {
  DataTableSkeleton,
  PageFiltersSkeleton,
  RankedBarListSkeleton,
  StatCardsSkeleton,
  TrendChartSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { LEGISLATION_TABLE_COLUMNS } from "../../constants";

export default function LegislationVisualizationsFallback() {
  return (
    <VisualizationsFallback label="legislation">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.legislation,
          PAGE_FILTER_WIDTHS.object_of_search,
          PAGE_FILTER_WIDTHS.type,
        ]}
      />
      <StatCardsSkeleton count={3} className="xl:grid-cols-3" />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RankedBarListSkeleton rows={8} />
          <RankedBarListSkeleton rows={8} />
        </div>
        <TrendChartSkeleton className="h-auto" />
        <DataTableSkeleton
          columns={LEGISLATION_TABLE_COLUMNS}
          rows={10}
          searchable
        />
      </div>
    </VisualizationsFallback>
  );
}
