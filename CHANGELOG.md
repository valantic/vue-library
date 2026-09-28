# Changelog

## unreleased

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
