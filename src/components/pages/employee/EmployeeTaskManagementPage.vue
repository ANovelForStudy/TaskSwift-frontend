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
			<h3>Нет назначенных задач</h3>
		</div>

		<v-row>
			<transition-group name="list">
				<v-col
					sm="4"
					v-for="task in sortedTasks"
					:key="task.id"
				>
					<EmployeeTaskCardComponent
						:task="task"
						:category="taskCategories.find((cat) => cat.id === task.category)"
					></EmployeeTaskCardComponent> </v-col
			></transition-group>
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

import useSortedTasks from "@/hooks/common/tasks/useSortedTasks";
import getEmployeeTasks from "@/hooks/employee/getEmployeeTasks";
import getTaskCategories from "@/hooks/common/tasks/getTaskCategories";
import useStatusFilteredTasks from "@/hooks/common/tasks/useStatusFilteredTasks";
import useCategoryFilteredTasks from "@/hooks/common/tasks/useCategoryFilteredTasks";
import useSearch from "@/hooks/common/useSearch";

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
		const { taskCategories } = getTaskCategories();
		const { tasks, isTasksLoading } = getEmployeeTasks();

		// Фильтрация задач по статусу
		const { statusFilterOptions, selectedFilterOption, statusFilteredTasks } = useStatusFilteredTasks(tasks);

		// Фильтрация задач по категории
		const { selectedFilterCategory, categoryFilteredTasks } = useCategoryFilteredTasks(statusFilteredTasks);

		// Поиск задач
		const { searchedItems, searchQuery } = useSearch(categoryFilteredTasks);

		// Сортировка задач
		const { selectedSortOption, sortOptions, sortedTasks, toggleSortDirection, isSortAscending } = useSortedTasks(searchedItems);

		return {
			// Данные
			tasks,
			taskCategories,

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
			searchedItems,
			searchQuery,
		};
	},
	components: {
		EmployeeTaskCardComponent,
		ActionButton,
	},
	methods: {},
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
