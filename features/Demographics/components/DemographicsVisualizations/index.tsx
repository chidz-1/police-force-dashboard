import { Baby, CalendarRange, TrendingUp, User, Users } from "lucide-react";

import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import DonutStat from "@/components/charts/DonutStat";
import CategoryBarChart from "@/components/charts/CategoryBarChart";
import RankedBarList from "@/components/charts/RankedBarList";
import MultiSeriesTrendChart from "@/components/charts/MultiSeriesTrendChart";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { DemographicsVisualizationsProps } from "./types";
import {
  DEMOGRAPHICS_FILTER_ITEMS,
  PAGE_FILTER_WIDTHS,
  AGE_RANGE_CHART_CATEGORIES,
} from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import { formatPercentage } from "@/utils/formatNumber";
import aggregateByMonth from "@/utils/aggregateByMonth";
import getRankedCounts from "@/utils/getRankedCounts";
import getCategoryCounts from "@/utils/getCategoryCounts";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import DemographicsPageBuilder from "../../lib/DemographicsPageBuilder";
import {
  TOP_ETHNICITY_SERIES_COUNT,
  DEMOGRAPHICS_TABLE_COLUMNS,
} from "../../constants";

async function DemographicsVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: DemographicsVisualizationsProps) {
  // Must stay above searchParams so the data is captured at build time
  const stopData = await getStopData(monthRange);

  const {
    date = monthFilterMenuItems[0].value,
    gender = DEMOGRAPHICS_FILTER_ITEMS.gender[0].label,
    age_range = DEMOGRAPHICS_FILTER_ITEMS.age_range[0].label,
    officer_defined_ethnicity = DEMOGRAPHICS_FILTER_ITEMS
      .officer_defined_ethnicity[0].label,
  } = await searchParams;

  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new DemographicsPageBuilder(rawStopData, {
    gender,
    age_range,
    officer_defined_ethnicity,
  });

  const pageDataDirector = new PageDataDirector(dataBuilder);
  const pageData = pageDataDirector.getFullPageData();
  const chartData = pageData.chartData ?? [];

  const genderCounts = getRankedCounts(
    chartData,
    (record) => record.gender ?? "Not recorded"
  ).sort((a, b) => b.value - a.value);

  const ageRangeCounts = getCategoryCounts(
    chartData,
    AGE_RANGE_CHART_CATEGORIES,
    (record) => record.age_range ?? "Not recorded"
  );

  const ethnicityCounts = getRankedCounts(
    chartData,
    (record) => record.officer_defined_ethnicity ?? "Not recorded"
  );

  const ethnicitySeries = ethnicityCounts
    .slice(0, TOP_ETHNICITY_SERIES_COUNT)
    .map(({ label }, index) => ({ key: `ethnicity${index}`, label }));

  const ethnicityOverTime = aggregateByMonth(
    chartData,
    ethnicitySeries.map(({ key, label }) => ({
      key,
      match: (record) =>
        (record.officer_defined_ethnicity ?? "Not recorded") === label,
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
          width={PAGE_FILTER_WIDTHS.gender}
          value={gender}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.gender}
          urlParamKey="gender"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.age_range}
          value={age_range}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.age_range}
          urlParamKey="age_range"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.officer_defined_ethnicity}
          value={officer_defined_ethnicity}
          menuItems={DEMOGRAPHICS_FILTER_ITEMS.officer_defined_ethnicity}
          urlParamKey="officer_defined_ethnicity"
        />
      </PageFiltersContainer>
      <StatCardsContainer className="xl:grid-cols-3">
        {pageData.stats?.male && (
          <StatCard
            title="Male"
            Icon={User}
            figure={pageData.stats.male.value}
            figureType="percentage"
            description="of people searched"
          />
        )}
        {pageData.stats?.agedTenToSeventeen && (
          <StatCard
            title="Aged 10-17"
            Icon={Baby}
            figure={pageData.stats.agedTenToSeventeen.value}
            figureType="percentage"
            description="children searched"
          />
        )}
        {pageData.stats?.largestGroup && (
          <StatCard
            title="Largest group"
            Icon={Users}
            figure={pageData.stats.largestGroup.label ?? null}
            figureType="text"
            description={
              pageData.stats.largestGroup.value != null
                ? `${formatPercentage(pageData.stats.largestGroup.value)} of searches`
                : undefined
            }
          />
        )}
      </StatCardsContainer>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DonutStat
            title="Gender"
            subTitle="Gender of person searched"
            Icon={<User className="size-4" />}
            centerLabel="Searches"
            data={genderCounts}
          />
          <div className="md:col-span-2">
            <CategoryBarChart
              title="Age range"
              subTitle="Age band of person searched"
              Icon={<CalendarRange className="size-4" />}
              data={ageRangeCounts}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <RankedBarList
            className="h-auto"
            title="Officer-defined ethnicity"
            subTitle="As recorded by the officer"
            Icon={<Users className="size-4" />}
            items={ethnicityCounts}
          />
        </div>
        <MultiSeriesTrendChart
          className="h-auto"
          title="Ethnicity over time"
          subTitle="Monthly searches by officer-defined ethnicity"
          Icon={<TrendingUp className="size-4" />}
          defaultMode="stacked"
          data={ethnicityOverTime}
          series={ethnicitySeries}
        />
        <DataTable
          title="Ethnicity breakdown"
          subTitle="Profile and outcomes for each officer-defined ethnicity"
          Icon={<Users className="size-4" />}
          data={pageData.tableData ?? []}
          columns={DEMOGRAPHICS_TABLE_COLUMNS}
        />
      </div>
    </>
  );
}

export default decorateWithSuspense(DemographicsVisualizations);
