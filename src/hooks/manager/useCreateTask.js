import { ref, reactive } from "vue";
import axios from "axios";

export default function useCreateTask(emit) {
	// Объект задачи, содержащий значения полей формы
	const task = reactive({
		title: "",
		description: "",
		category: null,
		assigned_to: null,
		priority: "U",
		deadline: null,
		color: "#FFFFFF",
	});
	// Сохраняю начальное значение полей task для последующего их сброса
	const initialTaskState = JSON.parse(JSON.stringify(task));
	// Свойство, показывающее, выполняется ли сейчас запрос создания задачи
	const isRequestProcessing = ref(false);
	// Свойство для закрытия диалогового окна после создания задачи
	const isDialogOpen = ref(false);

	const createTask = async () => {
		try {
			// Включаем индикатор загрузки
			isRequestProcessing.value = true;

			if (task.title === "") {
				return;
			}

			const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
			if ((!dateRegex.test(task.deadline) && !task.deadline === "") || !task.deadline === null) {
				return;
			}

			if (task.deadline === "") {
				task.deadline = null;
			}

			const response = await axios.post("/api/v1/tasks/", task);

			// Посылаю сигнал для добавления задачи в список всех задач
			emit("createTask", response.data);

			// Сброс полей задачи на значения по умолчанию
			Object.assign(task, initialTaskState);

			// Закрываю диалоговое окно
			isDialogOpen.value = false;
		} catch (error) {
			console.log(error);
		} finally {
			// Выключаем индикатор загрузки
			isRequestProcessing.value = false;
		}
	};

	return {
		task,
		createTask,
		isRequestProcessing,
		isDialogOpen,
	};
}
