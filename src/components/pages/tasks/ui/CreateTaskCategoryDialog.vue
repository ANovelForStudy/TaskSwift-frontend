<template>
	<v-dialog
		max-width="600"
		style="background: #000000aa"
		transition="dialog-bottom-transition">
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn
				v-bind="activatorProps"
				class="rounded-xl"
				prepend-icon="category"
				variant="tonal"
				color="accent"
				>Добавить новую категорию</v-btn
			>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card
				class="bg-card_main"
				style="ma-0"
				><v-card-title class="headline text-center py-5"
					>Создание категории</v-card-title
				>
				<v-card-text>
					<v-form
						ref="createCategoryForm"
						@submit.prevent="submitCategory">
						<v-container>
							<v-text-field
								v-model="category.name"
								label="Название категории"
								:rules="[categoryNameLengthValidation]"
								variant="outlined"
								prepend-icon="title"
								color="accent"
								class="mb-2"
								required></v-text-field>

							<v-textarea
								v-model="category.description"
								label="Описание категории"
								prepend-icon="edit"
								variant="outlined"
								color="accent"
								class="mb-2"
								rows="3"></v-textarea>

							<v-container class="pa-0">
								<v-row>
									<v-col>
										<v-container>
											<v-color-picker
												class="mx-auto"
												v-model="category.color"
												elevation="0"
												label="Выбор цвета категории"
												mode="hex"
												hide-inputs
												hide-swatches
												:swatches-max-height="
													80
												"></v-color-picker>
										</v-container>

										<v-text-field
											v-model="category.color"
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
									>Создать категорию</v-btn
								>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text></v-card
			>
		</template>
	</v-dialog>
</template>

<script>
import axios from "axios";

export default {
	data: () => ({
		category: {
			name: "",
			description: "",
			color: "#FFFFFF",
		},
	}),
	methods: {
		categoryNameLengthValidation(value) {
			return this.category.name !== "" || "Название обязательно";
		},
		async submitCategory() {
			this.loading = true;

			if (this.category.name === "") {
				return;
			}

			console.log("[INFO]: Создание категории");

			await axios
				.post("/api/v1/tasks/categories/", this.category)
				.then((response) => {
					this.$emit("createTaskCategory", response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
