# Copilot instructions for this repo

You are assisting with a Power Platform **Code App** built from a golden repo. Read `docs/design.md` (the app spec) and `docs/rules.md` (team rules) before generating code, and keep every suggestion consistent with them.

## Stack — never substitute

- TypeScript, `strict: true` — no `any`, no `@ts-ignore`, no `as any`
- React 18 function components + hooks only
- **Fluent UI v9** (`@fluentui/react-components`) — never MUI, Chakra, or raw CSS files; style with Fluent tokens
- Vite for build/dev; Playwright for UI tests

## Conventions

- One component per file; file name matches the exported component (PascalCase)
- Props: an explicitly typed `interface <Component>Props`
- Business logic lives in `src/services/` or hooks in `src/hooks/`, never inside components
- Components receive the `TaskService` interface via props — never import the concrete service
- Shared types live in `src/models/` and match `docs/design.md` §3 exactly
- Branches: `lab/<number>-<name>`; commits: Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`)

## Tests

- Playwright specs live in `e2e/`, one file per screen
- Locate elements with `getByRole` / `getByLabel` only, never CSS selectors
- No `waitForTimeout` — rely on auto-retrying `expect` assertions
- Tests run in mock mode (no Power Platform login); do not add auth steps

## Scope

- Build exactly what `docs/design.md` specifies — nothing from §5 (out of scope)
- When asked for an explanation, explain; when asked for code, produce the smallest correct diff
- If a request conflicts with `docs/rules.md`, say so and follow the rules
