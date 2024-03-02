<template>
	<main>
		<div class="">
			<section class="section">
				<h1 class="title">Приборная панель</h1>
				<h3 class="subtitle">Общая информация</h3>
				<div class="columns">
					<DashboardCard
						class="column"
						total_number="26"
						title="Сотрудники"
						>сотрудников</DashboardCard
					>
					<DashboardCard
						class="column"
						total_number="7"
						title="Группы сотрудников"
						>групп сотрудников</DashboardCard
					>
					<DashboardCard
						class="column"
						total_number="194"
						title="Задачи"
						>задач</DashboardCard
					>
					<DashboardCard
						class="column"
						total_number="6"
						title="Заметки"
						>заметок</DashboardCard
					>
				</div>
			</section>
		</div>
	</main>
</template>

<script>
import DashboardCard from "@/components/UI/DashboardCard";

export default {
	components: { DashboardCard },
};
</script>

<style lang="scss" scoped></style>
