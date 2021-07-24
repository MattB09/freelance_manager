<template>
  <div>
  <h1 class="text-2xl font-semibold mt-0 mb-2">Projects</h1>
    <div v-if="error">{{"No data available"}}</div>
    <div v-else-if="projects && projects.length">
      <ProjectList :projects="projects" />
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectList from './ProjectList.vue';

export default defineComponent({
  name: 'Projects',
  components: { ProjectList },
  props: ['projects', 'error'],
  setup() {
    return {};
  },
});
</script>
