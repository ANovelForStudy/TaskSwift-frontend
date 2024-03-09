<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление задачами</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item>
				<v-btn
					class="rounded-xl"
					prepend-icon="message"
					variant="tonal"
					color="accent"
					>Связаться с руководителем</v-btn
				>
			</v-list-item>
		</v-row>
		<div class="py-5">
			<span class="text-h5">Список задач</span>
		</div>
		<div
			class="loader-progress-circular"
			v-if="progressCircular"
		>
			<div class="rounded-circle bg-sidebar pa-3">
				<v-progress-circular
					:size="128"
					:width="8"
					color="accent"
					class=""
					indeterminate
				></v-progress-circular>
			</div>
		</div>
		<div
			v-if="!tasks.length && !progressCircular"
			class="text-center py-10"
		>
			<h3>Нет назначенных задач</h3>
		</div>
		<v-row>
			<v-col
				sm="4"
				v-for="task in tasks"
				:key="task.id"
			>
				<EmployeeTaskCardComponent :task="task"></EmployeeTaskCardComponent>
			</v-col>
		</v-row>

		<v-snackbar v-model="snackbar">
			{{ snackbar_text }}

			<template v-slot:actions>
				<v-btn
					color="accent"
					variant="text"
					@click="snackbar = false"
					>Закрыть сообщение</v-btn
				>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
import axios from "axios";
import EmployeeTaskCardComponent from "./ui/EmployeeTaskCardComponent";

export default {
	data() {
		return {
			// Список категорий
			categories: [],
			// Список задач, назначенных текущему сотруднику
			tasks: [
				{
					id: 1,
					title: "Тест 1",
					description: "",
					priority: "U",
					color: "#FF0000",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T21:15:59.501751+03:00",
					updated_at: "2024-03-07T21:15:59.501751+03:00",
				},
				{
					id: 3,
					title: "Test 3",
					description: "",
					priority: "U",
					color: "#15FF41",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T21:29:36.779965+03:00",
					updated_at: "2024-03-07T21:29:36.779965+03:00",
				},
				{
					id: 4,
					title: "Бизнес делишки",
					description: "Какие-то бизнес дела",
					priority: "U",
					color: "#B229D9",
					category: 1,
					assigned_to: null,
					deadline: "2024-12-12T00:00:00+03:00",
					created_at: "2024-03-07T23:18:20.118495+03:00",
					updated_at: "2024-03-07T23:18:20.118495+03:00",
				},
				{
					id: 5,
					title: "Тест 4",
					description:
						"ААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА",
					priority: "U",
					color: "#FFFFFF",
					category: 1,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:19:20.338178+03:00",
					updated_at: "2024-03-07T23:19:20.338178+03:00",
				},
				{
					id: 6,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:00.019770+03:00",
					updated_at: "2024-03-07T23:20:00.019770+03:00",
				},
				{
					id: 7,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:05.299663+03:00",
					updated_at: "2024-03-07T23:20:05.299663+03:00",
				},
				{
					id: 8,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:06.995350+03:00",
					updated_at: "2024-03-07T23:20:06.995350+03:00",
				},
				{
					id: 9,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:08.074478+03:00",
					updated_at: "2024-03-07T23:20:08.074478+03:00",
				},
				{
					id: 10,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:09.073198+03:00",
					updated_at: "2024-03-07T23:20:09.073198+03:00",
				},
				{
					id: 11,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:10.302556+03:00",
					updated_at: "2024-03-07T23:20:10.303555+03:00",
				},
				{
					id: 12,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:11.231360+03:00",
					updated_at: "2024-03-07T23:20:11.231360+03:00",
				},
				{
					id: 13,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:12.309538+03:00",
					updated_at: "2024-03-07T23:20:12.309538+03:00",
				},
				{
					id: 14,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:13.419591+03:00",
					updated_at: "2024-03-07T23:20:13.419591+03:00",
				},
				{
					id: 15,
					title: "Тест 5",
					description: "",
					priority: "U",
					color: "#FFFFFF",
					category: null,
					assigned_to: null,
					deadline: null,
					created_at: "2024-03-07T23:20:14.512089+03:00",
					updated_at: "2024-03-07T23:20:14.512089+03:00",
				},
			],
			// selectedCategory: "",
			// searchQuery: "",
			// plug: "-",
			// Уведомление снизу об успешном создании задачи
			snackbar: false,
			snackbar_text: "",
			// Прогрессбар во время загрузки списка задач
			progressCircular: true,
		};
	},
	components: {
		EmployeeTaskCardComponent,
	},
	methods: {},
	async created() {
		await axios
			.get("/api/v1/tasks/categories/")
			.then((response) => {
				this.categories = response.data;
			})
			.catch((error) => {
				console.log(error);
			});

		await axios
			.get("/api/v1/tasks/")
			.then((response) => {
				this.tasks = response.data;
				this.assignedTasks = this.tasks.filter((task) => task.assigned_to === this.$store.state.user.id);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				this.progressCircular = false;
			});
	},
};
</script>

<style scoped>
.loader-progress-circular {
	min-height: 60vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
