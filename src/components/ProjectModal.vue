<template>
  <Modal :class="!visible ? 'hidden' : ''" @submit="handleSubmit"
  :submitText="'Save'" @canceled="handleCancel">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:default>
      <div class="grid gap-3 grid-cols-8 items-center">

        <label for="project-name" class="col-span-2">
          Name<span class="text-red-500 font-semibold">*</span>
        </label>
        <input id="project-name" type='text' v-model="projectName"
          class="appearance-none rounded py-2 px-3 border border-gray-400 hover:border-gray-700
          leading-tight flex-grow ml-2 col-span-6"/>

        <label for="is-active" class="col-span-2">
          Active<span class="text-red-500 font-semibold">*</span>
        </label>
        <input type="checkbox" id="is-active" v-model="isActive"
          class="w-5 h-5 ml-2 col-span-6"/>

        <label for="start-date" class="col-span-2">
          Start<span class="text-red-500 font-semibold">*</span>
        </label>
        <input type="date" id="start-date" v-model="startDate"
          class="appearance-none rounded py-1 px-3 border border-gray-400 hover:border-gray-700
          leading-tight flex-grow ml-2 col-span-6" />

        <label for="end-date" class="col-span-2">
          End
        </label>
        <input type="date" id="start-date" v-model="endDate"
        class="appearance-none rounded py-1 px-3 border border-gray-400 hover:border-gray-700
        leading-tight flex-grow ml-2 col-span-6" />
      </div>
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
  setup(props, context) {
    const projectName = ref<string>('');
    const isActive = ref<boolean>(false);
    const startDate = ref<Date>();
    const endDate = ref<Date>();

    function handleSubmit() {
      console.log('submit clicked', projectName.value, isActive.value, startDate.value, endDate.value);
    }

    function handleCancel() {
      projectName.value = '';
      isActive.value = false;
      startDate.value = undefined;
      endDate.value = undefined;
      context.emit('canceled');
    }

    return {
      handleSubmit, handleCancel, projectName, isActive, startDate, endDate,
    };
  },
});
</script>
