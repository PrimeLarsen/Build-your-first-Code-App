# 🧪 Playwright UI testing — the 5-minute guide

Playwright drives a real browser, clicks your real UI, and tells you if it still works. It catches the bugs manual testing misses — and it runs on every PR in CI.

## Core concepts

| Concept | What it means |
|---|---|
| **Test** | A scenario written in code: "open the app, click New task, expect a dialog" |
| **Locator** | How you find an element — always by role/label, never CSS classes |
| **Assertion** | An auto-retrying check: `await expect(locator).toBeVisible()` |
| **Fixture** | A ready-to-use test context: `page` (a browser tab), `browser` (Chromium) |

## Anatomy of a test

```ts
import { test, expect } from '@playwright/test';

test('shows the app title', async ({ page }) => {
  // 1. Arrange — navigate
  await page.goto('/');
  // 2. Act — nothing to click here
  // 3. Assert — auto-retries until visible or timeout
  await expect(page.getByRole('heading', { name: 'My tasks' })).toBeVisible();
});
```

## The rules that keep tests alive

1. **Locate by role or label** — `getByRole('button', { name: 'New task' })`, `getByLabel('Title')`. This is why `docs/design.md` names every element.
2. **Never `waitForTimeout`** — assertions retry automatically; sleeps make tests slow and flaky.
3. **Assert visible outcomes** — "the row appeared", not "the promise resolved".
4. **One scenario per test** — when it fails, you know exactly what broke.

## Commands

```bash
npx playwright test          # headless, all tests
npx playwright test --ui     # interactive explorer (great while learning)
npx playwright test --headed # watch the browser
npx playwright show-report   # open the HTML report after a run
```

## How tests run without Power Platform

Real Code Apps need a Power Platform login — a UI test can't sign in. So the scaffold boots in **mock mode** (`VITE_USE_MOCKS=true`, the default in dev and CI): `src/services/mockTaskService.ts` serves fake data. The tests then exercise the *real* React UI against the same `TaskService` interface. In Lab 3 you'll learn how this same seam lets you swap in Dataverse later without touching a single test.

## Where the files live

```
e2e/                 # *.spec.ts tests, one per screen
playwright.config.ts # baseURL http://localhost:3000, webServer starts `npm run dev`
```
