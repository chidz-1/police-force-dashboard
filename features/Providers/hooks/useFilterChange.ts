"use client";

import { useContext } from "react";
import { FilterChangeContext } from "../Components/FilterChangeProvider";

export function useFilterChange() {
  const context = useContext(FilterChangeContext);

  if (!context) {
    throw new Error(
      "[useFilterChange] - this hook must be used within FilterChangeProvider"
    );
  }

  return context;
}
