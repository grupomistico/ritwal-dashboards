import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?[+-]\d{2}:\d{2}$/;

const copInteger = z.number().int().safe().nonnegative();

export const dailySalesPointSchema = z.object({
  date: z.string().regex(isoDate),
  baseCop: copInteger,
  ticketCount: z.number().int().nonnegative(),
});

export const budgetPeriodSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  start: z.string().regex(isoDate),
  end: z.string().regex(isoDate),
  baseCop: copInteger,
  netCop: copInteger,
  tipsCop: copInteger,
  ticketCount: z.number().int().nonnegative(),
  rawDocumentCount: z.number().int().nonnegative(),
  excludedInvitationCount: z.number().int().nonnegative(),
  excludedAccountingCount: z.number().int().nonnegative(),
  excludedReturnCount: z.number().int().nonnegative(),
  daily: z.array(dailySalesPointSchema).length(18),
});

export const budgetProgressSnapshotSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.literal("budget-progress-2026-08-18"),
  dataMode: z.literal("certified-snapshot"),
  timezone: z.literal("America/Bogota"),
  generatedAt: z.string().regex(isoDateTime),
  businessAsOf: z.literal("2026-08-18"),
  autoRefresh: z.literal(false),
  freshness: z.array(z.object({
    source: z.string().min(1),
    asOf: z.string().regex(isoDate),
    lagSecondsAtGeneration: z.number().int().nonnegative(),
    status: z.enum(["fresh", "warning", "stale", "error"]),
  })).min(1),
  warnings: z.array(z.object({
    code: z.string().min(1),
    message: z.string().min(1),
  })),
  filters: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  data: z.object({
    currency: z.literal("COP"),
    targetCop: copInteger,
    previousMonthTargetCop: copInteger,
    previousYearTargetCop: z.null(),
    monthDays: z.literal(31),
    cutoffDay: z.literal(18),
    remainingDays: z.literal(13),
    current: budgetPeriodSchema,
    previousMonth: budgetPeriodSchema,
    previousYear: budgetPeriodSchema,
  }),
});

export type BudgetPeriod = z.infer<typeof budgetPeriodSchema>;
export type BudgetProgressSnapshot = z.infer<typeof budgetProgressSnapshotSchema>;
