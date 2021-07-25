<template>
  <div>
    <h1>Project Name</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useStore } from '@/store';

export default defineComponent({
  name: 'SingleProject',
  prop: ['project'],
  setup(props) {
    console.log(props);
    return { props };
  },
});
</script>
