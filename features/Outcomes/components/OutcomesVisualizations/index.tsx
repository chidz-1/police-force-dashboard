import {
  ClipboardList,
  FileText,
  Gauge,
  Handshake,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import MultiSeriesTrendChart from "@/components/charts/MultiSeriesTrendChart";
import MeterChart from "@/components/charts/MeterChart";
import RankedBarList from "@/components/charts/RankedBarList";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { OutcomesVisualizationsProps } from "./types";
import { OUTCOMES_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import aggregateByMonth from "@/utils/aggregateByMonth";
import getRankedCounts from "@/utils/getRankedCounts";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import OutcomesPageBuilder from "../../lib/OutcomesPageBuilder";

const OUTCOME_TREND_SERIES = [
  { key: "arrest", label: "Arrest" },
  { key: "noFurtherAction", label: "No further action" },
  { key: "otherAction", label: "Other action" },
] as const;

function getOutcomeLabel(outcome: string | false): string | null {
  return outcome === "" || outcome === false ? null : outcome;
}

async function OutcomesVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: OutcomesVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    outcome = OUTCOMES_FILTER_ITEMS.outcome[0].label,
    object_of_search = OUTCOMES_FILTER_ITEMS.object_of_search[0].label,
    officer_defined_ethnicity = OUTCOMES_FILTER_ITEMS
      .officer_defined_ethnicity[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new OutcomesPageBuilder(rawStopData, {
    outcome,
    object_of_search,
    officer_defined_ethnicity,
  });

  const pageDataDirector = new PageDataDirector(dataBuilder);
  const pageData = pageDataDirector.getFullPageData();
  const chartData = pageData.chartData ?? [];

  const outcomesOverTime = aggregateByMonth(chartData, [
    { key: "arrest", match: (record) => record.outcome === "Arrest" },
    {
      key: "noFurtherAction",
      match: (record) => record.outcome === "A no further action disposal",
    },
    {
      key: "otherAction",
      match: (record) =>
        getOutcomeLabel(record.outcome) !== null &&
        record.outcome !== "Arrest" &&
        record.outcome !== "A no further action disposal",
    },
  ]);

  const actionTakenCount = chartData.filter(
    (record) =>
      getOutcomeLabel(record.outcome) !== null &&
      record.outcome !== "A no further action disposal"
  ).length;
  const noFurtherActionCount = chartData.filter(
    (record) => record.outcome === "A no further action disposal"
  ).length;

  const outcomeBreakdownCounts = getRankedCounts(chartData, (record) =>
    getOutcomeLabel(record.outcome)
  ).slice(0, 8);

  return (
    <>
      <PageFiltersContainer numOfResults={pageData.totalNumRecords}>
        <PageFilters
          value={date}
          menuItems={monthFilterMenuItems}
          urlParamKey="date"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={OUTCOMES_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={OUTCOMES_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.officer_defined_ethnicity}
          value={officer_defined_ethnicity}
          menuItems={OUTCOMES_FILTER_ITEMS.officer_defined_ethnicity}
          urlParamKey="officer_defined_ethnicity"
        />
      </PageFiltersContainer>
      <StatCardsContainer>
        {pageData.stats?.arrests && (
          <>
            <StatCard
              title="Arrests"
              Icon={ShieldAlert}
              figure={pageData.stats.arrests.count}
              figureType="plain-number"
            />
            <StatCard
              title="Arrest rate"
              Icon={FileText}
              figure={pageData.stats.arrests.value}
              figureType="percentage"
              description="of all searches"
            />
          </>
        )}
        {pageData.stats?.communityResolution && (
          <StatCard
            title="Community resolution"
            Icon={Handshake}
            figure={pageData.stats.communityResolution.value}
            figureType="percentage"
            description="resolved locally"
          />
        )}
        {pageData.stats?.noFurtherAction && (
          <StatCard
            title="No further action"
            Icon={ShieldCheck}
            figure={pageData.stats.noFurtherAction.value}
            figureType="percentage"
            description="of all searches"
          />
        )}
      </StatCardsContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <MultiSeriesTrendChart
            title="Outcomes over time"
            subTitle="Monthly arrests, other actions and no further action"
            Icon={<TrendingUp className="size-4" />}
            defaultMode="stacked"
            data={outcomesOverTime}
            series={OUTCOME_TREND_SERIES}
          />
        </div>
        <MeterChart
          title="Action taken"
          subTitle="Searches resulting in any outcome other than NFA"
          Icon={<Gauge className="size-4" />}
          centerLabel="Action taken"
          ratio={
            actionTakenCount + noFurtherActionCount
              ? actionTakenCount / (actionTakenCount + noFurtherActionCount)
              : 0
          }
          items={[
            { label: "Action taken", value: actionTakenCount },
            { label: "No further action", value: noFurtherActionCount },
          ]}
        />
      </div>
      <RankedBarList
        title="Outcome breakdown"
        subTitle="All recorded outcomes"
        Icon={<ClipboardList className="size-4" />}
        items={outcomeBreakdownCounts}
      />
    </>
  );
}

export default decorateWithSuspense(OutcomesVisualizations);
