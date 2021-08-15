<template>
  <Modal :class="!visible ? 'hidden' : ''" @submit="handleSubmit" :submitText="'Save'"
  @canceled="handleCancel">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:default>
      <div class="grid gap-3 grid-cols-8 items-center">

        <label for="task-name" class="col-span-2">
          Name<span class="text-red-500 font-semibold">*</span>
        </label>
        <input id="task-name" type='text' v-model="taskName"
          class="appearance-none rounded py-2 px-3 border border-gray-400 hover:border-gray-700
          leading-tight flex-grow ml-2 col-span-6"/>

        <label for="is-complete" class="col-span-2">
          Complete
        </label>
        <input type="checkbox" id="is-complete" v-model="isComplete"
          class="w-5 h-5 ml-2 col-span-6"/>

        <label for="is-billable" class="col-span-2">
          Billable
        </label>
        <input type="checkbox" id="is-billable" v-model="isBillable"
          class="w-5 h-5 ml-2 col-span-6"/>

        <span class="text-red-600 col-span-8">{{formError}}</span>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { actionTypes, useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import { Task } from '@/types/DataTypes';

export default defineComponent({
  name: 'AddTaskModal',
  components: { Modal },
  emits: ['canceled'],
  props: ['visible', 'title'],
  setup(props, context) {
    const store = useStore();

    const taskName = ref<string>('');
    const isComplete = ref<boolean>(false);
    const isBillable = ref<boolean>(false);
    const formError = ref<string>('');

    function handleCancel() {
      taskName.value = '';
      isComplete.value = false;
      isBillable.value = false;
      formError.value = '';
      context.emit('canceled');
    }

    function handleSubmit() {
      if (!taskName.value) {
        formError.value = 'Must fill out fields with a *';
        return;
      }

      const newTask: Task = {
        name: taskName.value,
        isComplete: isComplete.value,
        isBillable: isBillable.value,
      };

      store.dispatch(actionTypes.ADD_TASK, {
        newTask, user: store.state.user, project: store.state.selectedProject,
      });
      handleCancel();
    }

    return {
      taskName, isComplete, isBillable, handleCancel, handleSubmit, formError,
    };
  },
});
</script>
