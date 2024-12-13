import AsyncStorage from '@react-native-async-storage/async-storage';

// Still not secure storage, but better than nothing

export const setItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
    }
};

export const getItem = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('AsyncStorage getItem error:', error);
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('AsyncStorage removeItem error:', error);
    }
};