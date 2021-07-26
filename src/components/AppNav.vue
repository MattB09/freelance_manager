<template>
  <nav id="nav" class="">
    <Button :hidden="hidden"
      @click="() => navigateTo('projects')" :text="'Projects'" />
    <Button :text="'Another nav thing'"/>
  </nav>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import { useStore, mutationTypes, View } from '@/store';
import Button from './Button.vue';

export default defineComponent({
  name: 'AppNav',
  components: { Button },
  setup() {
    const store = useStore();

    function navigateTo(page: View) {
      store.commit(mutationTypes.CHANGE_VIEW, page);
    }

    const hidden = computed(() => (store.state.view === 'projects' && true));
    console.log('hidden prop from appNav', hidden);

    return {
      store, hidden, navigateTo,
    };
  },
});
</script>
