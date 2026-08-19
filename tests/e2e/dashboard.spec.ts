import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders an honest executive prototype without horizontal overflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Ritwal en un vistazo" })).toBeVisible();
  await expect(page.getByText("Todos los valores visibles son demostrativos")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Prioridades accionables" })).toBeVisible();

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasOverflow).toBe(false);
});

test("renders the certified budget presentation with exact comparable periods", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/presentaciones/avance-presupuesto-agosto-2026-08-18");

  await expect(page.getByRole("heading", { name: /Pulso de ventas/i })).toBeVisible();
  await expect(page.getByText("Snapshot certificado", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("$936.240.483", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("$895.144.453", { exact: true })).toBeVisible();
  await expect(page.getByText("$1.127.558.417", { exact: true })).toBeVisible();
  await expect(page.getByText("18/18 fechas conciliadas", { exact: true })).toBeVisible();
  await expect(page.getByText("Todos los valores visibles son demostrativos")).toHaveCount(0);

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasOverflow).toBe(false);
  expect(consoleErrors).toEqual([]);
});

test("certified budget presentation has no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/presentaciones/avance-presupuesto-agosto-2026-08-18");
  await page.getByRole("heading", { name: "Venta base acumulada" }).waitFor();
  await page.waitForTimeout(700);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(
    (violation) => ["critical", "serious"].includes(violation.impact ?? ""),
  )).toEqual([]);
});

test("has no serious automated accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("heading", { name: "Venta acumulada vs. objetivo" }).waitFor();
  await page.waitForTimeout(900);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});

test("liveness and readiness describe mixed mode accurately", async ({ request }) => {
  const live = await request.get("/api/health/live");
  const ready = await request.get("/api/health/ready");

  expect(live.ok()).toBe(true);
  expect((await live.json()).status).toBe("ok");
  expect(ready.ok()).toBe(true);
  expect(await ready.json()).toMatchObject({
    status: "ready",
    dataMode: "mixed",
    productionSourcesConfigured: false,
    certifiedSnapshots: [
      {
        id: "budget-progress-2026-08-18",
        status: "available",
        businessAsOf: "2026-08-18",
        autoRefresh: false,
      },
    ],
  });
});
