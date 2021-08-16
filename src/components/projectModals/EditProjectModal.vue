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
        <input type="date" id="start-date" v-model="start"
          class="appearance-none rounded py-1 px-3 border border-gray-400 hover:border-gray-700
          leading-tight flex-grow ml-2 col-span-6" />

        <label for="end-date" class="col-span-2">
          End
        </label>
        <input type="date" id="start-date" v-model="end"
        class="appearance-none rounded py-1 px-3 border border-gray-400 hover:border-gray-700
        leading-tight flex-grow ml-2 col-span-6" />

        <span class="text-red-600 col-span-8">{{formError}}</span>
      </div> 
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useStore } from 'vuex';
import Modal from '@/components/Modal.vue';
// import { Project } from '@/types/DataTypes';

export default defineComponent({
  name: 'EditProjectModal',
  components: { Modal },
  emits: ['canceled'],
  props: ['visible', 'title'],
  setup(props, context) {
    // const store = useStore();

    const projectName = ref<string>('');
    const isActive = ref<boolean>(false);
    const start = ref<Date>();
    const end = ref<Date>();
    const formError = ref<string>('');

    function handleCancel() {
      context.emit('canceled');
    }

    function handleSubmit() {
      if (!projectName.value || !start.value) {
        formError.value = 'Must fill out fields with a *';
        return;
      }

      // const newProject: Project = {
      //   name: projectName.value,
      //   isActive: isActive.value,
      //   start: start.value,
      // };
      // if (end.value) newProject.end = end.value;

      // store.dispatch(actionTypes.ADD_PROJECT, { newProject, user: store.state.user });
      handleCancel();
    }

    return {
      handleSubmit, handleCancel, projectName, isActive, start, end, formError,
    };
  },
});
</script>
