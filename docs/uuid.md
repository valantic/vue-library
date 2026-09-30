# uuid

`src/compositions/uuid.ts` — a minimal composable that hands out a fresh, module-scoped incrementing number
each time it's called. Useful for generating a unique-per-instance id, e.g. linking a `<label>` to an `<input>`
via `for`/`id` without collisions.

```ts
import { useUuid } from '@valantic/vue-library/compositions/uuid';

const { uuid } = useUuid();
```

## `useUuid(): Uuid`

Returns `{ uuid: number }`. `uuid` is a plain number (not a `Ref`), starting at `1` and incrementing by `1` on
every call across the whole app (a single module-scoped counter, not per-component). Despite the name, this is
not a spec-compliant UUID — it's a simple unique counter value.
