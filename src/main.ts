import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import Material from "@primevue/themes/material";
import Ripple from "primevue/ripple";
import router from "./router/router";
import { createPinia } from "pinia";
import ToastService from "primevue/toastservice";

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      darkModeSelector: "false",
    },
  },
});
app.use(ToastService);
app.directive("ripple", Ripple);
app.use(router);
app.use(pinia);

app.mount("#app");

// @layer tailwind-base, primevue, tailwind-utilities;

// @layer tailwind-base {
//   @tailwind base;
// }

// @layer tailwind-utilities {
//   @tailwind components;
//   @tailwind utilities;
// }
