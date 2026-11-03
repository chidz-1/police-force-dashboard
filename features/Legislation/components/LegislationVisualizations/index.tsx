import { FileText, Scale, ShieldAlert } from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { LegislationVisualizationsProps } from "./types";
import { LEGISLATION_PAGE_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import LegislationPageBuilder from "../../lib/LegislationPageBuilder";

async function LegislationVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: LegislationVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    legislation = LEGISLATION_PAGE_FILTER_ITEMS.legislation[0].label,
    object_of_search = LEGISLATION_PAGE_FILTER_ITEMS.object_of_search[0].label,
    type = LEGISLATION_PAGE_FILTER_ITEMS.type[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new LegislationPageBuilder(rawStopData, {
    legislation,
    object_of_search,
    type,
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
      <pre>{JSON.stringify(pageData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(LegislationVisualizations);
