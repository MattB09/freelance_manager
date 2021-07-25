<template>
  <div>
    <Projects v-if="store.state.view === 'projects'"
      :projects='store.state.projects' :error='store.state.error' />
    <SingleProject v-else-if="store.state.view === 'single' && store.state.selectedProject"
      :project="project" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watchEffect } from 'vue';
import Projects from '@/components/Projects.vue';
import SingleProject from '@/components/SingleProject.vue';
import { useStore, actionTypes } from '@/store';
import { Project } from '@/types/DataTypes';

export default defineComponent({
  name: 'AppView',
  components: { Projects, SingleProject },
  setup() {
    const store = useStore();
    store.dispatch(actionTypes.GET_DATA);

    const project = ref<Project | null>();
    project.value = store.state.projects
      ?.find((proj) => proj.id === store.state.selectedProject);

    return { store, project };
  },
});
</script>
