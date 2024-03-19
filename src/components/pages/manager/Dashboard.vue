<template>
	<v-container>
		<v-container class="pa-5">
			<v-row>
				<dir class="text-h3">Приборная панель</dir>
			</v-row>
			<v-row>
				<dir class="text-h5">Общая информация</dir>
			</v-row>
		</v-container>

		<v-container class="pa-2">
			<v-expansion-panels
				multiple
				v-model="panel"
			>
				<v-expansion-panel>
					<v-expansion-panel-title><span class="text-h5">Общая информация</span></v-expansion-panel-title>

					<v-expansion-panel-text class="py-3">
						<v-row>
							<v-col
								v-for="card in general_info"
								:key="card.title"
								cols="12"
								sm="3"
							>
								<DashboardCard :card="card"></DashboardCard>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>

				<br />

				<v-expansion-panel>
					<v-expansion-panel-title><span class="text-h5">Задачи</span></v-expansion-panel-title>

					<v-expansion-panel-text class="py-3 bg-primary_color">
						<v-row>
							<v-col
								v-for="card in tasks_info"
								:key="card.title"
								cols="12"
								sm="3"
							>
								<DashboardCard :card="card"></DashboardCard>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>

				<v-expansion-panel>
					<v-expansion-panel-title><span class="text-h5">Заметки</span></v-expansion-panel-title>

					<v-expansion-panel-text class="py-3 bg-primary_color">
						<v-row>
							<v-col
								v-for="card in notes_info"
								:key="card.title"
								cols="12"
								sm="6"
							>
								<DashboardCard :card="card"></DashboardCard>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-container>
	</v-container>
</template>

<script>
import DashboardCard from "@/components/ui/dashboard/DashboardCard";

export default {
	data: () => ({
		panel: [0, 1, 2],

		general_info: [
			{
				title: "Сотрудники",
				count: "24",
				icon: "person",
				color: "red-darken-3",
				second_color: "red-darken-4",
			},
			{
				title: "Группы сотрудников",
				count: "6",
				icon: "groups",
				color: "teal-lighten-1",
				second_color: "teal-darken-1",
			},
			{
				title: "Задачи",
				count: "73",
				icon: "task_alt",
				color: "indigo-darken-1",
				second_color: "indigo-darken-2",
			},
			{
				title: "Заметки",
				count: "43",
				icon: "description",
				color: "blue-darken-2",
				second_color: "blue-darken-3",
			},
		],

		tasks_info: [
			{
				title: "Назначено задач",
				count: "54",
				icon: "link",
				color: "orange-darken-3",
				second_color: "orange-darken-4",
			},
			{
				title: "Задач без назначения",
				count: "3",
				icon: "link_off",
				color: "brown-darken-3",
				second_color: "brown-darken-4",
			},
			{
				title: "Выполнено задач",
				count: "15",
				icon: "check",
				color: "teal-darken-3",
				second_color: "teal-darken-4",
			},
			{
				title: "Просрочено задач",
				count: "4",
				icon: "cancel",
				color: "deep-orange-darken-3",
				second_color: "deep-orange-darken-4",
			},
		],

		notes_info: [
			{
				title: "Заметок",
				count: "54",
				icon: "description",
				color: "blue-darken-2",
				second_color: "blue-darken-3",
			},
			{
				title: "",
				count: "3",
				icon: "link_off",
				color: "blue-darken-3",
				second_color: "blue-darken-4",
			},
		],
	}),
	components: {
		DashboardCard,
	},
};
</script>

<style lang="scss" scoped></style>
