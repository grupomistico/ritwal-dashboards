import { describe, expect, it } from "vitest";
import { budgetProgressSnapshot, budgetProgressViewModel } from "./budget-progress-2026-08-18";

describe("certified budget progress snapshot", () => {
  it("keeps the exact certified August baseline", () => {
    expect(budgetProgressSnapshot.businessAsOf).toBe("2026-08-18");
    expect(budgetProgressSnapshot.data.current.baseCop).toBe(936_240_483);
    expect(budgetProgressSnapshot.data.current.ticketCount).toBe(1_101);
    expect(budgetProgressViewModel.budget.remainingCop).toBe(1_063_759_517);
    expect(budgetProgressViewModel.budget.progressBasisPoints).toBe(4_681);
  });

  it("reconciles all daily series and accounting controls", () => {
    for (const period of Object.values(budgetProgressSnapshot.data).filter(
      (value): value is typeof budgetProgressSnapshot.data.current =>
        typeof value === "object" && value !== null && "daily" in value,
    )) {
      expect(period.daily).toHaveLength(18);
      expect(period.daily.reduce((sum, point) => sum + point.baseCop, 0)).toBe(period.baseCop);
      expect(period.daily.reduce((sum, point) => sum + point.ticketCount, 0)).toBe(period.ticketCount);
      expect(period.netCop - period.baseCop).toBeGreaterThanOrEqual(0);
      expect(period.excludedReturnCount).toBe(0);
    }
  });

  it("derives pace and comparable deltas outside React", () => {
    expect(budgetProgressViewModel.budget.observedDailyCop).toBe(52_013_360);
    expect(budgetProgressViewModel.budget.requiredDailyCop).toBe(81_827_655);
    expect(budgetProgressViewModel.budget.accelerationBasisPoints).toBe(5_732);
    expect(budgetProgressViewModel.budget.projectedCloseCop).toBe(1_612_414_165);
    expect(budgetProgressViewModel.comparisons.previousMonth.base.amount).toBe(41_096_030);
    expect(budgetProgressViewModel.comparisons.previousMonth.base.basisPoints).toBe(459);
    expect(budgetProgressViewModel.comparisons.previousYear.base.amount).toBe(-191_317_934);
    expect(budgetProgressViewModel.comparisons.previousYear.base.basisPoints).toBe(-1_697);
  });

  it("uses the correct target for July's progress comparison", () => {
    expect(budgetProgressSnapshot.data.previousMonthTargetCop).toBe(1_772_475_000);
    expect(budgetProgressViewModel.comparisons.previousMonth.budgetProgressBasisPoints).toBe(-369);
  });
});
