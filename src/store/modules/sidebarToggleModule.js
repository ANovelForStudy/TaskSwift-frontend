export default {
	namespaced: true,
	state: () => ({
		isRail: true,
	}),
	mutations: {
		toggleSidebarRail(state) {
			state.isRail = !state.isRail;
		},
	},
};
