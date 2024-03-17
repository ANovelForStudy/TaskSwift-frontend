<template>
	<v-card
		class="bg-card_main"
		elevation="6"
	>
		<div>
			<div class="task-card__title">
				<div class="card__edge bg-secondary"></div>
				<div class="py-2 bg-card_header">
					<div class="card__title-wrapper">
						<v-card-title
							class="text-truncate"
							primary-title
							>{{ category.name }}</v-card-title
						>

						<div
							class="card__circle-indicator rounded-circle mx-3"
							:style="{
								backgroundColor: category.color || 'white',
							}"
						></div>
					</div>
				</div>
			</div>
			<v-card-text class="bg-card_body text-truncate">
				{{ category.description ? category.description : "Описания нет" }}
			</v-card-text>
		</div>
		<v-card-actions class="justify-end bg-card_footer">
			<v-row class="py-3">
				<div class="task-card__dates my-auto">
					<v-card-subtitle>Создана: {{ formatDate(category.created_at) }}</v-card-subtitle>
					<v-card-subtitle>Изменена: {{ formatDate(category.updated_at) }}</v-card-subtitle>
				</div>
				<v-spacer></v-spacer>
				<div class="px-3 ms-auto my-auto">
					<v-tooltip
						text="Удалить"
						location="bottom"
					>
						<template v-slot:activator="{ props }"
							><v-btn
								class="rounded-lg card__delete-button"
								icon="delete"
								variant="flat"
								@click="$emit('deleteCategory', category.id)"
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

export default {
	props: {
		category: {
			type: Object,
			required: true,
		},
	},
	methods: {
		formatDate(date) {
			return moment(date).format("LLL");
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

.card__edge {
	min-height: 6px;
}

.card__delete-button {
	background-color: #aa0000;
}

.card__title-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.card__circle-indicator {
	$indicator-radius: 35px;

	min-height: $indicator-radius;
	min-width: $indicator-radius;
	max-height: $indicator-radius;
	max-width: $indicator-radius;

	border: 2px grey solid;
}
</style>
