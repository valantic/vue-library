# outside-click

`src/directives/outside-click.ts` — a directive (`v-outside-click`) that invokes a handler when a
click/touchend/scroll interaction happens outside the bound element, with optional exclusions.

It's picked up automatically: `src/setup/directives.ts` globs every file under `src/directives/*.ts` and
registers each one's default export under the directive's own `name` property, as a plugin. Register that
plugin like any other:

```ts
import directives from '@valantic/vue-library/src/setup/directives';

app.use(directives);
```

## Usage

```html
<!-- handler function -->
<div v-outside-click="handleOutsideClick"></div>

<!-- handler + exclusions -->
<div
  v-outside-click="{
    handler: handleOutsideClick,
    excludeRefs: ['toggleButton'],
    excludeIds: ['some-external-id'],
    excludeElements: [someElement],
  }"
></div>
```

## Binding value

The directive value is either:

- a handler function: `(event: Event) => void`, or
- an object:

  | Property          | Type                     | Description                                                                                               |
  | ----------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
  | `handler`         | `(event: Event) => void` | Required. Called when the interaction is outside the element and not excluded.                            |
  | `excludeRefs`     | `string[]`               | Names of `this.$refs` entries (element or array of elements/components) whose contained area is excluded. |
  | `excludeIds`      | `string[]`               | Element ids whose contained area is excluded (looked up via `document.getElementById`).                   |
  | `excludeElements` | `HTMLElement[]`          | Elements whose contained area is excluded directly.                                                       |

If no handler can be resolved from the binding value, the directive throws
`Error('No event handler defined for v-outside-click.')` on mount.

## Behavior

- Listens on `document` for `click`, `touchend`, and `scroll` (all `{ passive: true, capture: true }`), attached
  in `beforeMount` and removed in `beforeUnmount`. The same handler does triple duty: it also tracks `scroll`
  events to distinguish a touch-scroll gesture from a genuine tap, so a scroll ending outside the element
  doesn't trigger the handler on the following `touchend`.
- The handler fires only when the event target is neither the bound element nor contained by it, and not inside
  any excluded ref/id/element.

## Type requirement for new directives

Every file under `src/directives/` must default-export an object satisfying `NamedDirective`
(`src/types/named-directive.d.ts`) — a normal Vue `Directive` plus a `name: string` property — since that's
what the auto-registration in `src/setup/directives.ts` relies on.
