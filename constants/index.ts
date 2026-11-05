import { PageFilters, PageFilterWidths } from "@/components/PageFilters/types";
import { StopAndSearchType } from "@/types/stop-and-search";

export const MAX_AVAILABILITY_MONTH_RANGE = 12;
export const API_KNOWN_BURST_LIMIT = 3;
export const API_BURST_MITIGATION_DELAY = 500; // ms
export const API_RATE_LIMIT_RETRY_DELAY = 1000; // ms
export const API_RATE_LIMIT_MAX_RETRIES = 4;

export const GLOBAL_ALL_FILTER_VALUE = "all";
export const ERROR_STATE_DESCRIPTION =
  "The police data couldn't be loaded. This is usually temporary, so please try refreshing.";
export const NOT_RECORDED_LABEL = "Not recorded";

export const MAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const MAP_THUMBNAIL_ZOOM = 15;
export const MAP_DIALOG_ZOOM = 16;

export const TABLE_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
export const DEFAULT_TABLE_PAGE_SIZE = 10;

export const TABLE_SEARCHES_COLUMN = {
  key: "searches",
  header: "Searches",
  format: "number",
} as const;
export const TABLE_SHARE_COLUMN = {
  key: "share",
  header: "Share",
  format: "share",
} as const;
export const TABLE_ARREST_RATE_COLUMN = {
  key: "arrestRate",
  header: "Arrest rate",
  format: "percentage",
} as const;

export const CARD_ICON_CHIP_CLASSNAME =
  "flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground";

// The theme only defines 5 steps of a single hue (see @components.json /
// @app/globals.css), so it's a sequential ramp, not a true categorical
// palette - adjacent steps (e.g. chart-2/chart-3) sit under the CVD and
// normal-vision separation floor (validated with the dataviz skill's
// validate_palette.js). Natural chart-1..5 order, for sequential/magnitude use.
export const CHART_SERIES_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

// Same 5 steps, reordered by perceptual distance (endpoints first, then the
// midpoint, then the remaining quartiles) so that charts using only the
// first 2-4 colors - the common case - get the most distinguishable subset
// instead of neighbouring, near-identical ramp steps. Use this (not
// CHART_SERIES_COLORS) whenever color is carrying category identity for
// >= 2 simultaneously-visible series (donut slices, trend chart series).
export const CHART_CATEGORICAL_COLORS = [
  CHART_SERIES_COLORS[0],
  CHART_SERIES_COLORS[4],
  CHART_SERIES_COLORS[2],
  CHART_SERIES_COLORS[1],
  CHART_SERIES_COLORS[3],
] as const;

export const CHART_EMPHASIS_COLOR = CHART_SERIES_COLORS[0];
// The widest-spaced pair in the ramp (chart-1 vs chart-5), for the
// "emphasis" form: one highlighted series against a de-emphasized rest.
export const CHART_MUTED_COLOR = CHART_SERIES_COLORS[4];

export const ALL_MONTHS_FILTER_ITEM = {
  label: "All available months",
  value: "all",
};

export const PAGE_FILTER_WIDTHS = {
  type: "w-48",
  gender: "w-30",
  age_range: "w-30",
  officer_defined_ethnicity: "w-30",
  outcome: "w-50",
  object_of_search: "w-62",
  legislation: "w-90",
} as const satisfies Partial<PageFilterWidths>;

export const DAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

// Chart display order (week starts Monday), derived from DAY_LABELS
// (indexed by Date#getDay(), which starts Sunday)
export const WEEK_DAY_CHART_ORDER = [...DAY_LABELS.slice(1), DAY_LABELS[0]];

export const AGE_RANGE_CHART_CATEGORIES = [
  "under 10",
  "10-17",
  "18-24",
  "25-34",
  "over 34",
  "Not recorded",
] as const;

export const HOUR_OF_DAY_CHART_CATEGORIES = Array.from(
  { length: 24 },
  (_, hour) => String(hour)
);

// Shared across the Overview and Search Types pages' "over time" / split
// charts, both of which break the `type` field down the same way.
export const SEARCH_TYPE_SERIES = [
  { key: "personSearch", label: "Person search", match: "Person search" },
  {
    key: "personAndVehicleSearch",
    label: "Person and Vehicle search",
    match: "Person and Vehicle search",
  },
  { key: "vehicleSearch", label: "Vehicle search", match: "Vehicle search" },
] as const satisfies readonly {
  key: string;
  label: string;
  match: StopAndSearchType;
}[];

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
