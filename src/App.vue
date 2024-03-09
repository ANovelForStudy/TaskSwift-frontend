<template>
	<v-app theme="darkGreyGreen">
		<SidebarComponent v-if="this.$store.state.user.isAuthenticated"></SidebarComponent>

		<TopbarComponent v-if="this.$store.state.user.isAuthenticated"></TopbarComponent>

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
		// Вызываем мутацию для инициализации хранилища начальными значениями токена и статуса аутентификации Vuex
		this.$store.commit("initializeStore");

		// Получаем токен пользователя из состояния (state) хранилища
		const token = this.$store.state.user.token;

		// Устанавливаем заголовок авторизации в запросах для всех запросов Axios, если токен доступен
		if (token) {
			axios.defaults.headers.common["Authorization"] = "Token " + token;
			// Получаем данные пользователя, если токен нам доступен
			this.$store.dispatch("fetchUser");
		} else {
			// Если токен отсутствует, очищаем в запросах заголовок авторизации
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
