import * as fs from "fs";
import * as path from "path";
import { test, expect } from "@playwright/test";

const SCREENSHOT_DIR = path.join(__dirname, "screenshots");
const OUTPUT_DIR = path.join(__dirname, "outputs");

/**
 * Simulation run: Circle dataset, quick convergence.
 *
 * This is a repeatable "simulation" (not a UI unit test). It sets up a specific
 * scenario, runs training for a fixed number of steps, and records outcomes so
 * you can compare runs and build intuition about how the playground behaves.
 *
 * Learning goal: On the simple Circle problem, the network should reduce loss
 * quickly with default settings. Run this to see a baseline "easy" case.
 *
 * Screenshots are saved to tests/simulations/screenshots/ for posting or slides.
 * Manual recipe: see recipes/circle-quick-convergence.md
 */
test.describe("Simulation: Circle – quick convergence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".dataset-list", { state: "visible" });
  });

  test("run 50 steps on Circle dataset and record loss", async ({ page }) => {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    // 1. Select Circle dataset (simple, linearly separable with one hidden layer)
    await page.click('.dataset[title="Circle"]');
    await page.waitForTimeout(400);

    // 2. Ensure we're at step 0 and read initial loss
    const lossTrainEl = page.locator("#loss-train");
    const iterEl = page.locator("#iter-number");
    await expect(lossTrainEl).toBeVisible();
    await expect(iterEl).toBeVisible();

    const initialLossText = await lossTrainEl.textContent();
    const initialEpochText = await iterEl.textContent();
    const initialLoss = parseFloat(initialLossText ?? "0");
    const initialEpoch = parseInt((initialEpochText ?? "0").replace(/,/g, ""), 10);

    // Screenshot: initial state (Circle selected, step 0)
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "circle-quick-convergence-01-initial.png"),
      fullPage: true,
    });

    // 3. Run exactly 50 training steps (deterministic; no play/pause timing)
    const steps = 50;
    for (let i = 0; i < steps; i++) {
      await page.click("#next-step-button");
      await page.waitForTimeout(30); // allow UI to update
    }

    const finalLossText = await lossTrainEl.textContent();
    const finalEpochText = await iterEl.textContent();
    const finalLoss = parseFloat(finalLossText ?? "0");
    const finalEpoch = parseInt((finalEpochText ?? "0").replace(/,/g, ""), 10);

    // Screenshot: after 50 steps (decision boundary and loss curve updated)
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "circle-quick-convergence-02-after-50-steps.png"),
      fullPage: true,
    });

    // 4. Assert we actually ran 50 steps
    expect(finalEpoch).toBe(initialEpoch + steps);

    // 5. Record outcome: loss should typically decrease on this easy problem
    //    (allow for rare bad inits; at least we have comparable numbers for future runs)
    expect(finalLoss).toBeLessThanOrEqual(initialLoss + 0.5);
    expect(Number.isFinite(finalLoss)).toBe(true);
    expect(Number.isFinite(finalEpoch)).toBe(true);

    // Optional: log for video / class discussion (visible in headed run or report)
    console.log(
      `[Simulation] Circle quick convergence: initial loss ${initialLoss.toFixed(3)} → final loss ${finalLoss.toFixed(3)} after ${steps} steps.`
    );
    console.log(`[Simulation] Screenshots saved to ${SCREENSHOT_DIR}`);

    // Write a run report (readable summary of this simulation run)
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const report = {
      simulation: "circle-quick-convergence",
      runAt: new Date().toISOString(),
      dataset: "Circle",
      steps,
      initialEpoch,
      finalEpoch,
      initialTrainLoss: Math.round(initialLoss * 1000) / 1000,
      finalTrainLoss: Math.round(finalLoss * 1000) / 1000,
      screenshots: [
        "circle-quick-convergence-01-initial.png",
        "circle-quick-convergence-02-after-50-steps.png",
      ],
    };
    fs.writeFileSync(
      path.join(OUTPUT_DIR, "circle-quick-convergence-latest.json"),
      JSON.stringify(report, null, 2),
      "utf8"
    );
    console.log(`[Simulation] Run report saved to ${OUTPUT_DIR}/circle-quick-convergence-latest.json`);
  });
});
