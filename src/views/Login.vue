<template>
  <div class="px-6 py-12 md:px-12 lg:px-20 flex items-center justify-center">
    <div
      class="p-12 shadow text-center border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
    >
      <div class="text-4xl font-medium mb-12 text-black">Welcome</div>
      <InputText
        v-model="email"
        type="text"
        class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
        placeholder="Email"
      />
      <InputText
        v-model="password"
        type="password"
        class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
        placeholder="Password"
      />
      <Button @click="handleLogin" type="button" variant="text">
        Sign In
      </Button>
      <Button @click="handleCreateAccount" type="button" variant="text">
        Create Account
      </Button>
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { storeToRefs } from "pinia";
  import InputText from "primevue/inputtext";
  import axios from "axios";
  import { useAuthStore } from "../store/auth/index";
  import { useRouter } from "vue-router";
  import Button from "primevue/button";

  const router = useRouter();
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);
  const email = ref("");
  const password = ref("");

  const handleLogin = () => {
    authStore.login(email.value, password.value);
    if (isLoggedIn) {
      router.push("/");
    } else {
      console.log("not authenticated");
    }
  };
</script>
