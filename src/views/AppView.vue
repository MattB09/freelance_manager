<template>
  <h1 class="text-4xl font-bold mt-0 mb-4">Freelance Manager</h1>
  <div>
    <h2>Projects</h2>
    <div v-if="error">{{"No data available"}}</div>
    <div v-else-if="projects && projects.length">
      <ProjectList :projects="projects" />
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Project } from '../types/DataTypes';
import ProjectList from '../components/ProjectList.vue';

export default defineComponent({
  name: 'AppView',
  components: { ProjectList },
  setup() {
    const urlBase = 'http://localhost:3000';
    const projects = ref<Project[]>();
    const error = ref<string | null>(null);

    const loadData = async () => {
      try {
        const data = await axios.get(`${urlBase}/projects`);
        console.log(data);
        if (data.statusText !== 'OK') throw Error('data not available');
        projects.value = data.data;
      } catch (err) {
        error.value = err.message;
      }
    };

    loadData();

    return { projects, error };
  },
});
</script>
