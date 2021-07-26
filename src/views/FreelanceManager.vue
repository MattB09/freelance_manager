<template>
  <AppNav />
  <div>
    <Projects v-if="store.state.view === 'projects'"
      :projects='store.state.projects' :error='store.state.error' />
    <SingleProject v-else-if="store.state.view === 'single' && store.state.selectedProject" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Projects from '@/components/Projects.vue';
import SingleProject from '@/components/SingleProject.vue';
import AppNav from '@/components/AppNav.vue';
import { useStore, actionTypes } from '@/store';
import { Project } from '@/types/DataTypes';

export default defineComponent({
  name: 'AppView',
  components: { AppNav, Projects, SingleProject },
  setup() {
    const store = useStore();
    store.dispatch(actionTypes.GET_DATA);

    return { store };
  },
});
</script>
