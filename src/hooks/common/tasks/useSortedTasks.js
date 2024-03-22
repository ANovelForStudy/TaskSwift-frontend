import { ref, computed } from "vue";

export default function useSortedTasks(tasks) {
	// Стандарная опция сортировки (требуется для сброса фильтров)
	const defaultSortOption = "deadline";

	// Стандартное направление сортировки (требуется для сброса фильтров)
	const defaultSortDirection = true;

	// Выбранная опция сортировки
	const selectedSortOption = ref(defaultSortOption);

	// Направление сортировки
	const isSortAscending = ref(defaultSortDirection);

	// Опции сортировки
	const sortOptions = ref([
		{ label: "Дате создания", value: "created_at" },
		{ label: "Дате изменения", value: "updated_at" },
		{ label: "Дедлайну", value: "deadline" },
		{ label: "Названию", value: "title" },
		{ label: "Содержимому", value: "description" },
	]);

	// Опции сортировки по тексту
	const sortOptionsWithText = ["title", "description"];

	// Функция сортировки задач
	const sortedTasks = computed(() => {
		const sortFunction = (a, b) => {
			// Сортировка по строковым полям
			if (sortOptionsWithText.includes(selectedSortOption.value)) {
				return isSortAscending.value
					? a[selectedSortOption.value].localeCompare(b[selectedSortOption.value], undefined, { sensitivity: "accent" })
					: b[selectedSortOption.value].localeCompare(a[selectedSortOption.value], undefined, { sensitivity: "accent" });
			}

			// Сортировка по дедлайну или по дате создания/изменения
			const dateA = new Date(a[selectedSortOption.value]);
			const dateB = new Date(b[selectedSortOption.value]);

			if (isSortAscending.value) {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		};

		return [...tasks.value].sort(sortFunction);
	});

	// Функция переключения направления сортировки
	const toggleSortDirection = () => {
		isSortAscending.value = !isSortAscending.value;
	};

	return { selectedSortOption, sortOptions, sortedTasks, toggleSortDirection, isSortAscending, defaultSortOption, defaultSortDirection };
}
