import { test, expect } from '@playwright/test';

test('shows the app title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'My tasks' })).toBeVisible();
});

test('renders tasks from the service', async ({ page }) => {
  await page.goto('/');
  const grid = page.getByRole('grid', { name: 'Tasks' });
  await expect(grid).toBeVisible();
  await expect(
    grid.getByRole('row', { name: /Build the task list screen/ }),
  ).toBeVisible();
  await expect(
    grid.getByRole('row', { name: /Write Playwright tests/ }),
  ).toBeVisible();
});
