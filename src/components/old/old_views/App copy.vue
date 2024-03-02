<template>
	<div class="app">
		<Sidebar />

		<div class="content">
			<TopBarComponent />

			<router-view />

			<FooterComponent />
		</div>
	</div>
</template>

<script setup>
// import bulma from "bulma";

import Sidebar from "@/components/NavComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import TopBarComponent from "@/components/TopBarComponent.vue";
</script>

<style lang="scss">
:root {
	--primary: #289e55;
	--primary-alt: #117532;
	--grey-light: #c3c8cf;
	--grey: #64748b;
	--second-grey: #495566;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Fira sans", sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}

.content {
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>
