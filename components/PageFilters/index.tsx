"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { cn } from "cn";

import { PageFiltersProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PAGE_FILTER_DEFAULT_WIDTH } from "@/constants";
import { useFilterChange } from "@/features/Providers/hooks/useFilterChange";

function PageFilters({
  value,
  menuItems,
  urlParamKey,
  width = PAGE_FILTER_DEFAULT_WIDTH,
}: PageFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPending, startTransition } = useFilterChange();

  return (
    <Select
      items={menuItems}
      value={value}
      disabled={isPending}
      onValueChange={(newValue) => {
        if (newValue === null) return;
        const params = new URLSearchParams(searchParams);
        params.set(urlParamKey, newValue);
        startTransition(() => {
          router.push(`${pathname}?${params}`);
        });
      }}
    >
      <SelectTrigger
        className={cn(
          "rounded-full font-medium",
          width,
          "data-pending:pointer-events-none data-pending:opacity-50"
        )}
        data-pending={isPending || undefined}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {menuItems.map(({ label, value }) => {
          return (
            <SelectItem
              key={value}
              value={urlParamKey !== "date" ? label : value}
            >
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default PageFilters;
