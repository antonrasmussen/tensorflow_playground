# Recipe: Circle – quick convergence

**What this shows:** On the simple Circle dataset, the network usually reduces loss quickly. This is a baseline "easy" case to compare with harder problems (e.g. Spiral, XOR).

**Automated version:** The Playwright test `circle-quick-convergence.spec.ts` does these steps for you. Run:  
`npx playwright test tests/simulations/circle-quick-convergence.spec.ts`

---

## Steps (by hand)

1. **Open the playground**  
   Serve the app (`npm run build` then `npm run serve:test`) and open http://127.0.0.1:8080

2. **Select the Circle dataset**  
   In the "DATA" section, click the **Circle** thumbnail (two concentric circles).

3. **Leave other settings at default**  
   - Problem: Classification  
   - 1 hidden layer, 8 neurons (or whatever is default)  
   - Learning rate: default (e.g. 0.03)  
   - Activation: tanh

4. **Note the starting loss and epoch**  
   - "Training loss" and "Iteration #" are in the right panel.  
   - Epoch should be 0 (or reset first with the reset button if needed).

5. **Run 50 steps**  
   - Click **Step** 50 times, **or** click **Play** and let it run for 50 iterations, then **Pause**.  
   - Watch the loss curve and the decision boundary updating.

6. **Record the outcome**  
   - Final training loss: ___________  
   - Final test loss: ___________  
   - Iteration #: 50  

7. **Compare**  
   - Did training loss go down?  
   - Next time: try the same with Spiral or XOR and compare how many steps it takes to get a similar loss.

---

## What to try next

- Run the same 50 steps again after clicking **Regenerate** — different random data will give slightly different loss.
- Switch to **Spiral** and run 50 steps: loss often stays higher; the problem is harder.
- Increase **Noise** on Circle and run again: loss may decrease more slowly.
