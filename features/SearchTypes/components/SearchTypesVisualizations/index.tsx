import { Car, Crosshair, Layers, User } from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { SearchTypesVisualizationsProps } from "./types";
import { SEARCH_TYPES_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import SearchTypesPageBuilder from "../../lib/SearchTypesPageBuilder";

async function SearchTypesVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: SearchTypesVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    type = SEARCH_TYPES_FILTER_ITEMS.type[0].label,
    gender = SEARCH_TYPES_FILTER_ITEMS.gender[0].label,
    outcome = SEARCH_TYPES_FILTER_ITEMS.outcome[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new SearchTypesPageBuilder(rawStopData, {
    type,
    gender,
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
          menuItems={SEARCH_TYPES_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.gender}
          value={gender}
          menuItems={SEARCH_TYPES_FILTER_ITEMS.gender}
          urlParamKey="gender"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={SEARCH_TYPES_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
      </PageFiltersContainer>
      <StatCardsContainer>
        {pageData.stats?.personOnly && (
          <StatCard
            title="Person searches"
            Icon={User}
            figure={pageData.stats.personOnly.count}
            figureType="plain-number"
            description="person only"
          />
        )}
        {pageData.stats?.personAndVehicle && (
          <StatCard
            title="Person & vehicle"
            Icon={Layers}
            figure={pageData.stats.personAndVehicle.count}
            figureType="plain-number"
            description="combined searches"
          />
        )}
        {pageData.stats?.vehicleOnly && (
          <StatCard
            title="Vehicle only"
            Icon={Car}
            figure={pageData.stats.vehicleOnly.count}
            figureType="plain-number"
            description="no person involved"
          />
        )}
        {pageData.stats?.partOfOperation && (
          <StatCard
            title="Part of an operation"
            Icon={Crosshair}
            figure={pageData.stats.partOfOperation.value}
            figureType="percentage"
            description="of all searches"
          />
        )}
      </StatCardsContainer>
      <pre>{JSON.stringify(pageData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(SearchTypesVisualizations);
