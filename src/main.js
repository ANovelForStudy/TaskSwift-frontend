import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import axios from "axios";

// URL Django
axios.defaults.baseURL = "http://127.0.0.1:8000";

createApp(App).use(vuetify).use(store).use(router).mount("#app");
