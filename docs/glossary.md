# 📖 Glossary — plain-language definitions

Every technical term used in this repo, explained in one or two sentences. If a doc uses a word you don't know, it's here. **Never skip a lab because of vocabulary — look it up here and keep going.**

## The big picture

| Term | What it actually means |
|---|---|
| **Code App** | A normal web app (React + TypeScript) that runs *inside* Power Apps instead of in a plain browser. You write regular web code; Microsoft's platform hosts it. |
| **golden repo** | A "template" repository that already contains the team's best setup (structure, rules, tests, CI). You clone it and start building — the boring, error-prone setup is done for you. |
| **repo(sitory)** | A project's folder plus its full history of changes, stored by git. "Cloning" copies it to your machine. |
| **Power Platform** | Microsoft's suite for building business apps. **Dataverse** is its built-in database, and **connectors** are ready-made plugs to external systems (SharePoint, Outlook, …). |
| **environment** | A copy of Power Platform where your app and its data live (like "dev", "test", "prod"). Your app is deployed *to* an environment. |
| **tenant** | Your organisation's slice of Microsoft's cloud (one company = one tenant). If you don't have an environment in the tenant, you use mock mode. |

## Building blocks of the app

| Term | What it actually means |
|---|---|
| **React** | The library used to build the screens. You write small reusable pieces called **components** (a button, a list, a whole screen), and React assembles the page from them. |
| **component** | One reusable piece of UI. `TaskList.tsx` is a component that shows the task table. |
| **props** | The inputs a component receives from its parent — like parameters of a function. `<Home taskService={...} />` passes the `taskService` prop to `Home`. |
| **hook** | A React function starting with `use` (like `useState`) that gives a component abilities: remembering values, running code when the page loads, etc. |
| **TypeScript** | JavaScript with **types**: labels that say what kind of data something is (`title: string`). The editor then catches mistakes before the app even runs. |
| **interface** | A description of an object's shape: which fields it has and of what type. `Task` says a task has `id`, `title`, `status`… It's a contract: any code promising "I return a `Task`" must deliver those fields. |
| **strict mode** | TypeScript's pickiest setting — it refuses anything suspicious instead of silently allowing it. This repo always uses it. |
| **`any`** | The "I don't care what this is" type. Forbidden here (rule 1) because it switches off all safety checks. |
| **Fluent UI v9** | Microsoft's official component library: pre-built buttons, tables, dialogs that look right in Microsoft products. We don't style things by hand; we use Fluent's `DataGrid`, `TabList`, etc. |
| **Vite** | The tool that runs the app while you develop (`npm run dev`) and packages it for publishing (`npm run build`). |
| **npm** | The tool that downloads libraries the project depends on (`npm install`) and runs project commands (`npm run dev`). |

## Data & the "seam"

| Term | What it actually means |
|---|---|
| **mock / mock mode** | A *fake* data source that behaves like the real one but serves made-up data and needs no login. The app runs on mocks until Lab 3 swaps in real Power Platform data. |
| **seam** | The single place where two parts of the app connect — here, the `TaskService` interface. Screens only know the interface, so swapping mock data for Dataverse means changing **one file**. "The seam" always refers to this trick. |
| **service** | A class whose only job is data: fetching tasks, creating them, deleting them. Screens ask the service; they never fetch data themselves. |
| **connection ID** | The identifier of a connector's saved credentials (e.g. which SharePoint account to use). You get it from `pac connection list`. |
| **generated code** | Code written by a tool (`pac code add-data-source`), not by a human. Never hand-edit it — see `docs/labs/lab-3-add-data.md`. |
| **`pac`** | The Power Platform CLI (command-line tool) used in Lab 3 to log in to an environment and register/deploy the app. |

## Testing

| Term | What it actually means |
|---|---|
| **Playwright** | A tool that opens a real browser, clicks your app like a user would, and checks that the right things appear on screen. |
| **e2e (end-to-end) test** | A test that exercises the whole app through its UI, exactly like a user — the `e2e/` folder holds them. |
| **locator** | How a test finds an element on the page. We locate by **role** (`getByRole('button')`) or **label**, never by styling. |
| **assertion** | The check itself: "this heading must be visible". Playwright retries it until it's true or the test times out. |
| **fixture** | A ready-made object the test framework hands you — mainly `page`, a fresh browser tab. |
| **headless** | Running the browser without showing its window (fast, used in CI). `--headed` shows the window so you can watch. |
| **happy path / golden path** | The main scenario with nothing going wrong: click "New task", fill the title, create, see it in the list. Rule 12 requires a test for it. |
| **flaky** | A test that sometimes passes and sometimes fails for no clear reason (usually caused by fixed waits — rule 14 bans them). |

## Git, PRs & CI

| Term | What it actually means |
|---|---|
| **git** | The tool that records every version of your files so you can go back and work in parallel. VS Code's Source Control panel is its friendly face. |
| **branch** | Your own private copy of the code where you can experiment safely; `main` stays stable. |
| **commit** | One saved snapshot of your changes, with a message describing it. |
| **PR (pull request)** | "Please look at my branch and merge it into `main`." A PR shows the diff (all changed lines) and lets teammates comment and approve. |
| **diff** | The before/after of a change — the lines that were added or removed. |
| **CI (continuous integration)** | The robot (`.github/workflows/ci.yml`) that automatically builds the app and runs all tests on every PR. Green = it works; red = fix before merging. |
| **squash-merge** | Combining all your branch's commits into a single commit on `main`, keeping history tidy. |
| **conventional commit** | A commit message starting with a type: `feat:`, `fix:`, `test:`, `docs:`, `refactor:` (rule 9). |

---

💡 **Tip for the session:** when a doc uses a term you can't explain, check here first, then ask Copilot Chat `/explain` — being able to say it *in your own words* is the real goal.
