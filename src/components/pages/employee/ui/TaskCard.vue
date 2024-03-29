<template>
	<v-card
		class="bg-card_main"
		elevation="6"
	>
		<div>
			<div class="task-card__title">
				<div class="task-card__edge bg-secondary"></div>
				<div class="py-2 bg-card_header">
					<div class="task-card__title-wrapper">
						<v-card-title primary-title
							><div
								class="text-truncate"
								style="display: inline-block"
								>{{ task.title }}</div
							></v-card-title
						>

						<div
							class="task-card__circle-indicator rounded-circle mx-3"
							:style="{
								backgroundColor: task.color || 'white',
							}"
						></div>
					</div>
					<v-card-subtitle>Категория: {{ task.category ? category?.name : "Без категории" }}</v-card-subtitle>
					<v-card-subtitle :class="taskStatus.class">Статус: {{ taskStatus.text }}</v-card-subtitle>
				</div>
			</div>
			<v-card-text class="bg-card_body text-truncate">
				{{ task.description ? task.description : "Описания нет" }}
			</v-card-text>
		</div>
		<v-card-actions class="justify-end bg-card_footer">
			<v-row class="py-3">
				<div class="task-card__dates my-auto">
					<v-card-subtitle>Дедлайн: {{ task.deadline ? formatDate(task.deadline) : "Не установлен" }}</v-card-subtitle>
					<v-card-subtitle>Создана: {{ formatDate(task.created_at) }}</v-card-subtitle>
				</div>
				<v-spacer></v-spacer>
				<div class="px-3 ms-auto my-auto">
					<TaskDetailsDialog
						:task="task"
						v-bind="props"
					></TaskDetailsDialog>
					<v-tooltip
						:text="!task.is_completed ? 'Отметить как выполненную' : 'Отправить на доработку'"
						location="bottom"
					>
						<template v-slot:activator="{ props }">
							<v-btn
								class="rounded-lg"
								:class="{
									'task-card__done-button': !task.is_completed,
									'task-card__error-button': task.is_completed,
								}"
								:icon="!task.is_completed ? 'check' : 'close'"
								variant="flat"
								v-bind="props"
								@click="toggleTaskCompletion(task.id)"
							></v-btn
						></template>
					</v-tooltip>
				</div>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
// Сторонние библиотеки
import axios from "axios";
import moment from "moment";

// Компоненты
import TaskDetailsDialog from "./TaskDetailsDialog";

export default {
	components: {
		TaskDetailsDialog,
	},
	computed: {
		taskStatus() {
			const taskDeadline = moment(this.task.deadline);
			const today = moment().startOf("day");

			if (this.task.is_completed) {
				return { text: "Выполнена", class: "text-success" };
			} else if (taskDeadline.isBefore(today)) {
				return { text: "Просрочена", class: "text-error" };
			} else {
				return { text: "Не выполнена", class: "text-amber" };
			}
		},
	},
	props: {
		task: {
			type: Object,
			required: true,
		},
		category: {
			type: Object,
			required: false,
		},
	},
	methods: {
		formatDate(date) {
			return moment(date).format("LLL");
		},
		async toggleTaskCompletion(taskId) {
			await axios
				.post(`/api/v1/tasks/${taskId}/toggle_completion/`)
				.then((response) => {
					this.task.is_completed = !this.task.is_completed;
				})
				.catch((error) => {
					console.error(error);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.v-card:hover {
	transform: translateY(-10px);
	transition: transform 0.1s ease-out;
}

.v-card:not(:hover) {
	transform: translateY(0px);
	transition: transform 0.1s ease-out;
}

.task-card__edge {
	min-height: 6px;
}

.task-card__done-button {
	background-color: #00ac17;
}

.task-card__error-button {
	background-color: #ac0000;
}

.task-card__title-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.task-card__circle-indicator {
	$indicator-radius: 35px;

	min-height: $indicator-radius;
	min-width: $indicator-radius;
	max-height: $indicator-radius;
	max-width: $indicator-radius;

	border: 2px grey solid;
}
</style>
