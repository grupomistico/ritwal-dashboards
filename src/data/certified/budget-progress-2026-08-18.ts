import { budgetProgressSnapshotSchema, type BudgetPeriod } from "./budget-progress.schema";

const current: BudgetPeriod = {
  id: "august-2026",
  label: "Agosto 2026",
  start: "2026-08-01",
  end: "2026-08-18",
  baseCop: 936_240_483,
  netCop: 1_011_139_735,
  tipsCop: 90_001_376,
  ticketCount: 1_101,
  rawDocumentCount: 1_277,
  excludedInvitationCount: 170,
  excludedAccountingCount: 6,
  excludedReturnCount: 0,
  daily: [
    { date: "2026-08-01", baseCop: 89_089_021, ticketCount: 107 },
    { date: "2026-08-02", baseCop: 68_927_868, ticketCount: 78 },
    { date: "2026-08-03", baseCop: 38_355_648, ticketCount: 39 },
    { date: "2026-08-04", baseCop: 36_647_712, ticketCount: 49 },
    { date: "2026-08-05", baseCop: 40_281_842, ticketCount: 55 },
    { date: "2026-08-06", baseCop: 61_955_739, ticketCount: 64 },
    { date: "2026-08-07", baseCop: 78_566_944, ticketCount: 107 },
    { date: "2026-08-08", baseCop: 63_862_406, ticketCount: 75 },
    { date: "2026-08-09", baseCop: 67_848_049, ticketCount: 69 },
    { date: "2026-08-10", baseCop: 30_046_480, ticketCount: 33 },
    { date: "2026-08-11", baseCop: 55_263_403, ticketCount: 56 },
    { date: "2026-08-12", baseCop: 36_383_238, ticketCount: 39 },
    { date: "2026-08-13", baseCop: 39_149_656, ticketCount: 50 },
    { date: "2026-08-14", baseCop: 57_724_013, ticketCount: 63 },
    { date: "2026-08-15", baseCop: 63_235_177, ticketCount: 77 },
    { date: "2026-08-16", baseCop: 52_268_797, ticketCount: 63 },
    { date: "2026-08-17", baseCop: 36_806_805, ticketCount: 46 },
    { date: "2026-08-18", baseCop: 19_827_685, ticketCount: 31 },
  ],
};

const previousMonth: BudgetPeriod = {
  id: "july-2026",
  label: "Julio 2026",
  start: "2026-07-01",
  end: "2026-07-18",
  baseCop: 895_144_453,
  netCop: 966_756_029,
  tipsCop: 87_184_956,
  ticketCount: 1_139,
  rawDocumentCount: 1_371,
  excludedInvitationCount: 223,
  excludedAccountingCount: 9,
  excludedReturnCount: 0,
  daily: [
    { date: "2026-07-01", baseCop: 31_951_316, ticketCount: 42 },
    { date: "2026-07-02", baseCop: 59_890_999, ticketCount: 62 },
    { date: "2026-07-03", baseCop: 57_960_460, ticketCount: 80 },
    { date: "2026-07-04", baseCop: 62_337_040, ticketCount: 76 },
    { date: "2026-07-05", baseCop: 56_822_874, ticketCount: 75 },
    { date: "2026-07-06", baseCop: 28_938_797, ticketCount: 35 },
    { date: "2026-07-07", baseCop: 61_572_480, ticketCount: 96 },
    { date: "2026-07-08", baseCop: 37_246_047, ticketCount: 48 },
    { date: "2026-07-09", baseCop: 48_328_518, ticketCount: 53 },
    { date: "2026-07-10", baseCop: 44_221_527, ticketCount: 50 },
    { date: "2026-07-11", baseCop: 59_325_177, ticketCount: 82 },
    { date: "2026-07-12", baseCop: 51_504_257, ticketCount: 68 },
    { date: "2026-07-13", baseCop: 37_877_826, ticketCount: 54 },
    { date: "2026-07-14", baseCop: 22_774_813, ticketCount: 27 },
    { date: "2026-07-15", baseCop: 33_853_055, ticketCount: 44 },
    { date: "2026-07-16", baseCop: 48_081_850, ticketCount: 41 },
    { date: "2026-07-17", baseCop: 77_036_838, ticketCount: 102 },
    { date: "2026-07-18", baseCop: 75_420_579, ticketCount: 104 },
  ],
};

const previousYear: BudgetPeriod = {
  id: "august-2025",
  label: "Agosto 2025",
  start: "2025-08-01",
  end: "2025-08-18",
  baseCop: 1_127_558_417,
  netCop: 1_217_763_094,
  tipsCop: 109_985_571,
  ticketCount: 1_507,
  rawDocumentCount: 1_777,
  excludedInvitationCount: 269,
  excludedAccountingCount: 1,
  excludedReturnCount: 0,
  daily: [
    { date: "2025-08-01", baseCop: 74_843_110, ticketCount: 94 },
    { date: "2025-08-02", baseCop: 86_091_048, ticketCount: 116 },
    { date: "2025-08-03", baseCop: 78_672_672, ticketCount: 115 },
    { date: "2025-08-04", baseCop: 35_928_119, ticketCount: 64 },
    { date: "2025-08-05", baseCop: 42_502_777, ticketCount: 71 },
    { date: "2025-08-06", baseCop: 55_546_111, ticketCount: 77 },
    { date: "2025-08-07", baseCop: 64_158_952, ticketCount: 79 },
    { date: "2025-08-08", baseCop: 59_537_146, ticketCount: 68 },
    { date: "2025-08-09", baseCop: 74_079_724, ticketCount: 112 },
    { date: "2025-08-10", baseCop: 104_423_723, ticketCount: 122 },
    { date: "2025-08-11", baseCop: 40_744_907, ticketCount: 51 },
    { date: "2025-08-12", baseCop: 53_758_976, ticketCount: 35 },
    { date: "2025-08-13", baseCop: 50_629_350, ticketCount: 65 },
    { date: "2025-08-14", baseCop: 51_838_241, ticketCount: 82 },
    { date: "2025-08-15", baseCop: 67_109_999, ticketCount: 71 },
    { date: "2025-08-16", baseCop: 79_266_100, ticketCount: 110 },
    { date: "2025-08-17", baseCop: 54_510_987, ticketCount: 103 },
    { date: "2025-08-18", baseCop: 53_916_475, ticketCount: 72 },
  ],
};

export const budgetProgressSnapshot = budgetProgressSnapshotSchema.parse({
  schemaVersion: 1,
  id: "budget-progress-2026-08-18",
  dataMode: "certified-snapshot",
  timezone: "America/Bogota",
  generatedAt: "2026-08-19T06:00:15-05:00",
  businessAsOf: "2026-08-18",
  autoRefresh: false,
  freshness: [
    {
      source: "HioPOS / Supabase",
      asOf: "2026-08-18",
      lagSecondsAtGeneration: 21_615,
      status: "fresh",
    },
  ],
  warnings: [
    {
      code: "CALENDAR_DATE",
      message: "Los tres periodos usan fecha calendario de factura, no cierre operativo nocturno.",
    },
    {
      code: "WEEKDAY_MIX",
      message: "El comparativo interanual tiene una composición distinta de días de semana.",
    },
    {
      code: "LINEAR_SCENARIO",
      message: "La proyección mantiene el promedio observado; no ajusta estacionalidad ni mezcla de días.",
    },
  ],
  filters: {
    basis: "Venta base comercial antes de impuestos y sin propina",
    includedDates: "Días calendario 1–18",
    excludedDocuments: ["Invitaciones", "Devoluciones", "Solo Contabilidad/Servicios"],
  },
  data: {
    currency: "COP",
    targetCop: 2_000_000_000,
    previousMonthTargetCop: 1_772_475_000,
    previousYearTargetCop: null,
    monthDays: 31,
    cutoffDay: 18,
    remainingDays: 13,
    current,
    previousMonth,
    previousYear,
  },
});

function cumulative(period: BudgetPeriod) {
  let running = 0;
  return period.daily.map((point) => {
    running += point.baseCop;
    return running;
  });
}

function periodMetrics(period: BudgetPeriod) {
  return {
    ...period,
    taxesCop: period.netCop - period.baseCop,
    collectedCop: period.netCop + period.tipsCop,
    averageDailyCop: Math.round(period.baseCop / period.daily.length),
    averageTicketCop: Math.round(period.baseCop / period.ticketCount),
  };
}

function change(currentValue: number, comparisonValue: number) {
  return {
    amount: currentValue - comparisonValue,
    basisPoints: Math.round(((currentValue / comparisonValue) - 1) * 10_000),
  };
}

function decomposeVolumeAndTicket(currentPeriod: BudgetPeriod, comparisonPeriod: BudgetPeriod) {
  const comparisonAverageTicket = comparisonPeriod.baseCop / comparisonPeriod.ticketCount;
  const volumeEffectCop = Math.round(
    (currentPeriod.ticketCount - comparisonPeriod.ticketCount) * comparisonAverageTicket,
  );
  return {
    volumeEffectCop,
    ticketEffectCop: currentPeriod.baseCop - comparisonPeriod.baseCop - volumeEffectCop,
  };
}

const target = budgetProgressSnapshot.data.targetCop;
const currentMetrics = periodMetrics(current);
const previousMonthMetrics = periodMetrics(previousMonth);
const previousYearMetrics = periodMetrics(previousYear);
const linearTargetCop = Math.round(
  target * budgetProgressSnapshot.data.cutoffDay / budgetProgressSnapshot.data.monthDays,
);
const remainingCop = target - current.baseCop;
const requiredDailyCop = Math.round(remainingCop / budgetProgressSnapshot.data.remainingDays);
const projectedCloseCop = Math.round(
  current.baseCop / budgetProgressSnapshot.data.cutoffDay * budgetProgressSnapshot.data.monthDays,
);

export const budgetProgressViewModel = {
  snapshot: budgetProgressSnapshot,
  periods: {
    current: currentMetrics,
    previousMonth: previousMonthMetrics,
    previousYear: previousYearMetrics,
  },
  budget: {
    targetCop: target,
    accumulatedCop: current.baseCop,
    remainingCop,
    progressBasisPoints: Math.round(current.baseCop / target * 10_000),
    calendarBasisPoints: Math.round(
      budgetProgressSnapshot.data.cutoffDay / budgetProgressSnapshot.data.monthDays * 10_000,
    ),
    linearTargetCop,
    linearGapCop: current.baseCop - linearTargetCop,
    requiredDailyCop,
    observedDailyCop: currentMetrics.averageDailyCop,
    accelerationBasisPoints: Math.round(
      ((requiredDailyCop / (current.baseCop / budgetProgressSnapshot.data.cutoffDay)) - 1) * 10_000,
    ),
    projectedCloseCop,
    projectedProgressBasisPoints: Math.round(projectedCloseCop / target * 10_000),
    projectedGapCop: projectedCloseCop - target,
  },
  comparisons: {
    previousMonth: {
      base: change(current.baseCop, previousMonth.baseCop),
      tickets: change(current.ticketCount, previousMonth.ticketCount),
      averageTicket: change(currentMetrics.averageTicketCop, previousMonthMetrics.averageTicketCop),
      budgetProgressBasisPoints:
        Math.round(current.baseCop / target * 10_000)
        - Math.round(previousMonth.baseCop / budgetProgressSnapshot.data.previousMonthTargetCop * 10_000),
      ...decomposeVolumeAndTicket(current, previousMonth),
    },
    previousYear: {
      base: change(current.baseCop, previousYear.baseCop),
      tickets: change(current.ticketCount, previousYear.ticketCount),
      averageTicket: change(currentMetrics.averageTicketCop, previousYearMetrics.averageTicketCop),
      ...decomposeVolumeAndTicket(current, previousYear),
    },
  },
  chart: {
    labels: current.daily.map((_, index) => String(index + 1)),
    current: cumulative(current),
    previousMonth: cumulative(previousMonth),
    previousYear: cumulative(previousYear),
    linearTarget: current.daily.map((_, index) => Math.round(target * (index + 1) / 31)),
  },
};

export type BudgetProgressViewModel = typeof budgetProgressViewModel;
