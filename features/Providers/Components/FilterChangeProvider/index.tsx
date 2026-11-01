"use client";

import { createContext, useMemo, useTransition } from "react";
import { FilterChangeContextType, FilterChangeProviderProps } from "./types";

export const FilterChangeContext = createContext<FilterChangeContextType>(null);

export function FilterChangeProvider({ children }: FilterChangeProviderProps) {
  const [isPending, startTransition] = useTransition();

  const memoizedValue = useMemo(
    () => ({ isPending, startTransition }),
    [isPending, startTransition]
  );

  return (
    <FilterChangeContext.Provider value={memoizedValue}>
      {children}
    </FilterChangeContext.Provider>
  );
}
