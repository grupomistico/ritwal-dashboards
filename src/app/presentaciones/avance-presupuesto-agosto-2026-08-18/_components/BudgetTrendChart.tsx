"use client";

import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { EChart } from "@/components/charts/EChart";
import {
  buildBudgetProgressOption,
  type BudgetProgressChartData,
} from "@/components/charts/budget-progress-options";

type BudgetTrendChartProps = {
  data: BudgetProgressChartData;
  className?: string;
};

export function BudgetTrendChart({ data, className }: BudgetTrendChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const option = useMemo(
    () => buildBudgetProgressOption(data, !shouldReduceMotion),
    [data, shouldReduceMotion],
  );

  return (
    <EChart
      option={option}
      className={className}
      ariaLabel="Curva acumulada certificada: agosto 2026 suma 936 millones al día 18, 4,6% más que julio y 17,0% menos que agosto de 2025."
    />
  );
}
