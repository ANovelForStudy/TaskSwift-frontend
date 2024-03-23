export default {
	namespaced: true,
	state: () => ({
		user: {
			// Токен доступа
			token: "",

			// Текущий зарегистрированный пользователь
			data: null,
		},
	}),
	getters: {
		// Получение статуса аутентификации
		isAuthenticated: (state) => {
			return !!state.user.token;
		},
		// Получение данных пользователя
		getUserData: (state) => {
			return state.user.data;
		},
		getUserToken: (state) => {
			return state.user.token;
		},
		getUserDataIsLoading: (state) => {
			return !state.user.data;
		},
	},
	mutations: {
		setToken(state, token) {
			state.user.token = token;
		},
		removeToken(state) {
			state.user.token = "";
		},
		setUserData(state, data) {
			state.user.data = data;
		},
		removeUserData(state) {
			state.user.data = null;
		},
	},
	actions: {
		// Инициализация состояния хранилища после перезагрузки страницы
		initializeStore({ commit }) {
			// Попробовать извлечь токен из локального хранилища
			const token = localStorage.getItem("userToken");

			if (token) {
				commit("setToken", token);
			} else {
				commit("removeToken");
			}

			// Попробовать получить данные пользователя из локального хранилища
			const userData = JSON.parse(localStorage.getItem("userData"));

			if (userData) {
				commit("setUserData", userData);
			} else {
				commit("removeUserData");
			}
		},
		logout({ commit }, router) {
			// Удалить токен из локального хранилища
			localStorage.removeItem("userToken");

			// Удалить токен из Vuex
			commit("removeToken");

			// Удалить данные пользователя из локального хранилища
			localStorage.removeItem("userData");

			// Удалить данные пользователя из Vuex
			commit("removeUserData");

			// Перенаправить пользователя на страницу входа в систему
			router.push({
				name: "Login",
			});
		},
	},
};
