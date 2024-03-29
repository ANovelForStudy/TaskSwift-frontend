import { ref, computed } from "vue";

export default function useExecutorFilteredTasks(tasks) {
	// Стандарная опция фильтрации по наличию исполнителя (требуется для сброса фильтров)
	const defaultExecutorFilterOption = null;

	// Выбранная на данный момент опция фильтрации
	const selectedExecutorFilterOption = ref(defaultExecutorFilterOption);

	// Все опции фильтрации по наличию исполнителя
	const executorFilterOptions = ref([
		{ label: "Все задачи", value: null },
		{ label: "С исполнителем", value: true },
		{ label: "Без исполнителя", value: false },
	]);

	// Вычисляемое свойство для получения задач по наличию исполнителя
	const executorFilteredTasks = computed(() => {
		if (selectedExecutorFilterOption.value === null) {
			return tasks.value;
		}
		return tasks.value.filter((task) => {
			return selectedExecutorFilterOption.value ? !!task.assigned_to : !task.assigned_to;
		});
	});

	return {
		selectedExecutorFilterOption,
		executorFilterOptions,
		executorFilteredTasks,
		defaultExecutorFilterOption,
	};
}
