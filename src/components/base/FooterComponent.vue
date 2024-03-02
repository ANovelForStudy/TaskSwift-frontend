<template>
	<v-footer color="footer" :elevation="2">
		<v-row justify="center" no-gutters>
			<v-btn v-for="item in items" :key="item.key" :to="item.link" variant="plain" class="mx-2" rounded="xl">
				{{ item.title }}
			</v-btn>
			<v-col class="text-center mt-4" cols="12">
				<p>
					<strong>TaskSwift</strong> by
					<a href="#" class="text-decoration-none text-accent">Roman Likhachev</a>. The source code is licensed
					<a class="text-decoration-none text-accent"
						href="http://opensource.org/licenses/mit-license.php">MIT</a>.
				</p>
				<p>&copy; Copyright 2024, TaskSwift. All rights reserved.</p>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	data: () => ({
		items: [
			{ title: "Главная", link: "/" },
			{ title: "Разработчик", link: "/about" },
		],
	}),
};
</script>

<style lang="scss" scoped></style>
