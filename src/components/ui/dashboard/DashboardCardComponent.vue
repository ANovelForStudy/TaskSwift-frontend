<template>
	<v-card
		:color="card.color"
		rounded="lg"
		elevation="3">
		<div :class="`bg-${card.second_color}`">
			<v-card-title>
				{{ card.title }}
				<v-icon
					:icon="card.icon"
					size="small"></v-icon>
			</v-card-title>
		</div>
		<div class="py-7 ps-3">
			<v-card-text class="text-h3">
				{{ card.count }}
			</v-card-text>
		</div>
		<div>
			<v-btn
				block
				variant="text"
				:class="`pa-5 bg-${card.second_color} rounded-0`">
				Подробнее
			</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	props: {
		card: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped></style>
