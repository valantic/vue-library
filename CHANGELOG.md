# Changelog

## unreleased

- [docs] Added a `docs/` folder with one feature doc per element/plugin/composition/directive (`e-icon`,
  `viewport`, `vue-bem-cn`, `form-states`, `uuid`, `outside-click`) and an index at `docs/README.md` covering
  how consumers import from the package's subpath exports.
- [ci] Aligned `.github/workflows/test.yml` with the other shared-frontend repos: job `test`, step "Run tests"
  (the old label claimed checks that don't run here), Node version read from `.nvmrc`, token limited to
  `contents: read`.
- [ci] Added the shared `Security Scan` workflow (`.github/workflows/security.yml`, Trivy): scans the dependencies
  daily and on pull requests, opens/updates a `security` issue on CRITICAL/HIGH findings, closes it when clean, and
  uploads the results to the GitHub Security tab.
- [ci] `security.yml` now posts (and keeps updated) a pull request comment with the vulnerability breakdown when the
  Trivy scan fails a PR check, instead of only failing the job with no feedback beyond the raw log.
- [fix] `security.yml`: steps gated on `steps.trivy-sarif.outcome` now also require `always()`. Without it,
  GitHub Actions implicitly ANDs a bare `if:` with `success()`, so those steps were skipped exactly when the
  Trivy step failed — the case they exist to handle.
- [chore] Made `.prettierrc.json5` identical to the other shared-frontend repos (added the `^@!production/(.*)$`
  import-order group, which has no effect here since this repo has no such alias).
- [chore] Harmonized the copyright line in `LICENSE` to `2017-present, valantic CEC Schweiz AG`, matching the README.
- [docs] Restructured `AGENTS.md` to the shared outline and added the shared `## Working rules` section (git rules, no
  release/publish or dependency changes without approval, engineering priorities, `npm test` before finishing).
- [docs] Added a `## Code conventions` section to `AGENTS.md` summarizing the valantic frontend guidelines (incl.
  Options API, Pinia).
- [docs] Completed `CONTRIBUTING.md` with the shared outline (Getting started / Developing / Changelog / Releasing).
- [docs] `AGENTS.md` now refers to `engines`/`.nvmrc` for the Node.js/npm versions instead of an outdated copy.
- [docs] Added a `## Contributing` section to `README.md` linking `CONTRIBUTING.md` (contribution and release steps).
- [build] `npm run release[:minor|:major]` now runs the shared `scripts/release.mjs` instead of plain `npm version`. It
  releases from an up-to-date `main` only, aborts on uncommitted changes or an empty `## unreleased` section, renames
  that section to `## vX.Y.Z`, updates the README version pin, and commits, tags (`vX.Y.Z`, annotated) and pushes.
- [ci] Added the `Release` workflow (`.github/workflows/release.yml`): pushing a `vX.Y.Z` tag creates the GitHub
  release, using that version's `CHANGELOG.md` section as release notes. It fails if the section is empty.
- [docs] Added `CONTRIBUTING.md` describing the release process.
- [docs] Adopted the shared shared-frontend changelog convention (`# Changelog` title, `unreleased` / `vX.Y.Z`
  headings, `[feat]`/`[fix]`/… prefixes, `### Breaking Changes` with migration notes), documented in `AGENTS.md`.
  Unreleased entries were moved to the new prefixes; released entries are unchanged.
- [docs] Added a repo banner (`.github/assets/banner.jpeg`) to the top of `README.md`, matching the `vue-styleguide`
  convention.

- [docs] Restructured `README.md` to follow the `vue-styleguide` schema (centered header with tagline/links, `About
  this project`, `Quickstart`) and added the shared "from valantic - with love" footer.

- [chore] Reordered `package.json` top-level keys to match the `vue-styleguide` boilerplate ordering.

- [chore] Bumped `engines.node` to `>=22 <26` (was `>=22 <25`) to allow Node 25. Updated `.nvmrc` from `24` to `25`.
  Added `min-release-age=7` and `ignore-scripts=true` to `.npmrc`.

- [feat] Project bootstrap
- [ci] Renamed the CI workflow to "CI Test" and updated it to `actions/checkout@v7`, `actions/setup-node@v7`, and
  Node 25.
- [docs] Streamlined `.github/PULL_REQUEST_TEMPLATE.md` by removing the obsolete checklist sections.
- [docs] Add AGENTS.md documenting the package structure and conventions, with CLAUDE.md reduced to a pointer to it, matching the pattern used in frontend-utils
- [docs] Add a Documentation section to AGENTS.md requiring feature docs to live in this repo's own `docs/` folder (indexed by `docs/README.md`), separate from the workspace-level `docs/`
