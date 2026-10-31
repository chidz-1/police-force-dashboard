## Data Schema

Source: Police API (https://data.police.uk/docs/). No authentication. All responses are JSON arrays.
Shapes below were checked against live responses, not just the docs — where the two disagree, the live behaviour wins and is called out.

### Source of truth: Zod schemas

- **Zod schemas are the single source of truth** for every API shape. Define them in one module: `src/lib/police-api/schemas.ts`.
- **Never hand-write a TypeScript `interface` or `type` for an API shape.** Derive every type from its schema:
  - `z.infer<typeof schema>` — the validated type (identical to `z.output`).
  - `z.input<typeof schema>` / `z.output<typeof schema>` — use both explicitly only when a schema has a transform and the two differ.
- Parse every response at the fetch boundary with `schema.parse()` (or `safeParse()` where a failure should degrade gracefully). Never cast API responses with `as`.
- Schemas describe the **raw API shape only** — no transforms. Parsing (string coordinates → numbers, `datetime` → `Date`, snake_case → camelCase) happens in a separate mapping layer that produces view models; types for those view models are inferred from the mapper's return type, not hand-written.
- If a hand-written type is ever unavoidable, it must be checked against the schema with `satisfies z.ZodType<T>` so the two cannot drift.

### Conventions

- **Month format**: every `date` value and `date` query param is `YYYY-MM` (e.g. `2024-01`).
- **Force IDs**: kebab-case slugs (e.g. `leicestershire`, `avon-and-somerset`, `btp`). Validate as `z.string()`; do not use a closed enum, as the set of reporting forces changes month to month.
- **Coordinates are strings**, not numbers (`"52.625780"`).
- **Nullability is real**: fields marked nullable below are observed as `null` in live data. Use `.nullable()`, not `.optional()` — the key is always present, the value is `null`.
- **Categorical fields**: only `type` is a fixed, documented set and uses `z.enum`. Other categorical fields (gender, age range, ethnicity, outcome ID) use `z.string()` so an unseen value never fails validation. Their known values are listed in the tables for use in UI code (labels, colour scales, filter options) — define those as `as const` arrays in UI code, not in the schemas.

---

### 1. Availability

`GET https://data.police.uk/api/crimes-street-dates`

Lists which months have data, and which forces supplied stop and search data for each month.

**Response**: array of entries, ordered newest month first.

| Field             | Type       | Nullable | Notes                                                                 |
| ----------------- | ---------- | -------- | --------------------------------------------------------------------- |
| `date`            | `string`   | No       | `YYYY-MM`. Month for which street-level crime data exists.            |
| `stop-and-search` | `string[]` | No       | Force IDs that supplied stop and search data for that month. May be empty. |

Behavioural notes:
- The key is `stop-and-search` (hyphenated) — it must be quoted in the schema and accessed with bracket notation until the mapping layer renames it.
- Covers a rolling ~36-month window (observed: `2023-09` to `2026-08` as of Oct 2026). Older months drop off.
- A force present in one month can be missing the next (e.g. `metropolitan` absent from some months). **Always** check this list before requesting a force/month pair.

```ts
import { z } from "zod";

export const yearMonthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

export const availabilityEntrySchema = z.object({
  date: yearMonthSchema,
  "stop-and-search": z.array(z.string()),
});

export const availabilityResponseSchema = z.array(availabilityEntrySchema);

export type YearMonth = z.infer<typeof yearMonthSchema>;
export type AvailabilityEntry = z.infer<typeof availabilityEntrySchema>;
```

---

### 2. Stop and searches by force

`GET https://data.police.uk/api/stops-force?force={forceId}&date={YYYY-MM}`

| Param   | Required | Notes                                                                                                           |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `force` | Yes      | Force ID from the availability response.                                                                        |
| `date`  | No       | `YYYY-MM`. If omitted, defaults to the latest month **even if that force has no data for it** — so always pass it explicitly, using a value from availability. |

**Response**: array of stop and search records. An empty array is a valid response.

| Field                                 | Type               | Nullable | Notes |
| ------------------------------------- | ------------------ | -------- | ----- |
| `type`                                | enum               | No       | `"Person search"` \| `"Vehicle search"` \| `"Person and Vehicle search"` |
| `involved_person`                     | `boolean`          | No       | Derived from `type`; `true` unless `type` is `"Vehicle search"`. |
| `datetime`                            | `string`           | No       | ISO 8601 with offset, e.g. `2024-01-06T22:45:00+00:00`. Some forces supply date only, producing a spike at `00:00` — account for this in time-of-day charts. |
| `operation`                           | `boolean`          | Yes      | Whether part of a policing operation. Usually `null`. |
| `operation_name`                      | `string`           | Yes      | Usually `null`. |
| `location`                            | object             | Yes      | **Null for a meaningful share of records.** Filter before plotting on a map; count separately as "no location". Locations are anonymised approximations, not exact points. |
| `gender`                              | `string`           | Yes      | Known: `"Male"`, `"Female"`, `"Other"`. |
| `age_range`                           | `string`           | Yes      | Known: `"under 10"`, `"10-17"`, `"18-24"`, `"25-34"`, `"over 34"`. |
| `self_defined_ethnicity`              | `string`           | Yes      | Long-form census-style label, e.g. `"White - English/Welsh/Scottish/Northern Irish/British"`, `"Other ethnic group - Not stated"`. |
| `officer_defined_ethnicity`           | `string`           | Yes      | Known: `"White"`, `"Black"`, `"Asian"`, `"Mixed"`, `"Other"`. |
| `legislation`                         | `string`           | Yes      | Power used, e.g. `"Police and Criminal Evidence Act 1984 (section 1)"`. Frequently `null`. |
| `object_of_search`                    | `string`           | Yes      | Reason for search, e.g. `"Controlled drugs"`, `"Offensive weapons"`, `"Article for use in theft"`, `"Stolen goods"`, `"Articles for use in criminal damage"`, `"Evidence of offences under the Act"`. |
| `outcome`                             | `string \| false`  | No       | Human-readable outcome, e.g. `"A no further action disposal"`, `"Arrest"`, `"Community resolution"`. **`""` (empty string) means no outcome provided** (observed). Docs also say `false` if nothing found — allowed defensively. |
| `outcome_object`                      | object             | No*      | Machine-readable outcome. When no outcome is provided it is `{ id: "", name: "" }`, not `null`. *Nullable defensively. |
| `outcome_linked_to_object_of_search`  | `boolean`          | Yes      | `null` if not provided (common, e.g. most no-further-action records). |
| `removal_of_more_than_outer_clothing` | `boolean`          | Yes      | `null` if not provided. |

Nested objects:

| Object           | Field       | Type     | Notes |
| ---------------- | ----------- | -------- | ----- |
| `location`       | `latitude`  | `string` | Numeric string. |
|                  | `longitude` | `string` | Numeric string. |
|                  | `street`    | object   | `{ id: number; name: string }`. `name` is a summary like `"On or near Parking Area"`, not a real address. |
| `outcome_object` | `id`        | `string` | Slug, e.g. `"bu-arrest"`, `"bu-no-further-action"`, `"bu-community-resolution"`. `""` when no outcome. **Use `id` (not `outcome`) for grouping/filtering.** |
|                  | `name`      | `string` | Display label; mirrors `outcome`. |

```ts
import { z } from "zod";

export const stopAndSearchTypeSchema = z.enum([
  "Person search",
  "Vehicle search",
  "Person and Vehicle search",
]);

export const streetSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const stopAndSearchLocationSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
  street: streetSchema,
});

export const stopAndSearchOutcomeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const stopAndSearchSchema = z.object({
  type: stopAndSearchTypeSchema,
  involved_person: z.boolean(),
  datetime: z.string(), // ISO 8601 with offset; converted to Date in the mapping layer
  operation: z.boolean().nullable(),
  operation_name: z.string().nullable(),
  location: stopAndSearchLocationSchema.nullable(),
  gender: z.string().nullable(),
  age_range: z.string().nullable(),
  self_defined_ethnicity: z.string().nullable(),
  officer_defined_ethnicity: z.string().nullable(),
  legislation: z.string().nullable(),
  object_of_search: z.string().nullable(),
  outcome: z.union([z.string(), z.literal(false)]),
  outcome_object: stopAndSearchOutcomeSchema.nullable(),
  outcome_linked_to_object_of_search: z.boolean().nullable(),
  removal_of_more_than_outer_clothing: z.boolean().nullable(),
});

export const stopsForceResponseSchema = z.array(stopAndSearchSchema);

export type StopAndSearchType = z.infer<typeof stopAndSearchTypeSchema>;
export type StopAndSearchLocation = z.infer<typeof stopAndSearchLocationSchema>;
export type StopAndSearchOutcome = z.infer<typeof stopAndSearchOutcomeSchema>;
export type StopAndSearch = z.infer<typeof stopAndSearchSchema>;
```

### Rules for working with this data

- Treat "no outcome" as `outcome === "" || outcome === false || !outcome_object?.id` — check all three.
- Never request a force/month pair without first confirming it exists in the availability response.
- Don't use `.strict()` on these schemas — the API is unversioned and may add fields; unknown keys should be stripped, not rejected.
