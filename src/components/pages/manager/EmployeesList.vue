<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление сотрудниками</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item><AddEmployeeDialog @addEmployee="addEmployee"></AddEmployeeDialog></v-list-item>
			<v-list-item><ActionButton>Назначить сотруднику задачу</ActionButton></v-list-item>
		</v-row>
		<div class="py-5">
			<span class="text-h5">Список сотрудников</span>
		</div>
		<div class="pb-7 pt-2">
			<v-row>
				<v-col>
					<v-text-field
						v-model="searchQuery"
						label="Поиск по e-mail, фамилии, имени или телефону"
						single-line
						hide-details
						prepend-inner-icon="search"
						variant="outlined"
						color="accent"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-list-item>
					<ActionButton
						icon="delete"
						color="error"
						@click="deleteSelectedEmployees"
						>Удалить выбранных сотрудников</ActionButton
					></v-list-item
				>
			</v-row>
		</div>

		<v-data-table
			:headers="headers"
			:items="employees"
			:loading="isEmployeesLoading"
			v-model="selected"
			show-select
			class="elevation-5 rounded-lg"
			:search="searchQuery"
			@click:row="selectEmployee"
		>
			<template v-slot:item.date_of_birth="{ item }">
				{{ item.date_of_birth ? formatDate(item.date_of_birth) : "" }}
			</template>

			<template v-slot:item.date_joined="{ item }">
				{{ item.date_joined ? formatDate(item.date_joined) : "" }}
			</template>

			<template v-slot:item.created_at="{ item }">
				{{ item.created_at ? formatDateTime(item.created_at) : "" }}
			</template>

			<template v-slot:loading>
				<v-skeleton-loader type="table-row@5"></v-skeleton-loader>
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
// Сторонние библиотеки
import moment from "moment";
import axios from "axios";

// Получение данных
import getManagerEmployees from "@/hooks/manager/getManagerEmployees";

// Компоненты
import ActionButton from "@/components/ui/ActionButton";
import AddEmployeeDialog from "./ui/AddEmployeeDialog";

export default {
	data: () => ({
		selected: [],
		snackbar: false,
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
		searchQuery: "",
	}),
	components: {
		ActionButton,
		AddEmployeeDialog,
	},
	setup() {
		const { employees, isEmployeesLoading } = getManagerEmployees();

		return { employees, isEmployeesLoading };
	},
	methods: {
		formatDate(date) {
			return moment(date).format("DD.MM.YYYY");
		},
		formatDateTime(date) {
			return moment(date).format("DD.MM.YYYY в hh:mm:ss");
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
