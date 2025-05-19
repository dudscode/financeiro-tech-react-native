export interface IStorageRepository {
    save(key: string, value: unknown): Promise<void>;
    retrieve(key: string): Promise<unknown>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    getAllKeys(): Promise<string[]>;
  }