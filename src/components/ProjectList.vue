<template>
  <!-- Filters -->
  <input type="checkbox" id="projectComplete" v-model="showCompleted">
  <label for="projectComplete">Show inactive projects</label>

  <!-- Header for grid of projects -->
  <div class="grid grid-cols-10 gap-2 border-b items-center mb-2">
    <span class="col-span-1"></span>
    <span class="col-span-1"></span>
    <span class="col-span-4">Project</span>
    <span class="col-span-2">Start</span>
    <span class="col-span-2">End</span>
  </div>

  <!-- Project data rows -->
  <div v-for="project of filteredProjects" :key="project.id"
    @click='() => selectProject(project.id)'
    class="grid grid-cols-10 gap-2 border-b items-center mb-2 cursor-pointer hover:bg-gray-200">
    <span class="col-span-1">
      <Button class="bg-purple-400">
        Edit
      </Button>
    </span>
    <span class="col-span-1">
      <Button class="bg-red-400">
        Delete
      </Button>
    </span>
    <span class="col-span-4">{{ project.name }}</span>
    <span class="col-span-2">{{ project.start }}</span>
    <span class="col-span-2">
      {{ project.end ? projects.end : '----' }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore, mutationTypes } from '@/store';
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'ProjectList',
  props: ['projects'],
  emits: ['update:view'],
  components: { Button },
  setup() {
    const store = useStore();
    const showCompleted = ref<boolean>(false);

    function selectProject(id: string) {
      store.commit(mutationTypes.SET_SELECTED_PROJECT, id);
      store.commit(mutationTypes.CHANGE_VIEW, 'single');
    }

    const filteredProjects = computed(() => {
      if (showCompleted.value) return store.state.projects;

      return store.state.projects!
        .filter((project) => project.isActive);
    });

    return { selectProject, showCompleted, filteredProjects };
  },
});
</script>
