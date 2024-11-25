<script setup lang="ts">
  import Header from "./components/Header.vue";
  import { RouterView } from "vue-router";
  import { useAuthStore } from "./store/auth";

  const authStore = useAuthStore();
  authStore.init();
</script>

<template>
  <div>
    <Header />
    <RouterView />
    <!-- <Login /> -->
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
