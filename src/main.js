// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { db, auth } from '../scripts/firebase'; // Import the initialized Firebase instances


// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons

// Create a Vuetify instance
const vuetify = createVuetify({});
  
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
