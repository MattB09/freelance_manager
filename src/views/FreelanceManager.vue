<template>
  <div>
    <Projects v-if="view === 'projects'" :projects='projects' :error='error' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

import Projects from '../components/Projects.vue';
import getData from '../composables/getData';

export default defineComponent({
  name: 'AppView',
  components: { Projects },
  setup() {
    const { projects, error, load } = getData();
    load();

    const view = ref<string>('projects');

    return { projects, error, view };
  },
});
</script>
