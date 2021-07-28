<template>
  <input type="checkbox" id="projectComplete" v-model="showCompleted">
  <label for="projectComplete">Show inactive projects</label>
  <div v-for="(project) of filteredProjects" :key="project.name">
    <h3 @click='() => selectProject(project.name)' class="cursor-pointer">{{project.name}}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore, mutationTypes } from '@/store';

export default defineComponent({
  name: 'ProjectList',
  props: ['projects'],
  emits: ['update:view'],
  setup() {
    const store = useStore();
    const showCompleted = ref<boolean>(false);

    function selectProject(name: string) {
      store.commit(mutationTypes.SET_SELECTED_PROJECT, name);
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
