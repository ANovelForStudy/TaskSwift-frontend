import { onMounted, ref } from "vue";
import axios from "axios";

export default function getUserInfo() {
	// Объект пользователя
	const user = ref({});

	// Состояние загрузки данных о пользователе
	const isUserInfoLoading = ref(true);

	// Функция получения информации о пользователе
	const fetchingUserInfo = async () => {
		try {
			const response = await axios.get("/api/v1/auth/users/me");
			user.value = response.data;
		} catch {
			console.log(error);
		} finally {
			isUserInfoLoading.value = false;
		}
	};

	onMounted(() => {
		fetchingUserInfo();
	});

	return {
		user,
		isUserInfoLoading,
	};
}
