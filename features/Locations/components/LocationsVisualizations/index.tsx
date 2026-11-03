import { MapPin, MapPinOff, Navigation } from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { LocationsVisualizationsProps } from "./types";
import { LOCATIONS_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import { formatNumber } from "@/utils/formatNumber";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import LocationsPageBuilder from "../../lib/LocationsPageBuilder";

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
      <StatCardsContainer>
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
      <pre>{JSON.stringify(pageData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(LocationsVisualizations);
