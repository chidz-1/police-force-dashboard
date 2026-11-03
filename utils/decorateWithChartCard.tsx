import React from "react";
import { LucideIcon } from "lucide-react";

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
  Icon?: LucideIcon;
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
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="mb-0 flex items-center gap-2 text-sm font-semibold">
              {Icon && <Icon className="size-4" />}
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
