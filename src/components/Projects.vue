<template>
  <div>
    <!-- Div for graying background when modal is visible -->
    <div v-if="modalVisible" class="bg-black opacity-25 w-full h-full fixed z-10 inset-0"></div>

    <h1 class="text-2xl font-semibold mt-0 mb-2">Projects</h1>

    <Button class="bg-purple-400" @click="projectModalVisible('add')">
      + Project
    </Button>
    <ProjectModal :visible="addMdlVisible" :title="'Add Project'" @canceled="cancelModal('add')" />
    <EditProjectModal :visible="editMdlVisible" :title="'Edit Project'"
      @canceled="cancelModal('edit')" />
    <DeleteProjectModal :visible="deleteMdlVisible" :title="'Delete Project'"
      @canceled="cancelModal('delete')" />

    <!-- Project List -->
    <div v-if="error">No data available</div>
    <div v-else-if="projects && projects.length">
      <ProjectList :projects="projects" @edit="projectModalVisible('edit')"
        @delete="projectModalVisible('delete')" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '@/components/Button.vue';
import ProjectModal from '@/components/projectModals/ProjectModal.vue';
import EditProjectModal from '@/components/projectModals/EditProjectModal.vue';
import ProjectList from './ProjectList.vue';

export default defineComponent({
  name: 'Projects',
  components: {
    ProjectList, Button, ProjectModal, EditProjectModal,
  },
  props: ['projects', 'error'],
  setup() {
    const modalVisible = ref<boolean>(false);
    const addMdlVisible = ref<boolean>(false);
    const editMdlVisible = ref<boolean>(false);
    const deleteMdlVisible = ref<boolean>(false);

    function projectModalVisible(type: string) {
      switch (type) {
        case 'add':
          addMdlVisible.value = true;
          break;
        case 'edit':
          editMdlVisible.value = true;
          break;
        case 'delete':
          deleteMdlVisible.value = true;
          break;
        default:
          break;
      }
      modalVisible.value = true;
    }

    function cancelModal(type: string) {
      switch (type) {
        case 'add':
          addMdlVisible.value = false;
          break;
        case 'edit':
          editMdlVisible.value = false;
          break;
        case 'delete':
          deleteMdlVisible.value = false;
          break;
        default:
          break;
      }
      modalVisible.value = false;
    }

    return {
      projectModalVisible,
      modalVisible,
      addMdlVisible,
      editMdlVisible,
      deleteMdlVisible,
      cancelModal,
    };
  },
});
</script>
