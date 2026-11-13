# Lab 2 — Build the Task List screen with Copilot

**Goal:** implement design.md §2.1 (Task List) using Copilot, without breaking the rules.

## 1. Branch

> 🧑‍💻 GUI way: click the branch name in the bottom-left status bar → **Create new branch…** → `lab/2-task-list`.

```bash
git checkout -b lab/2-task-list
```

## 2. Prompt Copilot for the list

> 🧑‍💻 Not sure where Copilot Chat lives? Open it with `Ctrl+Shift+I` — see [VS Code basics §4](../vscode-basics.md).

Open Copilot Chat in VS Code and try this prompt (adapt freely — this is a starting point). For better results, use the techniques from [docs/copilot-guide.md](../copilot-guide.md) §5 — especially **§5A**: attach files with `#` so Copilot uses your real types.

> 📖 New words? *Props* are the inputs a component receives from its parent (like function parameters), a *component* is one reusable piece of the screen, and *strict* TypeScript means the editor refuses anything suspicious. All in the [glossary](../glossary.md).

```
Following docs/design.md §2.1 and docs/rules.md, build the Task List screen in
src/screens/TaskList/TaskList.tsx.

- Use Fluent UI v9 only: DataGrid for the list, TabList for the All/Open/Done filter,
  SearchBox for search, Spinner while loading, MessageBar on error.
- Get data from the TaskService interface in src/services — pass it via props.
- TypeScript strict, no any. One component per file.

Do not change the TaskService interface or the mock data.
```

## 3. Review the output like it's a PR from a stranger

Check against `docs/rules.md`:

- [ ] Fluent UI v9 only — no MUI, no raw HTML tables, no hex colors
- [ ] No `any`, no `@ts-ignore`
- [ ] Business logic in the component? → move it out (rule 6)
- [ ] Loading and error states present (design §4)
- [ ] You can explain **every line** — otherwise ask Copilot `/explain` until you can

## 4. Wire it into the app shell

Replace the placeholder home screen in `src/App.tsx` with your `TaskList`. Keep the shell untouched otherwise.

## 5. See it working

```bash
npm run dev
```

Filter tabs show counts, search filters live, the DataGrid renders mock tasks.

## 6. Commit in small steps

> 🧑‍💻 GUI way: Source Control panel → type the message → **Commit** → **Sync Changes** ([VS Code basics §3](../vscode-basics.md)).

Terminal way:

```bash
git add src/screens/TaskList src/App.tsx
git commit -m "feat: task list screen with filter tabs and search"
```

## 7. Stretch goals (only if the main list is done)

- The **New Task dialog** (design §2.2) — same loop: prompt → review → run.
- Empty state per design §2.1.

✅ **Done when:** the Task List matches design §2.1, follows the rules, and is committed.
