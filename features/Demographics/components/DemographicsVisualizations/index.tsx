import { Baby, User, Users } from "lucide-react";

import StatCard from "@/components/StatCard";
import StatCardsContainer from "@/components/StatCardsContainer";
import decorateWithSuspense from "@/utils/decorateWithSuspense";
import PageFiltersContainer from "@/components/PageFiltersContainer";
import PageFilters from "@/components/PageFilters";
import { DemographicsVisualizationsProps } from "./types";
import { DEMOGRAPHICS_FILTER_ITEMS, PAGE_FILTER_WIDTHS } from "@/constants";
import getStopData from "@/utils/getStopData";
import getRawStopData from "@/utils/getRawStopData";
import { formatPercentage } from "@/utils/formatNumber";
import PageDataDirector from "@/lib/PageData/PageDataDirector";
import DemographicsPageBuilder from "../../lib/DemographicsPageBuilder";

async function DemographicsVisualizations({
  searchParams,
  monthFilterMenuItems,
  monthRange,
}: DemographicsVisualizationsProps) {
  const {
    date = monthFilterMenuItems[0].value,
    gender = DEMOGRAPHICS_FILTER_ITEMS.gender[0].label,
    age_range = DEMOGRAPHICS_FILTER_ITEMS.age_range[0].label,
    officer_defined_ethnicity = DEMOGRAPHICS_FILTER_ITEMS
      .officer_defined_ethnicity[0].label,
  } = await searchParams;

  const stopData = await getStopData(monthRange);
  const rawStopData = getRawStopData(stopData, date);

  const dataBuilder = new DemographicsPageBuilder(rawStopData, {
    gender,
    age_range,
    officer_defined_ethnicity,
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
      <pre>{JSON.stringify(pageData, null, 3)}</pre>
    </>
  );
}

export default decorateWithSuspense(DemographicsVisualizations);
