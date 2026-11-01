"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { PageFiltersProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import wrapWithSuspense from "@/utils/decorateWithSuspense";
import { useFilterChange } from "@/features/Providers/Components/FilterChangeProvider/hooks/useFilterChange";

function PageFilters({
  value,
  menuItems,
  urlParamKey,
  width = "w-40",
}: PageFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPending, startTransition } = useFilterChange();

  return (
    <Select
      items={menuItems}
      value={value}
      onValueChange={(newValue) => {
        if (newValue === null) return;
        const params = new URLSearchParams(searchParams);
        params.set(urlParamKey, newValue);
        startTransition(() => {
          router.push(`${pathname}?${params}`);
        });
      }}
    >
      <SelectTrigger className={width} data-pending={isPending || undefined}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {menuItems.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default wrapWithSuspense(PageFilters);
