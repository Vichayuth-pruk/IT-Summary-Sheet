import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/css/styles.css'

createApp(App).use(Router).mount("#app");
