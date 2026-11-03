import { StopAndSearch } from "@/types/stop-and-search";
import { PageDataBuilder, PageDataProduct } from "./types";

export default class PageDataDirector<
  TStatKey extends string,
  TStopKey extends keyof StopAndSearch,
> {
  private _builder: PageDataBuilder<TStatKey, TStopKey>;

  constructor(initBuilder: PageDataBuilder<TStatKey, TStopKey>) {
    this._builder = initBuilder;
  }

  getFullPageData(): PageDataProduct<TStatKey, TStopKey> {
    const builder = this._builder;
    builder.setStats();
    builder.setChartData();
    return builder.getProduct();
  }
}
