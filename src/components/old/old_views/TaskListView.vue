<template>
	<section class="section">
		<h1 class="title">Список задач</h1>
		<h3 class="subtitle">Управление задачами</h3>
		<div class="field is-grouped is-grouped-multiline">
			<div class="control">
				<router-link
					to="/create-task"
					class="button is-primary is-fullwidth"
				>
					Создать задачу
				</router-link>
			</div>
			<div class="control">
				<router-link
					to="/create-task-category"
					class="button is-primary is-fullwidth"
				>
					Создать категорию задачи
				</router-link>
			</div>
			<div class="control">
				<router-link
					to="/assign-task"
					class="button is-primary is-fullwidth"
				>
					Назначить задачу
				</router-link>
			</div>
		</div>
		<h3 class="subtitle">Все задачи</h3>
		<div class="field has-addons">
			<div class="control">
				<div class="select is-halfwidth is-rounded">
					<select v-model="selectedCategory">
						<option value="" disabled>Все категории</option>
						<hr />
						<option
							v-for="category in categories"
							:key="category.id"
							:value="category.id"
						>
							{{ category.name }}
						</option>
					</select>
				</div>
			</div>
			<div class="control">
				<div class="select is-halfwidth is-rounded">
					<select v-model="selectedCategory">
						<option value="" disabled>Все категории</option>
						<hr />
						<option
							v-for="category in categories"
							:key="category.id"
							:value="category.id"
						>
							{{ category.name }}
						</option>
					</select>
				</div>
			</div>
			<div class="control">
				<div class="select is-halfwidth is-rounded">
					<select v-model="selectedCategory">
						<option value="">Все категории</option>
						<hr />
						<option
							v-for="category in categories"
							:key="category.id"
							:value="category.id"
						>
							{{ category.name }}
						</option>
					</select>
				</div>
			</div>
			<div class="control">
				<div class="is-fullwidth">
					<input
						class="input is-rounded"
						type="text"
						placeholder="Поиск..."
						v-model="searchQuery"
					/>
				</div>
			</div>
		</div>
		<!-- <table class="table is-bordered is-fullwidth">
			<thead>
				<tr>
					<th>Название</th>
					<th>Описание</th>
					<th>Категория</th>
					<th>Приоритет</th>
					<th>Исполнитель</th>
					<th>Дедлайн</th>
					<th>Создано</th>
					<th>Обновлено</th>
					<th class="is-narrow">Действия</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="task in sortedTasks" :key="task.id">
					<td>{{ task.title }}</td>
					<td>{{ task.description }}</td>
					<td v-if="task.category">
						{{ task.category.name || "Отсутствует" }}
					</td>
					<td>{{ task.priority }}</td>
					<td v-if="task.assigned_to">
						{{ task.assigned_to.username || "Отсутствует" }}
					</td>
					<td>{{ task.deadline || "Отсутствует" }}</td>
					<td>{{ task.created_at }}</td>
					<td>{{ task.updated_at }}</td>
					<td class="has-text-centered">
						<router-link
							:to="`/edit-task/${task.id}`"
							class="button is-small is-info"
						>
							<i class="material-icons">edit</i>
						</router-link>
						<a
							@click="deleteTask(task.id)"
							class="button is-small is-danger"
						>
							<i class="material-icons">delete</i>
						</a>
					</td>
				</tr>
			</tbody>
		</table> -->

		<div
			class="columns is-multiline is-mobile is-variable is-4-desktop is-3-tablet is-2-mobile"
		>
			<TaskCardComponent
				v-for="task in tasks"
				:key="task.id"
				:task="task"
			/>
		</div>
	</section>
</template>

<script>
import axios from "axios";
import TaskCardComponent from "@/components/UI/Tasks/TaskCardComponent";

export default {
	name: "TaskListView",
	data() {
		return {
			categories: [],
			tasks: [],
			selectedCategory: "",
			searchQuery: "",
			plug: "-",
		};
	},
	components: { TaskCardComponent },
	computed: {
		filteredTasks() {
			return this.tasks.filter((task) => {
				return (
					(this.selectedCategory === "" ||
						task.category.id === this.selectedCategory) &&
					task.title
						.toLowerCase()
						.includes(this.searchQuery.toLowerCase())
				);
			});
		},
		sortedTasks() {
			return this.filteredTasks.sort((a, b) => {
				if (a.category && b.category) {
					if (a.category.id === b.category.id) {
						return a.title.localeCompare(b.title);
					}
					return a.category.id - b.category.id;
				}
				if (a.category) {
					return -1;
				}
				if (b.category) {
					return 1;
				}
				return a.title.localeCompare(b.title);
			});
		},
	},
	methods: {
		async deleteTask(taskId) {
			try {
				await axios.delete(
					`http://localhost:8000/api/v1/tasks/${taskId}/`
				);
				this.tasks = this.tasks.filter((task) => task.id !== taskId);
			} catch (error) {
				console.error(error);
			}
		},
	},
	async created() {
		const responseCategories = await axios.get(
			"http://localhost:8000/api/v1/tasks/categories/"
		);
		this.categories = responseCategories.data;

		const responseTasks = await axios.get(
			"http://localhost:8000/api/v1/tasks/"
		);
		this.tasks = responseTasks.data.map((task) => ({
			...task,
			category: task.category || { name: this.plug },
			assigned_to: task.assigned_to || { username: this.plug },
		}));
	},
};
</script>

<style lang="scss" scoped>
.control > .button {
	background: var(--primary);
	color: var(--light);
}
</style>
