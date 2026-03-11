<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('brand')">
        <img
          :class="b('logo')"
          src="@/styleguide/assets/icons/i-vuejs.svg"
          alt="Vue.js Logo"
        />
        <span>Vue Library</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide header.
   */
  export default defineComponent({
    name: 's-header',
    // components: {},

    // props: {},
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .s-header {
    border-bottom: 1px solid variables.$vas-color-grayscale--600;
    background-color: rgba(variables.$vas-color-green-vue, 0.1);

    &__container {
      @include mixins.container;

      padding: variables.$vas-spacing--10;
      display: flex;
    }

    &__brand {
      display: flex;
      align-items: center;
      gap: variables.$vas-spacing--6;
      font-size: 1.5rem;
      font-weight: bold;
    }

    &__logo {
      height: 2rem;
    }
  }
</style>
