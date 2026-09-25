# valantic vue library

## unreleased

- [DOCS]: Added a repo banner (`.github/assets/banner.jpeg`) to the top of `README.md`, matching the `vue-styleguide`
  convention.

- [DOCS]: Restructured `README.md` to follow the `vue-styleguide` schema (centered header with tagline/links, `About
  this project`, `Quickstart`) and added the shared "from valantic - with love" footer.

- [CHORE]: Reordered `package.json` top-level keys to match the `vue-styleguide` boilerplate ordering.

- [CHORE]: Bumped `engines.node` to `>=22 <26` (was `>=22 <25`) to allow Node 25. Updated `.nvmrc` from `24` to `25`.
  Added `min-release-age=7` and `ignore-scripts=true` to `.npmrc`.

- [FEATURE]: Project boostrap
- [CI]: Renamed the CI workflow to "CI Test" and updated it to `actions/checkout@v7`, `actions/setup-node@v7`, and
  Node 25.
- [DOCS]: Streamlined `.github/PULL_REQUEST_TEMPLATE.md` by removing the obsolete checklist sections.
- [DOCS]: Add AGENTS.md documenting the package structure and conventions, with CLAUDE.md reduced to a pointer to it, matching the pattern used in frontend-utils
- [DOCS]: Add a Documentation section to AGENTS.md requiring feature docs to live in this repo's own `docs/` folder (indexed by `docs/README.md`), separate from the workspace-level `docs/`
