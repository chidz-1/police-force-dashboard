import { PageFilters } from "@/components/PageFilters/types";

export const MAX_AVAILABILITY_MONTH_RANGE = 12;
export const API_KNOWN_BURST_LIMIT = 3;
export const API_BURST_MITIGATION_DELAY = 300; // ms

export const GLOBAL_ALL_FILTER_VALUE = "all";

export const ALL_MONTHS_FILTER_ITEM = {
  label: "All available months",
  value: "all",
};

// Overview > Page Filters

export const OVERVIEW_FILTER_ITEMS = {
  type: [
    { label: "All search types", value: GLOBAL_ALL_FILTER_VALUE },
    { label: "Person search", value: "person" },
    { label: "Vehicle search", value: "vehicle" },
    { label: "Person and Vehicle search", value: "person-and-vehicle" },
  ],
  officer_defined_ethnicity: [
    { label: "All ethnicities", value: GLOBAL_ALL_FILTER_VALUE },
    { label: "White", value: "white" },
    { label: "Black", value: "black" },
    { label: "Asian", value: "asian" },
    { label: "Mixed", value: "mixed" },
    { label: "Other", value: "other" },
  ],
} as const satisfies Partial<PageFilters>;

// Search Types > Page Filters
