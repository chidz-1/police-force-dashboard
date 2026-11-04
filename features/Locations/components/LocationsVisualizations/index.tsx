import { MapPin, MapPinOff, Navigation, Signpost } from "lucide-react";

import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import RankedBarList from "@/components/charts/RankedBarList";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { LocationsVisualizationsProps } from "./types";
import { LOCATIONS_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import { formatNumber } from "@/utils/formatNumber";
import getRankedCounts from "@/utils/getRankedCounts";
import getStreetName from "@/utils/getStreetName";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import LocationsPageBuilder from "../../lib/LocationsPageBuilder";
import { LOCATIONS_TABLE_COLUMNS } from "../../constants";

async function LocationsVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: LocationsVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    type = LOCATIONS_FILTER_ITEMS.type[0].label,
    object_of_search = LOCATIONS_FILTER_ITEMS.object_of_search[0].label,
    outcome = LOCATIONS_FILTER_ITEMS.outcome[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new LocationsPageBuilder(rawStopData, {
    type,
    object_of_search,
    outcome,
  });

  const pageDataDirector = new PageDataDirector(dataBuilder);
  const pageData = pageDataDirector.getFullPageData();
  const chartData = pageData.chartData ?? [];

  const topStreetCounts = getRankedCounts(chartData, (record) =>
    record.location ? getStreetName(record.location.street.name) : null
  ).slice(0, 12);

  return (
    <>
      <PageFiltersContainer numOfResults={pageData.totalNumRecords}>
        <PageFilters
          value={date}
          menuItems={monthFilterMenuItems}
          urlParamKey="date"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.type}
          value={type}
          menuItems={LOCATIONS_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={LOCATIONS_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={LOCATIONS_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
      </PageFiltersContainer>
      <StatCardsContainer className="xl:grid-cols-3">
        {pageData.stats?.locationRecorded && (
          <StatCard
            title="Location recorded"
            Icon={MapPin}
            figure={pageData.stats.locationRecorded.value}
            figureType="percentage"
            description={`${formatNumber(pageData.stats.locationRecorded.count)} searches`}
          />
        )}
        {pageData.stats?.busiestStreet && (
          <StatCard
            title="Busiest street"
            Icon={Navigation}
            figure={pageData.stats.busiestStreet.label ?? null}
            figureType="text"
            figureClassName="text-3xl"
            description={`On or near ${formatNumber(pageData.stats.busiestStreet.count)} searches`}
          />
        )}
        {pageData.stats?.noLocation && (
          <StatCard
            title="No location"
            Icon={MapPinOff}
            figure={pageData.stats.noLocation.count}
            figureType="plain-number"
            description="withheld or not recorded"
          />
        )}
      </StatCardsContainer>
      <div className="flex flex-col gap-4">
        <RankedBarList
          className="h-auto"
          title="Top streets"
          subTitle="Streets with the most searches"
          Icon={<Signpost className="size-4" />}
          items={topStreetCounts}
        />
        <DataTable
          title="All locations"
          subTitle="Every street-level location with searches in the selected period"
          Icon={<MapPin className="size-4" />}
          data={pageData.tableData ?? []}
          columns={LOCATIONS_TABLE_COLUMNS}
          searchable
        />
      </div>
    </>
  );
}

export default decorateWithSuspense(LocationsVisualizations);
