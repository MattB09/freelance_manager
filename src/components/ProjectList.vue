<template>
  <div v-for="project of projects" :key="project.id">
    <h3 @click='selectProject' class="cursor-pointer">{{project.name}}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store';
import { CHANGE_VIEW } from '../store/mutationTypes';

export default defineComponent({
  name: 'ProjectList',
  props: ['projects'],
  emits: ['update:view'],
  setup() {
    const store = useStore();

    function selectProject() {
      store.commit(CHANGE_VIEW, 'single');
    }

    return { selectProject };
  },
});
</script>
