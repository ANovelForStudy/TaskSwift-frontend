<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление сотрудниками</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item><AddEmployeeDialogVue @addEmployee="addEmployee"></AddEmployeeDialogVue></v-list-item>
			<v-list-item><ActionButton>Назначить сотруднику задачу</ActionButton></v-list-item>
		</v-row>
		<div class="py-5">
			<span class="text-h5">Список сотрудников</span>
		</div>
		<div class="pb-7 pt-2">
			<v-row>
				<v-list-item
					><v-btn
						class="rounded-xl"
						variant="tonal"
						color="error"
						prepend-icon="delete"
						@click="deleteSelectedEmployees"
						>Удалить выбранных сотрудников
					</v-btn></v-list-item
				>
			</v-row>
		</div>
		<v-data-table
			:headers="headers"
			:items="employees"
			:loading="loading"
			v-model="selected"
			show-select
			class="elevation-5 rounded-lg"
		>
			<template v-slot:loading>
				<v-skeleton-loader type="table-row@5"></v-skeleton-loader>
			</template>

			<template v-slot:top>
				<v-toolbar color="white">
					<v-toolbar-title>Сотрудники</v-toolbar-title>
				</v-toolbar>
			</template>

			<template v-slot:item.date_of_birth="{ item }">
				{{ item.date_of_birth ? formatDate(item.date_of_birth) : "" }}
			</template>

			<template v-slot:item.created_at="{ item }">
				{{ item.created_at ? formatDateTime(item.created_at) : "" }}
			</template>
		</v-data-table>

		<v-snackbar v-model="snackbar">
			{{ snackbar_text }}

			<template v-slot:actions>
				<v-btn
					color="accent"
					variant="text"
					@click="snackbar = false"
				>
					Закрыть сообщение
				</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";

import ActionButton from "@/components/ui/ActionButton.vue";
import AddEmployeeDialogVue from "./ui/AddEmployeeDialog.vue";

export default {
	data: () => ({
		selected: [],
		snackbar: false,
		loading: false,
		headers: [
			{ title: "Фамилия", value: "last_name" },
			{ title: "Имя", value: "first_name" },
			{ title: "Отчество", value: "middle_name" },
			{ title: "Пол", value: "gender" },
			{ title: "Электронная почта", value: "email" },
			{ title: "Дата рождения", value: "date_of_birth" },
			{ title: "Дата устройства на работу", value: "date_joined" },
			{ title: "Телефон", value: "phone" },
			{ title: "Экстренный телефон", value: "emergency_contact_phone" },
			{ title: "Дата создания аккаунта", value: "created_at" },
		],
		employees: [],
	}),
	components: {
		ActionButton,
		AddEmployeeDialogVue,
	},
	created() {
		this.loading = true;

		this.getEmployees();
	},
	methods: {
		formatDate(date) {
			return moment(date).format("DD.MM.YYYY");
		},
		formatDateTime(date) {
			return moment(date).format("DD.MM.YYYY в hh:mm:ss");
		},
		async getEmployees() {
			await axios
				.get("/api/v1/users/employees/")
				.then((response) => {
					this.employees = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		async addEmployee(employee) {
			this.employees.push(employee);

			this.snackbar_text = "Сотрудник успешно добавлен!";
			this.snackbar = true;
		},
		async deleteSelectedEmployees() {
			if (this.selected.length === 0) {
				this.snackbar_text = "Выберите сотрудников для удаления";
				this.snackbar = true;
				return;
			}

			const employee_ids = this.selected.map((employee) => employee.id);

			await axios
				.delete("/api/v1/users/employees/", { data: { employee_ids } })
				.then((response) => {
					this.employees = this.employees.filter((employee) => !this.selected.includes(employee));

					this.selected = [];

					this.snackbar_text = "Сотрудники успешно удалены!";
					this.snackbar = true;
				})
				.catch((error) => {
					console.log(error);
					this.snackbar_text = "Ошибка при удалении сотрудников";
					this.snackbar = true;
				});
		},
	},
};
</script>
