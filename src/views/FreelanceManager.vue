<template>
  <div>
    <Projects v-if="store.state.view === 'projects'" :projects='projects' :error='error' />
    <SingleProject v-else-if="store.state.view === 'single'" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Projects from '../components/Projects.vue';
import SingleProject from '../components/SingleProject.vue';
import getData from '../composables/getData';
import { useStore } from '../store';

export default defineComponent({
  name: 'AppView',
  components: { Projects, SingleProject },
  setup() {
    const store = useStore();

    const { projects, error, load } = getData();
    load();

    return { projects, error, store };
  },
});
</script>
