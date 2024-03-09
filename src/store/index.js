import { createStore } from "vuex";
import { sidebarDrawerModule } from "@/store/modules/sidebarToggleModule";
import axios from "axios";

export default createStore({
	state: {
		user: {
			// Непосредственно токен
			token: "",
			// Состояние аутентификации, требующееся для работы маршрутизации
			isAuthenticated: false,
			// Текущий зарегистрированный пользователь
			data: null,
			// Поле для отслеживания загрузки данных о пользователе
			dataIsLoading: false,
		},
	},
	getters: {
		userData: (state) => state.user.data,
		userDataLoading: (state) => state.user.dataIsLoading,
	},
	mutations: {
		// Инициализация состояния хранилища на основе наличия токена в локальном хранилище
		initializeStore(state) {
			// Если токен сохранён в локальном хранилище
			if (localStorage.getItem("userToken")) {
				state.user.token = localStorage.getItem("userToken");
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
		// Запись данных о пользователе
		setUserData(state, userData) {
			state.user.data = userData;
		},
		// Очистка данных о пользователе
		removeUserData(state, userData) {
			state.user.data = null;
		},
		setDataIsLoading(state, status) {
			state.user.dataIsLoading = status;
		},
	},
	actions: {
		logout({ commit }, router) {
			// Удаление токена из локального хранилища
			localStorage.removeItem("userToken");

			// Вызов мутации Vuex для очистки токена и статуса аутентификации
			commit("removeToken");

			// Перенаправление на страницу входа
			router.push({ name: "Login" });
		},
		fetchUser({ commit }) {
			commit("setDataIsLoading", true);

			axios
				.get("/api/v1/auth/users/me")
				.then((response) => {
					commit("setUserData", response.data);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					commit("setDataIsLoading", false);
				});
		},
	},
	modules: {
		// Модуль для сворачивания боковой панели
		sidebar: sidebarDrawerModule,
	},
});
