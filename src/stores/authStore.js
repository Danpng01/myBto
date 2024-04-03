import { defineStore } from 'pinia';
import { auth } from '../../scripts/firebase'; // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authReady: false,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    initializeAuth() {
      onAuthStateChanged(auth, (user) => {
        this.setUser(user);
        this.authReady = true;
      });
    },
  },
});