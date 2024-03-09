export const sidebarDrawerModule = {
	state: () => ({
		isRail: true,
	}),
	mutations: {
		toggleSidebarRail(state) {
			state.isRail = !state.isRail;
		},
	},
	namespaced: true,
};
