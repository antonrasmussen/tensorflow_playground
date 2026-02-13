# Deep playground

Deep playground is an interactive visualization of neural networks, written in
TypeScript using d3.js. We use GitHub issues for tracking new requests and bugs.
Your feedback is highly appreciated!

**If you'd like to contribute, be sure to review the [contribution guidelines](CONTRIBUTING.md).**

## Development

To run the visualization locally, run:
- `npm i` to install dependencies
- `npm run build` to compile the app and place it in the `dist/` directory
- `npm run serve` to serve from the `dist/` directory and open a page on your browser.

For a fast edit-refresh cycle when developing run `npm run serve-watch`.
This will start an http server and automatically re-compile the TypeScript,
HTML and CSS files whenever they change.

### Run locally in Cursor (fixed port)

- `npm run build` then `npm run serve:test` — serves at **http://127.0.0.1:8080**

### Automated tests

- `npm test` — runs Playwright tests (starts the server automatically if needed).
- First time: run `npx playwright install` to download the browser.
- See [tests/README.md](tests/README.md) for test groups and how to run a single test.

**Run report:** Simulation runs write `tests/simulations/outputs/circle-quick-convergence-latest.json` with dataset, steps, initial/final loss, epoch, and timestamp—so you can compare runs or paste numbers into notes.

## For owners
To push to production: `git subtree push --prefix dist origin gh-pages`.

This is not an official Google product.
