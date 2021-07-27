<template>
  <div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>

    <!-- Filters -->
    <div class="block">
      <input type="checkbox" id="taskComplete" v-model="showCompleted">
      <label class="ml-2" for="taskComplete">Show completed tasks</label>
    </div>

    <!-- Header for grid of tasks... -->
    <div class="grid grid-cols-7 gap-2 border-b items-center">
      <span class="col-span-1"><Button :text="'+ task'"/></span>
      <span class="col-span-3">Name</span>
      <span class="col-span-1">Complete</span>
      <span class="col-span-1">Billable</span>
      <span class="col-span-1">Duration</span>
    </div>

    <!-- Actual Task data -->
    <div v-for="task in filteredTasks" :key="task.id"
      class="grid grid-cols-7 gap-2 items-center">
      <span class="col-span-1">
        <Button :text="'Record'" :hidden="task.isComplete" :styling="'bg-red-300'"/>
        </span>
      <h2 class="col-span-3">{{ task.name }}</h2>
      <span class="col-span-1">{{ task.isComplete ? 'Completed' : ''}}</span>
      <span class="col-span-1">{{ task.isBillable ? 'Billable' : ''}}</span>
      <span class="col-span-1">{{ task.duration + ' mins'}} </span>
    </div>

    <!-- if no tasks display a message-->
    <h2 v-if="!filteredTasks.length">There are no tasks that meet your selection.</h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'SingleProject',
  components: {
    Button,
  },
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
