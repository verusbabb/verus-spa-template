<template>
  <TabMenu :model="items" />
</template>

<script setup>
  import { ref } from "vue";
  import TabMenu from "primevue/tabmenu";

  // Define the menu items for Menubar
  const items = ref([
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
    { label: "About", to: "/about" },
    { label: "Resources", to: "/resources" },
    { label: "Contact", to: "/contact" },
  ]);
</script>

<style scoped>
  /* Add any custom styling here if necessary */
</style>
