<template>
	<v-app-bar color="topbar" :elevation="2" :height="30">
		<v-app-bar-nav-icon
			icon="menu"
			variant="plain"
			rounded="0"
			@click.stop="toggleSidebarRail"
		></v-app-bar-nav-icon>
	</v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations("sidebar", ["toggleSidebarRail"]),
	},
};
</script>

<style lang="scss" scoped></style>
