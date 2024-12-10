import * as SecureStore from 'expo-secure-store';

export const setItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('SecureStore setItem error:', error);
  }
};

export const getItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('SecureStore getItem error:', error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('SecureStore removeItem error:', error);
  }
};