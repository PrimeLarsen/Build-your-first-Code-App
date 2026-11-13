# Lab 3 — From mock data to a SharePoint list

**Goal:** understand how a Code App talks to real data — and why the golden repo's service seam makes that a one-file change. We use a **SharePoint list**, the data source your team already knows.

> 📖 The **seam** is the single place where the data source plugs in: screens only know the `TaskService` *interface* (a contract listing which methods exist), so the implementation behind it can be swapped freely. Plain-language definitions of *environment*, *connection ID* and friends: [docs/glossary.md](../glossary.md).

## 1. Recap the seam

Your screen depends on `TaskService` (interface), not on mock data. Today `src/services/index.ts` returns the mock implementation:

```ts
export const taskService: TaskService = mockTaskService;   // swap me
```

## 2. Create the SharePoint list

In your team's SharePoint site, create a list called **Tasks** with these columns (delete the default ones you don't need):

| Column | Type | Notes |
|---|---|---|
| `Title` | Title (text) | The built-in first column — the task's name |
| `Status` | Choice: `open`, `done` | Must use exactly these two values |
| `DueDate` | Date and Time (date only) | Optional |
| `Notes` | Multiple lines of text | Optional |

Add a couple of test items so you have data to see.

## 3. How a real Code App gets data

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
3. **Get a connection ID** — this is the saved "plumb line" from Power Platform to SharePoint. If you already have a SharePoint connection, find its ID with:
   ```bash
   pac connection list
   ```
   No SharePoint connection yet? Create one once in the maker portal: [make.powerapps.com](https://make.powerapps.com) → **Connections** → **New connection** → **SharePoint** → sign in.
4. **Add the list as a data source** (site URL = your SharePoint site, list name = `Tasks`):
   ```bash
   pac code add-data-source --api-name shared_sharepointonline --connection-id <connection-id> --table "Tasks" --dataset <site-url>
   ```
   > 💡 If the command complains about the site URL, URL-encode it — some CLI versions want the URL **encoded twice** (e.g. `https%3A%2F%2Fcontoso.sharepoint.com%2Fsites%2FTasks`).
5. The CLI **generates** typed service code in `src/services/generated/` (per the Power Apps SDK patterns — see [aka.ms/pacodeapps](https://aka.ms/pacodeapps)).

> ⚠️ Generated code is never hand-edited. Wrap it instead — which is exactly what our interface is for.

## 4. The one-file change (do this in the session's dev environment)

Write `sharePointTaskService.ts` implementing `TaskService` on top of the generated code (the generated SDK has typed get/create/update/delete methods for the `Tasks` list — map them to `getTasks`, `createTask`, `completeTask`, `deleteTask`), then flip the export:

```ts
export const taskService: TaskService = sharePointTaskService;
```

Your screen, your components, your Playwright tests: **zero changes**. That is the payoff of rules 6–7.

## 5. Run against the platform

```bash
npm run dev     # the Power Apps Vite plugin proxies auth + connector calls
```

Deploy the app to the environment:

```bash
npm run build
pac code push
```

The app then appears in https://make.powerapps.com under **Apps** as a code app — now reading and writing **your real SharePoint list**.

## 6. What if I don't have an environment in this session?

Perfectly fine — mock mode exists precisely so the UI work (and CI) never blocks on a tenant. Read `docs/design.md` §3 again and note that the interface was designed *before* any data source existed. You can also prepare the SharePoint list (step 2) — it needs no Power Platform environment at all.

✅ **Done when:** you can explain (a) what `pac code add-data-source` generates, and (b) why swapping mock → SharePoint touches one file.
