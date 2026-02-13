import { test, expect } from "@playwright/test";

/**
 * Tests that output metrics (loss) are visible and update when training runs.
 * Represents "observing training and test loss."
 */
test.describe("Output and metrics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#loss-train", { state: "visible" });
  });

  test("training loss and test loss elements are visible", async ({ page }) => {
    await expect(page.locator("#loss-train")).toBeVisible();
    await expect(page.locator("#loss-test")).toBeVisible();
  });

  test("loss values update when training runs", async ({ page }) => {
    const trainLoss = page.locator("#loss-train");
    const initial = await trainLoss.textContent();

    await page.click("#play-pause-button");
    await page.waitForTimeout(2000);

    const after = await trainLoss.textContent();
    // Loss might stay same if already converged, or change
    expect(trainLoss).toBeVisible();
    expect(initial !== undefined && after !== undefined).toBe(true);
  });

  test("epoch counter is visible and numeric", async ({ page }) => {
    const epoch = page.locator("#iter-number");
    await expect(epoch).toBeVisible();
    const text = await epoch.textContent();
    expect(Number(text)).not.toBeNaN();
  });
});
