import { generateCreateMenu } from "./createMenu";
import createButtonSVG from "../icons/create-button.svg";

const createButton = function () {
  const openCreateMenu = (event) => {
    const overlay = document.createElement("div");
    overlay.id = "overlay";

    const createMenu = generateCreateMenu();

    overlay.appendChild(createMenu);

    document.body.prepend(overlay);
  };

  const button = document.createElement("button");
  button.id = "create-button";

  button.addEventListener("click", (event) => openCreateMenu(event));

  document.body.appendChild(button);
};

export { createButton };
