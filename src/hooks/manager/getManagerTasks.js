import { onMounted, ref } from "vue";
import axios from "axios";

export default function getManagerTasks() {
	const tasks = ref([]);
	const isTasksLoading = ref(true);

	// Функция получения задач менеджера
	const fetchingTasks = async () => {
		try {
			const response = await axios.get("/api/v1/tasks");
			tasks.value = response.data;
		} catch (error) {
			console.log(error);
		} finally {
			isTasksLoading.value = false;
		}
	};

	onMounted(() => {
		fetchingTasks();
	});

	return {
		tasks,
		isTasksLoading,
	};
}
