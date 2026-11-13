# Lab 4 — Protect your screen with Playwright tests

**Goal:** add UI tests for the Task List you built in Lab 2.

## 1. Branch

```bash
git checkout -b lab/4-ui-tests
```

## 2. Read the existing test

Open `e2e/app.spec.ts`. It's deliberately simple — navigate, assert a heading.

> 🧑‍💻 Tip: install the **Playwright Test for VS Code** extension — it puts a green ▶ next to every test so you can run one with a click, no terminal needed.

Run the tests interactively to *see* Playwright work:

```bash
npx playwright test --ui
```

## 3. Write test #1 — the filter tabs

Start from this skeleton in `e2e/task-list.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('filter tabs show task counts', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('tab', { name: /Open/ })).toContainText(/\d/);
});
```

Then extend it: click **Done** and assert the grid now shows only done tasks (one of the mock tasks is done — check `src/services/mockTaskService.ts`).

## 4. Write test #2 — search

- Type into the search box → assert the grid shows only matching rows.
- Type gibberish → assert the **empty state** from design §2.1 appears.

## 5. Write test #3 — the golden path

The *golden path* (also "happy path") is the main scenario where nothing goes wrong: 

New task → dialog opens → fill Title → Create → dialog closes → new task appears in the grid.

Rules from `docs/playwright-guide.md`:

- `getByRole` / `getByLabel` only — no CSS selectors
- no `waitForTimeout` — assertions retry themselves
- assert what the **user sees**, not internals

## 6. Make it fail, then pass (the most important step)

Temporarily break your screen (e.g. rename the "New task" button), run the tests, and watch them fail with a clear error. Fix it and watch them go green. A test you've never seen fail proves nothing.

## 7. Run everything

```bash
npm test
npx playwright show-report
```

```bash
git add e2e
git commit -m "test: task list filter, search and create-task happy path"
```

✅ **Done when:** three green tests cover filter, search and the create-task path — and you've seen at least one of them fail on purpose.
