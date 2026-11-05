"use client";

import { useTransition } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CARD_ICON_CHIP_CLASSNAME,
  ERROR_STATE_DESCRIPTION,
  STATUS_PAGE_CLASSNAME,
} from "@/constants";
import { cn } from "cn";
import { ErrorStateProps } from "./types";

export default function ErrorState({
  title,
  description = ERROR_STATE_DESCRIPTION,
  retry,
  className,
}: ErrorStateProps) {
  const [isRetrying, startRetry] = useTransition();

  return (
    <div role="alert" className={cn(STATUS_PAGE_CLASSNAME, className)}>
      <span className={cn(CARD_ICON_CHIP_CLASSNAME, "size-12")}>
        <TriangleAlert className="size-6" />
      </span>
      <div>
        <h1>{title}</h1>
        <p className="mb-0 text-muted-foreground">{description}</p>
      </div>
      <Button
        size="lg"
        disabled={isRetrying}
        onClick={() => startRetry(() => retry())}
      >
        <RefreshCw
          data-icon="inline-start"
          className={cn(isRetrying && "animate-spin")}
        />
        Refresh page
      </Button>
    </div>
  );
}
