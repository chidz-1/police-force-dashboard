import z from "zod";

export const yearMonthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

export const availabilityEntrySchema = z.object({
  date: yearMonthSchema,
  "stop-and-search": z.array(z.string()),
});

export const availabilityResponseSchema = z.array(availabilityEntrySchema);

export type YearMonth = z.infer<typeof yearMonthSchema>;
export type AvailabilityEntry = z.infer<typeof availabilityEntrySchema>;
export type AvailabilityHash = Record<YearMonth, AvailabilityEntry>;
