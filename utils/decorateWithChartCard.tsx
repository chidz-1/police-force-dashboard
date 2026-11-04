import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { CARD_ICON_CHIP_CLASSNAME } from "@/constants";
import { cn } from "cn";

export type ChartCardProps = {
  title: string;
  subTitle?: string;
  chartAction?: React.ReactNode;
  Icon?: React.ReactNode;
  // Defaults to h-full; standalone charts (no grid siblings) should pass "h-auto".
  className?: string;
};

export default function decorateWithChartCard<P extends object>(
  ComponentToDecorate: React.ComponentType<P>
) {
  return function WithChartCard({
    title,
    subTitle,
    chartAction,
    Icon,
    className = "h-full",
    ...baseComponentProps
  }: P & ChartCardProps) {
    return (
      <Card className={cn("px-4", className)}>
        <CardHeader>
          <CardTitle>
            <h2 className="mb-0 flex items-center gap-2 text-sm font-semibold">
              {Icon && <span className={CARD_ICON_CHIP_CLASSNAME}>{Icon}</span>}
              {title}
            </h2>
          </CardTitle>
          {subTitle && <CardDescription>{subTitle}</CardDescription>}
          {chartAction && <CardAction>{chartAction}</CardAction>}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-center">
          <ComponentToDecorate {...(baseComponentProps as P)} />
        </CardContent>
      </Card>
    );
  };
}
