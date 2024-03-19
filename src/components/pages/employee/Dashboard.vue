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
					<v-expansion-panel-title><span class="text-h5">Задачи</span></v-expansion-panel-title>

					<v-expansion-panel-text class="py-3 bg-primary_color">
						<v-row>
							<v-col
								v-for="card in tasks_info"
								:key="card.title"
								cols="12"
								sm="3"
							>
								<DashboardCardComponent :card="card"></DashboardCardComponent>
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
								<DashboardCardComponent :card="card"></DashboardCardComponent>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-container>
	</v-container>
</template>

<script>
import DashboardCardComponent from "@/components/ui/dashboard/DashboardCardComponent";

export default {
	data: () => ({
		panel: [0, 1, 2],

		tasks_info: [
			{
				title: "Назначено",
				count: "54",
				icon: "link",
				color: "orange-darken-3",
				second_color: "orange-darken-4",
			},
			{
				title: "На проверке",
				count: "3",
				icon: "link_off",
				color: "brown-darken-3",
				second_color: "brown-darken-4",
			},
			{
				title: "Выполнение подтверждено",
				count: "15",
				icon: "check",
				color: "teal-darken-3",
				second_color: "teal-darken-4",
			},
			{
				title: "Просрочено",
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
		DashboardCardComponent,
	},
};
</script>

<style lang="scss" scoped></style>
