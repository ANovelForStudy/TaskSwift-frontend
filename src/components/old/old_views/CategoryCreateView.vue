<template>
	<section class="section">
		<h1 class="title">Создание категории</h1>
		<form @submit.prevent="createCategory">
			<div class="field">
				<label class="label">Название</label>
				<div class="control">
					<input
						class="input is-fullwidth"
						type="text"
						v-model="category.name"
						required
					/>
				</div>
			</div>
			<div class="field">
				<label class="label">Описание</label>
				<div class="control">
					<textarea
						class="textarea is-fullwidth"
						v-model="category.description"
					></textarea>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button class="button is-fullwidth" type="submit">
						Создать
					</button>
				</div>
			</div>
		</form>
	</section>
</template>

<script>
import axios from "axios";

export default {
	name: "CategoryCreatePage",
	data() {
		return {
			category: {
				name: "",
				description: "",
			},
		};
	},
	methods: {
		async createCategory() {
			try {
				const response = await axios.post(
					"http://localhost:8000/api/v1/tasks/categories/",
					this.category
				);
				console.log(response.data);
				this.$router.push("/task-list");
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
