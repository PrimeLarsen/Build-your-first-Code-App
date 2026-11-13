# Lab 1 — Read the design & rules, explore the scaffold

**Goal:** understand what you're building and where it lives. Reading before coding is the whole point of a golden repo.

## 1. Read the two documents that govern this session

- `docs/design.md` — the app you will build (Task Tracker). Note §2.1: the Task List screen, and §3: the `TaskService` interface.
- `docs/rules.md` — 18 rules. You will be asked about rules 6 and 7 in review.

## 2. Tour the scaffold

> 📖 The *scaffold* is the starter code the repo ships with — a working app skeleton you build on. Any other unfamiliar word? Check [docs/glossary.md](../glossary.md).

| Path | Purpose |
|---|---|
| `src/App.tsx` | App shell: Fluent provider + navigation |
| `src/screens/` | Screens — **this is where you'll work** |
| `src/components/` | Reusable components |
| `src/services/` | Data access — `TaskService` interface + mock implementation |
| `src/models/Task.ts` | The `Task` type from design.md §3 |
| `e2e/` | Playwright tests |
| `.github/copilot-instructions.md` | What Copilot reads automatically |

## 3. Trace one data flow

Open `src/App.tsx` and follow how the shell loads tasks through `TaskService` (mock mode). Answer for yourself:

1. Which file decides that mock data is used?
2. Which file would change if we swapped in Dataverse — and *only* that file?

That **seam** — the single place where the data source is plugged in, so it can be swapped without touching the screens — is why rule 7 exists. (Full definition: [glossary](../glossary.md#data--the-seam).)

## 4. Ask Copilot to explain, not to code

Open Copilot Chat and try:

```
@workspace explain how the task data flows from src/services to the UI in this repo.
```

Then select any file and run `/explain`. Today Copilot is your **tour guide**, not your coder.

✅ **Done when:** you can explain (out loud) the `TaskService` seam and name three rules from `docs/rules.md`.
