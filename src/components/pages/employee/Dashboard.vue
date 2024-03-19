<template>
	<v-container>
		<v-container class="pa-5">
			<v-row>
				<dir class="text-h3">Приборная панель</dir>
			</v-row>
			<v-row>
				<dir class="text-h5">Общая информация</dir>
			</v-row>
		</v-container>

		<v-container class="pa-2">
			<v-expansion-panels
				multiple
				v-model="panel"
			>
				<v-expansion-panel>
					<v-expansion-panel-title><span class="text-h5">Задачи</span></v-expansion-panel-title>

					<v-expansion-panel-text class="py-3 bg-primary_color">
						<v-row>
							<v-col
								cols="12"
								sm="3"
							>
								<DashboardCardNew
									title="Всего задач"
									icon="task"
									color="red-darken-3"
									second_color="red-darken-4"
									>{{ totalTasks }}</DashboardCardNew
								>
							</v-col>

							<v-col
								cols="12"
								sm="3"
							>
								<DashboardCardNew
									title="Выполнено"
									icon="check"
									color="teal-darken-3"
									second_color="teal-darken-4"
									>{{ totalCompletedTasks }}</DashboardCardNew
								>
							</v-col>

							<v-col
								cols="12"
								sm="3"
							>
								<DashboardCardNew
									title="Не выполнено"
									icon="close"
									color="brown-darken-3"
									second_color="brown-darken-4"
									>{{ totalUncompletedTasks }}</DashboardCardNew
								>
							</v-col>

							<v-col
								cols="12"
								sm="3"
							>
								<DashboardCardNew
									title="Просрочено"
									icon="cancel"
									color="deep-orange-darken-3"
									second_color="deep-orange-darken-4"
									>{{ totalOverdueTasks }}</DashboardCardNew
								>
							</v-col>

							<v-col
								cols="12"
								sm="4"
							>
								<DashboardCardNew
									title="Дедлайн сегодня"
									icon="today"
									color="yellow-darken-3"
									second_color="yellow-darken-4"
									>{{ totalTodayTasks }}</DashboardCardNew
								>
							</v-col>

							<v-col
								cols="12"
								sm="4"
							>
								<DashboardCardNew
									title="Дедлайн завтра"
									icon="calendar_month"
									color="deep-orange-darken-3"
									second_color="deep-orange-darken-4"
									>{{ totalTomorrowTasks }}</DashboardCardNew
								>
							</v-col>

							<v-col
								cols="12"
								sm="4"
							>
								<DashboardCardNew
									title="Без дедлайна"
									icon="event_busy"
									color="grey-darken-2"
									second_color="grey-darken-3"
									>{{ totalNoDueDateTasks }}</DashboardCardNew
								>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel>
					<v-expansion-panel-title><span class="text-h5">Заметки</span></v-expansion-panel-title>

					<v-expansion-panel-text class="py-3 bg-primary_color">
						<v-row>
							<v-col
								v-for="card in notes_info"
								:key="card.title"
								cols="12"
								sm="6"
							>
								<DashboardCardNew
									:title="card.title"
									:icon="card.icon"
									:color="card.color"
									:second_color="card.second_color"
									>0</DashboardCardNew
								>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-container>
	</v-container>
</template>

<script>
// Сторонние библиотеки
import axios from "axios";
import moment from "moment";

// Компоненты
import DashboardCardNew from "@/components/ui/dashboard/DashboardCardNew";

export default {
	data: () => ({
		panel: [0, 1, 2],

		notes_info: [
			{
				title: "Заметок",
				icon: "description",
				color: "blue-darken-2",
				second_color: "blue-darken-3",
			},
			{
				title: "Дополнительная информация",
				icon: "link_off",
				color: "blue-darken-3",
				second_color: "blue-darken-4",
			},
		],

		tasks: [],
		isTasksLoading: true,
	}),
	components: {
		DashboardCardNew,
	},
	methods: {
		// Функция получения задач работника
		async fetchingTasks() {
			try {
				const response = await axios.get("/api/v1/tasks/assigned-to-me/");
				this.tasks = response.data;
			} catch (error) {
				console.log(error);
			} finally {
				this.isTasksLoading = false;
			}
		},
	},
	mounted() {
		this.fetchingTasks();
	},
	computed: {
		totalTasks() {
			return this.tasks.length;
		},
		totalOverdueTasks() {
			return this.tasks.filter((task) => {
				const taskDeadline = moment(task.deadline);
				const today = moment().startOf("day");

				return taskDeadline.isBefore(today) && !task.is_completed;
			}).length;
		},
		totalCompletedTasks() {
			return this.tasks.filter((task) => task.is_completed).length;
		},
		totalUncompletedTasks() {
			return this.tasks.filter((task) => !task.is_completed).length;
		},
		totalTodayTasks() {
			return this.tasks.filter((task) => {
				const taskDeadline = moment(task.deadline);
				const today = moment().startOf("day");

				return taskDeadline.isSame(today, "day");
			}).length;
		},
		totalTomorrowTasks() {
			return this.tasks.filter((task) => {
				const taskDeadline = moment(task.deadline);
				const tomorrow = moment().add(1, "days").startOf("day");

				return taskDeadline.isSame(tomorrow, "day");
			}).length;
		},
		totalNoDueDateTasks() {
			return this.tasks.filter((task) => {
				return !task.deadline;
			}).length;
		},
	},
};
</script>

<style lang="scss" scoped></style>
