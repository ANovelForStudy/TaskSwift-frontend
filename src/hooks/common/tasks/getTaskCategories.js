import { onMounted, ref } from "vue";
import axios from "axios";

export default function getManagerTaskCategories() {
	const taskCategories = ref([]);

	// Функция получения категорий задач
	const fetchingTaskCategories = async () => {
		try {
			const response = await axios.get("/api/v1/tasks/categories");
			taskCategories.value = response.data;
		} catch {
			console.log(error);
		}
	};

	onMounted(() => {
		try {
			fetchingTaskCategories();
		} catch (error) {
			console.log(error);
		}
	});

	return {
		taskCategories,
	};
}
