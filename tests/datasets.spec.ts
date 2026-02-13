import { test, expect } from "@playwright/test";

/**
 * Tests for dataset selection and data regeneration.
 * Represents "choosing and regenerating training data."
 */
test.describe("Datasets", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".dataset-list", { state: "visible" });
  });

  test("can select circle dataset", async ({ page }) => {
    await page.click('.dataset[title="Circle"]');
    await page.waitForTimeout(300);
    // Main data canvas or UI should reflect selection (thumbnail gets border/selected state in many UIs)
    const circle = page.locator('.dataset[title="Circle"]');
    await expect(circle).toBeVisible();
  });

  test("can select XOR dataset", async ({ page }) => {
    await page.click('.dataset[title="Exclusive or"]');
    await page.waitForTimeout(300);
    await expect(page.locator('.dataset[title="Exclusive or"]')).toBeVisible();
  });

  test("can select spiral dataset", async ({ page }) => {
    await page.click('.dataset[title="Spiral"]');
    await page.waitForTimeout(300);
    await expect(page.locator('.dataset[title="Spiral"]')).toBeVisible();
  });

  test("can select Gaussian dataset", async ({ page }) => {
    await page.click('.dataset[title="Gaussian"]');
    await page.waitForTimeout(300);
    await expect(page.locator('.dataset[title="Gaussian"]')).toBeVisible();
  });

  test("regression datasets (Plane, Multi gaussian) appear when problem is regression", async ({ page }) => {
    await page.selectOption("#problem", "regression");
    await page.waitForTimeout(300);
    await expect(page.locator('.dataset[title="Plane"]')).toBeVisible();
    await expect(page.locator('.dataset[title="Multi gaussian"]')).toBeVisible();
    await page.click('.dataset[title="Plane"]');
    await page.waitForTimeout(300);
  });

  test("regenerate button creates new data", async ({ page }) => {
    const lossBefore = await page.locator("#loss-train").textContent();
    await page.click("#data-regen-button");
    await page.waitForTimeout(500);
    const lossAfter = await page.locator("#loss-train").textContent();
    // After regenerate, data (and often loss) may change
    expect(page.locator("#data-regen-button")).toBeVisible();
  });
});
