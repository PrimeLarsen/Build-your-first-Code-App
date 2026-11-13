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

## 5. The prompt cookbook — techniques that get results

These are the patterns that consistently turn mediocre suggestions into shippable code. Try them in order during the labs.

### A. Anchor the context with `#file`

In Copilot Chat, typing `#` gives a file picker. Attach the exact files instead of hoping Copilot finds them:

```
Using #design.md §2.1, #TaskService.ts and #Task.ts, build #TaskList.tsx
```

Copilot then writes code against your *real* types and imports — not ones it imagines.

### B. Ask for a plan first, then code

For anything bigger than a button, split the conversation:

```
Before writing code: give me a plan in 5 numbered steps for implementing
docs/design.md §2.1, with the files you would create. Ask me anything unclear first.
```

You correct the plan in chat (cheap), then say "go" — instead of correcting 200 lines of code (expensive).

### C. Show one example, get consistency

If you want a specific shape of code, paste a small example of what "good" looks like:

```
Write hooks in the same style as this example: [paste 10 lines]
Now write a useTaskFilter hook that filters by status + search text.
```

### D. One thing per prompt

"Build the screen, add the dialog, write tests and update the README" produces four mediocre things. Four prompts produce four good things. Small steps also give you small diffs — and small diffs get reviewed properly.

### E. Give it the test as the goal

The fastest way to correct behavior is to state the assertion you want:

```
Make this Playwright test pass without changing it:
await expect(page.getByRole('tab', { name: 'Open' })).toContainText('2');
```

A clear, checkable goal beats a paragraph of prose.

### F. Iterate — don't restart

When the first suggestion is 80% right, keep the thread and refine:

- "Good, but extract the filtering into a hook (rule 6)."
- "Now add the loading spinner from design §4."
- "Make the diff smaller — only touch TaskList.tsx."

Copilot keeps the conversation as context; a new chat throws it away.

### G. Use it as a reviewer, not just a writer

Before you push:

```
Review src/screens/TaskList/ against docs/rules.md and docs/design.md §2.1.
List every rule violation as a numbered list. Do not rewrite the code yet.
```

### H. When you're stuck, ask for options

```
What are three ways to implement the tab filter counts in this repo?
Which one fits docs/rules.md best, and why?
```

Juniors who ask "why" learn the reasoning; juniors who only ask "write it" learn nothing.

## 6. When Copilot goes wrong

- It invents libraries (e.g. MUI instead of Fluent UI) → reject, re-prompt with "Fluent UI v9 only, see docs/rules.md".
- It writes `any` or disables types → reject; rule 1 is non-negotiable.
- It "helpfully" adds out-of-scope features → reject; design.md §5 lists what is out of scope.
- Big rewrite suggestions → ask for the smallest diff instead: "change as little as possible".
