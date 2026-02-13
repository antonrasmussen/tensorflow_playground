# Simulation runs

**Simulation runs** are repeatable, scripted runs of the Neural Network Playground. Each one sets a specific scenario (dataset, settings), runs training for a fixed number of steps, and records outcomes. They help you (and students) understand what the tool is for and how NNs behave—without clicking everything by hand.

- **Automated:** Playwright specs in this folder run the same scenario every time.
- **By hand:** Each simulation has a matching **recipe** in `recipes/` that you can follow manually (e.g. for a video walkthrough or class demo).

## Run the proof-of-concept simulation

From the project root:

```bash
npm run build
npm test -- tests/simulations/
```

Or run the single Circle example only:

```bash
npx playwright test tests/simulations/circle-quick-convergence.spec.ts
```

To watch the browser (good for recording a video):

```bash
npx playwright test tests/simulations/circle-quick-convergence.spec.ts --headed
```

### Screenshots

Each simulation run saves **screenshots** at key moments into `tests/simulations/screenshots/`:

- **Circle quick convergence:** `01-initial.png` (Circle selected, step 0) and `02-after-50-steps.png` (after training). Use them for slides or posts alongside your video.

Screenshots are full-page. The folder is in `.gitignore` so generated images aren’t committed; remove it from `.gitignore` if you want to commit sample screenshots.

### Run report (JSON)

**Run report:** `outputs/circle-quick-convergence-latest.json` (full path: `tests/simulations/outputs/circle-quick-convergence-latest.json`) with dataset, steps, initial/final loss, epoch, and timestamp—so you can compare runs or paste numbers into notes.

Each run writes this file after the test passes. It includes: simulation name, timestamp, dataset, steps, initial/final epoch, initial/final training loss, and screenshot filenames.

**Note:** `npm test` starts the app on port 8080 automatically. If you already have `npm run serve:test` running, stop it first so the test runner can bind to 8080. For a headed run (to record a video), run `npm test -- tests/simulations/ --headed` with 8080 free so the runner can start the server and open the browser.

## Current simulations

| Simulation | Spec | Recipe | What it shows |
|------------|------|--------|----------------|
| Circle – quick convergence | `circle-quick-convergence.spec.ts` | [circle-quick-convergence.md](recipes/circle-quick-convergence.md) | Easy dataset; loss drops over 50 steps. Baseline for comparing harder problems. |

## Adding more simulations

1. Add a new `.spec.ts` here that: selects dataset/settings, runs N steps (e.g. via Step button), then reads/asserts loss and epoch.
2. Add a matching `.md` in `recipes/` with the same steps for humans.
3. List the new run in the table above and in `tests/README.md` if you want it in the main test docs.

See `SIMULATION_RUNS.md` in the parent `tests/` folder for the full idea (Option A + Option C).
