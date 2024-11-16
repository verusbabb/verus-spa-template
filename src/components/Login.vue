<template>
  <div
    class="px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-gray-100"
  >
    <div
      class="p-12 shadow text-center border border-gray-500 lg:w-[30rem] backdrop-blur-md rounded-xl"
    >
      <div class="text-4xl font-medium mb-12 text-primary-contrast">
        Welcome
      </div>
      <InputText
        type="text"
        class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
        placeholder="Email"
      />
      <InputText
        type="text"
        class="!appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
        placeholder="Password"
      />
      <button
        type="button"
        class="max-w-40 !appearance-none placeholder:!text-primary-contrast/40 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
      >
        Sign In
      </button>
      <a
        class="cursor-pointer font-medium block text-center text-primary-contrast"
        >Forgot Password?</a
      >
    </div>
  </div>
</template>
<script setup>
  import InputText from "primevue/inputtext";
</script>
