import { ref, computed } from "vue";

export default function useCategoryFilteredTasks(tasks) {
	// Категория, по которой будет происходить фильтрация
	const selectedFilterCategory = ref("all");

	// Метод фильтрации задач
	const categoryFilteredTasks = computed(() => {
		if (selectedFilterCategory.value === "all") {
			return tasks.value;
		} else {
			return tasks.value.filter((task) => task?.category === selectedFilterCategory.value);
		}
	});

	return {
		selectedFilterCategory,
		categoryFilteredTasks,
	};
}
