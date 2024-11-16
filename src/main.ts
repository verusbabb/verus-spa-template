import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import Material from "@primevue/themes/material";
import Ripple from "primevue/ripple";
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
});
app.directive("ripple", Ripple);
app.mount("#app");

// @layer tailwind-base, primevue, tailwind-utilities;

// @layer tailwind-base {
//   @tailwind base;
// }

// @layer tailwind-utilities {
//   @tailwind components;
//   @tailwind utilities;
// }
