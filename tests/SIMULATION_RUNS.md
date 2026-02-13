# Simulation runs vs unit/UI tests

## 1) What tests were made

The existing tests are **Playwright UI/functional tests**. They automate the browser and check that controls and displays behave correctly. They do **not** test the neural network math in isolation (no unit tests of `nn.ts`), and they are **not** designed as repeatable “teaching runs” of the playground.

| Spec file | What it does (short) |
|-----------|----------------------|
| `training-controls.spec.ts` | Play/pause/step/reset work; epoch counter updates. |
| `hyperparameters.spec.ts` | Learning rate, activation, regularization, problem type dropdowns can be changed. |
| `datasets.spec.ts` | Can select Circle, XOR, Spiral, Gaussian; regression datasets; regenerate button. |
| `network-architecture.spec.ts` | Add/remove hidden layers; layer count updates. |
| `data-settings.spec.ts` | Train ratio, noise, batch size sliders; “Show test data” and “Discretize” checkboxes. |
| `output-and-metrics.spec.ts` | Train/test loss visible; loss updates when training; epoch is numeric. |

So: **the current tests answer “does the UI work?”** (buttons, dropdowns, visibility, basic updates). They do **not** answer “what happens if I run this exact scenario?” or “how does this help me understand NNs?” in a repeatable, documented way.

---

## 2) What we need for “simulation runs”

You want **repeatable, scripted runs** of the Neural Network Playground that:

- Use a **fixed setup** (dataset, architecture, hyperparameters).
- **Run training** for a defined number of steps (or time).
- **Record outcomes** (e.g. final train/test loss, epoch) so you can compare runs.
- Are **documented** so each run illustrates a concept (e.g. “easy vs hard dataset”, “effect of learning rate”, “overfitting”).

Those are **simulation runs**: same recipe → comparable results, so you can build understanding incrementally.

### How to implement them

**Option A – Playwright simulation specs (recommended)**  
Add one or more spec files (e.g. `simulations/circle-easy.spec.ts`, `simulations/learning-rate.spec.ts`) that:

1. Set a **specific scenario** (e.g. dataset = Circle, learning rate = 0.03, 1 hidden layer, 8 neurons).
2. **Run training** for a fixed number of steps (e.g. 50 or 100 step clicks, or play for N seconds).
3. **Read and optionally assert** final train loss, test loss, epoch (e.g. “loss should drop below X” or “save to a small report”).
4. Optionally **take a screenshot** for a visual record.

Each spec can be run with:

```bash
npx playwright test tests/simulations/
```

So you get **repeatable simulation runs** with one command, and you can add short comments or a `SIMULATIONS.md` that explains what each scenario teaches.

**Option B – Documented recipes (no automation)**  
A markdown file (e.g. `docs/simulation-recipes.md`) with step-by-step instructions: “1. Select Circle. 2. Set learning rate 0.03. 3. Click Play for 100 steps. 4. Observe loss. 5. Try Spiral and compare.” You run by hand; good for understanding, but not repeatable in one click.

**Option C – Hybrid**  
Recipes in markdown **plus** Playwright simulation specs that automate those same recipes and record outcomes (and optionally screenshots) so you can both follow along by hand and re-run the same scenario automatically.

---

## Next step

To get real “simulation runs” in this repo, the next step is to add **Option A (and optionally C)**:

1. Add a **`tests/simulations/`** directory.
2. Add **2–3 simulation specs**, for example:
   - **Circle – quick convergence**: Circle dataset, default or low LR, run 50 steps → assert loss decreases.
   - **XOR – need hidden layer**: XOR dataset, 1 hidden layer, run 100 steps → record final loss (and optionally assert it’s below a threshold).
   - **Spiral – harder**: Spiral dataset, 2 hidden layers, run 150 steps → record train/test loss (illustrate that harder problems need more capacity/steps).
3. Optionally **save outputs** (e.g. loss, epoch) to `tests/simulations/outputs/` or a small JSON report so you can compare runs over time.
4. Add **`tests/simulations/README.md`** (or a section in `tests/README.md`) that explains what each simulation demonstrates and how to run them.

If you want, I can draft the first simulation spec (e.g. Circle + 50 steps + loss assertion) and the `simulations/README.md` text so you can paste them in and then extend the pattern.
