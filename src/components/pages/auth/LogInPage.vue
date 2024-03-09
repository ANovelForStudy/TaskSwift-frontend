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
		showPassword: false,
		// Состояние видимости спиннера
		loading: false,
		// Состояние галочки "Запомнить меня"
		isRemembered: false,
		form: {
			email: "test_email_2@gmail.com",
			password: "test5test5",
		},
		formErrors: [],
	}),
	methods: {
		// Валидация и отправка формы на сервер и получение токена
		submitForm() {
			// Очистка заголовка с авторизационными данными (токеном)
			axios.defaults.headers.common["Authorization"] = "";

			// Удаление токена из локального хранилища
			localStorage.removeItem("userToken");

			// Очистка массива ошибок валидации и входа
			this.formErrors = [];

			// Проверка указания электронной почты
			if (this.form.email === "") {
				this.formErrors.push("Требуется указать адрес электронной почты!");
			}

			// Проверка на соответствие почты определённому регулярному выражению
			const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if (!this.form.email.match(validRegex)) {
				this.formErrors.push("Электронная почта имеет неверный формат!");
			}

			// Проверка указания электронной почты
			if (this.form.password === "") {
				this.formErrors.push("Требуется указать пароль!");
			}

			// Если ошибок валидации нет, то начать процедуру аутентификации
			if (!this.formErrors.length) {
				// Включение спиннера
				this.loading = true;

				axios
					.post("/api/v1/auth/token/login/", this.form) // Отправка POST-запроса с данными формы
					.then((response) => {
						// Извлечение токена
						const token = response.data.auth_token;

						// Запись токена в соответствующий заголовок
						axios.defaults.headers.common["Authorization"] = "Token " + token;

						// Получение данных пользователя
						this.$store.dispatch("fetchUser");

						// Вызов мутации из Vuex для записи токена в состояние
						this.$store.commit("setToken", token);

						// Если пользователь поставил галочку "запомнить меня"
						if (this.isRemembered) {
							// Запись токена в локальное хранилище
							localStorage.setItem("userToken", token);
						}

						setTimeout(() => {
							// Перенаправление на домашнюю страницу
							this.$router.push({ name: "Home" });
						}, 300);
					})
					.catch((error) => {
						// Обработка ошибки: если получен ответ от сервера
						if (error.response) {
							// Итерация по свойствам объекта с ошибками в данных ответа
							for (const property in error.response.data) {
								// Добавление ошибок в массив формы для отображения пользователю
								this.formErrors.push(error.response.data[property].toString());
							}

							// Вывод данных ошибки из ответа сервера в консоль
							console.log(JSON.stringify(error.response.data));
						}
						// Обработка ошибки: если сообщение об ошибке доступно
						else if (error.message) {
							// Добавление общего сообщения об ошибке в массив формы
							this.formErrors.push("Что-то пошло не так! Пожалуйста, попробуйте ещё раз!");

							// Вывод исключения в консоль
							console.log(error);
						}
					})
					.finally(() => {
						// Спрятать спиннер по завершению
						this.loading = false;
					});
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
