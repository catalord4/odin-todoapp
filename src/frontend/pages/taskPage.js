import { taskManager } from "../../backend/taskManager";
import closeButtonSVG from "../icons/close-button.svg";

const taskPage = (taskId) => {
  let content = document.createElement("div");
  content.id = "task-page";

  let task = taskManager.get({ id: taskId });

  const buttonContainer = document.createElement("div");
  buttonContainer.id = "page-button-container";

  const closeButton = document.createElement("button");
  closeButton.id = "task-page-close-button";
  const closeButtonImage = document.createElement("img");
  closeButtonImage.src = closeButtonSVG;

  closeButton.appendChild(closeButtonImage);

  const closePage = () => {
    content.parentElement.removeChild(content.parentElement.lastChild);
  };

  closeButton.onclick = (event) => {
    closePage();
  };

  const deleteButton = document.createElement("button");
  deleteButton.id = "page-delete-button";

  const deleteTask = () => {
    closePage();
    taskManager.remove(task.id);
  };

  deleteButton.onclick = (event) => {
    deleteTask();
  };

  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(closeButton);

  const title = document.createElement("h1");
  title.textContent = task.name;

  const description = document.createElement("p");
  description.textContent = task.description;

  const statusContainer = document.createElement("div");
  statusContainer.className = "data-container";

  const statusTitle = document.createElement("h3");
  statusTitle.textContent = "Done";
  const statusCheckBox = document.createElement("input");
  statusCheckBox.type = "checkbox";

  statusContainer.appendChild(statusTitle);
  statusContainer.appendChild(statusCheckBox);

  statusCheckBox.checked = Boolean(task.state);

  taskManager.addCallbackOnDataUpdate(() => {
    statusCheckBox.checked = taskManager.get({ id: task.id }).state;
  });
  statusCheckBox.onchange = (event) => {
    taskManager.update(task.id, { state: event.target.checked });
  };

  const dueContainer = document.createElement("div");
  dueContainer.className = "data-container";

  const dueTitle = document.createElement("h3");
  dueTitle.textContent = "Due Date";

  const dueDateDisplay = document.createElement("h3");
  dueDateDisplay.textContent = task.dueDate;

  dueContainer.appendChild(dueTitle);
  dueContainer.appendChild(dueDateDisplay);

  content.appendChild(buttonContainer);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(statusContainer);
  content.appendChild(dueContainer);

  return content;
};

export { taskPage };
