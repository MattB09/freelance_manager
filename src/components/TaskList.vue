<template>
  <!-- Header for grid of tasks... -->
  <div class="grid grid-cols-6 gap-2 border-b items-center">
    <span class="col-span-1"></span>
    <span class="col-span-2">Name</span>
    <span class="col-span-1">Complete</span>
    <span class="col-span-1">Billable</span>
    <span class="col-span-1">Duration</span>
  </div>

  <!-- Actual Task data -->
  <div v-for="task in tasks" :key="task.id"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'TaskList',
  props: ['tasks'],
  components: {
    Button,
  },
  // setup() {
  // },
});
</script>
