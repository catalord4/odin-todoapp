import { projectManager } from "../../backend/projectManager";
import { taskManager } from "../../backend/taskManager";
import { taskPage } from "./taskPage";
import { todayTab } from "../tabs/todayTab";

const projectPage = (projectId) => {
  let pagesContainer = document.createElement("div");
  pagesContainer.id = "pages-container";

  let project = projectManager.get({ id: projectId });

  const projectPage = document.createElement("div");
  projectPage.id = "project-page";

  const buttonContainer = document.createElement("div");
  buttonContainer.id = "page-button-container";

  const deleteButton = document.createElement("button");
  deleteButton.id = "page-delete-button";

  const deleteProject = () => {
    const projectSideList = document.querySelector("#projects-side-list > ul");
    const display = document.querySelector("#display");
    projectSideList.removeChild(
      document.querySelector("#project-" + projectId)
    );
    taskManager.removeAll({ project: projectId });
    projectManager.remove(projectId);

    const content = todayTab();
    const todayTabElement = document.querySelector("#todayTab");
    let selector = todayTabElement.querySelector(".selector");

    todayTabElement.classList.toggle("selected");
    selector.classList.toggle("active");

    if (display.children.length > 0) display.removeChild(display.lastChild);

    display.appendChild(content);
  };

  deleteButton.onclick = (event) => {
    deleteProject();
  };

  buttonContainer.appendChild(deleteButton);

  const title = document.createElement("h1");

  title.textContent = project.name;

  const description = document.createElement("p");

  description.textContent = project.description;

  const taskTitle = document.createElement("h2");

  taskTitle.textContent = "Tasks";

  const taskList = document.createElement("ul");

  const populateTaskList = (projectId) => {
    taskList.replaceChildren();
    let tasks = taskManager.getAll({ project: projectId });

    const createTaskListItem = (task) => {
      let content = document.createElement("li");
      content.className = "task-list-item";
      if (task.state == true) content.classList.add("done");
      let name = document.createElement("h3");
      name.className = "task-item-title";
      name.textContent = task.name;

      let dueDate = document.createElement("h3");
      dueDate.textContent = task.dueDate;
      dueDate.className = "task-list-item-date";

      let done = document.createElement("input");
      done.type = "checkbox";

      done.checked = Boolean(task.state);

      done.onchange = (event) => {
        taskManager.update(task.id, { state: event.target.checked });

        if (event.target.checked == true)
          event.target.parentElement.classList.toggle("done");
        else if (event.target.checked == false)
          event.target.parentElement.classList.toggle("done");
      };

      name.onclick = (event) => {
        if (pagesContainer.lastChild.id == "task-page")
          pagesContainer.removeChild(pagesContainer.lastChild);
        pagesContainer.append(taskPage(task.id));
      };

      content.appendChild(name);
      content.appendChild(dueDate);
      content.appendChild(done);

      return content;
    };

    tasks.forEach((task) => {
      taskList.appendChild(createTaskListItem(task));
    });
  };

  populateTaskList(projectId);

  taskManager.addCallbackOnDataUpdate(() => populateTaskList(projectId));

  pagesContainer.appendChild(projectPage);
  projectPage.appendChild(buttonContainer);
  projectPage.appendChild(title);
  projectPage.appendChild(description);
  projectPage.appendChild(taskTitle);
  projectPage.appendChild(taskList);

  return pagesContainer;
};

export { projectPage };
