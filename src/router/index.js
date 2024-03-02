import { createRouter, createWebHistory } from "vue-router";
// import MainView from "@/views/MainView";
import AboutPage from "@/components/pages/AboutPage";
// import TaskListView from "@/views/TaskListView";
// import TaskCreateView from "@/views/TaskCreateView";
// import CategoryCreateView from "@/views/CategoryCreateView";
import HomePage from "@/components/pages/HomePage";
// Auth
import LogInPage from "@/components/pages/auth/LogInPage.vue";
import store from "@/store";

const routes = [
	{
		path: "/",
		alias: "/home",
		name: "Home",
		component: HomePage,
		meta: { requiresAuth: true },
	},
	{
		path: "/about",
		name: "About",
		component: AboutPage,
		meta: { requiresAuth: true },
	},
	{
		path: "/login",
		name: "Login",
		component: LogInPage,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// router.beforeEach((to, from, next) => {
// 	if (to.matched.some((record) => record.meta.requiresAuth) && !this.store) {
// 		next({
// 			path: "/log-in",
// 			query: { redirect: to.fullPath },
// 		});
// 	}
// });

// router.beforeEach((to, from, next) => {
// 	if (!this.$store.getters.getAuthStatus() && to.name !== "Login") {
// 		return { name: "Login" };
// 	}
// });

router.beforeEach((to, from, next) => {
	// Проверяем, требуется ли аутентификация для данного маршрута
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Если токен пользователя отсутствует в локальном хранилище, перенаправляем на страницу входа
		if (localStorage.getItem("userToken") === null) {
			next({
				path: "/login",
				params: { nextUrl: to.fullPath },
			});
		} else {
			// Если пользователь не аутентифицирован, также перенаправляем на страницу входа
			if (!store.state.user.isAuthenticated) {
				next({
					path: "/login",
					params: { nextUrl: to.fullPath },
				});
			} else {
				// Если пользователь уже аутентифицирован, продолжаем навигацию
				next();
			}
		}
		// Если аутентификация не требуется, продолжаем навигацию
	} else {
		next();
	}
});

export default router;
