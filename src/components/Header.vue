<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <!-- <img
          src="/veruslogo.png"
          alt="Verus Logo"
          class="h-10 w-auto bg-white"
        /> -->
        <div class="text-2xl font-bold mr-4">
          History | <span class="text-indigo-500">According to Joel</span>
        </div>
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
            @click="visible = true"
            severity="secondary"
            variant="text"
          />
          <Button
            v-if="isLoggedIn"
            label="Logout"
            @click="handleLogout"
            severity="secondary"
            variant="text"
          />

          <Dialog v-model:visible="visible" modal>
            <Form v-slot="$form" :initialValues :resolver @submit="handleLogin">
              <div
                class="p-12 shadow text-center border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
              >
                <div class="text-4xl font-medium mb-12 mt-4 text-gray-900">
                  Welcome
                </div>
                <InputText
                  v-model="email"
                  type="text"
                  class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
                  placeholder="Email"
                />
                <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.email.error?.message }}</Message
                >

                <InputText
                  v-model="password"
                  type="password"
                  class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
                  placeholder="Password"
                />
                <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.password.error?.message }}</Message
                >
                <div class="flex flex-col items-center justify-center">
                  <Button type="submit" variant="text" severity="secondary">
                    Sign In
                  </Button>
                  <div
                    class="text-md text-gray-900 font-bold dark:text-surface-200 mt-4"
                  >
                    New User?
                  </div>
                  <Button
                    @click="handleCreateAccount"
                    variant="text"
                    severity="secondary"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </Form>
          </Dialog>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import {
    Badge,
    Menubar,
    Button,
    InputText,
    Dialog,
    Message,
    // Toast,
  } from "primevue";
  // import Toast from "primevue/toast";
  import { Form } from "@primevue/forms";
  // import { useToast } from "primevue/usetoast";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../store/auth";
  import { storeToRefs } from "pinia";

  const visible = ref(false);

  const router = useRouter();
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);
  const email = ref("");
  const password = ref("");

  // const toast = useToast();

  const initialValues = reactive({
    email: "",
    password: "",
  });

  const resolver = ({ values }) => {
    const errors = {};

    if (!values.email) {
      errors.email = [{ message: "Email is required." }];
    }
    if (!values.password) {
      errors.password = [{ message: "Password is required." }];
    }

    return {
      errors,
    };
  };

  const handleLogin = async () => {
    await authStore.login(email.value, password.value);
    if (isLoggedIn.value) {
      visible.value = false;
      router.push("/");
    } else {
      console.log("not authenticated");
    }
  };

  const handleLogout = () => {
    authStore.logout();
    alert("Logged out");
    router.push("/");
  };

  const handleCreateAccount = () => {
    alert("Create Account");
  };

  const items = ref([
    {
      label: "Lessons",
      icon: "pi pi-graduation-cap",
      badge: 3,
      items: [
        {
          label: "Some Project",
          icon: "pi pi-video",
          // shortcut: "⌘+S",
        },
        {
          label: "Another Project",
          icon: "pi pi-video",
          // shortcut: "⌘+B",
        },
        {
          label: "Yet Another",
          icon: "pi pi-video",
          // shortcut: "⌘+U",
        },
      ],
    },
    {
      label: "Posts",
      icon: "pi pi-pencil",
    },
    {
      label: "Ask Joel",
      icon: "pi pi-question-circle",
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
