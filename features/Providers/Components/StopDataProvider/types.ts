import { StopAndSearchDatesRecord } from "@/types/stop-and-search";
import React from "react";

export type StopDataContextType = StopAndSearchDatesRecord;

export interface StopDataProviderProps {
  stopsData: StopAndSearchDatesRecord;
  children: React.ReactNode;
}
