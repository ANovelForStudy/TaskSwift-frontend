<template>
	<v-card
		:color="color"
		rounded="lg"
		elevation="3"
	>
		<div :class="`bg-${second_color}`">
			<v-card-title>
				{{ title }}
				<v-icon
					:icon="icon"
					size="small"
				></v-icon>
			</v-card-title>
		</div>
		<div class="py-7 ps-3">
			<v-card-text class="text-h3">
				<slot></slot>
			</v-card-text>
		</div>
		<div>
			<v-btn
				block
				variant="text"
				:class="`pa-5 bg-${second_color} rounded-0`"
			>
				Подробнее
			</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		second_color: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped></style>
