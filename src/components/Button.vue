<template>
  <button
    :class="`${bgColor} px-3 py-1 rounded my-2 inline-block ${addStyles ? addStyles : ''}`
    + `${isHidden ? ' hidden': ''}`"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: ['text', 'hidden', 'styling'],
  setup(props) {
    const isHidden = computed(() => (props.hidden === true && true));
    const bgColor: ComputedRef<string | undefined> = computed(() => {
      if (props.styling?.includes('bg-')) {
        const styles: string[] = props.styling.split(' ');
        return styles.find((style) => style.includes('bg-'));
      }
      return 'bg-purple-400';
    });

    const addStyles: ComputedRef<string> = computed(() => {
      if (props.styling?.includes('bg-')) {
        const copy = props.styling.split(' ');
        const bgIndex = copy.findIndex((style: string) => style.includes('bg-'));
        copy.splice(bgIndex, 1);
        return copy;
      }
      return props.styling;
    });

    return { isHidden, bgColor, addStyles };
  },
});
</script>
