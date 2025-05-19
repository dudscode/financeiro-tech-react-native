import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
import { IStorageRepository } from '@/domain/repositories/IStorageRepository';

export class AsyncStorageRepository implements IStorageRepository {
  private readonly encryptionKey: string;

  constructor(encryptionKey?: string) {
    if (!encryptionKey && !process.env.EXPO_PUBLIC_KEY) {
      throw new Error('Encryption key is not defined');
    }
    this.encryptionKey = encryptionKey ?? process.env.EXPO_PUBLIC_KEY!;
  }

  async save(key: string, value: unknown): Promise<void> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const ciphertext = CryptoJS.AES.encrypt(stringValue, this.encryptionKey).toString();
      await AsyncStorage.setItem(key, JSON.stringify(ciphertext));
    } catch (error) {
      console.error('Error saving item:', error);
      throw new Error(`Failed to save item with key ${key}: ${error}`);
    }
  }
  
  async retrieve<T>(key: string): Promise<T | null> {
    try {
      const ciphertext = await AsyncStorage.getItem(key);
      
      if (!ciphertext) {
        return null;
      }
      
      const decryptedValue = CryptoJS.AES.decrypt(
        JSON.parse(ciphertext),
        this.encryptionKey
      );
      
      return decryptedValue.toString(CryptoJS.enc.Utf8)
        ? JSON.parse(decryptedValue.toString(CryptoJS.enc.Utf8)) as T
        : null;
    } catch (error) {
      console.error('Error retrieving item:', error);
      return null;
    }
  }
  
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw new Error(`Failed to remove item with key ${key}: ${error}`);
    }
  }
  
  async merge(key: string, value: unknown): Promise<void> {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error merging item:', error);
      throw new Error(`Failed to merge item with key ${key}: ${error}`);
    }
  }
  
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error(`Failed to clear storage: ${error}`);
    }
  }
  
  async getAllKeys(): Promise<string[]> {
    try {
      return [...(await AsyncStorage.getAllKeys())];
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
  
  async getAllItems(): Promise<Record<string, unknown>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      
      return items.reduce(
        (accumulator: Record<string, unknown>, [key, value]: [string, string | null]) => {
          if (value) {
            try {
              const ciphertext = JSON.parse(value);
              const decryptedValue = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
              accumulator[key] = JSON.parse(decryptedValue.toString(CryptoJS.enc.Utf8));
            } catch (error) {
              console.error(`Error decrypting item with key ${key}:`, error);
              accumulator[key] = null;
            }
          } else {
            accumulator[key] = null;
          }
          return accumulator;
        },
        {}
      );
    } catch (error) {
      console.error('Error getting all items:', error);
      return {};
    }
  }
}