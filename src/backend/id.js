const idManager = (function () {
  let currentId;

  const init = () => {
    let localId = Number(localStorage.getItem("currentId"));
    if (localId !== null) currentId = localId;
    else currentId = 0;
  };

  init();

  const generateId = () => {
    currentId += 1;
    localStorage.setItem("currentId", currentId.toString());
    return currentId;
  };
  return { generateId };
})();

export { idManager };
