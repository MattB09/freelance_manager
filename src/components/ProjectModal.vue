<template>
  <div ref='modal' class="hidden">
    <h1>Now you see me...</h1>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watchEffect,
  ref,
  computed,
} from 'vue';

export default defineComponent({
  props: ['visible'],
  setup(props) {
    const modal = ref<HTMLElement | null>(null);
    const visible = computed(() => props.visible);

    watchEffect(() => {
      console.log(visible.value);
      if (visible.value) (() => modal.value?.classList.remove('hidden'))();
      else (() => modal.value?.classList.add('hidden'))();
    });

    return { modal };
  },
});
</script>
