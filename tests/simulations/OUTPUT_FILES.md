# Output from a simulation run

After you run the Circle quick-convergence simulation, here’s what you get and what you can read.

---

## 1. Screenshots (images you can open or post)

**Folder:** `tests/simulations/screenshots/`

| File | When it’s taken |
|------|------------------|
| `circle-quick-convergence-01-initial.png` | Right after selecting the Circle dataset, before any training (step 0). |
| `circle-quick-convergence-02-after-50-steps.png` | After 50 training steps (decision boundary and loss curve updated). |

Both are full-page captures of the playground. Open them in any image viewer or use them in slides/posts.

---

## 2. Run report (numbers from this run)

**File:** `tests/simulations/outputs/circle-quick-convergence-latest.json`

A small JSON file written after each run. You can open it in an editor or script. It looks like:

```json
{
  "simulation": "circle-quick-convergence",
  "runAt": "2025-02-12T...",
  "dataset": "Circle",
  "steps": 50,
  "initialEpoch": 0,
  "finalEpoch": 50,
  "initialTrainLoss": 0.xxx,
  "finalTrainLoss": 0.xxx,
  "screenshots": [
    "circle-quick-convergence-01-initial.png",
    "circle-quick-convergence-02-after-50-steps.png"
  ]
}
```

Use it to compare runs (e.g. run once, change something, run again, diff the numbers) or to paste loss/epoch into notes or reports.

---

## 3. Console output (terminal)

When the test runs, it prints something like:

```
[Simulation] Circle quick convergence: initial loss 0.xxx → final loss 0.xxx after 50 steps.
[Simulation] Screenshots saved to .../tests/simulations/screenshots
[Simulation] Run report saved to .../tests/simulations/outputs/circle-quick-convergence-latest.json
```

If you run with `npm test`, this goes to the terminal; it isn’t saved to a file unless you redirect it (e.g. `npm test -- ... 2>&1 | tee run.log`).

---

## 4. Playwright test result

**File:** `test-results/.last-run.json`

Playwright’s summary of the last test run (e.g. `"status": "passed"`). Useful to confirm the run succeeded; it doesn’t contain loss or screenshot paths.

---

## Summary: files you can read after a run

| What | Where | Read it for |
|------|--------|-------------|
| Before/after screenshots | `tests/simulations/screenshots/*.png` | Visual record; posting or slides. |
| Run report (loss, epoch, time) | `tests/simulations/outputs/circle-quick-convergence-latest.json` | Exact numbers; comparing runs. |
| Test pass/fail | `test-results/.last-run.json` | Quick check that the run completed. |
