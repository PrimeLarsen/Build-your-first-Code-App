# 🤖 Using GitHub Copilot with this repo

Copilot is your pair programmer — you still review, test, and own every line it produces.

## 1. Why Copilot already knows our rules

GitHub reads `.github/copilot-instructions.md` in **every** chat in this repo. That file tells Copilot our stack, our naming conventions, and points it at `docs/design.md` and `docs/rules.md`. You get team-consistent code without repeating the rules in every prompt.

## 2. Prompt like a senior

| ❌ Weak | ✅ Strong |
|---|---|
| "make a task list" | "Following docs/design.md §2.1, build `src/screens/TaskList/TaskList.tsx` with Fluent UI v9: DataGrid + TabList filter. Use the `TaskService` interface from src/services." |
| "fix the bug" | "The TaskList shows a blank screen while loading. Per docs/design.md §4 it should show a Spinner. Fix it, don't change the service interface." |
| "add a test" | "Add a Playwright test for the empty state in docs/design.md §2.1: filter 'Open' with no open tasks shows the empty message. Use getByRole only." |

A good prompt has three parts: **context** (which file/section), **task** (what to build), **constraints** (rules that must hold).

## 3. Copilot Chat modes worth knowing

- `@workspace` — ask about the whole repo: *"@workspace where is task data loaded?"*
- `/explain` — select code you don't understand and run this.
- `/fix` — on a failing test or build error, paste the error first.
- Inline suggestions (Tab to accept, Esc to reject) — best for small, local edits.
- Copilot can also write commit messages and PR summaries — but you review them like code.

## 4. The golden loop

1. Read the design section for the feature.
2. Ask Copilot for the component/test, pointing at the design section.
3. Review: does it follow `docs/rules.md`? Can you explain every line?
4. Run the app and the Playwright tests.
5. Commit in small steps (`feat: add task list data grid`).

## 5. When Copilot goes wrong

- It invents libraries (e.g. MUI instead of Fluent UI) → reject, re-prompt with "Fluent UI v9 only, see docs/rules.md".
- It writes `any` or disables types → reject; rule 1 is non-negotiable.
- It "helpfully" adds out-of-scope features → reject; design.md §5 lists what is out of scope.
- Big rewrite suggestions → ask for the smallest diff instead: "change as little as possible".
