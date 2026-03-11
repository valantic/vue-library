import { App, ComputedRef, Plugin, Ref, computed, reactive, ref } from 'vue';
import { DEFAULT_BREAKPOINTS, ViewportBreakPoint } from '../../setup/globals';

export type ViewportNames = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Index = {
  isXxs: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isSmallerThanDesktop: boolean;
  isSmallerThanTablet: boolean;
  isBiggerThanMobile: boolean;
  isBiggerThanTablet: boolean;
  currentViewport: ViewportBreakPoint;
  viewportWidth: number;
  viewportHeight: number;
};

export const DEFAULT_CONFIG = {
  breakpoints: DEFAULT_BREAKPOINTS,
};

/**
 * Adds a viewport instance to Vue itself, which can be used by calling this.$viewport.
 */
const plugin: Plugin = {
  install(app: App, config: typeof DEFAULT_CONFIG = DEFAULT_CONFIG) {
    const breakpoints = config?.breakpoints || DEFAULT_BREAKPOINTS;
    const viewportWidth: Ref<number, number> = ref<number>(window.innerWidth);
    const viewportHeight: Ref<number, number> = ref<number>(window.innerHeight);

    const isXxs: ComputedRef<boolean> = computed((): boolean => viewportWidth.value < breakpoints.xs);
    const isXs: ComputedRef<boolean> = computed((): boolean => viewportWidth.value >= breakpoints.xs);
    const isSm: ComputedRef<boolean> = computed((): boolean => viewportWidth.value >= breakpoints.sm);
    const isMd: ComputedRef<boolean> = computed((): boolean => viewportWidth.value >= breakpoints.md);
    const isLg: ComputedRef<boolean> = computed((): boolean => viewportWidth.value >= breakpoints.lg);
    const isXl: ComputedRef<boolean> = computed((): boolean => viewportWidth.value >= breakpoints.xl);

    const isMobile: ComputedRef<boolean> = computed((): boolean => !isSm.value);
    const isDesktop: ComputedRef<boolean> = computed((): boolean => isMd.value);
    const isTablet: ComputedRef<boolean> = computed((): boolean => isSm.value && !isMd.value);
    const isSmallerThanDesktop: ComputedRef<boolean> = computed((): boolean => !isDesktop.value);
    const isSmallerThanTablet: ComputedRef<boolean> = computed((): boolean => !isSm.value);
    const isBiggerThanMobile: ComputedRef<boolean> = computed((): boolean => isSm.value);
    const isBiggerThanTablet: ComputedRef<boolean> = computed((): boolean => isMd.value);

    const currentViewport: ComputedRef<ViewportNames> = computed(
      (): ViewportNames =>
        (Object.entries(breakpoints)
          .sort((a, b) => b[1] - a[1]) // eslint-disable-line unicorn/no-array-sort
          .find((breakpoint) => viewportWidth.value >= breakpoint[1])?.[0] as ViewportBreakPoint) || 'xxs',
    );

    const onResize = () => {
      viewportWidth.value = window.innerWidth;
      viewportHeight.value = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    app.unmount = ((originalUnmount) => {
      return () => {
        window.removeEventListener('resize', onResize);
        originalUnmount();
      };
    })(app.unmount);

    app.config.globalProperties.$viewport = reactive({
      isXxs,
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      isMobile,
      isDesktop,
      isTablet,
      isSmallerThanDesktop,
      isSmallerThanTablet,
      isBiggerThanMobile,
      isBiggerThanTablet,
      currentViewport,
      viewportWidth,
      viewportHeight,
    });
  },
};

export default plugin;
