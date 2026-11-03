import { Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ForceBadgeProps } from "./types";

export default function ForceBadge({ name, id }: ForceBadgeProps) {
  return (
    <Badge
      className="flex flex-col px-3 text-sm max-sm:border-none max-sm:[background:none]! sm:flex-row"
      variant="outline"
    >
      <span className="flex items-center">
        <Shield className="size-6 pr-1 text-primary" />
        <span className="font-bold">{name} Police</span>
      </span>
      <span className="self-start text-xs font-normal sm:self-center sm:text-sm sm:before:pr-1 sm:before:content-['·'/'']">
        Force ID: {id}
      </span>
    </Badge>
  );
}
