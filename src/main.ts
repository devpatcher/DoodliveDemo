import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from "firebase";
// @ts-ignore
import vue3videoPlay from 'vue3-video-play';
import 'vue3-video-play/dist/style.css';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';


const env = import.meta.env;

// DoodliveDemo web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_APP_FIREBASE_API_KEY,
  authDomain: env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(vue3videoPlay, {
	lang: 'en-US'
});

app.use(PerfectScrollbar);

app.use(router);

app.use(store);

store.dispatch('authAction');

app.mount('#app');
