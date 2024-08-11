import AsyncStorage from "@react-native-async-storage/async-storage";

const ASYNC_STORAGE = {
  SET: async (token: string) => {
    console.log("Token:", token);
    return await AsyncStorage.setItem("token", token);
  },

  GET: async () => {
    return await AsyncStorage.getItem("token");
  },

  REMOVE: async () => {
    return await AsyncStorage.removeItem("token");
  },
};

export default ASYNC_STORAGE;
