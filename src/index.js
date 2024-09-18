import taskManager from "./taskManager";

let TaskManager = taskManager();
TaskManager.init();

console.log(TaskManager.getAllTasks());
