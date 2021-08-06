<template>
  <nav id="nav" class="">
    <Button :hidden="hidden" class="bg-purple-400"
      @click="() => navigateTo('projects')" :text="'Projects'">
      Projects
    </Button>
    <Button class="bg-purple-400"> 
      Clients
    </Button>
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
    const hidden = computed(() => (store.state.view === 'projects' && true));

    function navigateTo(page: View) {
      store.commit(mutationTypes.CHANGE_VIEW, page);
    }

    return {
      store, hidden, navigateTo,
    };
  },
});
</script>
