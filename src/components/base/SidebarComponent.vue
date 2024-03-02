<template>
	<v-navigation-drawer
		permanent
		:rail="isRail"
		:elevation="20"
		color="sidebar"
	>
		<v-list nav>
			<v-list dense>
				<v-list-item nav>
					<div nav class="text-center text-h4">
						<span class="text-accent">T</span
						><v-slide-x-reverse-transition
							><span class="title-letters" v-show="!isRail"
								>askSwift</span
							></v-slide-x-reverse-transition
						>
					</div>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list>
				<v-list-item
					prepend-avatar="https://randomuser.me/api/portraits/men/11.jpg"
					title="Роман Лихачёв"
					subtitle="anovelforstudy@gmailcom"
					nav
				></v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list density="comfortable">
				<v-list-item
					v-for="item in items_general"
					:key="item.title"
					:to="item.link"
					:prepend-icon="item.icon"
					color="accent"
					nav
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list density="comfortable">
				<v-list-item
					v-for="item in items_management"
					:key="item.title"
					:to="item.link"
					:prepend-icon="item.icon"
					nav
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list density="comfortable">
				<v-list-item
					v-for="item in items_settings"
					:key="item.title"
					:to="item.link"
					:prepend-icon="item.icon"
					nav
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			items_general: [
				{ icon: "home", title: "Главная", link: "/" },
				{ icon: "message", title: "Обратная связь", link: "/feedback" },
			],
			items_management: [
				{
					icon: "task",
					title: "Управление задачами",
					link: "/tasks",
				},
				{
					icon: "description",
					title: "Управление заметками",
					link: "/notes",
				},
				{
					icon: "person",
					title: "Управление работниками",
					link: "/employees",
				},
				{
					icon: "groups",
					title: "Управление группами работников",
					link: "/employee-groups",
				},
			],
			items_settings: [
				{
					icon: "settings",
					title: "Настройки",
					link: "/settings",
				},
				{
					icon: "logout",
					title: "Выйти из аккаунта",
					link: "/logout",
				},
			],
		};
	},
	computed: {
		...mapState("sidebar", ["isRail"]),
	},
};
</script>

<style lang="scss" scoped>
.nav-drawer {
	display: flex;
	flex-direction: column;
}
</style>
