import { onMounted, ref } from "vue";
import axios from "axios";

export default function getManagerEmployees() {
	const employees = ref([]);
	const isEmployeesLoading = ref(true);

	// Функция получения списка сотрудников
	const fetchingEmployees = async () => {
		try {
			const response = await axios.get("/api/v1/users/employees/");
			employees.value = response.data;
		} catch (error) {
			console.log(error);
		} finally {
			isEmployeesLoading.value = false;
		}
	};

	onMounted(() => {
		fetchingEmployees();
	});

	return {
		employees,
		isEmployeesLoading,
	};
}
