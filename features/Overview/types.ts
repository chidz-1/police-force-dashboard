export interface BaseOverviewPageSearchParams {
  date: string;
  type: string;
  ethnicity: string;
}

export type OverviewPageSearchParams = Promise<
  Partial<BaseOverviewPageSearchParams>
>;
