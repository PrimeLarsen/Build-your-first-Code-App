# Lab 5 — Open a PR and let CI validate it

**Goal:** ship your work the way the team does: branch → PR → CI → review → merge.

## 1. Push your branch

```bash
git push -u origin lab/4-ui-tests
```

## 2. Open the PR

> 🧑‍💻 GUI way: after pushing, VS Code shows a notification with a **Create Pull Request** button — or install the **GitHub Pull Requests** extension and click "Create Pull Request" in the Source Control panel. Fill in the template right there.

On GitHub (or the Azure DevOps pull-request page, if that's where your team works):

- Base: `main` · Compare: your branch
- Title: conventional commit style, e.g. `feat: task list screen with UI tests`
- Description: what changed, how to test it manually, a screenshot of the screen

## 3. Watch CI

*CI (continuous integration)* is the robot that builds the app and runs every test automatically on each PR — you never test by hand what CI can test for you. The workflow in `.github/workflows/ci.yml` runs on every PR:

1. `npm ci` — clean install
2. `npm run build` — TypeScript strict + Vite build must pass
3. `npx playwright test` — boots the app in mock mode and runs all UI tests

Red PR? Click into the failing job, read the first error (not the last), fix, push. CI is your fastest reviewer.

## 4. Review each other

Swap PRs with a teammate and review against `docs/rules.md`. A good first review comment sounds like:

> "Rule 6 — this formatting logic could live in a hook. What do you think?"

## 5. Merge

- CI green ✅
- At least one approval ✅
- Squash-merge into `main` (all your commits become one single commit — tidy history), delete the branch

## Wrap-up discussion

- What did Copilot get right immediately, and where did it need steering?
- Which rule saved you the most time?
- What would you add to *this* golden repo for the next team?

✅ **Done when:** your PR is merged and you've reviewed someone else's PR.
