import { projectManager } from "../../backend/projectManager";
import { projectPage } from "../pages/projectPage";
import { todayTab } from "../tabs/todayTab";
import { weekTab } from "../tabs/weekTab";
import { notesTab } from "../tabs/notesTab";

import logoSVG from "../icons/action-logo.svg";

import { createButton } from "./createButton";

const mainPage = function () {
  const content = document.createElement("div");
  content.id = "main";

  const display = document.createElement("div");
  display.id = "display";

  const sideBar = document.createElement("aside");
  sideBar.id = "sidebar";

  const logo = document.createElement("div");
  logo.id = "logo";

  const logoImage = document.createElement("img");
  logoImage.src = logoSVG;

  logo.appendChild(logoImage);
  sideBar.appendChild(logo);

  const tabsContainer = document.createElement("div");
  tabsContainer.id = "tabs";

  const projectList = document.createElement("ul");
  projectList.id = "projects-side-list";

  createButton();

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

  const createTab = (name, id, callback, firstTab = false) => {
    let content = document.createElement("div");
    content.id = id;
    content.classList.add("tab");

    let selector = document.createElement("h2");
    selector.textContent = "//";
    selector.className = "selector";
    content.appendChild(selector);

    let title = document.createElement("h2");
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

  const createProjectsSideList = () => {
    let content = document.createElement("div");

    content.id = "projects-side-list";

    let title = document.createElement("h2");
    title.textContent = "Projects";
    content.appendChild(title);

    let list = document.createElement("ul");

    const createProjectListItem = (projectId) => {
      const project = projectManager.get({ id: projectId });
      const listItem = document.createElement("li");
      listItem.className = "tab";
      listItem.id = "project-" + projectId;
      const selector = document.createElement("h3");
      selector.className = "selector";
      selector.textContent = "//";

      const title = document.createElement("h3");
      title.textContent = project.name;

      listItem.appendChild(selector);
      listItem.appendChild(title);
      return listItem;
    };

    let projects = projectManager.getAll();

    const populateProjectsList = (projects) => {
      list.replaceChildren();
      projects.forEach((element) => {
        let projectListItem = createProjectListItem(element.id);

        projectListItem.addEventListener("click", (event) => {
          switchTab(event, () => {
            return projectPage(element.id);
          });
        });
        list.appendChild(projectListItem);
      });
    };

    populateProjectsList(projects);
    projectManager.addCallbackOnDataUpdate(() =>
      populateProjectsList(projectManager.getAll())
    );

    content.appendChild(list);

    return content;
  };

  tabsContainer.appendChild(createTab("Today", "todayTab", todayTab, true));
  tabsContainer.appendChild(createTab("Next 7 days", "weekTab", weekTab));
  tabsContainer.appendChild(createProjectsSideList());
  tabsContainer.appendChild(createTab("Notes", "notesTab", notesTab));

  sideBar.appendChild(tabsContainer);

  content.appendChild(sideBar);

  content.appendChild(display);

  return content;
};

export { mainPage };
