import { createRouter, createWebHistory } from "vue-router";

// Страницы аутентификации
import LoginPage from "@/components/pages/auth/LoginPage";

// Общие страницы
import AboutPage from "@/components/pages/base/About";

// Страницы работника
import EmployeeDashboardPage from "@/components/pages/employee/Dashboard";
import EmployeeTaskManagementPage from "@/components/pages/employee/TasksList";

// Страницы менеджера
import ManagerDashboardPage from "@/components/pages/manager/Dashboard";
import ManagerTaskManagementPage from "@/components/pages/manager/TasksList";
import ManagerEmployeeManagementPage from "@/components/pages/manager/EmployeesList";
import ManagerTaskCategoriesManagementPage from "@/components/pages/manager/TaskCategoriesList.vue";

import AccountPage from "@/components/pages/Account";
import FeedbackPage from "@/components/pages/Feedback";

// Страницы-обработчики ошибок
import Error404Page from "@/components/pages/base/errors/Error404Page";

// Vuex
import store from "@/store";

// Enum роли пользователей
import Roles from "@/helpers/roles.js";

const routes = [
	{
		path: "/",
		name: "Home",
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Employee:
					next({ name: "EmployeeHome" });
					break;
				case Roles.Manager:
					next({ name: "ManagerHome" });
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/employee-home",
		name: "EmployeeHome",
		component: EmployeeDashboardPage,
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Employee:
					next();
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/manager-home",
		name: "ManagerHome",
		component: ManagerDashboardPage,
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Manager:
					next();
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/tasks",
		name: "Tasks",
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Employee:
					next({ name: "EmployeeTasks" });
					break;
				case Roles.Manager:
					next({ name: "ManagerTasks" });
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/employee-tasks",
		name: "EmployeeTasks",
		component: EmployeeTaskManagementPage,
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Employee:
					next();
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/manager-tasks",
		name: "ManagerTasks",
		component: ManagerTaskManagementPage,
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Manager:
					next();
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/manager-task-categories",
		name: "TaskCategories",
		component: ManagerTaskCategoriesManagementPage,
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Manager:
					next();
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/employees",
		name: "Employees",
		component: ManagerEmployeeManagementPage,
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.state?.user?.data?.user_type;

			switch (userType) {
				case Roles.Manager:
					next();
					break;
				default:
					next({ name: "Error404" });
			}
		},
	},
	{
		path: "/about",
		name: "About",
		component: AboutPage,
		meta: { requiredRoles: [], requiresAuth: false },
	},
	{
		path: "/feedback",
		name: "Feedback",
		component: FeedbackPage,
		meta: { requiredRoles: [], requiresAuth: true },
	},
	{
		path: "/account",
		name: "Account",
		component: AccountPage,
		meta: { requiredRoles: [], requiresAuth: true },
	},
	{
		path: "/login",
		name: "Login",
		component: LoginPage,
		meta: { requiredRoles: [], requiresAuth: false },
	},
	{
		path: "/error404",
		name: "Error404",
		component: Error404Page,
		meta: { requiredRoles: [], requiresAuth: false },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.meta.requiresAuth;
	const userType = store.state.user?.data?.user_type;

	// Требуется ли аутентификация для посещения запрашиваемой страницы и при этом пользователь ещё не аутентифицирован
	if (requiresAuth && !store.state.user.isAuthenticated) {
		// Перенаправление на страницу входа
		next({
			name: "Login",
		});
	}
	// // Если аутентификация не требуется, или если пользователь уже аутентифицирован
	// switch (to.name) {
	// 	// Главная страница со статистикой
	// 	case "Home":
	// 		switch (userType) {
	// 			case Roles.Employee:
	// 				next({ name: "EmployeeHome" });
	// 				break;
	// 			case Roles.Manager:
	// 				next({ name: "ManagerHome" });
	// 				break;
	// 			default:
	// 				console.log("Такого типа пользователя нет");
	// 		}
	// }
	next();
});

// router.beforeEach((to, from, next) => {
// 	const requiredRoles = to.meta.requiredRoles;
// 	const requiresAuth = to.meta.requiresAuth;
// 	const currentUser = store.state.user.data;

// 	// Требуется ли аутентификация для посещения запрашиваемой страницы
// 	if (requiresAuth) {
// 		// Отсутствуют ли в вопросе специализированные роли пользователя
// 		if (!requiredRoles.length) {
// 			// Аутентифицирован ли уже пользователь
// 			if (!store.state.user.isAuthenticated) {
// 				// Перенаправление на страницу входа
// 				next({
// 					name: "Login",
// 				});
// 			} else {
// 				// Если аутентифицирован, то позволить посетить запрашиваемую страницу
// 				next();
// 			}
// 		} else {
// 			// Если запрошены специализированные роли
// 		}
// 	} else {
// 		// Если аутентификация не требуется, перенаправить на запрошенную страницу
// 		next();
// 	}
// });

// router.beforeEach((to, from, next) => {
// 	// Проверяем, требуется ли аутентификация для данного маршрута
// 	if (to.meta.requiresAuth) {
// 		// Если пользователь не аутентифицирован, также перенаправляем на страницу входа
// 		if (!store.state.user.isAuthenticated) {
// 			next({
// 				name: "Login",
// 			});
// 		} else {
// 			// Если пользователь уже аутентифицирован, продолжаем навигацию
// 			next();
// 		}
// 	} else {
// 		// Если аутентификация не требуется, продолжаем навигацию
// 		next();
// 	}
// });

// router.beforeEach((to, from, next) => {
// 	// Проверяем, требуется ли аутентификация для данного маршрута
// 	if (to.matched.some((record) => record.meta.requiresAuth)) {
// 		// Если токен пользователя отсутствует в локальном хранилище, перенаправляем на страницу входа
// 		if (localStorage.getItem("userToken") === null) {
// 			next({
// 				name: "Login",
// 				params: { nextUrl: to.fullPath },
// 			});
// 		} else {
// 			// Если пользователь не аутентифицирован, также перенаправляем на страницу входа
// 			if (!store.state.user.isAuthenticated) {
// 				next({
// 					path: "Login",
// 					params: { nextUrl: to.fullPath },
// 				});
// 			} else {
// 				// Если пользователь уже аутентифицирован, продолжаем навигацию
// 				next();
// 			}
// 		}
// 		// Если аутентификация не требуется, продолжаем навигацию
// 	} else {
// 		next();
// 	}
// });

export default router;
