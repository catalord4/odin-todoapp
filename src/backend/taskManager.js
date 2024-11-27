import dataManager from "./datamanager";

const taskManager = (function () {
  const data = dataManager("tasks", {
    name: "",
    description: "",
    state: false,
    project: 0,
    dueDate: "",
    masterTask: 0,
  });

  return Object.assign({}, data);
})();

export { taskManager };
