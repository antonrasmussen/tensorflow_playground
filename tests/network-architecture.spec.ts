import { test, expect } from "@playwright/test";

/**
 * Tests for changing network architecture: add/remove hidden layers.
 * Represents "modifying the depth of the neural network."
 */
test.describe("Network architecture", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#add-layers", { state: "visible" });
  });

  test("add layer button increases hidden layer count", async ({ page }) => {
    const layersLabel = page.locator("#num-layers");
    const initial = await layersLabel.textContent();

    await page.click("#add-layers");
    await page.waitForTimeout(300);
    const afterAdd = await layersLabel.textContent();
    expect(Number(afterAdd)).toBe(Number(initial) + 1);
  });

  test("remove layer button decreases hidden layer count when possible", async ({ page }) => {
    const layersLabel = page.locator("#num-layers");
    // Ensure we have at least 1 layer to remove (default might be 1 or 2)
    const initial = await layersLabel.textContent();
    const initialNum = Number(initial);

    await page.click("#remove-layers");
    await page.waitForTimeout(300);
    const afterRemove = await layersLabel.textContent();
    if (initialNum > 0) {
      expect(Number(afterRemove)).toBe(initialNum - 1);
    }
  });

  test("can add multiple layers then remove some", async ({ page }) => {
    const layersLabel = page.locator("#num-layers");
    const start = Number(await layersLabel.textContent());

    await page.click("#add-layers");
    await page.click("#add-layers");
    await page.waitForTimeout(200);
    expect(Number(await layersLabel.textContent())).toBe(start + 2);

    await page.click("#remove-layers");
    await page.click("#remove-layers");
    await page.waitForTimeout(200);
    expect(Number(await layersLabel.textContent())).toBe(start);
  });
});
