<template>
  <div class="flex flex-col min-h-screen">
    <nav id="nav" class="">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <main class="flex-grow">
      <router-view/>
    </main>
    <footer>
      <p class="text-center p-4 border-t border-gray-300">
        Placeholder for footer component
      </p>
    </footer>
  </div>
</template>

<style>
</style>
