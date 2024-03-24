import { ref, reactive, computed } from "vue";
import axios from "axios";
import moment from "moment";

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

	// Функция для форматирования даты
	const formattedDeadline = computed(() => {
		if (task.deadline) {
			return new Date(moment(task.deadline).format("YYYY-MM-DD"));
		}
		return "";
	});

	const createTask = async () => {
		try {
			// Включить индикатор загрузки
			isRequestProcessing.value = true;

			// Запретить обращение к серверу, если не указано название задачи
			if (task.title === "") {
				return;
			}

			// Либо отправить форматированную дату, либо отправить null, если дата не указана
			task.deadline = formattedDeadline.value || null;

			// Отправить данные формы на сервер
			const response = await axios.post("/api/v1/tasks/", task);

			// Послать сигнал для добавления задачи в список всех задач
			emit("createTask", response.data);

			// Сбросить поля формы на значения по умолчанию
			Object.assign(task, initialTaskState);

			// Закрыть диалоговое окно в случае успешного создания задачи
			isDialogOpen.value = false;
		} catch (error) {
			console.log(error);
		} finally {
			// Выключить индикатор загрузки
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
