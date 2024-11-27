import { noteManager } from "../../backend/noteManager";

import closeButtonSVG from "../icons/close-button.svg";

const notePage = (id) => {
  const content = document.createElement("div");
  content.id = "note-page";

  const note = noteManager.get({ id: id });

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

  const title = document.createElement("h1");
  title.textContent = note.name;

  const noteContent = document.createElement("p");
  noteContent.textContent = note.content;

  closeButtonContainer.prepend(title);
  content.append(closeButtonContainer);
  content.append(noteContent);

  return content;
};

export { notePage };
