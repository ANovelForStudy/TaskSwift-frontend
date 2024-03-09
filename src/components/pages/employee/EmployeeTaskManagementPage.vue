<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление назначенными задачами</dir>
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
			<v-row>
				<v-col>
					<span class="text-h5">Список задач</span><br />
					<span>{{ tasks.length ? `Количество назначенных задач: ${tasks.length}` : `` }}</span>
				</v-col>
			</v-row>
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
			tasks: [],
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
			.get("/api/v1/tasks/assigned-to-me/")
			.then((response) => {
				this.tasks = response.data;
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
