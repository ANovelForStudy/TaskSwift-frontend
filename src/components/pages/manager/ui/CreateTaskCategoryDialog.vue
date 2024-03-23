<template>
	<v-dialog
		max-width="600"
		v-model="isDialogOpen"
		style="background: #000000aa"
		transition="dialog-bottom-transition"
	>
		<template v-slot:activator="{ props: activatorProps }">
			<ActionButton
				icon="category"
				v-bind="activatorProps"
				>Добавить новую категорию</ActionButton
			>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card
				class="bg-card_main"
				style="ma-0"
				><v-card-title class="headline text-center py-5">Создание категории</v-card-title>
				<v-card-text>
					<v-form
						ref="createCategoryForm"
						@submit.prevent="createTaskCategory"
					>
						<v-container>
							<v-text-field
								v-model="category.name"
								label="Название категории"
								:rules="[categoryNameLengthValidation]"
								variant="outlined"
								prepend-icon="title"
								color="accent"
								class="mb-2"
								required
							></v-text-field>

							<v-textarea
								v-model="category.description"
								label="Описание категории"
								prepend-icon="edit"
								variant="outlined"
								color="accent"
								class="mb-2"
								rows="3"
							></v-textarea>

							<v-container class="pa-0">
								<v-row>
									<v-col>
										<v-container>
											<v-color-picker
												class="mx-auto rounded-0"
												v-model="category.color"
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
											v-model="category.color"
											label="Цвет"
											variant="outlined"
											prepend-icon="palette"
											readonly
											color="accent"
											hint="Только для чтения"
										></v-text-field>
									</v-col>
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
import ActionButton from "@/components/ui/ActionButton";

import useCreateTaskCategory from "@/hooks/manager/useCreateTaskCategory";

export default {
	data: () => ({
		swatches: [
			["#F44336", "#E91E63", "#9C27B0"],
			["#673AB7", "#3F51B5", "#2196F3"],
			["#03A9F4", "#00BCD4", "#009688"],
			["#4CAF50", "#8BC34A", "#CDDC39"],
			["#FFEB3B", "#FFC107", "#FF9800"],
			["#FF5722", "#795548", "#607D8B"],
			["#9E9E9E", "#FFFFFF", "#C6FF00"],
		],
	}),
	setup(props, context) {
		const { category, createTaskCategory, isRequestProcessing, isDialogOpen } = useCreateTaskCategory(context.emit);

		return {
			category,
			createTaskCategory,
			isRequestProcessing,
			isDialogOpen,
		};
	},
	components: {
		ActionButton,
	},
	methods: {
		categoryNameLengthValidation(value) {
			return this.category.name !== "" || "Название обязательно";
		},
	},
};
</script>
