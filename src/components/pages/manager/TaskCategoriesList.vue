<template>
	<v-container>
		<div class="py-3">
			<dir class="text-h3">Управление задачами</dir>
			<dir class="text-h5">Действия</dir>
		</div>
		<v-row class="py-5">
			<v-list-item>
				<CreateTaskCategoryDialog @createTaskCategory="createTaskCategory"></CreateTaskCategoryDialog>
			</v-list-item>
		</v-row>
		<div class="py-5">
			<v-row>
				<v-col>
					<span class="text-h5">Список категорий</span><br />
					<span>{{ taskCategories.length ? `Всего категорий: ${taskCategories.length}` : `` }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					sm="12"
					md="6"
				>
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
				<v-col
					sm="12"
					md="6"
				>
					<v-text-field
						v-model="searchQuery"
						label="Поиск"
						class="mb-2"
						prepend-inner-icon="search"
						variant="outlined"
						color="accent"
						clearable
					></v-text-field
				></v-col>
			</v-row>
		</div>

		<div
			class="loader-progress-circular"
			v-if="isTaskCategoriesLoading"
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
			v-if="!taskCategories.length && !isTaskCategoriesLoading"
			class="text-center py-10"
		>
			<h3>Категории задач ещё не были созданы</h3>
		</div>

		<v-row>
			<transition-group name="list">
				<v-col
					sm="6"
					lg="4"
					xxl="3"
					v-for="category in sortedTaskCategories"
					:key="category.id"
				>
					<TaskCategoryCard
						:category="category"
						@deleteCategory="deleteCategory"
					></TaskCategoryCard>
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
// Испорт сторонних библиотек
import axios from "axios";

// Получение данных
import getTaskCategories from "@/hooks/common/tasks/getTaskCategories";

// Сортировка
import useSortedTaskCategories from "@/hooks/common/task_categories/useSortedTaskCategories";

// Поиск задач
import useSearch from "@/hooks/common/useSearch";
import useTaskCategoriesSearch from "@/hooks/common/task_categories/useTaskCategoriesSearch";

// Компоненты
import CreateTaskCategoryDialog from "@/components/pages/manager/ui/CreateTaskCategoryDialog";
import TaskCategoryCard from "./ui/TaskCategoryCard";

export default {
	data() {
		return {
			// Уведомление снизу об успешном создании задачи
			snackbar: false,
			snackbar_text: "",
		};
	},
	setup() {
		// Получение данных
		const { taskCategories, isTaskCategoriesLoading } = getTaskCategories();

		// Поиск задач
		const { searchedTaskCategories, searchQuery } = useTaskCategoriesSearch(taskCategories);

		// Сортировка задач
		const { selectedSortOption, sortOptions, sortedTaskCategories, toggleSortDirection, isSortAscending } =
			useSortedTaskCategories(searchedTaskCategories);

		return {
			// Данные
			taskCategories,

			// Состояние загрузки данных
			isTaskCategoriesLoading,

			// Сортировка
			selectedSortOption,
			sortOptions,
			sortedTaskCategories,
			toggleSortDirection,
			isSortAscending,

			// Поиск
			searchQuery,
			searchedTaskCategories,
		};
	},
	components: {
		CreateTaskCategoryDialog,
		TaskCategoryCard,
	},
	methods: {
		async deleteCategory(categoryId) {
			await axios
				.delete(`api/v1/tasks/categories/${categoryId}/`)
				.then((response) => {
					this.taskCategories = this.taskCategories.filter((category) => category.id !== categoryId);

					this.snackbar_text = "Категория успешно удалена!";
					this.snackbar = true;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		createTaskCategory(category) {
			this.taskCategories.push(category);

			this.snackbar_text = "Категория успешно создана!";
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
