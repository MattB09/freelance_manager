<template>
  <div v-for="project of projects" :key="project.id">
    <h3 >{{project.name}}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectList',
  props: ['projects'],
  emits: ['update:view'],
  // setup(props) {
  //   function selectProject() {
  //     // update the 'view' state to 'single'
  //   }

  //   return { selectProject }
  // }
});
</script>
