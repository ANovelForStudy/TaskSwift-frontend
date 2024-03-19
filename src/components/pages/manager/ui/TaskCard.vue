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
						<v-card-title
							class="text-truncate"
							primary-title
							>{{ task.title }}</v-card-title
						>

						<div
							class="task-card__circle-indicator rounded-circle mx-3"
							:style="{
								backgroundColor: task.color || 'white',
							}"
						></div>
					</div>
					<v-card-subtitle>Категория: {{ task.category ? category?.name : "Без категории" }}</v-card-subtitle>
					<v-card-subtitle>Исполнитель: {{ getEmployeeNameById(task.assigned_to) }}</v-card-subtitle>
					<v-card-subtitle :class="task.is_completed ? 'text-success' : 'text-amber'"
						>Статус: {{ task.is_completed ? "Завершена" : "Не завершена" }}</v-card-subtitle
					>
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
					<TaskDetailsDialog
						:task="task"
						:employees="employees"
						v-bind="props"
					></TaskDetailsDialog>

					<v-tooltip
						text="Изменить"
						location="bottom"
					>
						<template v-slot:activator="{ props }">
							<v-btn
								class="rounded-lg"
								icon="edit"
								variant="flat"
								v-bind="props"
							></v-btn
						></template> </v-tooltip
					><v-tooltip
						text="Удалить"
						location="bottom"
					>
						<template v-slot:activator="{ props }"
							><v-btn
								class="rounded-lg task-card__delete-button"
								icon="delete"
								variant="flat"
								@click="$emit('deleteTask', task.id)"
								v-bind="props"
							></v-btn
						></template>
					</v-tooltip>
				</div>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
import moment from "moment";

// Компоненты
import TaskDetailsDialog from "@/components/pages/manager/ui/TaskDetailsDialog";

export default {
	components: {
		TaskDetailsDialog,
	},
	props: {
		task: {
			type: Object,
			required: true,
		},
		employees: {
			type: Array,
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
		getEmployeeNameById(employeeId) {
			const employee = this.employees.find((employee) => employee.id === employeeId);
			return employee ? `${employee.first_name} ${employee.last_name} - ${employee.email}` : "Не назначен";
		},
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

.task-card__delete-button {
	background-color: #aa0000;
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
