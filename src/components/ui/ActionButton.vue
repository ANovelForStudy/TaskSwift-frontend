<template>
	<v-btn
		class="rounded-xl"
		variant="tonal"
		color="accent"
		><slot></slot>
		<template v-slot:prepend>
			<v-icon>{{ this.icon }}</v-icon>
		</template>
	</v-btn>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: "link",
			required: false,
		},
	},
};
</script>
