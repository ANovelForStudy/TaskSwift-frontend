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
						<v-card-title primary-title>{{ task.title }}</v-card-title>

						<div
							class="task-card__circle-indicator rounded-circle mx-3"
							:style="{
								backgroundColor: task.color || 'white',
							}"
						></div>
					</div>
					<v-card-subtitle>Категория: {{ task.category ? category?.name : "Без категории" }}</v-card-subtitle>
					<v-card-subtitle>Статус: {{ task.is_completed ? "Выполнена" : "Не выполнена" }}</v-card-subtitle>
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
					<v-card-subtitle>Изменена: {{ formatDate(task.updated_at) }}</v-card-subtitle>
				</div>
				<v-spacer></v-spacer>
				<div class="px-3 ms-auto my-auto">
					<EmployeeTaskDetailViewDialog
						:task="task"
						v-bind="props"
					></EmployeeTaskDetailViewDialog>
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
import axios from "axios";
import moment from "moment";
import EmployeeTaskDetailViewDialog from "./EmployeeTaskDetailViewDialog";

export default {
	components: {
		EmployeeTaskDetailViewDialog,
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

					this.$emit("filterTasks");
				})
				.catch((error) => {
					console.error(error);
				});
		},
	},
	created() {
		console.log(this.category);
	},
	computed: {},
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
