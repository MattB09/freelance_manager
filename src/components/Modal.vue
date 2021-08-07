<template>
  <div v-bind="$attrs" class="bg-background rounded-lg sm:max-w-md sm:mx-auto p-4
  fixed inset-x-0 top-16 z-50 mb-4 mx-4 max-h-modal-fit  overflow-y-scroll md:overflow-y-auto">
    <p class="font-bold text-lg">
        <slot class="font-bold text-lg" name="title"></slot>
    </p>

      <slot></slot>

      <div class="text-center sm:text-right mt-4 sm:flex sm:justify-end">
        <button class="block w-full sm:inline-block sm:w-auto px-4 py-3 sm:py-2 bg-secondary
        text-background rounded-lg font-semibold text-sm sm:ml-2 sm:order-2" @click="submitFunc" >
          {{submitText}}
        </button>
        <Button class="bg-gray-400" @click="cancelFunc" >
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
  props: ['title', 'cancelFunc', 'submitFunc', 'submitText'],
  // setup() {
  // },
});
</script>
