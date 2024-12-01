import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch {
    return false; // Invalid token
  }
}
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    token: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async register(
      email: string,
      password: string,
      firstName: string,
      lastName: string,
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8110/api/users/register",
          { email, password, firstName, lastName, role: "user" },
        );
        return response.data; // Returns the new user object
      } catch (error) {
        throw error;
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await axios.post(
          "http://localhost:8110/api/auth/login",
          { email, password },
        );
        const { accessToken, refreshToken, user } = response.data;
        console.log("user", user);

        // const decodedUser = jwtDecode<User>(accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        this.user = user;
        this.token = accessToken;
        this.isAuthenticated = true;
        console.log("user", this.user);
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    async logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    async fetchUser() {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:8110/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.user = response.data;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    init() {
      const token = localStorage.getItem("accessToken");

      if (token && isTokenValid(token)) {
        this.isAuthenticated = true;
        this.token = token;
        this.user = jwtDecode<User>(token);
      } else {
        this.logout();
      }
    },
  },
});
