import { dashboardCatalog } from "@/data/dashboard-catalog";

export const dynamic = "force-dynamic";

export function GET() {
  const configuredMode = process.env.DASHBOARD_DATA_MODE ?? dashboardCatalog.dataMode;
  const configurationIsConsistent = configuredMode === dashboardCatalog.dataMode;

  return Response.json(
    {
      status: configurationIsConsistent ? "ready" : "not_ready",
      service: "ritwal-dashboards",
      check: "readiness",
      dataMode: dashboardCatalog.dataMode,
      configuredMode,
      productionSourcesConfigured: dashboardCatalog.productionSourcesConfigured,
      certifiedSnapshots: dashboardCatalog.certifiedSnapshots,
      warnings: configurationIsConsistent
        ? ["La portada permanece en modo demo; los snapshots certificados no se actualizan automáticamente."]
        : [`DASHBOARD_DATA_MODE debe ser ${dashboardCatalog.dataMode}.`],
      timestamp: new Date().toISOString(),
    },
    {
      status: configurationIsConsistent ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
