<template>
  <button
    :class="`bg-purple-400 px-3 py-1 rounded m-2 inline-block ${isHidden ? 'hidden': ''}`"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: ['text', 'hidden'],
  setup(props) {
    const isHidden = computed(() => (props.hidden === true && true));

    return { isHidden };
  },
});
</script>
