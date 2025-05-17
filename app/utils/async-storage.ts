import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';

export const setItem = async (key: string, value: unknown) => {
  if (!process.env.EXPO_PUBLIC_KEY) {
    throw new Error('Encryption key is not defined in environment variables');
  }

  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    const ciphertext = CryptoJS.AES.encrypt(stringValue, process.env.EXPO_PUBLIC_KEY).toString();
    await AsyncStorage.setItem(key, JSON.stringify(ciphertext));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const getItem = async (key: string) => {
  if (!process.env.EXPO_PUBLIC_KEY) {
    throw new Error('Encryption key is not defined in environment variables');
  }
  try {
    const ciphertext = (await AsyncStorage.getItem(key)) || '';
    const decryptedValue = CryptoJS.AES.decrypt(
      JSON.parse(ciphertext),
      process.env.EXPO_PUBLIC_KEY
    );
    return decryptedValue !== null ? JSON.parse(decryptedValue.toString(CryptoJS.enc.Utf8)) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

export const mergeItem = async (key: string, value: unknown) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error merging item:', error);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

export const getAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce(
      (accumulator: Record<string, unknown>, [key, value]: [string, string | null]) => {
        accumulator[key] = value != null ? JSON.parse(value) : null;
        return accumulator;
      },
      {} as Record<string, unknown>
    );
  } catch (error) {
    console.error('Error getting all items:', error);
    return {};
  }
};
