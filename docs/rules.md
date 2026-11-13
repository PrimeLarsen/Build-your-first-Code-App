# 📏 Team rules

These rules apply to **every** Code App built from this golden repo — humans *and* Copilot. They are wired into Copilot automatically via `.github/copilot-instructions.md`; you still need to enforce them in review.

## Stack — no substitutions without team-lead approval

| Concern | Choice |
|---|---|
| Language | TypeScript (strict mode) |
| UI framework | React 18, function components + hooks only |
| Component library | **Fluent UI v9** (`@fluentui/react-components`) |
| Build tool | Vite |
| UI tests | Playwright |
| Styling | Fluent UI theme tokens — no raw hex colors, no CSS files per component |

## TypeScript

1. `strict: true` — no `any`, no `@ts-ignore`. Unknown data? Use `unknown` and narrow it.
2. All shared types live in `src/models/` and are imported from there.
3. Prefer `interface` for object shapes; `type` for unions/aliases.

## Components

4. One component per file; file name = component name (`TaskList.tsx` exports `TaskList`).
5. Props are an explicitly typed `interface` named `<Component>Props`.
6. No business logic in components — logic goes into `src/services/` or custom hooks in `src/hooks/`.
7. Components never import `TaskService` directly; they receive it via props or a context. This keeps them testable.

## Naming

| Thing | Convention | Example |
|---|---|---|
| Components / files | PascalCase | `NewTaskDialog.tsx` |
| Functions / variables | camelCase | `getTasks` |
| Types / interfaces | PascalCase | `TaskStatus` |
| Constants | SCREAMING_SNAKE | `MAX_TITLE_LENGTH` |
| CSS class names | none — use Fluent tokens | `tokens.colorBrandBackground` |

## Git

8. Branch names: `lab/<number>-<name>` (e.g. `lab/2-task-list`).
9. Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`.
10. A PR is only merged when CI is green **and** at least one reviewer approved.
11. Never commit secrets, connection IDs, or `.env` files.

## Testing

12. Every screen has at least one Playwright test covering its happy path.
13. Tests use accessible locators (`getByRole`, `getByLabel`) — never brittle CSS selectors.
14. Tests may not sleep: wait for visible outcomes (`await expect(...).toBeVisible()`).

## AI assistance (Copilot)

15. Always open your prompt with the context file: *"Following docs/design.md and docs/rules.md, ..."*
16. Never accept a suggestion you cannot explain. Ask Copilot to explain code you don't understand.
17. If Copilot invents a library or pattern not in the stack table, reject the suggestion and re-prompt.
18. Generated code goes through the same review as human code — rules 1–14 apply to it too.
