import { ref, reactive } from "vue";
import axios from "axios";

export default function useCreateTaskCategory(emit) {
	// Объект категории, содержащий значения полей формы
	const category = reactive({
		name: "",
		description: "",
		color: "#FFFFFF",
	});
	// Сохраняю начальное значение полей category для последующего их сброса
	const initialTaskCategoryState = JSON.parse(JSON.stringify(category));
	// Свойство, показывающее, выполняется ли сейчас запрос создания задачи
	const isRequestProcessing = ref(false);
	// Свойство для закрытия диалогового окна после создания задачи
	const isDialogOpen = ref(false);

	const createTaskCategory = async () => {
		try {
			// Включить индикатор загрузки на кнопке
			isRequestProcessing.value = true;

			if (category.name === "") {
				return;
			}

			// Выполнить запрос и получаем ответ с содержимым категории
			const response = await axios.post("/api/v1/tasks/categories/", category);

			// Послать сигнал добавления категории в список категорий
			emit("createTaskCategory", response.data);

			isDialogOpen.value = false;
		} catch (error) {
			console.log(error);
		} finally {
			// Включить индикатор загрузки на кнопке
			isRequestProcessing.value = false;
		}
	};

	return {
		category,
		createTaskCategory,
		isRequestProcessing,
		isDialogOpen,
	};
}
