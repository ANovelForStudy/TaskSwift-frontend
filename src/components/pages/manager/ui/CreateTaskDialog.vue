<template>
	<v-dialog
		max-width="850"
		style="background: #000000aa"
		transition="dialog-bottom-transition"
		v-model="isDialogOpen"
	>
		<template v-slot:activator="{ props: activatorProps }">
			<ActionButton
				icon="add_task"
				v-bind="activatorProps"
				>Добавить новую задачу</ActionButton
			>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card
				class="bg-card_main"
				style="ma-0"
				><v-card-title class="text-center py-5">Создание задачи</v-card-title>
				<v-card-text>
					<v-form
						ref="createTaskForm"
						@submit.prevent="createTask"
					>
						<v-container>
							<v-text-field
								v-model="task.title"
								label="Название задачи"
								:rules="[taskTitleLengthValidation]"
								variant="outlined"
								prepend-icon="title"
								color="accent"
								class="mb-2"
								required
							></v-text-field>

							<v-textarea
								v-model="task.description"
								label="Описание задачи"
								prepend-icon="edit"
								variant="outlined"
								color="accent"
								class="mb-2"
								rows="3"
							></v-textarea>

							<v-row>
								<v-col>
									<v-select
										v-model="task.category"
										:items="categories"
										item-title="name"
										item-value="id"
										label="Категория"
										prepend-icon="book"
										variant="outlined"
										class="mb-2"
										color="accent"
									></v-select>
								</v-col>
								<v-col>
									<v-select
										v-model="task.assigned_to"
										:items="formattedEmployees"
										label="Исполнитель"
										prepend-icon="person"
										variant="outlined"
										class="mb-2"
										color="accent"
									></v-select>
								</v-col>
							</v-row>

							<v-container class="pa-0">
								<v-row>
									<v-col>
										<v-container>
											<v-color-picker
												class="mx-auto rounded-0"
												v-model="task.color"
												elevation="0"
												label="Выбор цвета карточки"
												mode="hex"
												hide-inputs
												show-swatches
												:swatches="swatches"
												:swatches-max-height="80"
											></v-color-picker>
										</v-container>

										<v-text-field
											v-model="task.color"
											label="Цвет"
											variant="outlined"
											prepend-icon="palette"
											readonly
											color="accent"
											hint="Только для чтения"
										></v-text-field>
									</v-col>
									<v-col
										><v-container>
											<v-date-picker
												v-model="task.deadline"
												label="Дедлайн"
												color="accent"
												class="mb-2"
												dense
											></v-date-picker>
										</v-container>

										<v-text-field
											v-model="formattedDeadline"
											label="Дедлайн"
											variant="outlined"
											prepend-icon="local_fire_department"
											color="accent"
											class="mb-2"
											hint="В формате ГГГГ-ММ-ДД"
											readonly
										></v-text-field
									></v-col>
								</v-row>
							</v-container>
						</v-container>
						<v-row>
							<v-col>
								<v-btn
									color="error"
									class="pa-7 my-2"
									variant="tonal"
									block
									@click="isActive.value = false"
									>Выйти без сохранения</v-btn
								>
							</v-col>
							<v-spacer></v-spacer>
							<v-col>
								<v-btn
									color="accent"
									class="pa-7 my-2"
									variant="tonal"
									block
									type="submit"
									:loading="isRequestProcessing"
									>Создать задачу</v-btn
								>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
			</v-card>
		</template>
	</v-dialog>
</template>

<script>
import moment from "moment";
// Получение данных
import getManagerEmployees from "@/hooks/manager/getManagerEmployees";

// Создание задач
import useCreateTask from "@/hooks/manager/useCreateTask";

// Компоненты
import ActionButton from "@/components/ui/ActionButton";

export default {
	data: () => ({
		swatches: [
			["#F44336", "#673AB7", "#9C27B0"],
			["#E91E63", "#3F51B5", "#2196F3"],
			["#FF5722", "#00BCD4", "#009688"],
			["#FF9800", "#8BC34A", "#CDDC39"],
			["#FFEB3B", "#FFC107", "#03A9F4"],
			["#4CAF50", "#795548", "#607D8B"],
			["#9E9E9E", "#FFFFFF", "#C6FF00"],
		],
	}),
	props: {
		categories: {
			type: Array,
			required: true,
		},
		employees: {
			type: Array,
			required: true,
		},
	},
	setup(props, context) {
		const { task, createTask, isRequestProcessing, isDialogOpen } = useCreateTask(context.emit);

		return {
			task,
			createTask,
			isRequestProcessing,
			isDialogOpen,
		};
	},
	components: {
		ActionButton,
	},
	computed: {
		formattedEmployees() {
			return this.employees.map((employee) => ({
				title: `${employee.last_name || ""} ${employee.first_name || ""} ${employee.middle_name || ""} - ${employee.email}`,
				value: employee.id,
			}));
		},
		formattedDeadline() {
			if (this.task.deadline) {
				return moment(this.task.deadline).format("YYYY-MM-DD");
			}
			return "";
		},
	},
	methods: {
		taskTitleLengthValidation(value) {
			return this.task.title !== "" || "Название обязательно";
		},
	},
};
</script>
