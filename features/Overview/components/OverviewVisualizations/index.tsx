import {
  Gavel,
  ChartPie,
  Gauge,
  Package,
  Search,
  ShieldAlert,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import MultiSeriesTrendChart from "@/components/charts/MultiSeriesTrendChart";
import MeterChart from "@/components/charts/MeterChart";
import DonutStat from "@/components/charts/DonutStat";
import RankedBarList from "@/components/charts/RankedBarList";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { OverviewVisualizationsProps } from "./types";
import {
  OVERVIEW_FILTER_ITEMS,
  PAGE_FILTER_WIDTHS,
  SEARCH_TYPE_SERIES,
} from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import aggregateByMonth from "@/utils/aggregateByMonth";
import getRankedCounts from "@/utils/getRankedCounts";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import OverviewPageBuilder from "../../lib/OverviewPageBuilder";
import { OVERVIEW_TABLE_COLUMNS } from "../../constants";

async function OverviewVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: OverviewVisualizationsProps) {
  // Must stay above searchParams so the data is captured at build time
  const stopData = await getStopData(monthRange);

  const {
    date = monthFilterMenuItems[0].value,
    type = OVERVIEW_FILTER_ITEMS.type[0].label,
    officer_defined_ethnicity = OVERVIEW_FILTER_ITEMS
      .officer_defined_ethnicity[0].label,
  } = await searchParams;

  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new OverviewPageBuilder(rawStopData, {
    officer_defined_ethnicity,
    type,
  });

  const pageDataDirector = new PageDataDirector(dataBuilder);
  const pageData = pageDataDirector.getFullPageData();
  const chartData = pageData.chartData ?? [];

  const monthlySearchesByType = aggregateByMonth(
    chartData,
    SEARCH_TYPE_SERIES.map(({ key, match }) => ({
      key,
      match: (record) => record.type === match,
    }))
  );

  const searchTypeCounts = SEARCH_TYPE_SERIES.map(({ label, match }) => ({
    label,
    value: chartData.filter((record) => record.type === match).length,
  }));

  const objectOfSearchCounts = getRankedCounts(
    chartData,
    (record) => record.object_of_search
  ).slice(0, 8);

  const linkedCount = pageData.stats?.found?.count ?? 0;

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
          menuItems={OVERVIEW_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.officer_defined_ethnicity}
          value={officer_defined_ethnicity}
          menuItems={OVERVIEW_FILTER_ITEMS.officer_defined_ethnicity}
          urlParamKey="officer_defined_ethnicity"
        />
      </PageFiltersContainer>
      <StatCardsContainer>
        <StatCard
          title="Total searches"
          Icon={Search}
          figure={pageData.totalNumRecords}
          figureType="plain-number"
        />
        {pageData.stats?.arrests && (
          <StatCard
            title="Arrest rate"
            Icon={ShieldAlert}
            figure={pageData.stats.arrests.value}
            figureType="percentage"
          />
        )}
        {pageData.stats?.action && (
          <StatCard
            title="No further action"
            Icon={ShieldCheck}
            figure={pageData.stats.action.value}
            figureType="percentage"
          />
        )}
        {pageData.stats?.found && (
          <StatCard
            title="Find rate"
            Icon={Target}
            figure={pageData.stats.found.value}
            figureType="percentage"
            description="Outcome linked to object of search"
          />
        )}
      </StatCardsContainer>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <MultiSeriesTrendChart
              title="Monthly searches"
              subTitle="Searches per month by search type"
              Icon={<TrendingUp className="size-4" />}
              defaultMode="stacked"
              data={monthlySearchesByType}
              series={SEARCH_TYPE_SERIES}
            />
          </div>
          <MeterChart
            title="Outcome linked to object"
            subTitle="Where the outcome related to the object searched for"
            Icon={<Gauge className="size-4" />}
            centerLabel="Linked"
            ratio={pageData.stats?.found?.value ?? 0}
            items={[
              { label: "Linked", value: linkedCount },
              {
                label: "Not linked",
                value: pageData.totalNumRecords - linkedCount,
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DonutStat
            title="Search types"
            subTitle="Share of all searches"
            Icon={<ChartPie className="size-4" />}
            centerLabel="Searches"
            data={searchTypeCounts}
          />
          <div className="md:col-span-2">
            <RankedBarList
              title="Object of search"
              subTitle="What officers were searching for"
              Icon={<Package className="size-4" />}
              items={objectOfSearchCounts}
            />
          </div>
        </div>
        <DataTable
          title="Legislation used"
          subTitle="Powers used to conduct searches, with arrest rate"
          Icon={<Gavel className="size-4" />}
          data={pageData.tableData ?? []}
          columns={OVERVIEW_TABLE_COLUMNS}
          defaultPageSize={5}
        />
      </div>
    </>
  );
}

export default decorateWithSuspense(OverviewVisualizations);
