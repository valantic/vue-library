import { ComputedRef, PropType, Ref, computed, ref } from 'vue';

export enum FieldState {
  Default = 'default',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

type StateModifiers = {
  state: FieldState;
  active: boolean;
  focus: boolean;
  hover: boolean;
};

export type FormStates = {
  active: Ref<boolean>;
  focus: Ref<boolean>;
  hover: Ref<boolean>;
  stateModifiers: ComputedRef<StateModifiers>;
  hasDefaultState: ComputedRef<boolean>;
};

export const defaultProperties = () => ({
  /**
   * Form states for class names (default, error, success, warning, info)
   */
  state: {
    type: String as PropType<FieldState>,
    default: 'default',
  },
});

/**
 * Defines the reactive properties which can be used for form elements.
 */
export const useFormStates = (inputState: Ref<FieldState>): FormStates => {
  const active: Ref<boolean, boolean> = ref<boolean>(false);
  const focus: Ref<boolean, boolean> = ref<boolean>(false);
  const hover: Ref<boolean, boolean> = ref<boolean>(false);

  /**
   * Holds an object with several modifiers of the form element.
   */
  const stateModifiers: ComputedRef<StateModifiers> = computed(() => ({
    state: inputState.value,
    active: active.value,
    focus: focus.value,
    hover: hover.value,
  }));

  /**
   * Holds a boolean if the form element has a default state.
   */
  const hasDefaultState: ComputedRef<boolean> = computed(() => inputState.value === FieldState.Default);

  return {
    // data
    active,
    focus,
    hover,

    // computed
    stateModifiers,
    hasDefaultState,
  };
};
