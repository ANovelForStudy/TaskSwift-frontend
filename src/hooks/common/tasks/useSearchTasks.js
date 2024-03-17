import { ref, computed } from "vue";

export default function useSearchTasks(tasks) {
	const searchQuery = ref("");

	const searchedTasks = computed(() => {
		if (!searchQuery.value) {
			return tasks.value;
		}

		return tasks.value.filter(
			(task) =>
				task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
	});

	return { searchedTasks, searchQuery };
}
