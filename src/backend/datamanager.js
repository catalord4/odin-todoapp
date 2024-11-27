import { idManager } from "./id";

const dataManager = function (dataName, dataProperties) {
  let data;
  let dataUpdateCallbacks = [];

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
    invokeCallbacks();
  };
  const getIndex = (id) => {
    return data.findIndex((element) => element.id == id);
  };

  const addCallbackOnDataUpdate = (callback) => {
    dataUpdateCallbacks.push(callback);
  };

  const invokeCallbacks = () => {
    for (let index = 0; index < dataUpdateCallbacks.length; index++) {
      dataUpdateCallbacks[index]();
    }
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
    if (found == undefined) return dataProperties;
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
    toRemove.forEach((element) => {
      let dataIndex = getIndex(element.id);
      data.splice(dataIndex, 1);
    });
    updateLocalStorage();
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
    addCallbackOnDataUpdate,
  };
};

export default dataManager;
