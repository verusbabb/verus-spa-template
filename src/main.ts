import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Material from "@primevue/themes/material";

const app = createApp(App);
app.use(PrimeVue, {
  unstyled: true,
  // theme: {
  //   preset: Material,
  // },
});

app.mount("#app");
