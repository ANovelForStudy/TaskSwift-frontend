import { ref, computed } from "vue";
import moment from "moment";

export default function useDeadlineFilteredTasks(tasks) {
	// Выбранная опция фильтрации по дедлайну
	const selectedDeadlineFilterOption = ref(null);

	// Все опции фильтрации по дедлайну
	const deadlineFilterOptions = ref([
		{ label: "Все задачи", value: null },
		{ label: "Без дедлайна", value: "no_due_date" },
		{ label: "Сегодня", value: "today" },
		{ label: "Завтра", value: "tomorrow" },
		{ label: "Эта неделя", value: "this_week" },
		{ label: "Следующая неделя", value: "next_week" },
	]);

	// Метод фильтрации задач
	const deadlineFilteredTasks = computed(() => {
		if (!selectedDeadlineFilterOption.value) return tasks.value;

		return tasks.value.filter((task) => {
			if (!task.deadline) return selectedDeadlineFilterOption.value === "no_due_date";

			const taskDeadline = moment(task.deadline);
			const today = moment().startOf("day");
			const tomorrow = moment().add(1, "days").startOf("day");
			const thisWeek = moment().week();
			const nextWeek = moment().add(1, "weeks").week();

			switch (selectedDeadlineFilterOption.value) {
				case "today":
					return taskDeadline.isSame(today, "day");
				case "tomorrow":
					return taskDeadline.isSame(tomorrow, "day");
				case "this_week":
					return taskDeadline.week() === thisWeek;
				case "next_week":
					return taskDeadline.week() === nextWeek;
				case "no_due_date":
					return !task.deadline;
				default:
					return true;
			}
		});
	});

	return {
		selectedDeadlineFilterOption,
		deadlineFilterOptions,
		deadlineFilteredTasks,
	};
}
