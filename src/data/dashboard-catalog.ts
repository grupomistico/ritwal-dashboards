import { budgetProgressSnapshot } from "@/data/certified/budget-progress-2026-08-18";

export const dashboardCatalog = {
  dataMode: "mixed" as const,
  demoRoutes: ["/"],
  productionSourcesConfigured: false,
  certifiedSnapshots: [
    {
      id: budgetProgressSnapshot.id,
      route: "/presentaciones/avance-presupuesto-agosto-2026-08-18",
      status: "available" as const,
      businessAsOf: budgetProgressSnapshot.businessAsOf,
      generatedAt: budgetProgressSnapshot.generatedAt,
      autoRefresh: budgetProgressSnapshot.autoRefresh,
      sourceStatus: budgetProgressSnapshot.freshness[0].status,
    },
  ],
};
