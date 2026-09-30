# e-icon

`src/elements/e-icon.vue` — renders an icon from the shared SVG sprite (`src/assets/icons.svg`).

```ts
import EIcon from '@valantic/vue-library/src/elements/e-icon.vue';
```

## Props

| Prop     | Type      | Default | Description                                                             |
| -------- | --------- | ------- | ----------------------------------------------------------------------- |
| `icon`   | `Icon`    | —       | Required. Name of the icon (must exist in `src/assets/icons/`).         |
| `size`   | `String`  | `null`  | Width, or `"width height"` (space-separated), e.g. `"32"` or `"32 16"`. |
| `inline` | `Boolean` | `true`  | `true` renders an inline `<svg>`; `false` renders an `<img>`.           |
| `alt`    | `String`  | `null`  | Alt text. Adds a `<title>` when `inline`, or the `<img alt>` otherwise. |
| `rotate` | `Number`  | `0`     | Rotation in degrees, applied via inline `transform: rotate(...)`.       |

The `icon` prop is typed `PropType<Icon>`, where `Icon` (`src/types/icon.d.ts`) is a generated string-literal
union of every icon file present under `src/assets/icons/` — passing a name that doesn't exist there is a
compile-time TypeScript error.

## Rendering modes

- **Inline (`inline: true`, default)** — renders an `<svg>` referencing the sprite via `<use
:xlink:href="\`${spritePath}#${icon}\`" />`. The icon inherits `currentColor`/CSS from its surrounding
context. `aria-hidden`is set when no`alt`is given; otherwise a`<title>`is rendered inside the`<svg>`.
- **Image (`inline: false`)** — renders a plain `<img :src="\`${spritePath}#${icon}\`" :alt="alt">`, an opaque
  image resource not affected by page CSS.

## Sizing

Icons default to 24×24 (`defaultSize` in the component — kept in sync with the SCSS `icon` mixin per its own
comment; if you change one, change the other). `size` accepts `"32"` (width only) or `"32 16"`
(width-then-height). A `specificIconSizes` lookup table in the component can hold non-square icons' intrinsic
aspect ratio so the height is auto-computed proportionally when only a width is given.

## Icon sprite workflow

Icon SVGs live under `src/assets/icons/` (one file per icon; the filename minus extension becomes the icon id
used by the `icon` prop). Running:

```
npm run build:icons
```

1. Runs `svg-sprite --config .svg-sprite.json src/assets/icons/*.svg`, which stacks every icon into a single
   `src/assets/icons.svg` (per `.svg-sprite.json`'s `mode.stack` config), addressable per-icon via a fragment
   identifier (`icons.svg#<id>`).
2. Runs `node ./update-ts-icon-type`, which reads `src/assets/icons/` and regenerates `src/types/icon.d.ts`, a
   union type listing every icon filename as a string literal.

Both `src/assets/icons.svg` and `src/types/icon.d.ts` are generated — don't edit them by hand. Always add,
rename, or remove an SVG under `src/assets/icons/` and rerun `npm run build:icons`, otherwise the sprite and the
`Icon` type drift out of sync with what's on disk.

As of this writing, `src/assets/icons/` contains no SVG files yet, and `src/types/icon.d.ts` reflects that
(`export type Icon = '';`) — the icon set is still at bootstrap stage.
