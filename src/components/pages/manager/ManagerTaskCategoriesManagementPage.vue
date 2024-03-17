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
					<span class="text-h5">Список задач</span><br />
					<span>{{ categories.length ? `Всего категорий: ${categories.length}` : `` }}</span>
				</v-col>
			</v-row>
			<!-- <v-row>
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
			</v-row> -->
		</div>

		<!-- <div
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
		</div> -->

		<!-- <div
			v-if="!categories.length && !isTaskCategoriesLoading"
			class="text-center py-10"
		>
			<h3>Категории задач ещё не были созданы</h3>
		</div> -->

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
