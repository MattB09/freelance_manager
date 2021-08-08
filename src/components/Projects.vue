<template>
  <div>
    <div v-if="modalVisible" class="bg-black opacity-25 w-full h-full fixed z-10 inset-0"></div>
    <h1 class="text-2xl font-semibold mt-0 mb-2">Projects</h1>
    <Button class="bg-purple-400" @click="projectModalVisible">
      + Project
    </Button>
    <ProjectModal :visible="modalVisible" :title="'Add Project'" @canceled="cancelModal" />
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

    function projectModalVisible() {
      modalVisible.value = true;
    }

    function cancelModal() {
      console.log('from projects component');
      modalVisible.value = false;
    }

    return { projectModalVisible, modalVisible, cancelModal };
  },
});
</script>
