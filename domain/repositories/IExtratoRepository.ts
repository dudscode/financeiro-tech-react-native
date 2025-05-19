import { ExtratoItemProps } from "@/domain/entities/Extrato";
import { DocumentPickerAsset } from "expo-document-picker";



export interface IExtratoRepository {
  createTransaction(transaction: ExtratoItemProps): Promise<void>;
  getTransactions(): Promise<ExtratoItemProps[]>;
  updateTransaction(id: string, transaction: ExtratoItemProps): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
  downloadImage(imagePath: string): Promise<string | null>; 
  uploadFile(file: DocumentPickerAsset): Promise<string | null>;
}