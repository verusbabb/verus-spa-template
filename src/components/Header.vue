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

            <Dialog v-model:visible="visible" class="!bg-gray-200" modal>
              <Form
                v-slot="$form"
                :initialValues="initialValuesLogin"
                :resolver="resolverLogin"
                @submit="handleLogin"
              >
                <div
                  class="p-12 shadow text-center bg-gray-100 border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
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
                      NEW USER?
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

    <Dialog v-model:visible="createAccountVisible" class="!bg-gray-200" modal>
      <Form
        v-slot="$form"
        :initialValues="initialValuesCreateAccount"
        :resolver="resolverCreateAccount"
        @submit="submitCreateAccount"
      >
        <div
          class="p-12 shadow text-center border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
        >
          <div class="text-4xl font-medium mb-12 mt-4 text-gray-900">
            Create Account
          </div>
          <InputText
            v-model="newFirstName"
            type="text"
            class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
            placeholder="First Name"
          />
          <Message
            v-if="$form.newFirstName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.newFirstName.error?.message }}</Message
          >
          <InputText
            v-model="newLastName"
            type="text"
            class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
            placeholder="Last Name"
          />
          <Message
            v-if="$form.newLastName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.newLastName.error?.message }}</Message
          >
          <InputText
            v-model="newEmail"
            type="email"
            class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
            placeholder="Email"
          />
          <Message
            v-if="$form.newEmail?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.newEmail.error?.message }}</Message
          >
          <InputText
            v-model="newPassword"
            type="password"
            class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
            placeholder="Password"
          />
          <Message
            v-if="$form.newPassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.newPassword.error?.message }}</Message
          >
          <InputText
            v-model="confirmPassword"
            type="password"
            class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
            placeholder="Confirm Password"
          />
          <Message
            v-if="$form.confirmPassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.confirmPassword.error?.message }}</Message
          >
          <div class="flex flex-col items-center justify-center">
            <Button
              @click="submitCreateAccount"
              variant="text"
              severity="secondary"
            >
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
  import { ref, reactive } from "vue";
  import {
    Badge,
    Menubar,
    Button,
    InputText,
    Dialog,
    Message,
    Toast,
  } from "primevue";
  // import Toast from "primevue/toast";
  import { Form } from "@primevue/forms";
  import { useToast } from "primevue/usetoast";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../store/auth";
  import { storeToRefs } from "pinia";

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
  const loginSchema = ref("userLogin");

  // const resolver = ref(
  //   zodResolver(
  //     z.object({
  //       username: z
  //         .string()
  //         .min(1, { message: "Username is required via Zod." }),
  //     }),
  //   ),
  // );

  const items = ref([
    {
      label: "My Work",
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
      label: "My Blog",
      icon: "pi pi-pencil",
    },
  ]);

  const toast = useToast();

  const initialValuesLogin = reactive({
    email: "",
    password: "",
  });

  const resolverLogin = ({ values }) => {
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

  const initialValuesCreateAccount = reactive({
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
    newFirstName: "",
    newLastName: "",
  });

  const resolverCreateAccount = ({ values }) => {
    const errors = {};

    if (!values.newFirstName?.trim()) {
      errors.newFirstName = { message: "First name is required." };
    }
    if (!values.newLastName?.trim()) {
      errors.newLastName = { message: "Last name is required." };
    }
    if (!values.newEmail?.trim()) {
      errors.newEmail = { message: "Email is required." };
    }
    if (!values.newPassword?.trim()) {
      errors.newPassword = { message: "Password is required." };
    }
    if (!values.confirmPassword?.trim()) {
      errors.confirmPassword = { message: "Confirm password is required." };
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = { message: "Passwords do not match." };
    }

    return {
      errors,
      values,
    };
  };

  const handleLogin = async () => {
    if (!email.value || !password.value) {
      toast.add({
        severity: "error",
        summary: "Missing Information",
        detail: "Please provide both email and password.",
        life: 3000,
      });
      return;
    }

    try {
      await authStore.login(email.value, password.value);

      if (isAuthenticated.value) {
        visible.value = false;
        email.value = "";
        password.value = "";
        router.push("/");
        toast.add({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome ${authStore.user.firstName}!`,
          life: 3000,
        });
      }
    } catch (error) {
      email.value = "";
      password.value = "";
      toast.add({
        severity: "error",
        summary: "Login Failed",
        detail: error.response?.data?.message || "Invalid email or password.",
        life: 3000,
      });
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

  const handleCreateAccount = () => {
    visible.value = false;
    createAccountVisible.value = true;
  };

  const submitCreateAccount = async () => {
    if (
      !newEmail.value ||
      !newPassword.value ||
      !confirmPassword.value ||
      !newFirstName.value ||
      !newLastName.value
    ) {
      toast.add({
        severity: "error",
        summary: "Missing Information",
        detail: "Please fill in all fields.",
        life: 3000,
      });
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      toast.add({
        severity: "error",
        summary: "Password Mismatch",
        detail: "Passwords do not match.",
        life: 3000,
      });
      return;
    }

    try {
      await authStore.register(
        newEmail.value,
        newPassword.value,
        newFirstName.value,
        newLastName.value,
        role,
      );
      createAccountVisible.value = false;
      newEmail.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      newFirstName.value = "";
      newLastName.value = "";
      toast.add({
        severity: "success",
        summary: "Account Created",
        detail: "Your account has been created successfully!",
        life: 3000,
      });
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Registration Failed",
        detail: error.response?.data?.message || "Could not create account.",
        life: 3000,
      });
    }
  };

  const login = () => {
    router.push("/login");
  };

  const logout = () => {
    authStore.logout();
    router.push("/");
  };
</script>
