import { ref, computed } from "vue";
import moment from "moment";

export default function useStatusFilteredTasks(tasks) {
	// Выбранная опция фильтрации
	const selectedStatusFilterOption = ref(null);

	// Все опции фильтрации
	const statusFilterOptions = ref([
		{ label: "Все задачи", value: null },
		{ label: "Завершены", value: true },
		{ label: "Не завершены", value: false },
		{ label: "Просрочены", value: "overdue" },
	]);

	// Вычисляемое свойство для получения задач в зависимости от их статуса
	const statusFilteredTasks = computed(() => {
		if (selectedStatusFilterOption.value === null) {
			return tasks.value;
		} else if (selectedStatusFilterOption.value === "overdue") {
			return tasks.value.filter((task) => {
				const taskDeadline = moment(task.deadline);
				const today = moment().startOf("day");

				return taskDeadline.isBefore(today) && !task.is_completed;
			});
		} else {
			return tasks.value.filter((task) => task.is_completed === selectedStatusFilterOption.value);
		}
	});

	return {
		statusFilterOptions,
		selectedStatusFilterOption,
		statusFilteredTasks,
	};
}
