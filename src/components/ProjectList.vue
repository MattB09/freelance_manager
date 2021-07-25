<template>
  <div v-for="project of projects" :key="project.id">
    <h3 @click='() => selectProject(project.id)' class="cursor-pointer">{{project.name}}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore, mutationTypes } from '@/store';

export default defineComponent({
  name: 'ProjectList',
  props: ['projects'],
  emits: ['update:view'],
  setup() {
    const store = useStore();

    function selectProject(id: number) {
      store.commit(mutationTypes.SET_SELECTED_PROJECT, id);
      store.commit(mutationTypes.CHANGE_VIEW, 'single');
    }

    return { selectProject };
  },
});
</script>
