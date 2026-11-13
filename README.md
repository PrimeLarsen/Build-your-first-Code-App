# Build your first Code App 🚀

A **golden repo** for Power Apps **Code Apps** — a training template that junior Power Platform developers clone and use to build their first professional web app on the Power Platform, with the help of **GitHub Copilot** and **Playwright** UI tests.

A Code App is a full React + TypeScript app (built with Vite) that runs natively inside Power Apps and can talk to Power Platform connectors and Dataverse. You write standard web code — the Power Platform runtime hosts it.

---

## 🎯 What you will learn

| Skill | Where |
|---|---|
| Find your way around **VS Code** (no experience needed) | [VS Code basics](docs/vscode-basics.md) |
| Clone a golden repo from **Azure DevOps** | [Lab 0](docs/labs/lab-0-setup.md) |
| Read a **design spec** and **team rules** before coding | [Design](docs/design.md) · [Rules](docs/rules.md) |
| Build app screens with **GitHub Copilot** | [Lab 2](docs/labs/lab-2-build-ui.md) |
| Connect the app to **Power Platform data** | [Lab 3](docs/labs/lab-3-add-data.md) |
| Write **Playwright UI tests** | [Lab 4](docs/labs/lab-4-playwright.md) |
| Open a PR and get it **validated by CI** | [Lab 5](docs/labs/lab-5-pr.md) |

## 🗂️ Repo structure

```
├── docs/
│   ├── design.md                  # 📐 The app design you will build (single source of truth)
│   ├── rules.md                   # 📏 Team coding rules Copilot must follow
│   ├── vscode-basics.md           # 🧑‍💻 VS Code survival guide (start here if new to VS Code)
│   ├── copilot-guide.md           # 🤖 How to prompt Copilot effectively
│   ├── playwright-guide.md        # 🧪 UI testing concepts
│   └── labs/                      # 🧪 Step-by-step labs (start at lab-0)
├── src/                           # ⚛️ The Code App scaffold (React + Vite + TS + Fluent UI)
│   ├── components/                # Reusable UI components
│   ├── screens/                   # One folder per app screen
│   ├── services/                  # Data access (mock today, Dataverse/connector later)
│   ├── models/                    # TypeScript types
│   └── App.tsx                    # App shell + navigation
├── e2e/                           # 🧪 Playwright UI tests
├── .github/
│   ├── copilot-instructions.md    # 🤖 Rules Copilot reads automatically in every chat
│   └── workflows/ci.yml           # 🏗️ CI: build + test every PR
└── package.json
```

## ⚡ Quick start (after cloning)

```bash
npm install
npm run dev        # app on http://localhost:3000
```

The scaffold runs in **mock mode** (fake data, no Power Platform login needed), so it works on any machine — including CI. Lab 3 shows how to wire it to real Dataverse data with `pac`.

```bash
npm test           # run Playwright UI tests (headless)
npm run test:ui    # run Playwright tests interactively
```

## 🏗️ How this repo is used in the session

1. **You clone this golden repo** from the team's Azure DevOps project (Lab 0).
2. **You read the design and the rules** — never code before reading them.
3. **You build the app screens with Copilot**, one lab at a time.
4. **You protect your work with Playwright tests**, and CI validates every PR.

> 💡 **Golden repo idea:** this repo is the *approved starting point*. Everyone starts from the same design, the same rules, and the same scaffold — so every app the team ships looks and feels consistent, and code review focuses on *what changed*, not *style*.

## 🔗 Useful links

- [Code Apps documentation (aka.ms/pacodeapps)](https://aka.ms/pacodeapps)
- [microsoft/PowerAppsCodeApps — official samples](https://github.com/microsoft/PowerAppsCodeApps)
- [Fluent UI v9 (the design system used by Code Apps)](https://react.fluentui.dev/)
- [Playwright docs](https://playwright.dev/)
- [GitHub Copilot docs](https://docs.github.com/copilot)
