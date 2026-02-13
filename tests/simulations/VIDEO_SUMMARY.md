# Video summary: Simulation runs for the Neural Network Playground

**Use this to introduce the video you share with your class.**

---

## What we have here

We’re using the **Neural Network Playground** (Deep Playground)—an interactive, in-browser tool that lets you see how a small neural network learns. You choose a dataset (e.g. Circle, XOR, Spiral), set hyperparameters (learning rate, activation, layers), and watch the network train and the decision boundary update in real time. It’s great for building intuition about how NNs work.

The repo already had **automated tests**: Playwright scripts that check that the UI works (buttons, dropdowns, loss display, etc.). Those are **functional tests**—they answer “does the app behave correctly?” They don’t answer “what happens when I run this exact scenario?” or “how can I repeat the same run to compare and learn?”

So we added a different kind of automation: **simulation runs**.

---

## What are simulation runs?

**Simulation runs** are repeatable, scripted runs of the playground. Each run:

1. **Sets a specific scenario** — dataset, (optionally) learning rate, layers, etc.
2. **Runs training for a fixed number of steps** — e.g. 50 steps, the same every time.
3. **Records outcomes** — e.g. initial and final training loss, so you can compare runs.
4. **Optionally saves screenshots** — so you can share images (e.g. “before” and “after”) along with your video.

So instead of clicking everything by hand every time, you run one command and get the same scenario, same number of steps, and comparable numbers (and screenshots) every time. That makes it easier to build understanding incrementally: run A on an easy problem, run B on a harder one, compare.

We also paired each simulation with a **markdown recipe**: the same steps written for humans. So you can either run the automation or follow the recipe by hand (e.g. in class or for a different tool).

---

## What we built (proof of concept)

We implemented **one** simulation as a proof of concept:

- **Name:** Circle – quick convergence  
- **Idea:** On the simple Circle dataset, the network usually reduces loss quickly. It’s a baseline “easy” case you can compare with harder problems later (e.g. Spiral, XOR).

**What the automation does:**

1. Opens the playground and selects the **Circle** dataset.
2. Takes a **screenshot** (initial state, step 0) → saved as `circle-quick-convergence-01-initial.png`.
3. Runs **50 training steps** (clicking “Step” 50 times so it’s deterministic).
4. Takes a **second screenshot** (after 50 steps) → saved as `circle-quick-convergence-02-after-50-steps.png`.
5. Checks that the iteration count increased by 50 and that loss didn’t go up (with a small tolerance).
6. Logs initial and final loss to the console.

**Where things live:**

- **Automated run:** `tests/simulations/circle-quick-convergence.spec.ts`  
- **By-hand recipe:** `tests/simulations/recipes/circle-quick-convergence.md`  
- **Screenshots:** `tests/simulations/screenshots/` (created when you run the simulation)  
- **Docs:** `tests/simulations/README.md` (how to run, how to add more)

---

## How to run it (what the video shows)

1. **From the project root:**  
   `npm run build`  
   then  
   `npm test -- tests/simulations/circle-quick-convergence.spec.ts`

   Or, to **see the browser** (and record the video):  
   `npm test -- tests/simulations/circle-quick-convergence.spec.ts --headed`

2. The test starts the app on port 8080 (if nothing is already there), opens the page, selects Circle, captures the first screenshot, runs 50 steps, captures the second screenshot, and then the test finishes.

3. After the run, open `tests/simulations/screenshots/` to find the two PNGs. Use them in slides or posts alongside the video.

---

## Why this is useful for your class

- **Repeatability:** Same scenario every time—no “click and hope.”  
- **Comparability:** You get numbers (loss before/after) and images, so you can compare runs (e.g. Circle vs Spiral) or different settings.  
- **Extensibility:** One simulation shows the pattern. Students can add more (e.g. XOR, Spiral, or “effect of learning rate”) by copying the spec and recipe and changing dataset and steps.  
- **Dual use:** They can run the automated simulation *or* follow the markdown recipe by hand, which helps both “see it run” and “understand the steps.”

---

## One-line summary for the video

**We added repeatable “simulation runs” to the Neural Network Playground: one automated example (Circle, 50 steps) with screenshots and a by-hand recipe, so you can run the same scenario every time, compare outcomes, and use the pattern to add more simulations for learning.**
