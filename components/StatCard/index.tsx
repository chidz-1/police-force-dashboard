import { formatNumber, formatPercentage } from "@/utils/formatNumber";
import { StatCardFigureCombinations, StatCardProps } from "./types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";

export default function StatCard(props: StatCardProps) {
  const {
    title,
    description,
    Icon,
    figure: _,
    figureType: __,
    ...divProps
  } = props;

  return (
    <Card {...divProps}>
      <CardHeader>
        <CardTitle>
          <h2 className="mb-0 text-sm font-semibold">{title}</h2>
        </CardTitle>
        <CardAction>{<Icon />}</CardAction>
      </CardHeader>
      <CardContent>
        <p className="mb-0 text-5xl font-bold">{formatFigure(props)}</p>
      </CardContent>
      {description && (
        <CardFooter>
          <p>{description}</p>
        </CardFooter>
      )}
    </Card>
  );
}

function formatFigure({ figure, figureType }: StatCardFigureCombinations) {
  switch (figureType) {
    case "plain-number":
      return formatNumber(figure);
    case "percentage":
      return formatPercentage(figure);
    case "text":
      return figure;
    default:
      ((_: never) => {
        throw new Error(`[StatCard] > [FormatFigure]: Unhandled case ${_}`);
      })(figureType);
  }
}
