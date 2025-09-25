# GitHub Actions Workflows

This repo implements CI/CD with three workflows plus a custom composite action.

---

## 1) CI Pipeline — `.github/workflows/ci.yml`

**Purpose:** Quality gates on every push/PR and build artifacts.

**Triggers:**
- `push` to `main`, `develop`
- `pull_request` targeting `main`

**Jobs (and dependencies):**
- `lint` → ESLint + Prettier check  
- `test` (needs: `lint`) → Jest with coverage; uploads to Codecov  
- `build` (needs: `test`) → builds to `dist/` and uploads artifact

**Secrets & Variables:**
- `CODECOV_TOKEN` (Actions secret) — required by `codecov/codecov-action`
- Optional build vars via Actions Variables, e.g. `VITE_API_BASE`

**Key checks:**
- Coverage threshold ≥ 80% enforced in `jest.config.cjs`
- Node modules cache via `actions/setup-node@v4` (`cache: npm`)

**Troubleshooting:**
- *ESLint can’t find config:* ensure `eslint.config.mjs/js` exists at repo root.
- *Prettier fails check:* run `npm run format` locally, commit changes.
- *Coverage < 80%:* add tests or exclude non-source files in `collectCoverageFrom`.
- *Codecov upload fails:* verify `coverage/lcov.info` exists and `CODECOV_TOKEN` is set.

---

## 2) Daily Dependency Security Audit — `.github/workflows/dependency-audit.yml`

**Purpose:** Detect vulnerable dependencies and auto-create a GitHub issue.

**Triggers:**
- `schedule`: daily at 06:00 UTC
- `workflow_dispatch`: manual run

**Permissions:**  
`contents: read`, `issues: write` (needed to open an issue)

**What it does:**
- Runs `npm audit --audit-level=high`
- Uploads `audit.txt` as an artifact
- If exit code ≠ 0, opens an issue with the audit output

**Troubleshooting:**
- Too noisy? Change to `--audit-level=critical` or run weekly.
- Issue not created? Check workflow permissions and step logs.

---

## 3) Deploy to GitHub Pages — `.github/workflows/deploy-pages.yml`

**Purpose:** Build site and deploy `dist/` to GitHub Pages on `main`.

**Triggers:**
- `push` to `main`
- `workflow_dispatch`: manual run

**Permissions:**  
`pages: write`, `id-token: write` (required by `actions/deploy-pages`)

**What it does:**
- Builds the site (`npm run build`) → creates `dist/`
- Uploads artifact and deploys to Pages (`actions/deploy-pages@v4`)
- Uses optional env var (e.g. `VITE_API_BASE`)

**Troubleshooting:**
- `tar: dist: No such file or directory` → ensure `npm run build` creates `dist/`.
- Deployed but blank page → confirm `dist/index.html` exists.

---

## 4) Custom Composite Action — `.github/actions/node-setup-install/`

**Purpose:** DRY helper to set up Node with npm cache and install dependencies.

**Inputs:**  
- `node-version` (required) — e.g. `"20"`

**Steps:**  
- `actions/setup-node@v4` with `cache: npm`  
- `npm ci`

**Usage:**
```yaml
- uses: ./.github/actions/node-setup-install
  with:
    node-version: "20"
