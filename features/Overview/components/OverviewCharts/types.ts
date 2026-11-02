import { StopAndSearchDatesRecord } from "@/types/stop-and-search";
import { BaseOverviewPageSearchParams } from "../../types";

export interface OverviewChartsProps {
  filters: BaseOverviewPageSearchParams;
  stopData: StopAndSearchDatesRecord;
}
