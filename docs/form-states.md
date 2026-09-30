# form-states

`src/compositions/form-states.ts` — a composable providing reactive `active`/`focus`/`hover` state plus derived
modifiers for form-field-style components (inputs, selects, etc.).

```ts
import { FieldState, defaultProperties, useFormStates } from '@valantic/vue-library/compositions/form-states';
```

## `FieldState` enum

```ts
enum FieldState {
  Default = 'default',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}
```

## `defaultProperties()`

Returns a `state` prop definition (`type: String as PropType<FieldState>`, `default: 'default'`) to spread into
a component's own `props`, so components sharing this composable don't each redeclare the same prop:

```ts
props: {
  ...defaultProperties(),
  // ...other props
},
```

## `useFormStates(inputState: Ref<FieldState>): FormStates`

Given a `Ref<FieldState>` (typically the component's `state` prop as a ref), returns:

| Property          | Type                                           | Description                                                                                      |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `active`          | `Ref<boolean>`                                 | Caller-managed active flag (not set automatically by the composable).                            |
| `focus`           | `Ref<boolean>`                                 | Caller-managed focus flag.                                                                       |
| `hover`           | `Ref<boolean>`                                 | Caller-managed hover flag.                                                                       |
| `stateModifiers`  | `ComputedRef<{ state, active, focus, hover }>` | Shaped for feeding directly into `b({ ...stateModifiers })` (see [vue-bem-cn](./vue-bem-cn.md)). |
| `hasDefaultState` | `ComputedRef<boolean>`                         | `true` when `inputState.value === FieldState.Default`.                                           |

`active`, `focus`, and `hover` start as `false` and are not wired to any DOM events by the composable itself —
the consuming component is responsible for setting them (e.g. on `@focus`/`@blur`/`@mouseenter`).

## Usage

```ts
import { defaultProperties, useFormStates } from '@valantic/vue-library/compositions/form-states';
import { toRef } from 'vue';

export default defineComponent({
  props: {
    ...defaultProperties(),
  },
  setup(props) {
    const { active, focus, hover, stateModifiers } = useFormStates(toRef(props, 'state'));

    return { active, focus, hover, stateModifiers };
  },
});
```
