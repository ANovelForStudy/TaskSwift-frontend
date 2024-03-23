import { createRouter, createWebHistory } from "vue-router";

// Страницы аутентификации
import LoginPage from "@/components/pages/auth/LoginPage";

// Общие страницы
import AboutPage from "@/components/pages/base/About";
import ProfilePage from "@/components/pages/base/Profile";

// Страницы работника
import EmployeeDashboardPage from "@/components/pages/employee/Dashboard";
import EmployeeTaskManagementPage from "@/components/pages/employee/TasksList";

// Страницы менеджера
import ManagerDashboardPage from "@/components/pages/manager/Dashboard";
import ManagerTaskManagementPage from "@/components/pages/manager/TasksList";
import ManagerEmployeeManagementPage from "@/components/pages/manager/EmployeesList";
import ManagerTaskCategoriesManagementPage from "@/components/pages/manager/TaskCategoriesList.vue";

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
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.getters["auth/getUserData"]?.user_type;
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
			const userType = store.getters["auth/getUserData"]?.user_type;
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
			const userType = store.getters["auth/getUserData"]?.user_type;
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
		path: "/profile",
		name: "Profile",
		component: ProfilePage,
		meta: { requiredRoles: [], requiresAuth: true },
	},
	{
		path: "/tasks",
		name: "Tasks",
		meta: { requiredRoles: [], requiresAuth: true },
		beforeEnter(to, from, next) {
			const userType = store.getters["auth/getUserData"]?.user_type;
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
			const userType = store.getters["auth/getUserData"]?.user_type;
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
			const userType = store.getters["auth/getUserData"]?.user_type;
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
			const userType = store.getters["auth/getUserData"]?.user_type;
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
			const userType = store.getters["auth/getUserData"]?.user_type;
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

	// Если для посещения страницы требуется аутентификация и пользователь ещё не аутентифицирован
	if (requiresAuth && !store.getters["auth/isAuthenticated"]) {
		// Перенаправление на страницу входа
		next({
			name: "Login",
		});
	}
	// Иначе разрешить перенаправление
	next();
});

export default router;
