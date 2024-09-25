const projectManager = function () {
  const data = dataManager("projects", {
    name: "",
    description: "",
  });

  return Object.assign({}, data);
};

export { projectManager };
