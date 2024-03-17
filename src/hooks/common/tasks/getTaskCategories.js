import { onMounted, ref } from "vue";
import axios from "axios";

export default function getManagerTaskCategories() {
	const taskCategories = ref([]);
	const isTaskCategoriesLoading = ref(true);

	// Функция получения категорий задач
	const fetchingTaskCategories = async () => {
		try {
			const response = await axios.get("/api/v1/tasks/categories");
			taskCategories.value = response.data;
		} catch {
			console.log(error);
		} finally {
			isTaskCategoriesLoading.value = false;
		}
	};

	onMounted(() => {
		fetchingTaskCategories();
	});

	return {
		taskCategories,
		isTaskCategoriesLoading,
	};
}
