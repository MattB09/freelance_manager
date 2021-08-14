<template>
  <div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>

    <Button class="bg-purple-400" @click="addTask">
      + Task
    </Button>

    <!-- Task list -->
    <TaskList :tasks="project.tasks" />

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
    // let tasks: null | Task[] = null;

    const project = computed(() => store.state.projects!
      .find((proj) => proj.id === store.state.selectedProject)!);

    // if tasks have been loaded once, use store otherwise fetch tasks
    console.log('project.value', project.value);
    if (!project.value.tasks) {
      console.log('making an api call!');
      store.dispatch(actionTypes.GET_TASKS, { user: store.state.user, project: project.value.id });
      // tasks = [
      //   { name: 'task1', isComplete: false },
      //   { name: 'task2', isComplete: true },
      // ];
    } else {
      console.log('api call not needed', project.value.tasks);
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
