<template>
  <div>
    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>
    <input type="checkbox" id="taskComplete" v-model="showCompleted">
    <label for="taskComplete">Show completed tasks</label>
    <div v-for="task in filteredTasks" :key="task.id"
      class="grid grid-cols-12 gap-2">
      <h2 class="col-span-4">{{ task.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'SingleProject',
  setup() {
    const store = useStore();
    const showCompleted = ref<boolean>(false);

    const project = computed(() => store.state.projects
      ?.find((proj) => proj.id === store.state.selectedProject));

    const filteredTasks = computed(() => {
      if (showCompleted.value) return project.value?.tasks;

      return project.value?.tasks
        .filter((task) => !task.isComplete);
    });

    return { project, filteredTasks, showCompleted };
  },
});
</script>
