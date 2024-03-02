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
			<v-row>
				<v-col
					v-for="card in dashboard_cards"
					:key="card.title"
					cols="12"
					sm="3"
				>
					<v-card :color="card.color" rounded="xl">
						<v-toolbar :color="card.second_color">
							<v-card-title primary-title>
								{{ card.title }}
								<v-icon :icon="card.icon" size="small"></v-icon>
							</v-card-title>
							<v-spacer></v-spacer>
							<v-btn variant="plain" :ripple="false"
								><v-icon
									icon="expand_less"
									size="xl"
								></v-icon></v-btn
						></v-toolbar>
						<v-sheet class="pa-3" :color="card.color">
							<v-card-subtitle class="text-subtitle-1">
								{{ card.body }}
							</v-card-subtitle>
							<br />
							<v-card-text class="text-h3">{{
								card.count
							}}</v-card-text>
						</v-sheet>

						<v-divider :thickness="1" color="black"></v-divider>

						<v-btn block variant="text">Подробнее</v-btn>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		dashboard_cards: [
			{
				title: "Сотрудники",
				body: "Количество сотрудников",
				count: "24",
				icon: "person",
				color: "red-darken-3",
				second_color: "red-darken-4",
			},
			{
				title: "Группы сотрудников",
				body: "Количество групп сотрудников",
				count: "6",
				icon: "groups",
				color: "teal-lighten-1",
				second_color: "teal-darken-1",
			},
			{
				title: "Задачи",
				body: "Количество задач",
				count: "67",
				icon: "task_alt",
				color: "indigo-darken-1",
				second_color: "indigo-darken-2",
			},
			{
				title: "Заметки",
				body: "Количество заметок",
				count: "43",
				icon: "description",
				color: "blue-darken-2",
				second_color: "blue-darken-3",
			},
		],
	}),
};
</script>

<style lang="scss" scoped></style>
