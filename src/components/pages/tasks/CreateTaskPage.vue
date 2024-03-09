<template>
	<v-container class="pa-10">
		<v-card
			class="bg-card_main"
			elevation="8">
			<v-card-title class="headline text-center"
				>Создание задачи</v-card-title
			>
			<v-card-text>
				<v-form
					ref="createTaskForm"
					@submit.prevent="submitTask">
					<v-container>
						<v-text-field
							v-model="task.title"
							label="Название задачи"
							variant="outlined"
							prepend-icon="title"
							color="accent"
							required></v-text-field>

						<v-textarea
							v-model="task.description"
							label="Описание задачи"
							prepend-icon="edit"
							variant="outlined"
							color="accent"
							rows="3"></v-textarea>

						<v-select
							v-model="task.assigned_to"
							:items="users"
							item-text="name"
							item-value="id"
							label="Исполнитель"
							prepend-icon="person"
							variant="outlined"
							color="accent"></v-select>

						<!-- <v-menu
							v-model="isMenuOpen"
							:close-on-content-click="false">
							<template v-slot:activator="{ props }">
								<v-text-field
									readonly
									prepend-icon="local_fire_department"
									label="Дедлайн"
									variant="outlined"
									color="accent"
									v-bind="props"
									hide-details></v-text-field>
							</template>
							<v-date-picker
								hide-header
								title="">
								<template></template>
							</v-date-picker>
						</v-menu> -->

						<v-text-field
							v-model="task.deadline"
							label="Дедлайн"
							:rules="[dateValidation]"
							variant="outlined"
							prepend-icon="local_fire_department"
							color="accent"
							hint="В формате ГГГГ-ММ-ДД"></v-text-field>

						<v-container class="pa-0">
							<v-row>
								<v-col>
									<v-container class="">
										<v-color-picker
											class="mx-auto"
											v-model="task.color"
											elevation="0"
											label="Выбор цвета карточки"
											mode="hex"
											hide-inputs
											hide-swatches
											:swatches-max-height="
												80
											"></v-color-picker>
									</v-container>

									<v-text-field
										v-model="task.color"
										label="Цвет"
										variant="outlined"
										prepend-icon="palette"
										readonly
										color="accent"
										hint="Только для чтения"></v-text-field>
								</v-col>
								<v-col> </v-col>
							</v-row>
						</v-container>
					</v-container>
					<v-btn
						color="accent"
						class="pa-7 my-2"
						variant="tonal"
						block
						type="submit"
						>Создать задачу</v-btn
					>
				</v-form>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
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
		users: [
			{ id: 1, title: "John Doe" },
			{ id: 2, title: "Jane Doe" },
			{ id: 3, title: "Bob Smith" },
		],
	}),
	methods: {
		dateValidation(value) {
			const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Регулярное выражение для ГГГГ-ММ-ДД
			return (
				dateRegex.test(value) || "Неправильный формат даты (ГГГГ-ММ-ДД)"
			);
		},
		submitTask() {},
	},
};
</script>

<style lang="scss" scoped></style>
