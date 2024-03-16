import { ref, onMounted, computed } from "vue";

export default function useSortedTasks(tasks) {
	const selectedSortOption = ref("");

	const sortTasks = computed(() => {
		switch (selectedSortOption) {
			case "created_at":
				tasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
				break;
			case "deadline":
				tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
				break;
		}
	});

	// const sortedPosts = computed(() => {
	//     return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
	// })

	onMounted(sortTasks);

	return { selectedSortOption, sortTasks };
}
