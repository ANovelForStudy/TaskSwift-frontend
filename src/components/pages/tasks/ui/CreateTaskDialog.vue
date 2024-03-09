<template>
	<v-dialog
		max-width="850"
		style="background: #000000aa"
		transition="dialog-bottom-transition"
		v-model="dialog"
	>
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn
				v-bind="activatorProps"
				class="rounded-xl"
				prepend-icon="add_task"
				variant="tonal"
				color="accent"
				>Добавить новую задачу</v-btn
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
						@submit.prevent="submitTask"
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
										:items="users"
										item-title="name"
										item-value="id"
										label="Исполнитель"
										prepend-icon="person"
										variant="outlined"
										class="mb-2"
										color="accent"
									></v-select>
								</v-col>
							</v-row>

							<v-text-field
								v-model="task.deadline"
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
									:loading="loading"
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
import axios from "axios";

export default {
	data: () => ({
		task: {
			title: "",
			description: "",
			category: null,
			assigned_to: null,
			priority: "U",
			deadline: null,
			color: "#FFFFFF",
		},
		users: [],
		loading: false,
		dialog: false,
	}),
	props: {
		categories: {
			type: Array,
			required: true,
		},
	},
	methods: {
		taskDeadlineFormatValidation(value) {
			const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

			if (value === "" || value === null || dateRegex.test(value)) {
				return true; // значение пустое или в правильном формате
			} else {
				return "Неправильный формат даты (ГГГГ-ММ-ДД)";
			}
		},
		taskTitleLengthValidation(value) {
			return this.task.title !== "" || "Название обязательно";
		},
		async submitTask() {
			if (this.task.title === "") {
				return;
			}

			const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
			if ((!dateRegex.test(this.task.deadline) && !this.task.deadline === "") || !this.task.deadline === null) {
				return;
			}

			if (this.task.deadline === "") {
				this.task.deadline = null;
			}

			console.log("[INFO]: Создание задачи");

			this.loading = true;

			await axios
				.post("/api/v1/tasks/", this.task)
				.then((response) => {
					this.$emit("createTask", response.data);

					this.task = {
						title: "",
						description: "",
						category: null,
						assigned_to: null,
						priority: "U",
						deadline: null,
						color: "#FFFFFF",
					};

					this.dialog = false;
				})
				.finally(() => {
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
