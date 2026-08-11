export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ready",
      service: "ritwal-dashboards",
      check: "readiness",
      dataMode: "demo",
      productionSourcesConfigured: false,
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
