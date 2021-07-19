<template>
  <h1>Freelance Manager</h1>
  <div class="grid grid-cols-2 gap-8 mx-auto justify-items-stretch w-full">
    <div>
      <h2>Clients</h2>
      <button>All Clients</button>
      <button v-for="client in clients" :key="client">{{ client }}</button>
    </div>
    <div>
      <h2>Projects</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const clients = ref<string[]>(['me', 'you']);

    return { clients };
  },
});
</script>
