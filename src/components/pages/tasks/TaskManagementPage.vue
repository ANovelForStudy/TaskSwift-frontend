<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление задачами</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item
				><CreateTaskDialog
					:categories="categories"
					@createTask="createTask"
				></CreateTaskDialog
			></v-list-item>
			<v-list-item>
				<CreateTaskCategoryDialog @createTaskCategory="createTaskCategory"></CreateTaskCategoryDialog>
			</v-list-item>
			<v-list-item
				><v-btn
					class="rounded-xl"
					prepend-icon="link"
					variant="tonal"
					color="accent"
					>Назначить задачу</v-btn
				></v-list-item
			>
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
			v-if="!tasks.length"
			class="text-center py-10"
		>
			<h3>Задачи ещё не были созданы</h3>
		</div>
		<v-row>
			<v-col
				sm="4"
				v-for="task in tasks"
				:key="task.id"
			>
				<TaskCardComponent
					:task="task"
					@deleteTask="deleteTask"
				></TaskCardComponent>
			</v-col>
		</v-row>

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
import axios from "axios";
import TaskCardComponent from "@/components/pages/tasks/ui/TaskCardComponent";
import CreateTaskDialog from "@/components/pages/tasks/ui/CreateTaskDialog";
import CreateTaskCategoryDialog from "@/components/pages/tasks/ui/CreateTaskCategoryDialog";

export default {
	data() {
		return {
			// Список категорий
			categories: [],
			// Список задач
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
		TaskCardComponent,
		CreateTaskDialog,
		CreateTaskCategoryDialog,
	},
	methods: {
		async deleteTask(taskId) {
			await axios
				.delete(`api/v1/tasks/${taskId}/`)
				.then((response) => {
					this.tasks = this.tasks.filter((task) => task.id !== taskId);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		async createTask(task) {
			this.tasks.push(task);

			this.snackbar_text = "Задача успешно создана!";
			this.snackbar = true;
		},
		async createTaskCategory(category) {
			this.categories.push(category);

			this.snackbar_text = "Категория задач успешно создана!";
			this.snackbar = true;
		},
	},
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
				this.tasks = response.data.map((task) => ({
					...task,
					// category: task.category || { category: this.plug },
					// assigned_to: task.assigned_to || { assigned_to: this.plug },
				}));

				this.tasks = response.data;
				this.progressCircular = false;
			})
			.catch((error) => {
				console.log(error);
			});
	},
};
</script>

<style scoped>
/* .v-card:hover {
	transform: translateY(-10px);
	transition: transform 0.1s ease-out;
}

.v-card:not(:hover) {
	transform: translateY(0px);
	transition: transform 0.1s ease-out;
} */

.loader-progress-circular {
	min-height: 60vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
