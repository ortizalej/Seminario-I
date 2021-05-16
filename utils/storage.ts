import AsyncStorage from "@react-native-community/async-storage";

export const saveItem = async (keyName, keyValue) => {
  try {
    return await AsyncStorage.setItem(keyName, JSON.stringify(keyValue));
  } catch (error) {
    return false;
  }
};

export const getItem = async (keyName) => {
  try {
    return AsyncStorage.getItem(keyName).then((value: any) => {
      return JSON.parse(value);
    });
  } catch (error) {
    return false;
  }
};

export const removeItem = async (keyName) => {
  try {
    await AsyncStorage.removeItem(keyName);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearAll = async () => {
  try {
    // return await AsyncStorage.removeItem(USERLOGGED);
    return await AsyncStorage.clear();
  } catch (error) {
    return false;
  }
};

export const addItemToList = async (keyName, newItem) => {
  try {
    AsyncStorage.getItem(keyName, (err, result: any) => {
      if (result !== null) {
        var newArray = JSON.parse(result);
        var newArray2 = newArray.concat(newItem);
        AsyncStorage.setItem(keyName, JSON.stringify(newArray2));
      } else {
        const newArray = JSON.stringify([newItem]);
        AsyncStorage.setItem(keyName, newArray);
      }
    });
  } catch (error) {
    return false;
  }
};

export const getAllStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const result = await AsyncStorage.multiGet(keys);
  return result.map((req: any) => JSON.parse(req));
};

// Constantes para Async Storage
export const USERLOGGED = "usserlogged";

export const MONTHLYEXPENSES = "@monthlyexpenses";
