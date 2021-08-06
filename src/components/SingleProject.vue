<template>
  <div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">{{ project && project.name }}</h1>

    <!-- Filters -->
    <div class="block">
      <input type="checkbox" id="taskComplete" v-model="showCompleted">
      <label class="ml-2" for="taskComplete">Show completed tasks</label>
    </div>

    <!-- Header for grid of tasks... -->
    <div class="grid grid-cols-6 gap-2 border-b items-center">
      <span class="col-span-1"><Button :text="'+ task'"/></span>
      <span class="col-span-2">Name</span>
      <span class="col-span-1">Complete</span>
      <span class="col-span-1">Billable</span>
      <span class="col-span-1">Duration</span>
    </div>

    <!-- Actual Task data -->
    <div v-for="task in filteredTasks" :key="task.id"
      class="grid grid-cols-6 gap-2 items-center">
      <span class="col-span-1 place-self-center">
        <Button :hidden="task.isComplete" class="bg-red-300">
          Record
        </Button>
      </span>
      <h2 class="col-span-2">{{ task.name }}</h2>
      <span class="col-span-1">{{ task.isComplete ? 'Completed' : ''}}</span>
      <span class="col-span-1">{{ task.isBillable ? 'Billable' : ''}}</span>
      <!-- <span class="col-span-1">{{ task. ? + ' mins'}} </span> -->
    </div>

    <!-- if no tasks display a message-->
    <h2 v-if="filteredTasks !== undefined && filteredTasks.length === 0">
      There are no tasks that meet your selection.
    </h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import Button from '@/components/Button.vue';
// import { Task } from '@/types/DataTypes';

export default defineComponent({
  name: 'SingleProject',
  components: {
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
