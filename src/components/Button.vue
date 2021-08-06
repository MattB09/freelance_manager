<template>
  <!-- <button
    :class="`${bgColor} px-3 py-1 rounded my-2 inline-block ${addStyles ? addStyles : ''}`
    + `${isHidden ? ' hidden': ''}`"
  >
    {{ text }}
  </button> -->
  <button v-bind="$attrs"
    :class="`px-3 py-1 rounded my-2 inline-block ${isHidden ? 'hidden' : ''}`">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: ['hidden'],
  setup(props) {
    const isHidden = computed(() => (props.hidden === true && true));

    return { isHidden };
  },
});
</script>
