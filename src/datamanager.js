import { idManager } from "./id";

const dataManager = function (dataName, dataProperties) {
  let data;

  const init = () => {
    let localData = JSON.parse(localStorage.getItem(dataName));

    if (Array.isArray(localData)) {
      data = localData;
    } else {
      data = [];
    }
  };

  init();

  const isDataSimilar = (data1, data2) => {
    let data1String = JSON.stringify(data1);
    let data2String = JSON.stringify(data2);

    data2String = data2String.replace(/[{}]/g, "");

    return data1String.includes(data2String);
  };

  const updateLocalStorage = () => {
    localStorage.setItem(dataName, JSON.stringify(data));
  };
  const getIndex = (id) => {
    return data.indexOf((element) => element.id == id);
  };

  const create = (properties) => {
    data.push(
      Object.assign({}, dataProperties, properties, {
        id: idManager.generateId(),
      })
    );
    updateLocalStorage();
  };
  const get = (properties) => {
    let found = data.find((element) => isDataSimilar(element, properties));
    if (found == undefined) throw new Error("Data not found!");
    else return found;
  };

  const update = (id, properties) => {
    let dataIndex = getIndex(id);
    data[dataIndex] = Object.assign({}, data[dataIndex], properties);
    updateLocalStorage();
  };

  const remove = (id) => {
    let dataIndex = getIndex(id);
    data.splice(dataIndex, 1);
    updateLocalStorage();
  };

  const removeAll = (properties = {}) => {
    let toRemove = data.filter((element) => isDataSimilar(element, properties));
    toRemove.array.forEach((element) => {
      let dataIndex = getIndex(element.id);
      data.splice(dataIndex, 1);
    });
  };

  const getAll = (properties = {}) => {
    return data.filter((element) => isDataSimilar(element, properties));
  };

  return {
    create,
    get,
    getAll,
    update,
    remove,
    removeAll,
  };
};

export default dataManager;
