import { ref, computed } from "vue";

export default function useSortedTaskCategories(taskCategories) {
	// Выбранная опция сортировки
	const selectedSortOption = ref("name");
	// Направление сортировки
	const isSortAscending = ref(true);
	// Опции сортировки
	const sortOptions = ref([
		{ label: "Дате создания", value: "created_at" },
		{ label: "Дате изменения", value: "updated_at" },
		{ label: "Названию", value: "name" },
		{ label: "Содержимому", value: "description" },
	]);

	// Опции сортировки по тексту
	const sortOptionsWithText = ["name", "description"];

	// Функция сортировки задач
	const sortedTaskCategories = computed(() => {
		const sortFunction = (a, b) => {
			// Сортировка по строковым полям
			if (sortOptionsWithText.includes(selectedSortOption.value)) {
				return isSortAscending.value
					? a[selectedSortOption.value].localeCompare(b[selectedSortOption.value], undefined, { sensitivity: "accent" })
					: b[selectedSortOption.value].localeCompare(a[selectedSortOption.value], undefined, { sensitivity: "accent" });
			}

			// Сортировка по дате создания/изменения
			const dateA = new Date(a[selectedSortOption.value]);
			const dateB = new Date(b[selectedSortOption.value]);

			if (isSortAscending.value) {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		};

		return [...taskCategories.value].sort(sortFunction);
	});

	// Функция переключения направления сортировки
	const toggleSortDirection = () => {
		isSortAscending.value = !isSortAscending.value;
	};

	return { selectedSortOption, sortOptions, sortedTaskCategories, toggleSortDirection, isSortAscending };
}
