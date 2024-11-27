import { taskManager } from "../../backend/taskManager";
import { taskPage } from "../pages/taskPage";

const weekTab = function () {
  let pagesContainer = document.createElement("div");
  pagesContainer.id = "pages-container";

  const weekPage = document.createElement("div");
  weekPage.id = "week-page";

  const title = document.createElement("h1");
  title.textContent = "This Week's Actions";

  const subTitle = document.createElement("p");
  subTitle.textContent =
    "Here are your tasks due this week. Time to take Action";

  const getNext7Days = () => {
    let days = [];
    for (let index = 0; index < 7; index++) {
      let date = new Date(new Date().setDate(new Date().getDate() + index));

      days.push(date.toLocaleDateString("en-GB"));
    }
    return days;
  };

  const taskList = document.createElement("ul");
  const createTaskList = () => {
    const getWeekTasks = () => {
      let weekTasks = [];
      getNext7Days().forEach((element) => {
        weekTasks = weekTasks.concat(
          taskManager.getAll({
            dueDate: element,
          })
        );
        console.log(weekTasks);
      });
      return weekTasks;
    };
    const tasks = getWeekTasks();
    console.log(tasks);
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

  weekPage.appendChild(title);
  weekPage.appendChild(subTitle);
  weekPage.appendChild(taskList);
  pagesContainer.appendChild(weekPage);
  return pagesContainer;
};

export { weekTab };
