import {
  Target,
  FileText,
  Package,
  Scale,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import RankedBarList from "@/components/charts/RankedBarList";
import MultiSeriesTrendChart from "@/components/charts/MultiSeriesTrendChart";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { LegislationVisualizationsProps } from "./types";
import { LEGISLATION_PAGE_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import aggregateByMonth from "@/utils/aggregateByMonth";
import getRankedCounts from "@/utils/getRankedCounts";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import LegislationPageBuilder from "../../lib/LegislationPageBuilder";
import {
  TOP_LEGISLATION_SERIES_COUNT,
  LEGISLATION_TABLE_COLUMNS,
} from "../../constants";

async function LegislationVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: LegislationVisualizationsProps) {
  // Must stay above searchParams so the data is captured at build time
  const stopData = await getStopData(monthRange);

  const {
    date = monthFilterMenuItems[0].value,
    legislation = LEGISLATION_PAGE_FILTER_ITEMS.legislation[0].label,
    object_of_search = LEGISLATION_PAGE_FILTER_ITEMS.object_of_search[0].label,
    type = LEGISLATION_PAGE_FILTER_ITEMS.type[0].label,
  } = await searchParams;

  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new LegislationPageBuilder(rawStopData, {
    legislation,
    object_of_search,
    type,
  });

  const pageDataDirector = new PageDataDirector(dataBuilder);
  const pageData = pageDataDirector.getFullPageData();
  const chartData = pageData.chartData ?? [];

  const powersUsedCounts = getRankedCounts(
    chartData,
    (record) => record.legislation
  ).slice(0, 8);

  const objectOfSearchCounts = getRankedCounts(
    chartData,
    (record) => record.object_of_search
  ).slice(0, 8);

  const legislationSeries = powersUsedCounts
    .slice(0, TOP_LEGISLATION_SERIES_COUNT)
    .map(({ label }, index) => ({ key: `legislation${index}`, label }));

  const legislationOverTime = aggregateByMonth(
    chartData,
    legislationSeries.map(({ key, label }) => ({
      key,
      match: (record) => record.legislation === label,
    }))
  );

  return (
    <>
      <PageFiltersContainer numOfResults={pageData.totalNumRecords}>
        <PageFilters
          value={date}
          menuItems={monthFilterMenuItems}
          urlParamKey="date"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.legislation}
          value={legislation}
          menuItems={LEGISLATION_PAGE_FILTER_ITEMS.legislation}
          urlParamKey="legislation"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={LEGISLATION_PAGE_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.type}
          value={type}
          menuItems={LEGISLATION_PAGE_FILTER_ITEMS.type}
          urlParamKey="type"
        />
      </PageFiltersContainer>
      <StatCardsContainer className="xl:grid-cols-3">
        {pageData.stats?.misuseOfDrugsAct && (
          <StatCard
            title="Misuse of Drugs Act"
            Icon={Scale}
            figure={pageData.stats.misuseOfDrugsAct.value}
            figureType="percentage"
            description="section 23 searches"
          />
        )}
        {pageData.stats?.paceSection1 && (
          <StatCard
            title="PACE section 1"
            Icon={FileText}
            figure={pageData.stats.paceSection1.value}
            figureType="percentage"
            description="stolen / prohibited articles"
          />
        )}
        {pageData.stats?.section60 && (
          <StatCard
            title="Section 60"
            Icon={ShieldAlert}
            figure={pageData.stats.section60.value}
            figureType="percentage"
            description="no-suspicion searches"
          />
        )}
      </StatCardsContainer>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RankedBarList
            title="Powers used"
            subTitle="Searches by legislation"
            Icon={<Scale className="size-4" />}
            items={powersUsedCounts}
          />
          <RankedBarList
            title="Object of search"
            subTitle="What officers were searching for"
            Icon={<Package className="size-4" />}
            items={objectOfSearchCounts}
          />
        </div>
        <MultiSeriesTrendChart
          className="h-auto"
          title="Legislation over time"
          subTitle="Monthly searches by power used"
          Icon={<TrendingUp className="size-4" />}
          defaultMode="trend"
          data={legislationOverTime}
          series={legislationSeries}
        />
        <DataTable
          title="Object of search effectiveness"
          subTitle="How often the outcome was linked to what was searched for"
          Icon={<Target className="size-4" />}
          data={pageData.tableData ?? []}
          columns={LEGISLATION_TABLE_COLUMNS}
          searchable
        />
      </div>
    </>
  );
}

export default decorateWithSuspense(LegislationVisualizations);
