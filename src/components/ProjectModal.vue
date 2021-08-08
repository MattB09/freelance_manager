<template>
  <Modal :class="!visible ? 'hidden' : ''" @submit="handleSubmit"
  :submitText="'Save'" @canceled="$emit('canceled')">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:default>
      <label for="project-name">Project Name: </label>
      <input id="project-name" type='text' v-model="projectName" required
        class="appearance-none rounded py-2 px-3 border border-gray-400 hover:border-gray-700
        leading-tight"/>
    </template>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'ProjectModal',
  components: { Modal },
  emits: ['canceled'],
  props: ['visible', 'title'],
  setup() {
    const projectName = ref<string>('');

    function handleSubmit() {
      console.log('submit clicked', projectName.value);
    }
    return { handleSubmit, projectName };
  },
});
</script>
