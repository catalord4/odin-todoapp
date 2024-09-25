import { projectManager } from "./projectManager";

const projectTab = () => {
  let content = document.createElement("div");
  content.id = "project-container";

  projectManager.getAll();

  return content;
};
