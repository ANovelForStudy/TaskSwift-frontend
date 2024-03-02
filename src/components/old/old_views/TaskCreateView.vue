<template>
	<section class="section">
		<h1 class="title">Создание задачи</h1>
		<form @submit.prevent="createTask">
			<div class="field">
				<label class="label">Название</label>
				<div class="control">
					<input
						class="input is-fullwidth"
						type="text"
						v-model="task.title"
						required
						placeholder="Введите название задачи"
					/>
				</div>
			</div>
			<div class="field">
				<label class="label">Описание (опционально)</label>
				<div class="control">
					<textarea
						class="textarea is-fullwidth"
						v-model="task.description"
						placeholder="Введите описание задачи"
					></textarea>
				</div>
			</div>
			<div class="field">
				<label class="label">Цвет</label>
				<div class="control">
					<input
						class="input is-fullwidth"
						type="text"
						v-model="task.color"
						placeholder="Введите цвет в формате #AABBCC"
						@input="validateColor"
					/>
					<p class="help" v-if="colorError">
						Некорректный формат цвета
					</p>
				</div>
			</div>
			<div class="field">
				<label class="label">Категория</label>
				<div class="control">
					<div class="select is-halfwidth is-rounded">
						<select v-model="task.category">
							<option value="" disabled>Все категории</option>
							<hr />
							<option
								v-for="category in categories"
								:key="category.id"
								:value="category.id"
							>
								{{ category.name }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="field">
				<label class="label">Приоритет</label>
				<div class="control">
					<div class="select is-halfwidth is-rounded">
						<select v-model="task.priority">
							<option value="L">Низкий</option>
							<option value="M">Средний</option>
							<option value="H">Высокий</option>
						</select>
					</div>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button
						class="button is-fullwidth is-rounded"
						type="submit"
					>
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
	name: "CreateTaskPage",
	data() {
		return {
			categories: [],
			task: {
				title: "",
				description: "",
				category: null,
				priority: "L",
				color: "",
			},
			colorError: false,
		};
	},
	methods: {
		async createTask() {
			try {
				const response = await axios.post(
					"http://localhost:8000/api/v1/tasks/",
					this.task
				);
				console.log(response.data);
				this.$router.push("/tasks");
			} catch (error) {
				console.error(error);
			}
		},
		validateColor() {
			const regex = /^#([0-9a-fA-F]{6})$/;
			if (!regex.test(this.task.color)) {
				this.colorError = true;
			} else {
				this.colorError = false;
			}
		},
	},
	async created() {
		const responseCategories = await axios.get(
			"http://localhost:8000/api/v1/tasks/categories/"
		);
		this.categories = responseCategories.data;
	},
};
</script>

<style lang="scss" scoped>
.control {
	margin-bottom: 1rem;
	button {
		background: var(--primary);
		color: var(--light);
	}
}
</style>
