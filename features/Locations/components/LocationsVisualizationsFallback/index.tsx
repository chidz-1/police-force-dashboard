import {
  DataTableSkeleton,
  PageFiltersSkeleton,
  RankedBarListSkeleton,
  StatCardsSkeleton,
  VisualizationsFallback,
} from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_FILTER_DEFAULT_WIDTH, PAGE_FILTER_WIDTHS } from "@/constants";
import { LOCATIONS_TABLE_COLUMNS } from "../../constants";

export default function LocationsVisualizationsFallback() {
  return (
    <VisualizationsFallback label="locations">
      <PageFiltersSkeleton
        widths={[
          PAGE_FILTER_DEFAULT_WIDTH,
          PAGE_FILTER_WIDTHS.type,
          PAGE_FILTER_WIDTHS.object_of_search,
          PAGE_FILTER_WIDTHS.outcome,
        ]}
      />
      <StatCardsSkeleton count={3} className="xl:grid-cols-3" />
      <div className="flex flex-col gap-4">
        <RankedBarListSkeleton rows={12} className="h-auto" />
        <DataTableSkeleton
          columns={LOCATIONS_TABLE_COLUMNS}
          rows={10}
          searchable
        />
        <Skeleton className="ml-auto h-4 w-96 max-w-full" />
      </div>
    </VisualizationsFallback>
  );
}
