import { onMounted, ref } from "vue";
import axios from "axios";

export default function getUserInfo(user) {
	// Объект с новыми полями
	// Состояние выполнения запроса
	const isRequestFetching = ref(true);

	// Функция получения информации о пользователе
	const fetchingUserInfo = async () => {
		try {
			const response = await axios.get("/api/v1/auth/users/me");
			user.value = response.data;
		} catch {
			console.log(error);
		} finally {
			isRequestFetching.value = false;
		}
	};

	onMounted(() => {
		fetchingUserInfo();
	});

	return {
		isRequestFetching,
	};
}
