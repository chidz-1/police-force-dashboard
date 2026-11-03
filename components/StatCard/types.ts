import { LucideIcon } from "lucide-react";
import React from "react";

export type StatCardFigureCombinations =
  | { figureType: "plain-number"; figure: number | null }
  | { figureType: "percentage"; figure: number | null }
  | { figureType: "text"; figure: string | null };

export type StatCardProps = React.ComponentProps<"div"> & {
  title: string;
  description?: string;
  Icon: LucideIcon;
} & StatCardFigureCombinations;
