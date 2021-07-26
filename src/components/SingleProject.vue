<template>
  <div class="grid grid-cols-12 gap-2">
    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>
    <div v-for="task in project.tasks" :key="task.id"
      class="grid grid-cols-12 gap-2">
      <h2>{{ task.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'SingleProject',
  setup() {
    const store = useStore();

    const project = computed(() => store.state.projects
      ?.find((proj) => proj.id === store.state.selectedProject));

    return { project };
  },
});
</script>
