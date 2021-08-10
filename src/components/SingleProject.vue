<template>
  <div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>

    <Button class="bg-purple-400">+ Task</Button>

    <!-- Filters -->
    <div class="block">
      <input type="checkbox" id="taskComplete" v-model="showCompleted" />
      <label class="ml-2" for="taskComplete">Show completed tasks</label>
    </div>

    <!-- Task list -->
    <TaskList :tasks=filteredTasks />

    <!-- if no tasks display a message-->
    <h2 v-if="filteredTasks !== undefined && filteredTasks.length === 0">
      There are no tasks that meet your selection.
    </h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import TaskList from '@/components/TaskList.vue';
import Button from '@/components/Button.vue';
// import { Task } from '@/types/DataTypes';

export default defineComponent({
  name: 'SingleProject',
  components: {
    TaskList,
    Button,
  },
  setup() {
    const store = useStore();
    const showCompleted = ref<boolean>(false);

    const project = computed(() => store.state.projects!
      .find((proj) => proj.name === store.state.selectedProject)!);

    const filteredTasks = computed(() => {
      let copy;

      if (showCompleted.value) {
        copy = project.value.tasks;
      } else {
        copy = project.value.tasks?.filter((task) => !task.isComplete);
      }

      copy = copy?.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
      });
      return copy;
    });

    return { project, filteredTasks, showCompleted };
  },
});
</script>
