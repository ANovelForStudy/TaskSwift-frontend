<template>
	<v-dialog
		max-width="850"
		style="background: #000000aa"
	>
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn
				class="rounded-lg"
				v-bind="activatorProps"
				icon="visibility"
				variant="flat"
			></v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card
				class="bg-card_main"
				style="ma-0"
			>
				<v-card-title class="text-center py-5">Детальный вид</v-card-title>
				<v-card-text>
					<v-form>
						<v-container>
							<v-text-field
								v-model="task.title"
								label="Название задачи"
								:rules="[taskTitleLengthValidation]"
								readonly
								variant="outlined"
								prepend-icon="title"
								color="accent"
								class="mb-2"
								required
							></v-text-field>

							<v-textarea
								v-model="task.description"
								label="Описание задачи"
								readonly
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
										readonly
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
										:items="employeeItems"
										readonly
										label="Исполнитель"
										prepend-icon="person"
										variant="outlined"
										class="mb-2"
										color="accent"
									></v-select>
								</v-col>
							</v-row>

							<v-text-field
								v-model="deadlineDate"
								readonly
								label="Дедлайн"
								:rules="[taskDeadlineFormatValidation]"
								variant="outlined"
								prepend-icon="local_fire_department"
								color="accent"
								class="mb-2"
								hint="В формате ГГГГ-ММ-ДД"
							></v-text-field>

							<v-container class="pa-0">
								<v-row>
									<v-col>
										<v-container>
											<v-color-picker
												class="mx-auto"
												v-model="task.color"
												elevation="0"
												label="Выбор цвета карточки"
												mode="hex"
												hide-inputs
												hide-swatches
												disabled
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
									<v-col> </v-col>
								</v-row>
							</v-container>
						</v-container>
						<v-btn
							color="error"
							class="pa-7 my-2"
							variant="tonal"
							block
							@click="isActive.value = false"
							>Выйти</v-btn
						>
					</v-form>
				</v-card-text>
			</v-card>
		</template>
	</v-dialog>
</template>

<script>
import moment from "moment";

export default {
	data: () => ({}),
	props: {
		task: {
			type: Object,
			required: true,
		},
		employees: {
			type: Array,
			required: true,
		},
	},
	computed: {
		employeeItems() {
			return this.employees.map((employee) => ({
				title: `${employee.last_name || ""} ${employee.first_name || ""} ${employee.middle_name || ""} - ${employee.email}`,
				value: employee.id,
			}));
		},
		deadlineDate() {
			return this.task.deadline ? this.formatDate(this.task.deadline) : "Не установлен";
		},
	},
	methods: {
		formatDate(date) {
			return moment(date).format("LLL");
		},
	},
};
</script>
