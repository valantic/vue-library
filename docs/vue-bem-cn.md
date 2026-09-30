# vue-bem-cn

`src/plugins/vue-bem-cn/index.ts` — re-exports an in-house copy of the
[`vue-bem-cn`](https://www.npmjs.com/package/vue-bem-cn) plugin (`src/plugins/vue-bem-cn/src/vue-plugin.ts`,
with some optimizations applied), which adds a `this.b()` helper to every component for generating BEM class
name strings.

## Registration

```ts
import VueBemCn from '@valantic/vue-library/src/plugins/vue-bem-cn/index';

app.use(VueBemCn, { hyphenate: true });
```

`src/setup/plugins.ts` registers it with `hyphenate: true`. If the method name (`b` by default) is ever
changed via config, `src/shims-plugins.d.ts`'s `ComponentCustomProperties` typing must be updated to match, or
`this.b(...)` stops type-checking.

## Options

| Option       | Type      | Default                                        | Description                                                        |
| ------------ | --------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| `hyphenate`  | `boolean` | `false`                                        | Converts the generated class name(s) from camelCase to kebab-case. |
| `methodName` | `string`  | `'b'`                                          | Name of the instance method the plugin installs.                   |
| `delimiters` | `object`  | `{ ns: '', el: '__', mod: '--', modVal: '-' }` | BEM namespace/element/modifier/modifier-value separators.          |

## How the block name is derived

On each component's `created()` hook, the plugin reads `this.$options.block || this.$options.name` as the BEM
block name (prefixed with `delimiters.ns`). This means a component either sets a `name` (as all components in
this repo do, e.g. `name: 'e-icon'`) or an explicit `block` option for `b()` to be defined.

## `b()` usage

The exposed method is typed as `(elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => string`
(`VueBemFunction` in `src/plugins/vue-bem-cn/src/globals.ts`):

```ts
// block only
this.b(); // 'e-icon'

// element
this.b('label'); // 'e-icon__label'

// modifiers (object of boolean | string | number)
this.b({ active: true, size: 'large' }); // 'e-icon e-icon--active e-icon--size-large'

// element + modifiers
this.b('label', { active: true }); // 'e-icon__label e-icon__label--active'
```

Rules:

- A modifier key with value `true` becomes `<block>--<modifier>`.
- A modifier key with a `string`/`number` value becomes `<block>--<modifier>-<value>`.
- A modifier key with `false`/`undefined`/other values is omitted.
- With `hyphenate: true`, the whole resulting class string is converted from camelCase to kebab-case.

Used throughout this repo's components for class bindings, e.g. `:class="b({ [icon]: true })"` in
`e-icon.vue`.
