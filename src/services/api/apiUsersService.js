import axios from "axios";

export const getEmployees = async () => {
	try {
		const response = await axios.get("/api/v1/users/employees/");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllTasks = async () => {
	try {
		const response = await axios.get("/api/v1/tasks");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getTaskCategories = async () => {
	try {
		const response = await axios.get("/api/v1/tasks/categories");
		return response.data;
	} catch {
		console.log(error);
	}
};

// async getTaskCategories() {
// 	await axios
// 		.get("/api/v1/tasks/categories/")
// 		.then((response) => {
// 			this.categories = response.data;
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// },

// async getAllTasks() {
//     await axios
//         .get("/api/v1/tasks/")
//         .then((response) => {
//             this.tasks = response.data.map((task) => ({
//                 ...task,
//                 // category: task.category || { category: this.plug },
//                 // assigned_to: task.assigned_to || { assigned_to: this.plug },
//             }));

//             this.tasks = response.data;
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//         .finally(() => {
//             this.progressCircular = false;
//         });
// },

// async getEmployees() {
//     await axios
//         .get("/api/v1/users/employees/")
//         .then((response) => {
//             this.employees = response.data;
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//         .finally(() => {});
// },
