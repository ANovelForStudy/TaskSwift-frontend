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
					<div
						nav
						class="text-center text-h4"
					>
						<span class="text-accent">T</span>
						<v-slide-x-reverse-transition>
							<span
								class="title-letters"
								v-show="!isRail"
								>ask<span class="text-accent">S</span>wift
							</span>
						</v-slide-x-reverse-transition>
					</div>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list>
				<v-list-item v-if="loading && !userData"
					><v-progress-linear
						color="accent"
						class="rounded-xl"
						:indeterminate="true"
					></v-progress-linear
				></v-list-item>
				<v-list-item
					v-if="!loading && userData"
					:prepend-avatar="userData.profile_picture || `https://ui-avatars.com/api/?name=${userData.first_name}+${userData.last_name}`"
					:title="userData.first_name + ' ' + userData.last_name"
					:subtitle="userData.email"
					to="/account"
					color="accent"
					nav
				></v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list density="comfortable">
				<v-list-item
					v-for="item in items.items_general"
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
					v-for="item in items.items_management"
					:key="item.title"
					:to="item.link"
					:prepend-icon="item.icon"
					color="accent"
					nav
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>

				<v-list-item
					v-if="this.$store.state.user && this.$store.state.user?.data?.user_type === this.userRoles.Manager"
					prepend-icon="person"
					color="accent"
					to="Employees"
					nav
				>
					<v-list-item-title>Управление работниками</v-list-item-title>
				</v-list-item>

				<v-list-item
					v-if="this.$store.state.user && this.$store.state?.user?.data?.user_type === this.userRoles.Manager"
					prepend-icon="groups"
					color="accent"
					to="EmployeeGroups"
					nav
				>
					<v-list-item-title>Управление группами работников</v-list-item-title>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list density="comfortable">
				<v-list-item
					v-for="item in items.items_settings"
					:key="item.title"
					:to="item.link"
					:prepend-icon="item.icon"
					color="accent"
					nav
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>

				<v-list-item
					prepend-icon="logout"
					@click="this.$store.dispatch('logout', this.$router)"
					color="accent"
					nav
				>
					<v-list-item-title>Выйти из аккаунта</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Roles from "@/helpers/roles";

export default {
	data: () => ({
		userRoles: Roles,
		items: {
			items_general: [
				{
					icon: "home",
					title: "Главная",
					link: { name: "Home" },
				},
				{ icon: "message", title: "Обратная связь", link: "/feedback" },
			],
			items_management: [
				{
					icon: "task",
					title: "Управление задачами",
					link: { name: "Tasks" },
				},
				{
					icon: "description",
					title: "Управление заметками",
					link: "Notes",
				},
			],
			items_settings: [
				{
					icon: "settings",
					title: "Настройки",
					link: "/settings",
				},
			],
		},
	}),
	computed: {
		...mapState("sidebar", ["isRail"]),
		...mapGetters({ loading: "userDataLoading", userData: "userData" }),
	},
	methods: {
		logout() {
			// Удаление токена из локального хранилища
			localStorage.removeItem("userToken");

			// Вызов мутации Vuex для очистки токена и статуса аутентификации
			this.$store.commit("removeToken");

			// Перенаправление на страницу входа
			this.$router.push({ name: "Login" });
		},
	},
};
</script>

<style lang="scss" scoped></style>
