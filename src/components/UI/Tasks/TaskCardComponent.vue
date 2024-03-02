<template>
	<div class="card task-card">
		<div class="color-bar" :style="{ backgroundColor: task.color }"></div>
		<div class="card-content">
			<div class="media">
				<div class="media-content">
					<p class="title is-4">{{ task.title }}</p>
					<p class="subtitle is-6">
						{{ task.category?.name || "Не указана" }}
					</p>
				</div>
			</div>

			<div class="content" v-if="task.description">
				<p>{{ task.description }}</p>
			</div>

			<div class="level is-mobile">
				<div class="level-left">
					<p class="level-item">
						<strong>Исполнитель:</strong>
						{{ task.assigned_to?.username || "Не назначен" }}
					</p>
				</div>
				<div class="level-right">
					<p class="level-item">
						<strong>Дедлайн:</strong>
						{{ formatDate(task.deadline) }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	name: "TaskCardComponent",
	props: {
		task: {
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

<style scoped>
.task-card {
	position: relative;
	width: calc(33.333% - 10px); /* 3 карточки в ряд с отступом по 10px */
	margin: 5px; /* отступ между карточками */
}

.card {
	margin-bottom: 0;
}

.color-bar {
	height: 5px;
	width: 100%;
	border-radius: 5px 5px 0 0;
}
</style>
