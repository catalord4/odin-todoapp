import { taskManager } from "../../backend/taskManager";
import { taskPage } from "../pages/taskPage";

const todayTab = function () {
  let pagesContainer = document.createElement("div");
  pagesContainer.id = "pages-container";

  const todayPage = document.createElement("div");
  todayPage.id = "today-page";

  const title = document.createElement("h1");
  title.textContent = "Today's Actions";

  const subTitle = document.createElement("p");
  subTitle.textContent = "Here are your tasks due today. Time to take Action";

  const taskList = document.createElement("ul");
  const createTaskList = () => {
    let date = new Date().toLocaleDateString("en-GB");
    const tasks = taskManager.getAll({
      dueDate: date,
    });
    taskList.replaceChildren();

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

  createTaskList();
  taskManager.addCallbackOnDataUpdate(() => createTaskList());

  todayPage.appendChild(title);
  todayPage.appendChild(subTitle);
  todayPage.appendChild(taskList);
  pagesContainer.appendChild(todayPage);
  return pagesContainer;
};

export { todayTab };
