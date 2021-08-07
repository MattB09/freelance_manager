<template>
  <!-- <div ref='modal' class="hidden">
  </div> -->
  <Modal :class="visible ? 'hidden' : ''" :submitFunc="submitFunc"
  :submitText="'Save'" :cancelFunc="cancelFunc">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:default>
      <input type='text' required />
    </template>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'ProjectModal',
  components: { Modal },
  props: ['visible', 'title', 'cancelFunc'],
  setup() {
    function submitFunc() {
      alert('submit');
    }

    return { submitFunc };
  },
});
</script>
