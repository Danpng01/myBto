// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons

// Import your auth store
import { useAuthStore } from '../src/stores/authStore';

// Create a Vuetify instance
const vuetify = createVuetify({});
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);

// Initialize the auth state right after Pinia
const authStore = useAuthStore();

// Improved logic to wait for auth to be ready or timeout
let authInitialized = false;
const waitForAuth = () => new Promise((resolve) => {
  const unsubscribe = authStore.$subscribe((mutation, state) => {
    if (state.authReady && !authInitialized) {
      authInitialized = true;
      unsubscribe();
      resolve();
    }
  });

  // Fallback in case auth takes too long
  setTimeout(() => {
    if (!authInitialized) {
      unsubscribe();
      resolve();
    }
  }, 5000); // Wait for 5 seconds before proceeding regardless of auth state
});

waitForAuth().then(() => {
  app.mount('#app');
});

authStore.initializeAuth();
