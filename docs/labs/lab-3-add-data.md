# Lab 3 — From mock data to Power Platform

**Goal:** understand how a Code App talks to real data — and why the golden repo's service seam makes that a one-file change.

## 1. Recap the seam

Your screen depends on `TaskService` (interface), not on mock data. Today `src/services/index.ts` returns the mock implementation:

```ts
export const taskService: TaskService = mockTaskService;   // swap me
```

## 2. How a real Code App gets data

A Code App is a Vite + React app hosted by the Power Platform runtime. Real data access works like this:

1. **Authenticate** against your environment:
   ```bash
   pac auth create --name Training
   pac env select --environment <environment-id>
   ```
2. **Initialize the Code App** in the environment (creates `power.config.json`, registers the app):
   ```bash
   pac code init --displayname "Task Tracker"
   ```
3. **Add a data source** — e.g. a Dataverse table or connector (connection IDs come from `pac connection list`):
   ```bash
   pac code add-data-source --name tasks -t <table> -c <connection-id>
   ```
4. The CLI **generates** typed service code in `src/services/generated/` (per the Power Apps SDK patterns — see [aka.ms/pacodeapps](https://aka.ms/pacodeapps)).

> ⚠️ Generated code is never hand-edited. Wrap it instead — which is exactly what our interface is for.

## 3. The one-file change (do this in the session's dev environment)

Write `dataverseTaskService.ts` implementing `TaskService` on top of the generated code, then flip the export:

```ts
export const taskService: TaskService = dataverseTaskService;
```

Your screen, your components, your Playwright tests: **zero changes**. That is the payoff of rules 6–7.

## 4. Run against the platform

```bash
npm run dev     # the Power Apps Vite plugin proxies auth + connector calls
```

Deploy the app to the environment:

```bash
npm run build
pac code push
```

The app then appears in https://make.powerapps.com under **Apps** as a code app.

## 5. What if I don't have an environment in this session?

Perfectly fine — mock mode exists precisely so the UI work (and CI) never blocks on a tenant. Read `docs/design.md` §3 again and note that the interface was designed *before* any data source existed.

✅ **Done when:** you can explain (a) what `pac code add-data-source` generates, and (b) why swapping mock → Dataverse touches one file.
