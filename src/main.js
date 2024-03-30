// import Vuetify from 'vuetify'
// import VueTextareaAutosize from 'vue-textarea-autosize';
// import firebase from 'firebase/app'
// import 'firebase/firestore';



// firebase.initializeApp({
//     apiKey: "AIzaSyDCbbalbEV6-E9D52fnNmxpx2PvhojAyEI",
//     authDomain: "vue-calendar-8824c.firebaseapp.com",
//     projectId: "vue-calendar-8824c",
//     storageBucket: "vue-calendar-8824c.appspot.com",
//     messagingSenderId: "952821028191",
//     appId: "1:952821028191:web:ad7be122c7efc9b74f92ea"
// })

// export const db = firebase.firestore();

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDCbbalbEV6-E9D52fnNmxpx2PvhojAyEI",
//   authDomain: "vue-calendar-8824c.firebaseapp.com",
//   projectId: "vue-calendar-8824c",
//   storageBucket: "vue-calendar-8824c.appspot.com",
//   messagingSenderId: "952821028191",
//   appId: "1:952821028191:web:ad7be122c7efc9b74f92ea"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // Get a Firestore instance
// export const db = getFirestore(firebaseApp);

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'





const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
