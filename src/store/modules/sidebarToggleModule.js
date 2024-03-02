export const sidebarDrawer = {
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
