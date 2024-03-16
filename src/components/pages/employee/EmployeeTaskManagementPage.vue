<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление назначенными задачами</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item>
				<ActionButton icon="message">Связаться с руководителем</ActionButton>
			</v-list-item>
		</v-row>
		<div class="py-5">
			<v-row>
				<v-col>
					<span class="text-h5">Список задач</span><br />
					<span>{{ originTasks.length ? `Количество назначенных задач: ${originTasks.length}` : `` }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col lg="3">
					<v-select
						v-model="sortBy"
						:items="sortOptions"
						label="Сортировка"
						item-title="label"
						item-value="value"
						prepend-inner-icon="sort_by_alpha"
						variant="outlined"
						color="accent"
						@update:model-value="sortTasks"
					></v-select>
					<v-btn
						class="rounded-xl"
						variant="tonal"
						color="accent"
						@click="reverseSortOrder"
					>
						{{ sortOrder === "asc" ? "По возрастанию" : "По убыванию" }}
						<template v-slot:prepend>
							<v-icon>{{ sortOrder === "asc" ? "expand_more" : "expand_less" }}</v-icon>
						</template>
					</v-btn>
				</v-col>
				<v-col lg="3"
					><v-select
						v-model="filterBy"
						:items="filterOptions"
						label="Фильтрация"
						item-title="label"
						item-value="value"
						prepend-inner-icon="filter_alt"
						variant="outlined"
						color="accent"
						@update:model-value="filterTasks"
					></v-select
				></v-col>
				<v-col lg="3"
					><v-select
						v-model="filterCategory"
						:items="[{ name: 'Все категории', id: null }, ...categories]"
						item-title="name"
						item-value="id"
						label="Фильтрация по категории"
						prepend-inner-icon="bookmarks"
						variant="outlined"
						color="accent"
						@update:model-value="filterTasks"
					></v-select
				></v-col>
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
				<EmployeeTaskCardComponent
					@filterTasks="filterTasks"
					:task="task"
					:category="categories.find((cat) => cat.id === task.category)"
				></EmployeeTaskCardComponent>
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
import ActionButton from "@/components/ui/ActionButton";

export default {
	data() {
		return {
			// Выбранная опция сортировки
			sortBy: "deadline",
			// Направление сортировки
			sortOrder: "asc",
			// Все опции сортировки
			sortOptions: [
				{ label: "Дате создания", value: "created_at" },
				{ label: "Дедлайну", value: "deadline" },
			],
			// Выбранная опция фильтрации
			filterBy: null,
			// Категория, по которой будет происходить фильтрация
			filterCategory: null,
			// Все опции фильтрации
			filterOptions: [
				{ label: "Все задачи", value: null },
				{ label: "Завершены", value: true },
				{ label: "Не завершены", value: false },
			],
			// Список категорий
			categories: [],
			// Массив задач, назначенных текущему сотруднику
			tasks: [],
			// Исходный массив задач
			originTasks: [],
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
		ActionButton,
	},
	methods: {
		// Метод сортировки задач
		sortTasks() {
			switch (this.sortBy) {
				case "created_at":
					this.tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
					break;
				case "deadline":
					this.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
					break;
			}
		},
		reverseSortOrder() {
			this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";

			this.tasks.reverse();
		},
		// Метод фильтрации задач
		filterTasks() {
			let filteredTasks = this.originTasks.slice();

			if (this.filterBy !== null) {
				filteredTasks = filteredTasks.filter((task) => task.is_completed === this.filterBy);
			}

			if (this.filterCategory !== null) {
				filteredTasks = filteredTasks.filter((task) => task?.category === this.filterCategory);
			}

			this.tasks = filteredTasks;
			this.sortTasks();
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

		// Делаю исходную неизменённую копию массива задач
		this.originTasks = [...this.tasks];

		this.sortTasks();
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
