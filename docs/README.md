# vue-library docs

`@valantic/vue-library` is a Vue 3 + TypeScript component library: elements (leaf components), plugins,
compositions (composables), and directives, shared across valantic frontend projects.

## How consumers import this package

The package is **not published to npm**. It's consumed as a `github:` dependency, e.g.:

```json
"@valantic/vue-library": "github:valantic/vue-library#v1.2.0"
```

There is no build step for consumption — `package.json`'s `main`/`module`/`types` fields and the `exports`
map all point straight into `src/`, so a consumer's own bundler resolves imports against the raw
TypeScript/Vue source files. The `build`/`build:icons` npm scripts exist only for this repo's own dev/preview
app and for regenerating the icon sprite; they don't produce anything a consumer imports.

`src/index.ts` — the file `main`/`module`/`types` point to — **does not exist yet**. There is no root barrel
export. Likewise, `src/types/index.d.ts` (the target of the `./types` subpath) doesn't exist yet either. Import
from the specific subpaths below instead.

`package.json`'s `exports` map exposes:

- `@valantic/vue-library/types/*` → `.d.ts` files in `src/types/` (e.g. `@valantic/vue-library/types/icon`)
- `@valantic/vue-library/compositions/*` → composables in `src/compositions/` (e.g.
  `@valantic/vue-library/compositions/uuid`)
- `@valantic/vue-library/src/*` and `@valantic/vue-library/src/*.vue` → an escape hatch to any other source
  file or component by its path under `src/` (e.g. `@valantic/vue-library/src/elements/e-icon.vue`,
  `@valantic/vue-library/src/plugins/viewport/index`)

## Features

- [e-icon](./e-icon.md) — sprite-based SVG icon element
- [viewport](./viewport.md) — plugin adding a reactive `this.$viewport` breakpoint helper
- [vue-bem-cn](./vue-bem-cn.md) — plugin adding the `this.b()` BEM class-name helper
- [form-states](./form-states.md) — composable for form field active/focus/hover/state modifiers
- [uuid](./uuid.md) — composable handing out a unique per-call id
- [outside-click](./outside-click.md) — directive for detecting clicks/touches outside an element

## Global styles

`src/setup/styles.scss` is a plain SCSS entry point that pulls in a CSS reset (`the-new-css-reset`) and the
project's base styles (`src/setup/scss/_basics.scss`, `_config.scss`, `_mixins.scss`, `_variables.scss`). A
consumer can `@use`/`@import` it once to get a consistent style baseline.

## Registering plugins and directives

`src/setup/plugins.ts` exports the list of plugins this library registers (`viewport`, `vue-bem-cn`, and a
directives plugin that auto-registers everything under `src/directives/`). See the individual feature docs for
usage; a consuming app is responsible for calling `app.use(...)` for whichever plugins it wants.
