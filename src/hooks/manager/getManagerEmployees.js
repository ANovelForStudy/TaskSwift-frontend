import { onMounted, ref } from "vue";
import axios from "axios";

export default function getManagerTasks() {
	const employees = ref([]);

	// Функция получения списка сотрудников
	const fetchingEmployees = async () => {
		try {
			const response = await axios.get("/api/v1/users/employees/");
			employees.value = response.data;
		} catch (error) {
			console.log(error);
		}
	};

	onMounted(() => {
		fetchingEmployees();
	});

	return {
		employees,
	};
}
