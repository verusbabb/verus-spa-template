<template>
  <div>
    <Toast />

    <div class="card">
      <Menubar :model="items">
        <template #start>
          <!-- <img
          src="/veruslogo.png"
          alt="Verus Logo"
          class="h-10 w-auto bg-white"
        /> -->
          <div class="text-2xl font-bold mr-4">
            Tom | <span class="text-indigo-500">Babb</span>
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
            <div v-if="authStore.user" class="text-indigo-500 font-bold">
              Welcome, {{ authStore.user.firstName }}
            </div>
            <Button
              v-if="!isAuthenticated"
              label="Login"
              @click="visible = true"
              severity="secondary"
              variant="text"
            />
            <Button
              v-if="isAuthenticated"
              label="Logout"
              @click="handleLogout"
              severity="secondary"
              variant="text"
            />

            <Dialog
              v-model:visible="visible"
              @show="selectedSchema = 'userLoginSchema'"
              @hide="clearLoginValues"
              class="!bg-gray-200"
              modal
            >
              <Form
                v-slot="$form"
                :initialValues="initialValues"
                :resolver="resolver"
                @submit="handleLogin"
              >
                <div
                  class="p-12 shadow text-center bg-gray-100 border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
                >
                  <div class="text-4xl font-medium mb-12 mt-4 text-gray-900">
                    Welcome
                  </div>
                  <InputText
                    v-model="initialValues.email"
                    name="email"
                    type="text"
                    :class="[
                      '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !bg-white/10 !text-primary-contrast/70 !rounded-full',
                      { '!mb-6': !$form.email?.invalid },
                    ]"
                    placeholder="Email"
                  />
                  <Message
                    v-if="$form.email?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="!mb-6"
                    >{{ $form.email.error?.message }}</Message
                  >

                  <InputText
                    v-model="initialValues.password"
                    name="password"
                    type="password"
                    :class="[
                      '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !bg-white/10 !text-primary-contrast/70 !rounded-full',
                      { '!mb-6': !$form.password?.invalid },
                    ]"
                    placeholder="Password"
                  />
                  <Message
                    v-if="$form.password?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="!mb-6"
                    >{{ $form.password.error?.message }}</Message
                  >
                  <div class="flex flex-col items-center justify-center">
                    <Button type="submit" variant="text" severity="secondary">
                      Sign In
                    </Button>
                    <div
                      class="text-md text-gray-900 font-bold dark:text-surface-200 mt-4"
                    >
                      NEW USER?
                    </div>
                    <Button
                      @click="openCreateAccountModal"
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

    <Dialog
      v-model:visible="createAccountVisible"
      @show="selectedSchema = 'userCreateAccountSchema'"
      @hide="clearCreateAccountValues"
      class="!bg-gray-200"
      modal
    >
      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="handleCreateAccount"
      >
        <div
          class="p-12 shadow text-center border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
        >
          <div class="text-4xl font-medium mb-12 mt-4 text-gray-900">
            Create Account
          </div>
          <InputText
            v-model="initialValues.newFirstName"
            name="newFirstName"
            type="text"
            :class="[
              '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !bg-white/10 !text-primary-contrast/70 !rounded-full',
              { '!mb-6': !$form.newFirstName?.invalid },
            ]"
            placeholder="First Name"
          />
          <Message
            v-if="$form.newFirstName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="!mb-6"
            >{{ $form.newFirstName.error?.message }}</Message
          >
          <InputText
            v-model="initialValues.newLastName"
            name="newLastName"
            type="text"
            :class="[
              '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !bg-white/10 !text-primary-contrast/70 !rounded-full',
              { '!mb-6': !$form.newLastName?.invalid },
            ]"
            placeholder="Last Name"
          />
          <Message
            v-if="$form.newLastName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="!mb-6"
            >{{ $form.newLastName.error?.message }}</Message
          >
          <InputText
            v-model="initialValues.newEmail"
            name="newEmail"
            type="email"
            :class="[
              '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !bg-white/10 !text-primary-contrast/70 !rounded-full',
              { '!mb-6': !$form.newEmail?.invalid },
            ]"
            placeholder="Email"
          />
          <Message
            v-if="$form.newEmail?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="!mb-6"
            >{{ $form.newEmail.error?.message }}</Message
          >
          <InputText
            v-model="initialValues.newPassword"
            name="newPassword"
            type="password"
            :class="[
              '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !bg-white/10 !text-primary-contrast/70 !rounded-full',
              { '!mb-6': !$form.newPassword?.invalid },
            ]"
            placeholder="Password"
          />
          <Message
            v-if="$form.newPassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="!mb-6"
            >{{ $form.newPassword.error?.message }}</Message
          >
          <InputText
            v-model="initialValues.confirmPassword"
            name="confirmPassword"
            type="password"
            :class="[
              '!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !bg-white/10 !text-primary-contrast/70 !rounded-full',
              { '!mb-6': !$form.confirmPassword?.invalid },
            ]"
            placeholder="Confirm Password"
          />
          <Message
            v-if="$form.confirmPassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="!mb-6"
            >{{ $form.confirmPassword.error?.message }}</Message
          >
          <div class="flex flex-col items-center justify-center">
            <Button type="submit" variant="text" severity="secondary">
              Create Account
            </Button>
            <Button
              @click="createAccountVisible = false"
              variant="text"
              severity="secondary"
              class="mt-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script setup>
  import { ref, reactive, watch } from "vue";
  import {
    Badge,
    Menubar,
    Button,
    InputText,
    Dialog,
    Message,
    Toast,
  } from "primevue";
  import { Form } from "@primevue/forms";
  import { useToast } from "primevue/usetoast";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../store/auth";
  import { storeToRefs } from "pinia";
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import { z } from "zod";

  const visible = ref(false);

  const router = useRouter();
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
  const email = ref("");
  const password = ref("");
  const createAccountVisible = ref(false);
  const newEmail = ref("");
  const newPassword = ref("");
  const confirmPassword = ref("");
  const newFirstName = ref("");
  const newLastName = ref("");
  const role = "user";
  const selectedSchema = ref("userLoginSchema");

  const items = ref([
    {
      label: "My Work",
      icon: "pi pi-graduation-cap",
      badge: 3,
      items: [
        {
          label: "Some Project",
          icon: "pi pi-video",
        },
        {
          label: "Another Project",
          icon: "pi pi-video",
        },
        {
          label: "Yet Another",
          icon: "pi pi-video",
        },
      ],
    },
    {
      label: "My Blog",
      icon: "pi pi-pencil",
    },
  ]);

  const toast = useToast();

  const initialValues = reactive({
    email: "",
    password: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
    newFirstName: "",
    newLastName: "",
  });

  const resolver = ref(
    zodResolver(
      z.object({
        email: z.string().email({ message: "Email is required via Zod." }),
        password: z
          .string()
          .min(8, { message: "Password is required via Zod." }),
      }),
    ),
  );

  watch(selectedSchema, (newSchema) => {
    changeResolver(newSchema);
  });

  const changeResolver = (schema) => {
    if (schema === "userLoginSchema") {
      console.log("setting schema to login");
      resolver.value = zodResolver(
        z.object({
          email: z.string().email({ message: "Email is required via Zod." }),
          password: z
            .string()
            .min(8, { message: "Password is required via Zod." }),
        }),
      );
    } else if (schema === "userCreateAccountSchema") {
      console.log("setting schema to create account");
      resolver.value = zodResolver(
        z
          .object({
            newEmail: z
              .string()
              .email({ message: "New Email is required via Zod." }),
            newPassword: z
              .string()
              .min(8, { message: "Password is required via Zod." }),
            confirmPassword: z
              .string()
              .min(8, { message: "Confirm password is required via Zod." }),
            newFirstName: z
              .string()
              .min(1, { message: "First name is required via Zod." }),
            newLastName: z
              .string()
              .min(1, { message: "Last name is required via Zod." }),
          })
          .refine((data) => data.newPassword === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"],
          }),
      );
    }
  };

  const handleLogin = async () => {
    try {
      await authStore.login(initialValues.email, initialValues.password);

      if (isAuthenticated.value) {
        visible.value = false;
        initialValues.email = "";
        initialValues.password = "";
        router.push("/");
        toast.add({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome ${authStore.user.firstName}!`,
          life: 3000,
        });
      }
    } catch (error) {
      initialValues.email = "";
      initialValues.password = "";
      console.error(error);
    }
  };

  const handleLogout = () => {
    toast.add({
      severity: "success",
      summary: "Logout Successful",
      detail: `Come back soon, ${authStore.user.firstName}!`,
      life: 3000,
    });
    authStore.logout();

    router.push("/");
  };

  const openCreateAccountModal = () => {
    visible.value = false;
    createAccountVisible.value = true;
  };

  const handleCreateAccount = async () => {
    // if (
    //   !newEmail.value ||
    //   !newPassword.value ||
    //   !confirmPassword.value ||
    //   !newFirstName.value ||
    //   !newLastName.value
    // ) {
    //   toast.add({
    //     severity: "error",
    //     summary: "Missing Information",
    //     detail: "Please fill in all fields.",
    //     life: 3000,
    //   });
    //   return;
    // }

    try {
      await authStore.register(
        initialValues.newEmail,
        initialValues.newPassword,
        initialValues.newFirstName,
        initialValues.newLastName,
        role,
      );
      createAccountVisible.value = false;
      initialValues.newEmail = "";
      initialValues.newPassword = "";
      initialValues.confirmPassword = "";
      initialValues.newFirstName = "";
      initialValues.newLastName = "";
      toast.add({
        severity: "success",
        summary: "Account Created",
        detail: "Your account has been created successfully!",
        life: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const login = () => {
    router.push("/login");
  };

  const logout = () => {
    authStore.logout();
    router.push("/");
  };

  const clearLoginValues = () => {
    initialValues.email = "";
    initialValues.password = "";
  };

  const clearCreateAccountValues = () => {
    initialValues.newEmail = "";
    initialValues.newPassword = "";
    initialValues.confirmPassword = "";
    initialValues.newFirstName = "";
    initialValues.newLastName = "";
  };
</script>
