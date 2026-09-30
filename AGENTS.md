# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Cursor, Copilot, etc.) when working with code in
this repository.

## What this is

`@valantic/vue-library` is a Vue 3 + TypeScript component library (elements, plugins, compositions, directives)
consumed by other valantic frontend projects via a GitHub dependency reference
(`github:valantic/vue-library#<version>`), not published to the npm registry as a built package. `package.json`'s
`main`/`module`/`types` all point directly at `./src/index.ts` and `exports` maps subpaths (`./types/*`,
`./compositions/*`, `./src/*`, `./src/*.vue`) straight into `src/` — there is no build step for consumption; consumers
import source files directly. The `build`/`build:icons` scripts exist for the repo's own dev/preview app and icon
sprite generation, not for producing a publishable bundle.

Note: `src/index.ts` (the file `main`/`module`/`types` point to) does not exist yet — the package is still at version
`0.0.1` ("Project bootstrap" per `CHANGELOG.md`). Don't assume a barrel file exists; check `src/` directly.

## Commands

- `npm test` — full check: `npm run lint && npm run test:unit -- --watch=false`. Run before considering work done.
- `npm run lint` — runs `lint:eslint`, `lint:stylelint`, and `tsc` (type-check via `vue-tsc`) together.
  - `npm run lint:eslint` — ESLint on `.ts`/`.js`/`.vue`.
  - `npm run lint:stylelint` — Stylelint on `src/**/*.{vue,scss}`.
  - `npm run tsc` — `vue-tsc` type-check.
- `npm run test:unit` — Vitest, run from `tests/` dir. To run a single test file:
  `npm run test:unit -- tests/unit/specs/plugins/viewport.test.ts`. To run a single test by name:
  `npm run test:unit -- -t "<test name>"`.
- `npm run fix:stylelint` — Stylelint with `--fix` (uses `.stylelintrc.fix.js`).
- `npm run prettier` — formats the whole repo in place.
- `npm run dev` / `npm run serve` — Vite dev server / preview of the repo's own demo app.
- `npm run build` — Vite build (`--mode=app`); modes are defined in `vite.builds.json`.
- `npm run build:icons` — regenerates the SVG sprite (`src/assets/icons.svg`) from `src/assets/icons/*.svg` via
  `svg-sprite`, then updates the icon TS type (`update-ts-icon-type.js` → `src/types/icon.d.ts`). Run this after
  adding/removing an icon SVG.
- `npm run clean:caches` — clears `.eslintcache`, `.stylelintcache`, `node_modules/.cache`.

`npm run release[:minor|:major]` — runs `scripts/release.mjs` (shared, identical in every shared-frontend repo):
checks for a clean, up-to-date `main` and a non-empty `## unreleased`, bumps the version, renames
`## unreleased` to `## vX.Y.Z`, updates the README version pin, commits, creates the annotated `vX.Y.Z` tag and
pushes. The `Release` workflow (`.github/workflows/release.yml`) then creates the GitHub release from that
changelog section. See `CONTRIBUTING.md`. **Never run a release script or `npm publish` unless explicitly
asked.**

## Architecture

- Path alias `@` maps to `src/` (`tsconfig.json` `paths` and `vite.config.ts` `alias` both define it). Use `@/...`
  imports instead of deep relative paths, e.g. `import spritePath from '@/assets/icons.svg';`.
- Component naming follows BEM-style prefixes seen in the code, e.g. `e-icon.vue` in `src/elements/` (`e-` = leaf
  element component, no children) — matching the `name: 'e-icon'` option inside the file. Filenames are kebab-case.
  ESLint disables `vue/multi-word-component-names` and `vue/component-definition-name-casing`, so single-word/hyphenated
  names like `e-icon` are allowed as-is; don't "fix" them to multi-word PascalCase.
- Components use the **Options API** with `defineComponent`, typed `props`, and separate `Data`/`Size`-style type
  aliases declared above the component (see `src/elements/e-icon.vue`). Follow this pattern for new components rather
  than introducing `<script setup>`.
- Reusable Vue plugins live in `src/plugins/<plugin-name>/` with an `index.ts` entry point (see
  `src/plugins/viewport/index.ts`, `src/plugins/vue-bem-cn/index.ts`). Plugins are registered centrally in
  `src/setup/plugins.ts` as an array of `{ plugin, options? }` objects (typed `CustomPlugin[]`), not registered ad hoc
  in `main.ts`.
- Reusable composition functions (Vue 3 composables) live in `src/compositions/` (e.g. `form-states.ts`, `uuid.ts`) and
  are also individually exposed via the `./compositions/*` subpath export.
- Custom directives live in `src/directives/` (e.g. `outside-click.ts`) and are wired up via `src/setup/directives.ts`.
- Shared TS types live in `src/types/` as `.d.ts` files (e.g. `icon.d.ts`, `named-directive.d.ts`) and are exposed via
  the `./types` and `./types/*` subpath exports.
- Styling is SCSS, written inside `<style lang="scss">` blocks in `.vue` files; class binding uses the in-house
  `vue-bem-cn` plugin's `b()` helper (see the `:class="b({ [icon]: true })"` usage in `e-icon.vue`) rather than manual
  class strings.
- The dev-only styleguide (demo app for browsing components) lives in `src/styleguide/`. Its files are excluded from
  the icon/component lint naming rules (see the `src/styleguide/**/*.*` override in `eslint.config.js`) and
  `src/styleguide/translations.json` is excluded from lint entirely.
- Tests live under `tests/unit/specs/`, mirroring the source structure being tested (e.g.
  `tests/unit/specs/plugins/viewport.test.ts`, `tests/unit/specs/plugins/vue-bem/*.test.ts`), and run with
  Vitest + `jsdom` + `@vue/test-utils`.
- Linting combines base ESLint, `typescript-eslint`, and the shared `eslint-config-valantic` presets
  (`typescript.js`, `vue.js`, `prettier-vue.js`) from `eslint.config.js`. A few narrow overrides already exist there
  (e.g. `import/extensions: off`, `vue/no-unsupported-features` pinned to `^3.5.0`) — don't add new ad-hoc rule
  overrides without reason.
- Required Node.js/npm versions: see `engines` in `package.json` and `.nvmrc`.

## Code conventions

Follow the repo's ESLint/Stylelint/Prettier config and `.editorconfig`. On top of that:

- Naming: files `kebab-case`; types, interfaces and enums `PascalCase`; functions, properties and variables
  `camelCase`. Singular names for single things (types, enums, components, stores), plural only for collections. Use
  whole, descriptive words — identifiers have at least 3 characters (`id-length`), except the ones whitelisted in the
  ESLint config.
- TypeScript: never use `any` — use `unknown` plus narrowing or a generic; if `any` is unavoidable, isolate it and
  comment why. Use `type` for object shapes; `interface` only for features exclusive to it, without an `I` prefix.
- Control flow: no `while` or plain `for` loops (use array methods, or `for...of` when `await`/`break`/`continue` is
  needed), no `switch` (use object literals or `if`/`else`), no one-line `if` bodies.
- Comments only where the code is not self-explanatory, in JSDoc style.
- Vue: components use the Options API with `defineComponent` and `<script lang="ts">` — never `<script setup>` or the
  Composition API style. Use method shorthand (not arrow functions) in `methods`/`computed`. Base new files on
  `blueprints/` and keep their structure, lifecycle-hook order and commented-out blocks.
- Templates: no loop index as `v-for` key, no `v-text`, move complex conditions into `computed`. Declare every emitted
  event in `emits`; remove event listeners in `unmounted`.
- State management: Pinia, never Vuex.
- Styles: no hard-coded colors — reuse the existing color variables (add a new `kebab-case` variable if needed).

valantic developers find the full guidelines in the internal ai-cornerstone repository (`guidelines/frontend/`, skills
`frontend-best-practices` and `vue-best-practices`).

## Working rules

These rules are identical in every valantic shared-frontend repo.

- Git: never commit unless explicitly asked. Never push unless explicitly asked in that request. Never pull or
  create/switch branches (`git pull`, `git checkout`, `git switch`, `git branch`, …). Branch names are
  `feature/<name>` or `bugfix/<name>`.
- Never run a release script or `npm publish` unless explicitly asked.
- Never install, update or remove npm packages without approval. Never edit generated or vendored files
  (`node_modules/`, `dist/`, lock files by hand).
- Priorities: correctness, simplicity, consistency with the existing code, maintainability, minimal changes. Prefer the
  smallest correct change.
- Understand the existing code and search for existing implementations before adding new ones; reuse over new
  abstractions. Do not refactor unrelated code, change public APIs, or change behavior outside the task's scope.
- Before finishing, run `npm test` and fix failures caused by the change. Every change gets a changelog entry and,
  where a feature changes, a doc update (see Changelog and Documentation below).
- If a requirement is unclear, ask. If only an implementation detail is unclear, follow the existing patterns in this
  repo.

## Changelog (required for every task)

`CHANGELOG.md` follows the convention shared by all valantic shared-frontend repos.

- Every change that alters behavior, fixes a bug, or adds/removes something consumers can see gets one entry under
  `## unreleased` in the same change — do not defer it to a follow-up task.
- Format: `- [type] Description.` — one entry per logical change, kept as a flat list (no "Added"/"Fixed" category
  subheadings), so each entry stays self-contained and merge conflicts can be resolved line by line.
- Allowed prefixes ([Conventional Commits](https://www.conventionalcommits.org/) types): `[feat]`, `[fix]`,
  `[refactor]`, `[perf]`, `[docs]`, `[test]`, `[build]`, `[ci]`, `[chore]`, `[revert]`. Older prefixes in released
  sections (`[ENHANCEMENT]`, `(Change)`, …) are history — do not reuse them and do not rewrite old entries.
- Write the description so it is understandable without the diff: name the affected module and the effect for
  consumers.
- Breaking changes are grouped under a `### Breaking Changes` subheading placed directly under `## unreleased`, above
  the regular entries. They keep their prefix and must end with a **Migration:** sentence stating what consumers
  have to do.
- A change is breaking if it alters public API shape/behavior consumers depend on (exported components, plugins,
  compositions, directives, types and subpath exports; prop/emit/slot contracts) or changes rendered output a
  consumer could reasonably rely on (e.g. a BEM class name targeted by custom CSS). When in doubt, list it under
  `### Breaking Changes` rather than omit the migration note.
- Headings: title `# Changelog`, unreleased section `## unreleased` (exact, lowercase — release tooling matches it
  literally), released sections `## vX.Y.Z`. Only the unreleased section is edited; released sections stay as they
  are.

## Documentation

This repo keeps its own feature docs in a `docs/` folder (with an index at `docs/README.md`) — this is separate from
the workspace-level `docs/` at the root of `valantic/` and must not be skipped in favor of it.

- Every element, plugin, composition, or directive gets one Markdown file under `docs/` describing what it does, its
  public API/props, and usage examples.
- When adding, changing, or removing a component/plugin/composition/directive, update the matching doc in the same
  change — do not defer it to a follow-up task.
- `docs/README.md` is the index; add a one-line link to every new doc file there.
