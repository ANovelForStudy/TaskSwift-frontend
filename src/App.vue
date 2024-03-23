<template>
	<v-app theme="darkGreyGreen">
		<SidebarComponent v-if="this.$store.getters['auth/isAuthenticated']"></SidebarComponent>

		<TopbarComponent v-if="this.$store.getters['auth/isAuthenticated']"></TopbarComponent>

		<v-main style="min-height: 80vh">
			<router-view></router-view>
		</v-main>

		<FooterComponent></FooterComponent>
	</v-app>
</template>

<script>
import SidebarComponent from "@/components/base/SidebarComponent";
import FooterComponent from "@/components/base/FooterComponent";
import TopbarComponent from "@/components/base/TopbarComponent";

import axios from "axios";

export default {
	components: {
		SidebarComponent,
		FooterComponent,
		TopbarComponent,
	},
	beforeCreate() {
		// Инициализация состояния хранилища после перезагрузки страницы
		this.$store.dispatch("auth/initializeStore");

		// Получить токен из Vuex
		const token = this.$store.getters["auth/getUserToken"];

		// Если токен существует
		if (token) {
			// Установить заголовок авторизации Axios
			axios.defaults.headers.common["Authorization"] = "Token " + token;
		} else {
			// Очистить заголовок авторизации Axios
			axios.defaults.headers.common["Authorization"] = "";
		}
	},
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Fira sans", sans-serif;
}

.text-h4,
.text-h3,
.text-h2,
.text-h1 {
	font-family: "Fira sans", sans-serif;
}
</style>
