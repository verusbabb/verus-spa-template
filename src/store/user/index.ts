import { defineStore } from "pinia";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
});
