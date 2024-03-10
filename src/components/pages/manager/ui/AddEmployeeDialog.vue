<template>
	<v-dialog
		v-model="dialog"
		max-width="700"
		style="background: #000000aa"
		transition="dialog-bottom-transition"
	>
		<template v-slot:activator="{ props: activatorProps }">
			<ActionButton
				v-bind="activatorProps"
				icon="person"
				>Добавить сотрудника</ActionButton
			>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card class="pa-6">
				<v-card-title class="text-center">
					<span class="text-h5">Добавление сотрудника</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col
								cols="12"
								sm="6"
								md="6"
							>
								<v-text-field
									v-model="newEmployee.first_name"
									label="Имя*"
									variant="outlined"
									color="accent"
									class="mb-2"
									required
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								sm="6"
								md="6"
							>
								<v-text-field
									v-model="newEmployee.last_name"
									label="Фамилия*"
									variant="outlined"
									color="accent"
									class="mb-2"
									required
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="newEmployee.email"
									label="Электронная почта*"
									variant="outlined"
									prepend-inner-icon="mail"
									color="accent"
									class="mb-2"
									required
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="newEmployee.password"
									type="password"
									label="Пароль*"
									variant="outlined"
									prepend-inner-icon="lock"
									color="accent"
									class="mb-2"
									required
								></v-text-field>
							</v-col>
						</v-row>
					</v-container>
					<v-container v-if="this.formErrors.length">
						<v-scroll-y-transition group>
							<div
								v-for="error in formErrors"
								:key="error"
								class="pa-2 my-1 ps-4 bg-error rounded-lg"
							>
								<p>{{ error }}</p>
							</div>
						</v-scroll-y-transition>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-row>
						<v-col>
							<v-btn
								color="error"
								class="my-2 pa-5"
								variant="tonal"
								block
								@click="closeDialog"
								>Отмена</v-btn
							>
						</v-col>
						<v-spacer></v-spacer>
						<v-col>
							<v-btn
								color="accent"
								class="my-2 pa-5"
								variant="tonal"
								block
								type="submit"
								:loading="loading"
								@click="addEmployee"
								>Добавить</v-btn
							>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script>
import axios from "axios";
import ActionButton from "@/components/ui/ActionButton.vue";

export default {
	data: () => ({
		loading: false,
		dialog: false,
		newEmployee: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		},
		formErrors: [],
	}),
	components: {
		ActionButton,
	},
	methods: {
		closeDialog() {
			this.dialog = false;
			this.$nextTick(() => {
				this.newEmployee = {
					first_name: "",
					last_name: "",
					email: "",
					password: "",
				};
			});
		},
		async addEmployee() {
			this.loading = true;

			await axios
				.post("/api/v1/auth/users/", this.newEmployee)
				.then((response) => {
					this.$emit("addEmployee", { ...response.data, created_at: new Date() });
					this.closeDialog();
				})
				.catch((error) => {
					if (error.response) {
						for (const property in error.response.data) {
							this.formErrors.push(error.response.data[property].toString()?.split(",")?.join(" "));

							console.log(error.response.data[property].toString());
						}

						console.log(error.response.data);
					} else if (error.message) {
						this.formErrors.push("Что-то пошло не так! Пожалуйста, попробуйте ещё раз!");

						console.log(error);
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
};
</script>
