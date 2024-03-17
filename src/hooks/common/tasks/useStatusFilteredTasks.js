import { ref, computed } from "vue";

export default function useStatusFilteredTasks(tasks) {
	// Выбранная опция фильтрации
	const selectedFilterOption = ref(null);
	// Категория, по которой будет происходить фильтрация
	// const filterCategory = ref(null);
	// Все опции фильтрации
	const statusFilterOptions = ref([
		{ label: "Все задачи", value: null },
		{ label: "Завершены", value: true },
		{ label: "Не завершены", value: false },
	]);

	// Метод фильтрации задач
	const statusFilteredTasks = computed(() => {
		if (selectedFilterOption.value === null) {
			return tasks.value;
		} else {
			return tasks.value.filter((task) => task.is_completed === selectedFilterOption.value);
		}
	});

	return {
		statusFilterOptions,
		selectedFilterOption,
		statusFilteredTasks,
	};
}
