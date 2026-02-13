# TensorFlow Playground – Automated tests

These tests run the playground locally and exercise different parts of the UI.

## Setup (once)

```bash
npm install
npm run build
npx playwright install
```

If tests fail with "Executable doesn't exist", run `npx playwright install` again (e.g. to get the correct architecture for your machine).

## Run locally (manual)

1. **Build and serve:**
   ```bash
   npm run build
   npm run serve:test
   ```
   App is at **http://127.0.0.1:8080**

2. **Run all tests** (Playwright starts the server if needed):
   ```bash
   npm test
   ```

3. **Run tests in headed mode** (see the browser):
   ```bash
   npm run test:headed
   ```

## Test groups

| Spec file | What it covers |
|-----------|----------------|
| `training-controls.spec.ts` | Play, pause, step, reset; epoch counter |
| `hyperparameters.spec.ts` | Learning rate, activation, regularization, problem type (classification/regression) |
| `datasets.spec.ts` | Dataset selection (circle, XOR, spiral, Gaussian), regression datasets, Regenerate |
| `network-architecture.spec.ts` | Add/remove hidden layers |
| `data-settings.spec.ts` | Train/test ratio, noise, batch size sliders; Show test data, Discretize checkboxes |
| `output-and-metrics.spec.ts` | Training/test loss visibility and updates, epoch display |

## Run a single test file

```bash
npx playwright test tests/hyperparameters.spec.ts
```

## Run a single test by name

```bash
npx playwright test -g "learning rate"
```

## Simulation runs (repeatable teaching scenarios)

**Simulations** are scripted runs that set a scenario, train for a fixed number of steps, and record outcomes—so you can compare runs and build intuition. Each has an automated Playwright spec and a markdown **recipe** you can follow by hand.

- **Run the proof-of-concept:** `npx playwright test tests/simulations/`
- **Headed (see the browser, e.g. for video):** `npx playwright test tests/simulations/ --headed`
- Full details and recipes: [tests/simulations/README.md](simulations/README.md)
