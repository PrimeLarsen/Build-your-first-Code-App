# Lab 0 — Clone the golden repo & get it running

**Goal:** get a working copy of the golden repo on your machine, like you will do for every real project.

## 1. Prerequisites

| Tool | Check with | Get it |
|---|---|---|
| Node.js 20+ | `node -v` | https://nodejs.org |
| Git | `git --version` | https://git-scm.com |
| GitHub Copilot | signed in to GitHub in VS Code | https://docs.github.com/copilot |
| Power Platform CLI | `pac -v` | Lab 3 only — `npm i -g @microsoft/powerplatform-cli` |

## 2. Clone from Azure DevOps

In the session we host this golden repo in the team's Azure DevOps project. We clone it with the **Clone in VS Code** button — no terminal, no copy-pasting URLs.

> 🧑‍💻 **New to VS Code or git?** This flow is all clicks — see [docs/vscode-basics.md](../vscode-basics.md) §2 if anything looks unfamiliar.

1. In Azure DevOps, open the project → **Repos** → **Files**.
2. Click **Clone** (top right). The clone dialog shows the HTTPS URL and — below it — buttons for **"Clone in VS Code"** (and IDE options).
3. Click **Clone in VS Code**:
   - The browser asks permission to open VS Code ("Open Visual Studio Code?" / "Open the azuredevops… site?" or "Allow") → click **Allow/Open**.
   - VS Code opens (or switches) and shows a folder picker: **"Select repository location"** → choose a local folder, e.g. `C:\Dev\` (or `~/dev/`).
   - VS Code clones the repo into that folder and shows progress in the bottom-right corner.
4. When asked **"Would you like to open the cloned repository?"** → click **Open**.

That's it — the repo is open in VS Code and git is already connected.

> **Button missing?** The clone dialog's IDE buttons appear when Azure DevOps detects VS Code; if you don't see it, choose **Clone in VS Code** under "Other options", or fall back to pressing `Ctrl+Shift+P` in VS Code → `Git: Clone` → paste the HTTPS URL from the dialog.

> If the clone asks for credentials: use **Git Credential Manager** (bundled with Git for Windows) or a **Personal Access Token** (Azure DevOps → User settings → Personal access tokens → scope **Code: Read**). Never store the PAT in a file inside the repo.

## 3. Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you should see the app shell with the title **"My tasks"** and an empty task list.

## 4. Run the tests

```bash
npm test
```

Both Playwright tests should pass. If they do, your machine is ready for the whole session.

## 5. Create your working branch

> 🧑‍💻 GUI way: click the branch name in VS Code's bottom-left status bar → **Create new branch…** → name it `lab/1-setup-done`, then commit and sync from the **Source Control** panel ([VS Code basics §3](../vscode-basics.md)).

Terminal way:

```bash
git checkout -b lab/1-setup-done
git commit --allow-empty -m "feat: lab 0 complete, dev environment verified"
git push -u origin lab/1-setup-done
```

✅ **Done when:** the app runs on :3000, `npm test` is green, and your branch is pushed.
