import { LucideIcon } from "lucide-react";
import React from "react";

export type StatCardFigureCombinations =
  | { figureType: "plain-number"; figure: number }
  | { figureType: "percentage"; figure: number }
  | { figureType: "text"; figure: string };

export type StatCardProps = React.ComponentProps<"div"> & {
  title: string;
  description?: string;
  Icon: LucideIcon;
} & StatCardFigureCombinations;
