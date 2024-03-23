import { createStore } from "vuex";

// Сторонние библиотеки
import axios from "axios";

// Модули
import sidebarModule from "./modules/sidebarToggleModule";
import authModule from "./modules/authModule";

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		// Модуль для сворачивания боковой панели
		// Требуется так как кнопка "бургер" находится в компоненте TopBar, а не SideBar
		// TODO: подумать, насколько целесообразно такое использование модуля Vuex
		sidebar: sidebarModule,

		// Модуль для аутентификации и работы с данными пользователя
		auth: authModule,
	},
});
