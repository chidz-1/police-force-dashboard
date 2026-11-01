import { z } from "zod";
import { YearMonth } from "./crimes-street-dates";

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
export type StopAndSearchDatesRecord = Record<YearMonth, StopAndSearch[]>;
