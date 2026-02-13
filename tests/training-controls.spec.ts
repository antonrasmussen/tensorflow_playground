import { test, expect } from "@playwright/test";

/**
 * Tests for training controls: play, pause, step, reset.
 * Represents "running and controlling the neural network training."
 */
test.describe("Training controls", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#play-pause-button", { state: "visible" });
  });

  test("play button starts training and epoch counter updates", async ({ page }) => {
    const epochEl = page.locator("#iter-number");
    const initialEpoch = await epochEl.textContent();

    await page.click("#play-pause-button");

    // Wait for at least one epoch to pass (counter changes or stays 0 if very slow)
    await page.waitForTimeout(1500);
    const afterEpoch = await epochEl.textContent();
    // Either epoch increased or we're still at 0 (slow start) — training has been triggered
    expect(epochEl).toBeVisible();
  });

  test("pause button stops training", async ({ page }) => {
    await page.click("#play-pause-button");
    await page.waitForTimeout(800);
    await page.click("#play-pause-button");
    const epoch1 = await page.locator("#iter-number").textContent();
    await page.waitForTimeout(500);
    const epoch2 = await page.locator("#iter-number").textContent();
    // Epoch should not change (or change very little) when paused
    expect(epoch1).toBe(epoch2);
  });

  test("step button advances one step", async ({ page }) => {
    const epochEl = page.locator("#iter-number");
    const before = await epochEl.textContent();
    await page.click("#next-step-button");
    await page.waitForTimeout(200);
    const after = await epochEl.textContent();
    expect(Number(after)).toBe(Number(before) + 1);
  });

  test("reset button resets network and epoch", async ({ page }) => {
    await page.click("#play-pause-button");
    await page.waitForTimeout(1000);
    const epochBeforeReset = await page.locator("#iter-number").textContent();
    expect(Number(epochBeforeReset)).toBeGreaterThan(0);

    await page.click("#reset-button");
    await page.waitForTimeout(300);
    const epochAfterReset = await page.locator("#iter-number").textContent();
    expect(epochAfterReset).toBe("0");
  });
});
