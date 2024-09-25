import dataManager from "./datamanager";

const noteManager = function () {
  const data = dataManager("notes", {
    name: "",
    content: "",
    masterTask: 0,
  });

  return Object.assign({}, data);
};

export { noteManager };
