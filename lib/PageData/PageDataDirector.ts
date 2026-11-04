import { StopAndSearch } from "@/types/stop-and-search";
import { PageDataBuilder, PageDataProduct } from "./types";

export default class PageDataDirector<
  TStatKey extends string,
  TStopKey extends keyof StopAndSearch,
  TTableRow,
> {
  private _builder: PageDataBuilder<TStatKey, TStopKey, TTableRow>;

  constructor(initBuilder: PageDataBuilder<TStatKey, TStopKey, TTableRow>) {
    this._builder = initBuilder;
  }

  getFullPageData(): PageDataProduct<TStatKey, TStopKey, TTableRow> {
    const builder = this._builder;
    builder.setStats();
    builder.setChartData();
    builder.setTableData();
    return builder.getProduct();
  }
}
