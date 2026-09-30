# viewport

`src/plugins/viewport/index.ts` — a Vue plugin that adds a reactive `this.$viewport` object to every component,
tracking the window size against a breakpoint table via a single shared `window` resize listener.

## Registration

```ts
import viewport from '@valantic/vue-library/src/plugins/viewport/index';

app.use(viewport);
```

An optional config object overrides the breakpoints:

```ts
import { DEFAULT_BREAKPOINTS } from '@valantic/vue-library/src/setup/globals';

app.use(viewport, { breakpoints: { ...DEFAULT_BREAKPOINTS, md: 1100 } });
```

Default breakpoints (`DEFAULT_BREAKPOINTS` in `src/setup/globals.ts`, in px — kept in sync with the project's
SCSS breakpoint variables per that file's comment):

| Breakpoint | Value  |
| ---------- | ------ |
| `xxs`      | `0`    |
| `xs`       | `480`  |
| `sm`       | `768`  |
| `md`       | `1024` |
| `lg`       | `1200` |
| `xl`       | `1440` |

## `this.$viewport`

| Property               | Type                                            | Meaning                                                                   |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| `isXxs`                | `boolean`                                       | `viewportWidth < breakpoints.xs`                                          |
| `isXs`                 | `boolean`                                       | `viewportWidth >= breakpoints.xs`                                         |
| `isSm`                 | `boolean`                                       | `viewportWidth >= breakpoints.sm`                                         |
| `isMd`                 | `boolean`                                       | `viewportWidth >= breakpoints.md`                                         |
| `isLg`                 | `boolean`                                       | `viewportWidth >= breakpoints.lg`                                         |
| `isXl`                 | `boolean`                                       | `viewportWidth >= breakpoints.xl`                                         |
| `isMobile`             | `boolean`                                       | `!isSm`                                                                   |
| `isDesktop`            | `boolean`                                       | `isMd`                                                                    |
| `isTablet`             | `boolean`                                       | `isSm && !isMd`                                                           |
| `isSmallerThanDesktop` | `boolean`                                       | `!isDesktop`                                                              |
| `isSmallerThanTablet`  | `boolean`                                       | `!isSm`                                                                   |
| `isBiggerThanMobile`   | `boolean`                                       | `isSm`                                                                    |
| `isBiggerThanTablet`   | `boolean`                                       | `isMd`                                                                    |
| `currentViewport`      | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The largest breakpoint the current width satisfies (defaults to `'xxs'`). |
| `viewportWidth`        | `number`                                        | Current `window.innerWidth`.                                              |
| `viewportHeight`       | `number`                                        | Current `window.innerHeight`.                                             |

All values update reactively on `window`'s `resize` event.

## Usage

```ts
computed: {
  showMobileNav(): boolean {
    return this.$viewport.isMobile;
  },
},
```

## Lifecycle

The plugin installs exactly one `window.addEventListener('resize', ...)` at `app.use()` time — not per
component instance — and wraps `app.unmount` so the listener is removed when the app is unmounted.
