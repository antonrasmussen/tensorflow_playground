import { test, expect } from "@playwright/test";

/**
 * Tests for hyperparameter controls: learning rate, activation, regularization, problem type.
 * Represents "tuning how the network learns."
 */
test.describe("Hyperparameters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#learningRate", { state: "visible" });
  });

  test("learning rate can be changed", async ({ page }) => {
    await page.selectOption("#learningRate", "0.01");
    await expect(page.locator("#learningRate")).toHaveValue("0.01");
    await page.selectOption("#learningRate", "0.1");
    await expect(page.locator("#learningRate")).toHaveValue("0.1");
  });

  test("activation function can be changed", async ({ page }) => {
    await page.selectOption("#activations", "tanh");
    await expect(page.locator("#activations")).toHaveValue("tanh");
    await page.selectOption("#activations", "sigmoid");
    await expect(page.locator("#activations")).toHaveValue("sigmoid");
    await page.selectOption("#activations", "relu");
    await expect(page.locator("#activations")).toHaveValue("relu");
  });

  test("regularization can be set to L1 or L2", async ({ page }) => {
    await page.selectOption("#regularizations", "L1");
    await expect(page.locator("#regularizations")).toHaveValue("L1");
    await page.selectOption("#regularizations", "L2");
    await expect(page.locator("#regularizations")).toHaveValue("L2");
    await page.selectOption("#regularizations", "none");
    await expect(page.locator("#regularizations")).toHaveValue("none");
  });

  test("regularization rate can be changed", async ({ page }) => {
    await page.selectOption("#regularizations", "L2");
    await page.selectOption("#regularRate", "0.01");
    await expect(page.locator("#regularRate")).toHaveValue("0.01");
  });

  test("problem type can be switched between classification and regression", async ({ page }) => {
    await page.selectOption("#problem", "regression");
    await expect(page.locator("#problem")).toHaveValue("regression");
    // Regression shows different datasets (plane, multi gaussian)
    await page.selectOption("#problem", "classification");
    await expect(page.locator("#problem")).toHaveValue("classification");
  });
});
