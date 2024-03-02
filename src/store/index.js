import { createStore } from "vuex";
import { sidebarDrawer } from "@/store/modules/sidebarToggleModule";

export default createStore({
	state: {
		user: {
			token: "",
			isAuthenticated: false,
		},
	},
	getters: {},
	mutations: {
		// Инициализация состояния хранилища на основе наличия токена в локальном хранилище
		initializeStore(state) {
			if (localStorage.getItem("token")) {
				state.user.token = localStorage.getItem("token");
				state.user.isAuthenticated = true;
			} else {
				state.user.token = "";
				state.user.isAuthenticated = false;
			}
		},
		// Установка токена и установка статуса аутентификации в true
		setToken(state, token) {
			state.user.token = token;
			state.user.isAuthenticated = true;
		},
		// Удаление токена и установка статуса аутентификации в false
		removeToken(state) {
			state.user.token = "";
			state.user.isAuthenticated = false;
		},
	},
	actions: {},
	modules: { sidebar: sidebarDrawer },
});
