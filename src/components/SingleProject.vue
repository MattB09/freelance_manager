<template>
  <div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>

    <Button class="bg-purple-400" @click="addTask">
      + Task
    </Button>

    <!-- Task list -->
    <div v-if="store.state.error">Error loading tasks...</div>
    <div v-else-if="project.tasks">
      <TaskList :tasks="project.tasks" />
    </div>
    <div v-else>Loading...</div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
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

    const project = computed(() => store.state.projects!
      .find((proj) => proj.id === store.state.selectedProject)!);

    // if tasks have been loaded once, use store otherwise fetch tasks
    if (!project.value.tasks) {
      store.dispatch(actionTypes.GET_TASKS, { user: store.state.user, project: project.value.id });
    }

    function addTask() {
      store.dispatch(actionTypes.ADD_TASK);
      console.log('added');
    }

    return {
      project, addTask, store,
    };
  },
});
</script>
