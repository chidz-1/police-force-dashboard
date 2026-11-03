import { PageFilters } from "@/components/PageFilters/types";

export const MAX_AVAILABILITY_MONTH_RANGE = 12;
export const API_KNOWN_BURST_LIMIT = 3;
export const API_BURST_MITIGATION_DELAY = 300; // ms

export const GLOBAL_ALL_FILTER_VALUE = "all";

export const ALL_MONTHS_FILTER_ITEM = {
  label: "All available months",
  value: "all",
};

// Filter Items

export const TYPE_FILTER_ITEMS = [
  { label: "All search types", value: GLOBAL_ALL_FILTER_VALUE },
  { label: "Person search", value: "person" },
  { label: "Vehicle search", value: "vehicle" },
  { label: "Person and Vehicle search", value: "person-and-vehicle" },
] as const;

export const OFFICER_DEFINED_ETHNICITY_FILTER_ITEMS = [
  { label: "All ethnicities", value: GLOBAL_ALL_FILTER_VALUE },
  { label: "White", value: "white" },
  { label: "Black", value: "black" },
  { label: "Asian", value: "asian" },
  { label: "Mixed", value: "mixed" },
  { label: "Other", value: "other" },
] as const;

export const GENDER_FILTER_ITEMS = [
  { label: "All genders", value: GLOBAL_ALL_FILTER_VALUE },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
] as const;

export const OUTCOME_FILTER_ITEMS = [
  { label: "All outcomes", value: GLOBAL_ALL_FILTER_VALUE },
  { label: "Arrest", value: "arrest" },
  { label: "A no further action disposal", value: "no-further-action" },
  { label: "Community resolution", value: "community-resolution" },
] as const;

export const AGE_RANGE_FILTER_ITEMS = [
  { label: "All ages", value: GLOBAL_ALL_FILTER_VALUE },
  { label: "Under 10", value: "under-10" },
  { label: "10-17", value: "10-17" },
  { label: "18-24", value: "18-24" },
  { label: "25-34", value: "25-34" },
  { label: "Over 34", value: "over-34" },
] as const;

export const OBJECT_OF_SEARCH_FILTER_ITEMS = [
  { label: "All objects of search", value: GLOBAL_ALL_FILTER_VALUE },
  { label: "Controlled drugs", value: "controlled-drugs" },
  { label: "Offensive weapons", value: "offensive-weapons" },
  { label: "Article for use in theft", value: "article-for-use-in-theft" },
  { label: "Stolen goods", value: "stolen-goods" },
  {
    label: "Articles for use in criminal damage",
    value: "articles-for-use-in-criminal-damage",
  },
  {
    label: "Evidence of offences under the Act",
    value: "evidence-of-offences-under-the-act",
  },
  {
    label: "Anything to threaten or harm anyone",
    value: "anything-to-threaten-or-harm-anyone",
  },
  { label: "Firearms", value: "firearms" },
  { label: "Psychoactive substances", value: "psychoactive-substances" },
] as const;

export const LEGISLATION_FILTER_ITEMS = [
  { label: "All legislation", value: GLOBAL_ALL_FILTER_VALUE },
  {
    label: "Misuse of Drugs Act 1971 (section 23)",
    value: "misuse-of-drugs-act-1971-section-23",
  },
  {
    label: "Police and Criminal Evidence Act 1984 (section 1)",
    value: "police-and-criminal-evidence-act-1984-section-1",
  },
  {
    label: "Firearms Act 1968 (section 47)",
    value: "firearms-act-1968-section-47",
  },
  {
    label: "Criminal Justice and Public Order Act 1994 (section 60)",
    value: "criminal-justice-and-public-order-act-1994-section-60",
  },
] as const;

// Overview > Page Filters

export const OVERVIEW_FILTER_ITEMS = {
  type: TYPE_FILTER_ITEMS,
  officer_defined_ethnicity: OFFICER_DEFINED_ETHNICITY_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;

// Search Types > Page Filters

export const SEARCH_TYPES_FILTER_ITEMS = {
  type: TYPE_FILTER_ITEMS,
  gender: GENDER_FILTER_ITEMS,
  outcome: OUTCOME_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;

// Legislation > Page Filters
// Named with a `_PAGE_` suffix to avoid colliding with LEGISLATION_FILTER_ITEMS above.

export const LEGISLATION_PAGE_FILTER_ITEMS = {
  legislation: LEGISLATION_FILTER_ITEMS,
  object_of_search: OBJECT_OF_SEARCH_FILTER_ITEMS,
  type: TYPE_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;

// Demographics > Page Filters

export const DEMOGRAPHICS_FILTER_ITEMS = {
  gender: GENDER_FILTER_ITEMS,
  age_range: AGE_RANGE_FILTER_ITEMS,
  officer_defined_ethnicity: OFFICER_DEFINED_ETHNICITY_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;

// Outcomes > Page Filters

export const OUTCOMES_FILTER_ITEMS = {
  outcome: OUTCOME_FILTER_ITEMS,
  object_of_search: OBJECT_OF_SEARCH_FILTER_ITEMS,
  officer_defined_ethnicity: OFFICER_DEFINED_ETHNICITY_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;

// Locations > Page Filters

export const LOCATIONS_FILTER_ITEMS = {
  type: TYPE_FILTER_ITEMS,
  object_of_search: OBJECT_OF_SEARCH_FILTER_ITEMS,
  outcome: OUTCOME_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;

// Time Patterns > Page Filters

export const TIME_PATTERNS_FILTER_ITEMS = {
  type: TYPE_FILTER_ITEMS,
  object_of_search: OBJECT_OF_SEARCH_FILTER_ITEMS,
  outcome: OUTCOME_FILTER_ITEMS,
} as const satisfies Partial<PageFilters>;
