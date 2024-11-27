import { taskManager } from "../../backend/taskManager";
import { projectManager } from "../../backend/projectManager";
import { noteManager } from "../../backend/noteManager";

import closeButtonSVG from "../icons/close-button.svg";

const generateCreateMenu = function () {
  const content = document.createElement("div");
  content.id = "create-menu-container";

  const sideBar = document.createElement("aside");

  const title = document.createElement("h3");
  title.textContent = "What's your next action";
  sideBar.appendChild(title);

  const display = document.createElement("div");
  display.id = "create-display";

  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.id = "close-button-container";

  const closeButton = document.createElement("button");
  const closeButtonImg = document.createElement("img");
  closeButtonImg.src = closeButtonSVG;
  closeButton.appendChild(closeButtonImg);

  const closeCreateMenu = (event) => {
    const overlay = document.querySelector("#overlay");
    document.body.removeChild(overlay);
  };

  closeButton.addEventListener("click", (event) => {
    closeCreateMenu(event);
  });
  closeButtonContainer.appendChild(closeButton);

  const switchTab = (event, callback) => {
    if (event.currentTarget.classList.contains("selected")) return;

    let previousTab = document.querySelector(".selected");
    let selector = document.querySelector(".selector.active");

    const content = callback();

    selector.classList.toggle("active");
    previousTab.classList.toggle("selected");

    selector = event.currentTarget.querySelector(".selector");

    event.currentTarget.classList.toggle("selected");
    selector.classList.toggle("active");

    if (display.children.length > 0) display.removeChild(display.lastChild);

    display.appendChild(content);
  };

  const createMenuTab = function (name, callback, firstTab = false) {
    const content = document.createElement("div");
    content.className = "tab";

    const selector = document.createElement("h2");
    selector.className = "selector";
    selector.textContent = "//";
    content.appendChild(selector);

    const title = document.createElement("h2");
    title.textContent = name;
    content.appendChild(title);

    if (firstTab) {
      content.classList.add("selected");
      selector.classList.toggle("active");

      display.appendChild(callback());
    }

    content.addEventListener("click", (event) => switchTab(event, callback));

    return content;
  };

  const input = (name, id, type) => {
    const content = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = name;
    label.htmlFor = id;
    content.appendChild(label);

    if (type == "select") {
      let input = document.createElement("select");
      input.id = id;
      content.appendChild(input);
    } else if (type == "textarea") {
      let input = document.createElement("textarea");
      input.id = id;
      content.appendChild(input);
    } else if (type == "date") {
      let input = document.createElement("input");
      input.type = type;
      input.id = id;
      input.value = new Date().toISOString().substring(0, 10);
      content.appendChild(input);
    } else {
      let input = document.createElement("input");
      input.type = type;
      input.id = id;
      input.maxLength = 25;
      content.appendChild(input);
    }

    return content;
  };

  const createFinishButton = (callback) => {
    const content = document.createElement("div");
    content.id = "finish-button-container";

    const button = document.createElement("button");
    button.id = "finish-create-button";

    button.textContent = "Create";

    button.addEventListener("click", () => {
      callback();
      closeCreateMenu();
    });

    content.appendChild(button);

    return content;
  };

  const taskCreateMenu = () => {
    const content = document.createElement("div");
    content.id = "task-create-menu";

    const nameInput = input("Name", "task-name-input", "text");
    content.appendChild(nameInput);

    const descriptionInput = input(
      "Description",
      "task-description-input",
      "textarea"
    );
    content.appendChild(descriptionInput);

    const projectInput = input("Project", "task-project-input", "select");

    const populateProjectDropdown = () => {
      projectInput.lastChild.replaceChildren();
      const createProjectOption = (project) => {
        let option = document.createElement("option");
        option.value = project.id;
        option.textContent = project.name;
        return option;
      };

      let projects = projectManager.getAll();

      projectInput.lastChild.appendChild(
        createProjectOption({ name: "None", id: 0 })
      );
      projects.forEach((element) => {
        projectInput.lastChild.appendChild(createProjectOption(element));
      });
    };

    populateProjectDropdown();

    content.appendChild(projectInput);

    const masterTaskInput = input(
      "Master Task",
      "task-mastertask-input",
      "select"
    );

    const dueDateInput = input("Due Date", "task-date-input", "date");
    content.appendChild(dueDateInput);

    const finishButton = createFinishButton(() => {
      taskManager.create({
        name: nameInput.lastChild.value,
        description: descriptionInput.lastChild.value,
        project: Number(projectInput.lastChild.value),
        masterTask: Number(masterTaskInput.lastChild.value),
        dueDate: dueDateInput.lastChild.valueAsDate.toLocaleDateString("en-GB"),
      });
      console.log(descriptionInput.lastChild.value);
    });

    content.appendChild(finishButton);
    content.querySelector("#finish-button-container").style["grid-column"] =
      "1/3";

    return content;
  };

  const projectCreateMenu = () => {
    const content = document.createElement("div");
    content.id = "project-create-menu";

    const nameInput = input("Name", "project-name-input", "text");
    content.appendChild(nameInput);
    const descriptionInput = input(
      "Description",
      "project-description-input",
      "textarea"
    );
    content.appendChild(descriptionInput);

    const finishButton = createFinishButton(() => {
      projectManager.create({
        name: nameInput.lastChild.value,
        description: descriptionInput.lastChild.value,
      });
    });
    content.appendChild(finishButton);
    return content;
  };

  const noteCreateMenu = () => {
    const content = document.createElement("div");
    content.id = "note-create-menu";

    const nameInput = input("Name", "note-name-input", "text");
    content.appendChild(nameInput);

    const contentInput = input("Content", "note-content-input", "textarea");
    content.appendChild(contentInput);

    const finishButton = createFinishButton(() => {
      noteManager.create({
        name: nameInput.lastChild.value,
        content: contentInput.lastChild.value,
      });
    });
    content.appendChild(finishButton);

    return content;
  };

  sideBar.appendChild(createMenuTab("Task", taskCreateMenu, true));
  sideBar.appendChild(createMenuTab("Project", projectCreateMenu));
  sideBar.appendChild(createMenuTab("Note", noteCreateMenu));

  content.appendChild(sideBar);
  content.appendChild(closeButtonContainer);
  content.appendChild(display);

  return content;
};

export { generateCreateMenu };
