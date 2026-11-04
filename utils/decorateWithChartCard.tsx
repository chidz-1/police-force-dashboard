import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";

export type ChartCardProps = {
  title: string;
  subTitle?: string;
  chartAction?: React.ReactNode;
  // A pre-rendered icon element (e.g. <TrendingUp className="size-4" />),
  // not a component reference: a component reference can't cross the
  // server -> client boundary, since every chart card is "use client".
  Icon?: React.ReactNode;
};

export default function decorateWithChartCard<P extends object>(
  ComponentToDecorate: React.ComponentType<P>
) {
  return function WithChartCard({
    title,
    subTitle,
    chartAction,
    Icon,
    ...baseComponentProps
  }: P & ChartCardProps) {
    return (
      <Card className="px-4">
        <CardHeader>
          <CardTitle>
            <h2 className="mb-0 flex items-center gap-2 text-sm font-semibold">
              {Icon}
              {title}
            </h2>
          </CardTitle>
          {subTitle && <CardDescription>{subTitle}</CardDescription>}
          {chartAction && <CardAction>{chartAction}</CardAction>}
        </CardHeader>
        <CardContent>
          <ComponentToDecorate {...(baseComponentProps as P)} />
        </CardContent>
      </Card>
    );
  };
}
