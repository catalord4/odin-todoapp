const taskManager = function () {
  let tasks;
  let lastId;

  const taskProperties = {
    name: "",
    id: 0,
    description: "",
    priority: "",
    state: false,
    master: 0,
  };

  const init = () => {
    let localTasks = JSON.parse(localStorage.getItem("tasks"));

    if (Array.isArray(localTasks)) {
      tasks = localTasks;
      lastId = Number(localStorage.getItem("lastTaskId")) || 0;
    } else {
      tasks = [];
      lastId = 0;
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("lastTaskId", lastId.toString());
  };
  const getTaskIndex = (id) => {
    return tasks.indexOf((element) => element.id == id);
  };

  const createTask = (properties) => {
    properties.id = ++lastId;
    tasks.push(Object.assign({}, taskProperties, properties));
    updateLocalStorage();
  };
  const getTask = (id) => {
    let found = tasks.find((element) => element.id == id);
    if (found == undefined) throw new Error("Task not found!");
    else return found;
  };

  const updateTask = (properties, id) => {
    let taskIndex = getTaskIndex(id);
    tasks[taskIndex] = Object.assign({}, tasks[taskIndex], properties);
    updateLocalStorage();
  };

  const deleteTask = (id) => {
    let taskIndex = getTaskIndex(id);
    tasks.splice(taskIndex, 1);
    updateLocalStorage();
  };

  const getAllTasks = () => {
    return tasks.slice();
  };

  return {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    init,
    getAllTasks,
  };
};

export default taskManager;
