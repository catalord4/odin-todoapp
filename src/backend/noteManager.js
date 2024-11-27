import dataManager from "./datamanager";

const noteManager = (function () {
  const data = dataManager("notes", {
    name: "",
    content: "",
  });

  return Object.assign({}, data);
})();

export { noteManager };
