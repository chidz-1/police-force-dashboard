import { RawStopAndSearchData } from "@/types/stop-and-search";
import { BaseOverviewPageSearchParams } from "../../types";

export interface OverviewChartsProps {
  filters: BaseOverviewPageSearchParams;
  rawStopData: RawStopAndSearchData;
}
