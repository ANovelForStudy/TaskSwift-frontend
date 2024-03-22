import { ref, computed } from "vue";

export default function useCategoryFilteredTasks(tasks) {
	// Стандарная опция фильтрации по конкретной категории (требуется для сброса фильтров)
	const defaultCategoryFilterOption = "all";

	// Категория, по которой будет происходить фильтрация
	const selectedCategoryFilterOption = ref(defaultCategoryFilterOption);

	// Метод фильтрации задач
	const categoryFilteredTasks = computed(() => {
		if (selectedCategoryFilterOption.value === "all") {
			return tasks.value;
		} else {
			return tasks.value.filter((task) => task?.category === selectedCategoryFilterOption.value);
		}
	});

	return {
		selectedCategoryFilterOption,
		categoryFilteredTasks,
		defaultCategoryFilterOption,
	};
}
