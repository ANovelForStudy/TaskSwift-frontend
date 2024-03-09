import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import moment from "moment";

import axios from "axios";

// Локализация отображения времени
moment.locale("ru");

// URL Django
axios.defaults.baseURL = "http://127.0.0.1:8000";

createApp(App).use(vuetify).use(store).use(router).mount("#app");
