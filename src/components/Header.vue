<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img
          src="/veruslogo.png"
          alt="Verus Logo"
          class="h-10 w-auto bg-white"
        />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <!-- Use router-link and preserve styling -->
        <router-link
          v-if="item.routerLink"
          :to="item.routerLink"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a :href="href" @click="navigate" class="flex items-center ml-4">
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
        </router-link>
        <a v-else v-ripple class="flex items-center" v-bind="props.action">
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
          <Button
            v-if="!isLoggedIn"
            label="Login"
            @click="login"
            severity="secondary"
            variant="text"
          />
          <Button v-else label="Logout" @click="logout" severity="secondary" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { Badge, Menubar, Button, InputText } from "primevue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../store/auth";
  import { storeToRefs } from "pinia";
  const router = useRouter();
  const authStore = useAuthStore();

  const { isLoggedIn } = storeToRefs(authStore);

  const items = ref([
    {
      label: "Home",
      icon: "pi pi-home mr-2",
      routerLink: "/",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      badge: 3,
      items: [
        {
          label: "Some Project",
          icon: "pi pi-bolt",
          shortcut: "⌘+S",
        },
        {
          label: "Another Project",
          icon: "pi pi-server",
          shortcut: "⌘+B",
        },
        {
          label: "Yet Another",
          icon: "pi pi-pencil",
          shortcut: "⌘+U",
        },
      ],
    },
    {
      label: "Profile",
      icon: "pi pi-user",
    },
  ]);

  const login = () => {
    router.push("/login");
  };

  const logout = () => {
    authStore.logout();
    router.push("/");
  };
</script>
