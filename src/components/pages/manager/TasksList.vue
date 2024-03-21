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
			<v-list-item
				><ActionButton
					:to="{ name: 'TaskCategories' }"
					icon="category"
					>Управление категориями задач</ActionButton
				></v-list-item
			>
		</v-row>
		<div class="py-5">
			<v-row>
				<v-col>
					<span class="text-h5">Список задач</span><br />
					<span
						>{{ tasks.length ? `Всего задач: ${tasks.length}` : `` }}
						{{ tasks.length !== sortedTasks.length ? `| Задачи согласно фильтрам: ${sortedTasks.length}` : `` }}</span
					>
				</v-col>
			</v-row>
			<v-row>
				<v-col lg="2">
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
				<v-col lg="2"
					><v-select
						v-model="selectedStatusFilterOption"
						:items="statusFilterOptions"
						label="Фильтрация по выполнению"
						item-title="label"
						item-value="value"
						prepend-inner-icon="filter_alt"
						variant="outlined"
						color="accent"
					></v-select
				></v-col>
				<v-col lg="2"
					><v-select
						v-model="selectedExecutorFilterOption"
						:items="executorFilterOptions"
						label="Фильтрация по исполнителю"
						item-title="label"
						item-value="value"
						prepend-inner-icon="person"
						variant="outlined"
						color="accent"
					></v-select
				></v-col>
				<v-col lg="2"
					><v-select
						v-model="selectedDeadlineFilterOption"
						:items="deadlineFilterOptions"
						label="Фильтрация по дедлайну"
						item-title="label"
						item-value="value"
						prepend-inner-icon="local_fire_department"
						variant="outlined"
						color="accent"
					></v-select
				></v-col>
				<v-col lg="2"
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
				><v-col lg="2">
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
					<TaskCard
						:task="task"
						:employees="employees"
						:category="taskCategories.find((cat) => cat.id === task.category)"
						@deleteTask="deleteTask"
					></TaskCard>
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

// Получение данных
import getManagerTasks from "@/hooks/manager/getManagerTasks";
import getTaskCategories from "@/hooks/common/tasks/getTaskCategories";
import getManagerEmployees from "@/hooks/manager/getManagerEmployees";

// Сортировка
import useSortedTasks from "@/hooks/common/tasks/useSortedTasks";

// Фильтрация задач по статусу
import useStatusFilteredTasks from "@/hooks/common/tasks/useStatusFilteredTasks";

// Фильтрация задач по дедлайну
import useDeadlineFilteredTasks from "@/hooks/common/tasks/useDeadlineFilteredTasks";

// Фильтрация по категории
import useCategoryFilteredTasks from "@/hooks/common/tasks/useCategoryFilteredTasks";

// Фильтрация по наличию исполнителя
import useExecutorFilteredTasks from "@/hooks/common/tasks/useExecutorFilteredTasks";

// Поиск задач
import useSearch from "@/hooks/common/useSearch";

// Компоненты
import TaskCard from "@/components/pages/manager/ui/TaskCard";
import CreateTaskDialog from "@/components/pages/manager/ui/CreateTaskDialog";
import CreateTaskCategoryDialog from "@/components/pages/manager/ui/CreateTaskCategoryDialog";

// UI
import ActionButton from "@/components/ui/ActionButton";

export default {
	data() {
		return {
			// Уведомление снизу об успешном создании задачи
			snackbar: false,
			snackbar_text: "",
		};
	},
	setup(props) {
		// Получение данных из API
		const { employees } = getManagerEmployees();
		const { taskCategories } = getTaskCategories();
		const { tasks, isTasksLoading } = getManagerTasks();

		// Обработка идёт цепочкой - сначала фильтрация по статусу,
		// затем по дедлайну, после этого по категории,
		// после этого выполняется поиск и лишь затем сортировка

		// Фильтрация задач по статусу
		const { statusFilterOptions, selectedStatusFilterOption, statusFilteredTasks } = useStatusFilteredTasks(tasks);

		// Фильтрация задач по дедлайну
		const { selectedDeadlineFilterOption, deadlineFilterOptions, deadlineFilteredTasks } = useDeadlineFilteredTasks(statusFilteredTasks);

		// Фильтрация задач по наличию исполнителя
		const { selectedExecutorFilterOption, executorFilterOptions, executorFilteredTasks } = useExecutorFilteredTasks(deadlineFilteredTasks);

		// Фильтрация задач по категории
		const { selectedFilterCategory, categoryFilteredTasks } = useCategoryFilteredTasks(executorFilteredTasks);

		// Поиск задач
		const { searchedItems, searchQuery } = useSearch(categoryFilteredTasks);

		// Сортировка задач
		const { selectedSortOption, sortOptions, sortedTasks, toggleSortDirection, isSortAscending } = useSortedTasks(searchedItems);

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
			selectedStatusFilterOption,
			statusFilteredTasks,

			// Фильтрация по дедлайну
			selectedDeadlineFilterOption,
			deadlineFilterOptions,
			deadlineFilteredTasks,

			// Фильтрация по наличию исполнителя
			selectedExecutorFilterOption,
			executorFilterOptions,
			executorFilteredTasks,

			// Фильтрация по категории
			selectedFilterCategory,
			categoryFilteredTasks,

			// Поиск
			searchedItems,
			searchQuery,
		};
	},
	components: {
		TaskCard,
		CreateTaskDialog,
		CreateTaskCategoryDialog,
		ActionButton,
	},
	methods: {
		async deleteTask(taskId) {
			await axios
				.delete(`api/v1/tasks/${taskId}/`)
				.then((response) => {
					this.tasks = this.tasks.filter((task) => task.id !== taskId);

					this.snackbar_text = "Задача успешно удалена!";
					this.snackbar = true;
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
