<template>
	<v-container class="d-flex justify-center align-center h-100">
		<div class="card-wrapper">
			<div class="text-h3 text-center mb-10">
				Вход в систему
				<span class="text-accent">T</span>ask<span class="text-accent">S</span>wift
			</div>
			<v-card>
				<v-form
					fast-fail
					@submit.prevent="submitForm"
				>
					<div class="px-5 pt-5">
						<v-text-field
							name="email"
							prepend-inner-icon="mail"
							label="Электронная почта"
							type="email"
							v-model="form.email"
							variant="outlined"
							color="accent"
						></v-text-field>
						<v-text-field
							name="password"
							prepend-inner-icon="lock"
							:append-icon="showPassword ? 'visibility_off' : 'visibility'"
							@click:append="showPassword = !showPassword"
							label="Пароль"
							:type="showPassword ? 'text' : 'password'"
							variant="outlined"
							v-model="form.password"
							color="accent"
						></v-text-field>
						<div v-show="formErrors.length">
							<v-scroll-y-transition group>
								<p
									v-for="error in formErrors"
									:key="error"
									class="pa-2 my-1 ps-4 bg-error rounded-lg"
								>
									{{ error }}
								</p>
							</v-scroll-y-transition>
						</div>
						<v-row class="px-5 justify-space-between align-center d-flex">
							<v-checkbox
								label="Запомнить меня"
								v-model="isRemembered"
								color="accent"
								hide-details
							></v-checkbox>

							<a
								href="#"
								class="pe-3 text-accent text-decoration-none"
							>
								Забыли пароль?
							</a>
						</v-row>
					</div>
					<v-btn
						class="mt-5 pa-7 bg-accent"
						block
						:loading="loading"
						type="submit"
						variant="text"
					>
						<span class="">Войти</span>
					</v-btn>
				</v-form>
			</v-card>
		</div>
	</v-container>
</template>

<script>
import axios from "axios";

export default {
	data: () => ({
		// Состояние видимости пароля
		showPassword: false,

		// Состояние галочки "Запомнить меня"
		isRemembered: false,

		// Состояние видимости спиннера
		loading: false,

		// Поля формы входа в систему
		form: {
			email: "test_email_2@gmail.com",
			password: "test5test5",
		},

		// Список ошибок формы
		formErrors: [],
	}),
	methods: {
		// Валидация и отправка формы на сервер и получение токена
		async submitForm() {
			// TODO: Вернуть и поправить валидацию формы
			try {
				// Включить круговой индикатор загрузки данных
				this.loading = true;

				// Отправить POST-запрос с данными формы для получения токена
				const tokenResponse = await axios.post("/api/v1/auth/token/login", this.form);

				// Извлечь токен из ответа
				const token = tokenResponse.data.auth_token;

				// Записать токен в заголовок авторизации
				axios.defaults.headers.common["Authorization"] = "Token " + token;

				// Записать токен в Vuex
				this.$store.commit("auth/setToken", token);

				// Отправить GET-запрос для получения данных пользователя
				const userDataResponse = await axios.get("/api/v1/auth/users/me");

				// Извлечь данные пользователя из ответа
				const userData = userDataResponse.data;

				// Записать данные пользователя в Vuex
				this.$store.commit("auth/setUserData", userData);

				// Если стоит чекбокс "Запомнить меня"
				if (this.isRemembered) {
					// Записать токен в локальное хранилище
					localStorage.setItem("userToken", token);

					// Записать данные пользователя в локальное хранилище
					localStorage.setItem("userData", JSON.stringify(userData));
				}

				// Перенаправить пользователя на домашнюю страницу
				this.$router.push({
					name: "Home",
				});
			} catch (error) {
				console.log(error);

				// В случае, если произошла ошибка, совершить выход из системы и удалить данные
				this.$store.dispatch("auth/logout", this.$router);
			} finally {
				// Выключить круговой индикатор загрузки данных
				this.loading = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
