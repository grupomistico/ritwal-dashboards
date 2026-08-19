import type { Metadata } from "next";
import { BudgetProgressPresentation } from "./_components/BudgetProgressPresentation";
import { budgetProgressViewModel } from "@/data/certified/budget-progress-2026-08-18";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Avance presupuesto agosto 2026 · Ritwal Intelligence",
  description:
    "Snapshot certificado de venta base Ritwal al 18 de agosto de 2026, con comparativos equivalentes.",
};

export default function BudgetProgressPage() {
  return <BudgetProgressPresentation model={budgetProgressViewModel} />;
}
