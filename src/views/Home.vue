<template>
  <div class="home">
    <div class="mx-auto rounded-lg shadow-sm p-10 bg-purple-100">
      <h1 class="font-bold text-5xl sm:text-center text-purple-700 mb-4" >
        Welcome to
        <span class="font-black text-black">Freelance Manager</span>
      </h1>
      <p class="mb-4 text-lg font-medium text-gray-800">
        Want to make sure you're billing you're clients fairly? Manage your freelance projects
        with Freelance Manager by creating tasks and logging the time you spend on each task.
      </p>
      <div class="text-center">
        <router-link to="/app">
          <Button class="bg-purple-400 font-medium">
            Go to the App!
          </Button>
        </router-link>
      </div>
    </div>

    <div>
      <h2>
        Features
      </h2>

      <h2>
        Request a demo
      </h2>

      <h2>
        Pricing
      </h2>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/Button.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Button,
  },
});
</script>
