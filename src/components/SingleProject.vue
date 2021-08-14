<template>
  <div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>

    <Button class="bg-purple-400" @click="addTask">
      + Task
    </Button>

    <!-- Task list -->
    <TaskList :tasks=tasks />

    <!-- if no tasks display a message-->
    <h2 v-if="tasks !== undefined && tasks.length === 0">
      There are no tasks that meet your selection.
    </h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore, actionTypes } from '@/store';
import TaskList from '@/components/TaskList.vue';
import Button from '@/components/Button.vue';
import { Task } from '@/types/DataTypes';

export default defineComponent({
  name: 'SingleProject',
  components: {
    TaskList,
    Button,
  },
  setup() {
    const store = useStore();
    const tasks = ref<Task[]>([
      { name: 'task1', isComplete: false },
      { name: 'task2', isComplete: true },
    ]);

    const project = computed(() => store.state.projects!
      .find((proj) => proj.id === store.state.selectedProject)!);

    function addTask() {
      store.dispatch(actionTypes.ADD_TASK);
      console.log('added');
    }

    return {
      project, addTask, tasks,
    };
  },
});
</script>
