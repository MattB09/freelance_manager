<template>
  <button
    :class="`${bgColor} px-3 py-1 rounded my-2 inline-block ${styling ? styling : ''}`
    + `${isHidden ? ' hidden': ''}`"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: ['text', 'hidden', 'styling'],
  setup(props) {
    const isHidden = computed(() => (props.hidden === true && true));
    const bgColor = computed(() => {
      if (props.styling?.includes('bg-')) {
        const styles: string[] = props.styling.split(' ');
        return styles.find((style) => style.includes('bg-'));
      }
      return 'bg-purple-400';
    });

    return { isHidden, bgColor };
  },
});
</script>
