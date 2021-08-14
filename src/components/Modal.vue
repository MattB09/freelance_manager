<template>
  <div v-bind="$attrs" class="bg-white rounded-lg sm:max-w-md sm:mx-auto p-4
  fixed inset-x-0 top-16 z-50 mb-4 mx-4 max-h-modal-fit  overflow-y-auto
  sm:overflow-y-auto">
    <p class="font-bold text-2xl text-center mb-8">
        <slot class="" name="title"></slot>
    </p>

      <slot></slot>

      <div class="text-center sm:text-right mt-4 sm:flex sm:justify-end">
        <Button class="bg-purple-400 sm:order-2 w-full sm:w-20"
        @click="$emit('submit')" >
          {{submitText}}
        </Button>
        <Button class="bg-gray-400 sm:order-1 sm:mr-auto w-full sm:w-20" @click="cancelClicked" >
          Cancel
        </Button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  components: {
    Button,
  },
  name: 'Modal',
  emits: ['canceled', 'submit'],
  props: ['title', 'submitFunc', 'submitText'],
  setup(props, context) {
    function cancelClicked() {
      context.emit('canceled');
    }

    return { cancelClicked };
  },
});
</script>
