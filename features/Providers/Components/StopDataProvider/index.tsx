"use client";

import { createContext } from "react";

import { StopDataContextType, StopDataProviderProps } from "./types";

export const StopDataContext = createContext<StopDataContextType | null>(null);

export default function StopDataProvider({
  stopsData,
  children,
}: StopDataProviderProps) {
  return (
    <StopDataContext.Provider value={stopsData}>
      {children}
    </StopDataContext.Provider>
  );
}
