<template>
  <div>
  <h1 class="text-2xl font-semibold mt-0 mb-2">Projects</h1>
    <span @click='addProject'>
      <Button class="bg-purple-400">+ Project</Button>
    </span>
    <ProjectModal :visible="modalVisible" :title="'Add Project'" :cancelFunc="cancelModal"/>
    <div v-if="error">{{"No data available"}}</div>
    <div v-else-if="projects && projects.length">
      <ProjectList :projects="projects" />
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProjectList from './ProjectList.vue';
import Button from './Button.vue';
import ProjectModal from './ProjectModal.vue';

export default defineComponent({
  name: 'Projects',
  components: { ProjectList, Button, ProjectModal },
  props: ['projects', 'error'],
  setup() {
    const modalVisible = ref<boolean>(false);

    function addProject() {
      modalVisible.value = !modalVisible.value;
    }

    function cancelModal() {
      modalVisible.value = false;
    }

    return { addProject, modalVisible, cancelModal };
  },
});
</script>
