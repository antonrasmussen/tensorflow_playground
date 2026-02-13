import { test, expect } from "@playwright/test";

/**
 * Tests for data and display settings: train/test ratio, noise, batch size, show test data, discretize.
 * Represents "configuring data split, noise, batch size, and output display."
 */
test.describe("Data and display settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#percTrainData", { state: "visible" });
  });

  test("training ratio slider is present and movable", async ({ page }) => {
    const slider = page.locator("#percTrainData");
    await expect(slider).toBeVisible();
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = "50";
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await expect(slider).toHaveValue("50");
  });

  test("noise slider is present and movable", async ({ page }) => {
    const slider = page.locator("#noise");
    await expect(slider).toBeVisible();
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = "25";
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await expect(slider).toHaveValue("25");
  });

  test("batch size slider is present and movable", async ({ page }) => {
    const slider = page.locator("#batchSize");
    await expect(slider).toBeVisible();
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = "15";
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await expect(slider).toHaveValue("15");
  });

  test("show test data checkbox can be toggled", async ({ page }) => {
    const checkbox = page.locator("#show-test-data");
    await expect(checkbox).toBeVisible();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test("discretize output checkbox can be toggled", async ({ page }) => {
    const checkbox = page.locator("#discretize");
    await expect(checkbox).toBeVisible();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });
});
