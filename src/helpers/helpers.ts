import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorageData = async (key: string) => {
  try {
    const recordAsString = await AsyncStorage.getItem(key);
    return recordAsString ? JSON.parse(recordAsString) : null;
  } catch (err) {
    console.log("No data at async storage");
    return null;
  }
};

export const setAsyncStorageData = async (key: string, data: any) => {
  try {
    const recordAsString = JSON.stringify(data);
    await AsyncStorage.setItem(key, recordAsString);
  } catch (err) {
    console.log("Error while setting data to asyncStorage");
  }
};

export const removeItemFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {
    console.log("Error removing item");
  }
};

export const getAllAsyncStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    const parsedStore = {} as {[key: string]: string};
    values.forEach((item) => {
      if(!item[1]) return;
      parsedStore[`${item[0]}`] = JSON.parse(item[1]);
    });
    return parsedStore;
  } catch (err) {
    console.log("Error while getting allAsyncData");
    return {}
  }
};
