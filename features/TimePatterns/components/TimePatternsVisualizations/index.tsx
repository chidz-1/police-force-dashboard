import { Calendar, Clock, Moon, Sun } from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { TimePatternsVisualizationsProps } from "./types";
import { TIME_PATTERNS_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import { formatPercentage } from "@/utils/formatNumber";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import TimePatternsPageBuilder from "../../lib/TimePatternsPageBuilder";

async function TimePatternsVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: TimePatternsVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    type = TIME_PATTERNS_FILTER_ITEMS.type[0].label,
    object_of_search = TIME_PATTERNS_FILTER_ITEMS.object_of_search[0].label,
    outcome = TIME_PATTERNS_FILTER_ITEMS.outcome[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new TimePatternsPageBuilder(rawStopData, {
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
          menuItems={TIME_PATTERNS_FILTER_ITEMS.type}
          urlParamKey="type"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.object_of_search}
          value={object_of_search}
          menuItems={TIME_PATTERNS_FILTER_ITEMS.object_of_search}
          urlParamKey="object_of_search"
        />
        <PageFilters
          width={PAGE_FILTER_WIDTHS.outcome}
          value={outcome}
          menuItems={TIME_PATTERNS_FILTER_ITEMS.outcome}
          urlParamKey="outcome"
        />
      </PageFiltersContainer>
      <StatCardsContainer>
        {pageData.stats?.peakHour && (
          <StatCard
            title="Peak hour"
            Icon={Clock}
            figure={pageData.stats.peakHour.label ?? null}
            figureType="text"
            description={
              pageData.stats.peakHour.value != null
                ? `${formatPercentage(pageData.stats.peakHour.value)} of searches`
                : undefined
            }
          />
        )}
        {pageData.stats?.busiestDay && (
          <StatCard
            title="Busiest day"
            Icon={Calendar}
            figure={pageData.stats.busiestDay.label ?? null}
            figureType="text"
            description={
              pageData.stats.busiestDay.value != null
                ? `${formatPercentage(pageData.stats.busiestDay.value)} of searches`
                : undefined
            }
          />
        )}
        {pageData.stats?.nightTime && (
          <StatCard
            title="Night-time"
            Icon={Moon}
            figure={pageData.stats.nightTime.value}
            figureType="percentage"
            description="22:00 – 06:00"
          />
        )}
        {pageData.stats?.weekend && (
          <StatCard
            title="Weekend"
            Icon={Sun}
            figure={pageData.stats.weekend.value}
            figureType="percentage"
            description="Saturday & Sunday"
          />
        )}
      </StatCardsContainer>
      <pre>{JSON.stringify(pageData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(TimePatternsVisualizations);
