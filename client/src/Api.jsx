import axios from "axios";

const Apis = "api";

const api = axios.create({
  baseURL: Apis,
});
const endpoints = {
  tasks: "/tasks",
};
const issa = localStorage.getItem("user_id");
const tasksApi = {
  getAllTasks: () =>
    axios.get(`http://localhost:4000/task/getAllTasksuser/${issa}`),
  addTask: (task) => axios.post("http://localhost:4000/task/create", task),
  updateTask: (taskId, updatedTask) =>
    axios.put(`http://localhost:4000/task/update/${taskId}`,updatedTask),
  deleteTask: (taskId) =>
    axios.delete(`${"http://localhost:3000/tasks".tasks}/${taskId}`),
};

export { tasksApi };
