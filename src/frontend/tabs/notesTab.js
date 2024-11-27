import "../css/note-tab.css";

import { noteManager } from "../../backend/noteManager";
import { notePage } from "../pages/notePage";

import deleteButtonSVG from "../icons/delete-button.svg";
import { ca } from "date-fns/locale";

const notesTab = () => {
  let content = document.createElement("div");
  content.id = "note-container";

  const openNoteOverlay = (noteID) => {
    const overlay = document.createElement("div");
    overlay.id = "overlay";

    const page = notePage(noteID);

    overlay.append(page);

    document.body.prepend(overlay);
  };

  const deleteNote = (id) => {
    content.removeChild(content.querySelector("#note-card-" + id));

    noteManager.remove(id);
  };

  const createNoteCard = (properties) => {
    let card = document.createElement("div");

    let title = document.createElement("h3");
    title.textContent = properties.name;

    let deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.className = "note-delete-button-container";

    let deleteButton = document.createElement("button");
    deleteButton.className = "note-delete-button";
    deleteButtonContainer.append(deleteButton);

    card.classList.add("note-card");
    card.id = "note-card-" + properties.id;

    card.addEventListener("click", (event) => {
      openNoteOverlay(properties.id);
    });

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteNote(properties.id);
    });

    card.append(deleteButtonContainer);
    card.appendChild(title);

    return card;
  };

  const populateContainer = () => {
    content.replaceChildren();
    let notes = noteManager.getAll({});
    notes.forEach((element) => {
      content.appendChild(createNoteCard(element));
    });
  };

  populateContainer();

  noteManager.addCallbackOnDataUpdate(() => populateContainer());

  return content;
};

export { notesTab };
