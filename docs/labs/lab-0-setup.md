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

In the session we host this golden repo in the team's Azure DevOps project. Cloning is identical to GitHub — you just auth against your work account.

> 🧑‍💻 **New to VS Code or git?** Do this with clicks, no terminal — see [docs/vscode-basics.md](../vscode-basics.md) §2.

1. In Azure DevOps, open the project → **Repos** → **Files**.
2. Click **Clone** (top right). Copy the HTTPS URL, e.g.
   `https://dev.azure.com/<org>/<project>/_git/golden-code-app`
3. **Option A — VS Code (recommended):** press `Ctrl+Shift+P` → type `Git: Clone` → paste the URL → pick a folder → **Open** when asked.
4. **Option B — terminal:**

```bash
git clone https://dev.azure.com/<org>/<project>/_git/golden-code-app
cd golden-code-app
```

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
