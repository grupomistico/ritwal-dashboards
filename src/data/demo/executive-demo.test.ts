import { describe, expect, it } from "vitest";
import { executiveDemoData } from "./executive-demo";

describe("executive demo contract", () => {
  it("keeps the first view concise", () => {
    expect(executiveDemoData.kpis.length).toBeGreaterThanOrEqual(5);
    expect(executiveDemoData.kpis.length).toBeLessThanOrEqual(8);
  });

  it("gives every source a visible freshness status", () => {
    expect(executiveDemoData.sources).not.toHaveLength(0);
    for (const source of executiveDemoData.sources) {
      expect(source.detail.toLocaleLowerCase("es")).toContain("ilustrativo");
      expect(["fresh", "warning", "stale", "error"]).toContain(source.status);
    }
  });

  it("assigns every priority to an owner and moment", () => {
    for (const item of executiveDemoData.priorities) {
      expect(item.owner.trim()).not.toBe("");
      expect(item.due.trim()).not.toBe("");
    }
  });
});
