<template>
  <h1 class="text-4xl font-bold mt-0 mb-4">Freelance Manager</h1>
  <div class="grid grid-cols-2 gap-8 mx-auto justify-items-stretch w-full">
    <div>
      <h2>Projects</h2>
      <select>
        <option value="all">all</option>
      </select>
      <div v-for="project of projects" :key="project.id">
        <h3>{{project.name}}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Project } from '../types/DataTypes';

export default defineComponent({
  setup() {
    const urlBase = 'http://localhost:3000';
    const projects = ref<Project[]>();

    const loadData = async () => {
      try {
        const data = await axios.get(`${urlBase}/projects`);
        projects.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };

    loadData();

    return { projects };
  },
});
</script>
