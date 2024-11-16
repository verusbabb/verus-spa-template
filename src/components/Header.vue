<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img src="/veruslogo.png" alt="Verus Logo" class="h-10 w-auto" />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { Badge } from "primevue";
  import { Menubar } from "primevue";
  import { InputText } from "primevue";
  import { Avatar } from "primevue";

  const items = ref([
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      badge: 3,
      items: [
        {
          label: "Core",
          icon: "pi pi-bolt",
          shortcut: "⌘+S",
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
          shortcut: "⌘+B",
        },
        {
          separator: true,
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
          shortcut: "⌘+U",
        },
      ],
    },
  ]);
</script>
