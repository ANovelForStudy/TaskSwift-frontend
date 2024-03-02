<template>
	<v-container class="d-flex justify-center align-center h-100">
		<div class="card-wrapper">
			<div class="text-h3 text-center mb-10">
				Вход в систему <span class="text-accent">T</span>ask<span
					class="text-accent"
					>S</span
				>wift
			</div>
			<v-card>
				<v-form fast-fail @submit.prevent="submitForm">
					<div class="px-5 pt-5">
						<v-text-field
							name="name"
							label="Электронная почта"
							type="email"
							v-model="form.email"
							variant="outlined"
							:rules="rules"
							color="accent"
						></v-text-field>
						<v-text-field
							name="name"
							label="Пароль"
							type="password"
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
						<v-row
							class="px-5 justify-space-between align-center d-flex"
						>
							<v-checkbox
								label="Запомнить меня"
								v-model="isRemembered"
								color="accent"
								hide-details
							></v-checkbox>

							<a
								href="#"
								class="pe-3 text-accent text-decoration-none"
								>Забыли пароль?</a
							>
						</v-row>
					</div>
					<v-btn
						class="mt-5 pa-7 bg-accent"
						block
						:loading="loading"
						type="submit"
						variant="text"
						><span class="">Войти</span></v-btn
					>
				</v-form>
			</v-card>
		</div>
	</v-container>
</template>

<script>
import axios from "axios";

export default {
	data: () => ({
		loading: false,
		isRemembered: false,
		form: {
			email: "test_email_10@gmail.com",
			password: "test1test1",
		},
		formErrors: [],
	}),
	methods: {
		submitForm() {
			console.log("[LogIn]: Очистка токена");

			axios.defaults.headers.common["Authorization"] = "";

			localStorage.removeItem("token");

			this.formErrors = [];

			if (this.form.email === "") {
				this.formErrors.push(
					"Требуется указать адрес электронной почты!"
				);
			}

			const validRegex =
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if (!this.form.email.match(validRegex)) {
				this.formErrors.push(
					"Электронная почта имеет неверный формат!"
				);
			}

			if (this.form.password === "") {
				this.formErrors.push("Требуется указать пароль!");
			}

			if (!this.formErrors.length) {
				this.loading = true;

				console.log(this.form);

				axios
					.post("/api/v1/auth/token/login/", this.form)
					.then((response) => {
						const token = response.data.auth_token;

						this.$store.commit("setToken", token);

						axios.defaults.headers.common["Authorization"] =
							"Token " + token;

						console.log("Token " + token);

						localStorage.setItem("userToken", token);

						this.$router.push("/");
					})
					.catch((error) => {
						if (error.response) {
							for (const property in error.response.data) {
								this.formErrors.push(
									error.response.data[property].toString()
								);
							}

							console.log(JSON.stringify(error.response.data));
						} else if (error.message) {
							this.formErrors.push(
								"Что-то пошло не так! Пожалуйста, попробуйте ещё раз!"
							);

							console.log(error);
						}
					})
					.finally(() => (this.loading = false));
			}
		},
	},
};
</script>

<style lang="scss" scoped>
// .card-wrapper {
// 	min-width: 450px;
// }
</style>
