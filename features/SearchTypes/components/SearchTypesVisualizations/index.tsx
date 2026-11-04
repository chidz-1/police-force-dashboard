import {
  Car,
  ChartPie,
  Crosshair,
  Layers,
  Shirt,
  TrendingUp,
  User,
} from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import MultiSeriesTrendChart from "@/components/charts/MultiSeriesTrendChart";
import DonutStat from "@/components/charts/DonutStat";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { SearchTypesVisualizationsProps } from "./types";
import { SEARCH_TYPES_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import aggregateByMonth from "@/utils/aggregateByMonth";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import SearchTypesPageBuilder from "../../lib/SearchTypesPageBuilder";

const SEARCH_TYPE_SERIES = [
  { key: "personSearch", label: "Person search", match: "Person search" },
  {
    key: "personAndVehicleSearch",
    label: "Person and Vehicle search",
    match: "Person and Vehicle search",
  },
  { key: "vehicleSearch", label: "Vehicle search", match: "Vehicle search" },
] as const;

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
  const chartData = pageData.chartData ?? [];

  const searchTypesOverTime = aggregateByMonth(
    chartData,
    SEARCH_TYPE_SERIES.map(({ key, match }) => ({
      key,
      match: (record) => record.type === match,
    }))
  );

  const typeSplitCounts = SEARCH_TYPE_SERIES.map(({ label, match }) => ({
    label,
    value: chartData.filter((record) => record.type === match).length,
  }));

  const removalOfClothingCounts = [
    {
      label: "Outer clothing only",
      value: chartData.filter(
        (record) => record.removal_of_more_than_outer_clothing === false
      ).length,
    },
    {
      label: "More than outer clothing",
      value: chartData.filter(
        (record) => record.removal_of_more_than_outer_clothing === true
      ).length,
    },
  ];

  const operationInvolvementCounts = [
    {
      label: "Not part of operation",
      value: chartData.filter((record) => record.operation === false).length,
    },
    {
      label: "Not recorded",
      value: chartData.filter((record) => record.operation === null).length,
    },
    {
      label: "Part of operation",
      value: chartData.filter((record) => record.operation === true).length,
    },
  ];

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <MultiSeriesTrendChart
            title="Search types over time"
            subTitle="Monthly volume for each search type"
            Icon={<TrendingUp className="size-4" />}
            defaultMode="grouped"
            data={searchTypesOverTime}
            series={SEARCH_TYPE_SERIES}
          />
        </div>
        <DonutStat
          title="Type split"
          subTitle="Share of searches by type"
          Icon={<ChartPie className="size-4" />}
          centerLabel="Searches"
          data={typeSplitCounts}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DonutStat
          title="Removal of clothing"
          subTitle="Searches involving removal of more than outer clothing"
          Icon={<Shirt className="size-4" />}
          centerLabel="Recorded"
          data={removalOfClothingCounts}
        />
        <DonutStat
          title="Operation involvement"
          subTitle="Searches carried out as part of a named operation"
          Icon={<Crosshair className="size-4" />}
          centerLabel="Searches"
          data={operationInvolvementCounts}
        />
      </div>
    </>
  );
}

export default decorateWithSuspense(SearchTypesVisualizations);
