<template>
      <div className="bg-background rounded-lg sm:max-w-md sm:mx-auto p-4 fixed inset-x-0 top-16 z-50 mb-4 mx-4 max-h-modal-fit  overflow-y-scroll md:overflow-y-auto">
      <p className="font-bold text-lg"><slot name="title"></slot></p>

      {{ children }}

      <div className="text-center sm:text-right mt-4 sm:flex sm:justify-end">
        <button className="block w-full sm:inline-block sm:w-auto px-4 py-3 sm:py-2 bg-secondary text-background rounded-lg font-semibold text-sm sm:ml-2 sm:order-2" onClick={submitFunc} >
          {{submitText}}
        </button>
        }
        <button className="block w-full sm:inline-block sm:w-auto px-4 py-3 sm:py-2 bg-gray-background rounded-lg font-semibold text-sm mt-4 sm:mt-0 sm:mr-auto sm:order-1" onClick={cancelFunc} >
          Cancel
        </button>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: ['title', 'cancelFunc', 'submitFunc', 'submitText'],
  setup() {
    
  },
})
</script>

