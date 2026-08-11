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

test("has no serious automated accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("heading", { name: "Venta acumulada vs. objetivo" }).waitFor();
  await page.waitForTimeout(900);

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});

test("liveness and readiness describe demo mode accurately", async ({ request }) => {
  const live = await request.get("/api/health/live");
  const ready = await request.get("/api/health/ready");

  expect(live.ok()).toBe(true);
  expect((await live.json()).status).toBe("ok");
  expect(ready.ok()).toBe(true);
  expect(await ready.json()).toMatchObject({
    status: "ready",
    dataMode: "demo",
    productionSourcesConfigured: false,
  });
});
