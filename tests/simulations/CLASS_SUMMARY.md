# Video summary for the class

**What this video showed:** Using an AI coding assistant (Cursor) to run the Neural Network Playground locally, add automated tests, and then build **simulation runs**—repeatable, scripted scenarios—so you can learn how the tool works without fumbling around on the website.

---

## 1. Why do this?

- The **Neural Network Playground** (TensorFlow’s “Deep Playground”) is an interactive, in-browser tool for seeing how a small NN learns (datasets, decision boundaries, loss, etc.).
- **Problem:** Using it only on the website means lots of clicking, no clear “recipe,” and no way to repeat the same scenario to compare and learn.
- **Idea:** Clone the open-source repo, run it **locally in Cursor**, then use the AI assistant to add **automated tests** and, later, **simulation runs** that do specific things in a repeatable way.

So the goal was both to **understand the playground** and to **practice using agentic AI** (Cursor) for real tooling—install, fix issues, write tests, add simulations.

---

## 2. What we did (in order)

1. **Clone and run locally**  
   Had the agent help clone the repo, install dependencies (`npm install`), fix environment issues (e.g. ARM vs Intel), and run the app (`npm run build`, `npm run serve:test`) so it’s available at `http://127.0.0.1:8080`.

2. **Fix the “missing” UI**  
   The local build looked different from the website (e.g. missing input-feature options). We asked the agent why; it compared the code to the official version, fixed the input-layer/URL handling, and after a rebuild the local UI matched the website.

3. **Clarify what kind of tests we wanted**  
   The repo already had **Playwright UI tests** (buttons, dropdowns, loss display—functional checks). We wanted something different: **repeatable “simulation runs”**—fixed scenario, fixed number of training steps, recorded outcomes—to learn what the tool is for and to compare runs. The agent explained the difference and proposed **Option A** (automated simulation specs) and **Option C** (same scenarios as markdown recipes you can follow by hand, plus automation).

4. **One proof-of-concept simulation**  
   We asked for **one** simulation to keep the video short: **Circle dataset, 50 steps.** The agent added:
   - A **Playwright spec** that opens the app, selects Circle, runs 50 steps, checks loss/epoch, and takes **screenshots** (initial state and after 50 steps).
   - A **markdown recipe** with the same steps so you can do it by hand.
   - Screenshots saved to `tests/simulations/screenshots/` for posting or slides.

5. **Add screenshots**  
   We asked for screenshots during the run (for the video and for images to post). The agent added two full-page screenshots: one at step 0, one after 50 steps.

6. **Run it (headed)**  
   We ran the simulation in **headed** mode (`npm test -- tests/simulations/circle-quick-convergence.spec.ts --headed`) so the browser window opened and we could watch and record. The test passed; the two PNGs appeared in the screenshots folder. We also later added a **run report** (JSON) with initial/final loss and epoch for each run.

---

## 3. What you get from a simulation run

- **Two screenshots:** `01-initial.png` (Circle selected, step 0) and `02-after-50-steps.png` (after 50 steps)—useful for slides or posts.
- **Run report:** `outputs/circle-quick-convergence-latest.json` with dataset, steps, initial/final loss, epoch, and timestamp—so you can compare runs or paste numbers into notes.
- **Console output:** Initial vs final loss printed when the test runs.

So you can both **watch** the run (headed) and **inspect** the outputs (images + JSON) to understand what happened.

---

## 4. Takeaways

- **Running the playground locally** gives you the code, the UI, and the ability to add tooling (tests, simulations) instead of only clicking on the website.
- **Simulation runs** are repeatable “teaching runs”: same setup, same number of steps, recorded outcomes. That supports incremental learning (e.g. compare Circle vs Spiral, or different learning rates).
- **Option C** is especially useful: you can **run the automation** (no clicking) or **follow the markdown recipe by hand**. Both use the same scenario.
- **Agentic AI (Cursor)** was used for: cloning, installing, fixing build/UI issues, explaining existing tests vs simulations, writing the spec and recipe, and adding screenshots. The “learning” part (what is loss? what is the decision boundary?) you can do in parallel—e.g. in chat, with a reasoning-focused model, or with the run outputs and the recipe.
- **One simulation is enough to start.** If you can do one (e.g. Circle, 50 steps), you can add more (XOR, Spiral, different hyperparameters) by copying the pattern.

---

## 5. One-sentence summary for the class

**We used Cursor to run the Neural Network Playground locally, fix the UI to match the website, and add one repeatable “simulation run” (Circle, 50 steps) with screenshots and a by-hand recipe—so we can learn the tool in a repeatable way and see how agentic AI can build that kind of tooling for us.**
