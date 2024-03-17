<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление задачами</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item
				><CreateTaskDialog
					:categories="taskCategories"
					@createTask="createTask"
				></CreateTaskDialog
			></v-list-item>
			<v-list-item>
				<CreateTaskCategoryDialog @createTaskCategory="createTaskCategory"></CreateTaskCategoryDialog>
			</v-list-item>
		</v-row>
		<div class="py-5">
			<v-row>
				<v-col>
					<span class="text-h5">Список задач</span><br />
					<span>{{ tasks.length ? `Всего задач: ${tasks.length}` : `` }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col lg="3">
					<v-select
						v-model="selectedSortOption"
						:items="sortOptions"
						label="Сортировка"
						item-title="label"
						item-value="value"
						prepend-inner-icon="sort_by_alpha"
						variant="outlined"
						color="accent"
					></v-select>
					<v-btn
						class="rounded-xl"
						variant="tonal"
						color="accent"
						@click="toggleSortDirection"
					>
						{{ isSortAscending ? "По возрастанию" : "По убыванию" }}
						<template v-slot:prepend>
							<v-icon>{{ isSortAscending ? "expand_less" : "expand_more" }}</v-icon>
						</template>
					</v-btn>
				</v-col>
				<v-col lg="3"
					><v-select
						v-model="selectedFilterOption"
						:items="statusFilterOptions"
						label="Фильтрация по статусу"
						item-title="label"
						item-value="value"
						prepend-inner-icon="filter_alt"
						variant="outlined"
						color="accent"
					></v-select
				></v-col>
				<v-col lg="3"
					><v-select
						v-model="selectedFilterCategory"
						:items="[{ name: 'Все категории', id: 'all' }, { name: 'Без категории', id: null }, ...taskCategories]"
						item-title="name"
						item-value="id"
						label="Фильтрация по категории"
						prepend-inner-icon="bookmarks"
						variant="outlined"
						color="accent"
					></v-select></v-col
				><v-col lg="3">
					<v-text-field
						v-model="searchQuery"
						label="Поиск"
						class="mb-2"
						prepend-inner-icon="search"
						variant="outlined"
						color="accent"
					></v-text-field
				></v-col>
			</v-row>
		</div>
		<div
			class="loader-progress-circular"
			v-if="isTasksLoading"
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
			v-if="!tasks.length && !isTasksLoading"
			class="text-center py-10"
		>
			<h3>Задачи ещё не были созданы</h3>
		</div>
		<v-row>
			<transition-group name="list">
				<v-col
					sm="4"
					v-for="task in sortedTasks"
					:key="task.id"
				>
					<ManagerTaskCardComponent
						:task="task"
						:employees="employees"
						:category="taskCategories.find((cat) => cat.id === task.category)"
						@deleteTask="deleteTask"
					></ManagerTaskCardComponent>
				</v-col>
			</transition-group>
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

import ManagerTaskCardComponent from "@/components/pages/manager/ui/ManagerTaskCardComponent";
import CreateTaskDialog from "@/components/pages/manager/ui/CreateTaskDialog";
import CreateTaskCategoryDialog from "@/components/pages/manager/ui/CreateTaskCategoryDialog";

import useSortedTasks from "@/hooks/common/useSortedTasks";
import getManagerTasks from "@/hooks/manager/getManagerTasks";
import getManagerEmployees from "@/hooks/manager/getManagerEmployees";
import getManagerTaskCategories from "@/hooks/manager/getManagerTaskCategories";
import useStatusFilteredTasks from "@/hooks/common/useStatusFilteredTasks";
import useCategoryFilteredTasks from "@/hooks/common/useCategoryFilteredTasks";
import useSearchTasks from "@/hooks/common/useSearchTasks";

export default {
	data() {
		return {
			// searchQuery: "",
			// plug: "-",

			// Уведомление снизу об успешном создании задачи
			snackbar: false,
			snackbar_text: "",
		};
	},
	setup(props) {
		// Получение данных из API
		const { employees } = getManagerEmployees();
		const { taskCategories } = getManagerTaskCategories();
		const { tasks, isTasksLoading } = getManagerTasks();

		// Фильтрация задач по статусу
		const { statusFilterOptions, selectedFilterOption, statusFilteredTasks } = useStatusFilteredTasks(tasks);

		// Фильтрация задач по категории
		const { selectedFilterCategory, categoryFilteredTasks } = useCategoryFilteredTasks(statusFilteredTasks);

		// Поиск задач
		const { searchedTasks, searchQuery } = useSearchTasks(categoryFilteredTasks);

		// Сортировка задач
		const { selectedSortOption, sortOptions, sortedTasks, toggleSortDirection, isSortAscending } = useSortedTasks(searchedTasks);

		return {
			// Данные
			tasks,
			taskCategories,
			employees,

			// Состояние загрузки данных
			isTasksLoading,

			// Сортировка
			selectedSortOption,
			sortOptions,
			sortedTasks,
			toggleSortDirection,
			isSortAscending,

			// Фильтрация по статусу
			statusFilterOptions,
			selectedFilterOption,
			statusFilteredTasks,

			// Фильтрация по категории
			selectedFilterCategory,
			categoryFilteredTasks,

			// Поиск
			searchedTasks,
			searchQuery,
		};
	},
	components: {
		ManagerTaskCardComponent,
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
			this.taskCategories.push(category);

			this.snackbar_text = "Категория задач успешно создана!";
			this.snackbar = true;
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

.list-enter-active,
.list-leave-active {
	transition: all 0.23s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
