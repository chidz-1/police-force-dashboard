import { PageFilters } from "@/components/PageFilters/types";

export const MAX_AVAILABILITY_MONTH_RANGE = 12;
export const API_BURST_MITIGATION_DELAY = 500; // ms

// Overview > Page Filters

export const OVERVIEW_FILTER_ITEMS = {
  types: [
    { label: "All search types", value: "all" },
    { label: "Person search", value: "person" },
    { label: "Vehicle search", value: "vehicle" },
    { label: "Person and Vehicle search", value: "person-and-vehicle" },
  ],
  ethnicities: [
    { label: "All ethnicities", value: "all" },
    { label: "White", value: "white" },
    { label: "Black", value: "black" },
    { label: "Asian", value: "asian" },
    { label: "Mixed", value: "mixed" },
    { label: "Other", value: "other" },
  ],
} as const satisfies PageFilters;
