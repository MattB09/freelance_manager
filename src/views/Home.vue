<template>
  <div class="home">
    <h1>Home</h1>
    <p>
      This is the marketing page. It will serve as the landing page for the app
      and contain information with links to sign up.
    </p>
    <router-link to="/app">
      <Button :text="'Go to the App!'" />
    </router-link>
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
