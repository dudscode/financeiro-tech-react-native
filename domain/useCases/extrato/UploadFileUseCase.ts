import { IExtratoRepository } from "@/domain/repositories/IExtratoRepository";
import { DocumentPickerAsset } from "expo-document-picker";

export class UploadFileUseCase {
  constructor(private readonly extratoRepository: IExtratoRepository) {}

  async execute(file: DocumentPickerAsset): Promise<string | null> {
    if (!file) {
      console.warn('Arquivo inválido.');
      return null;
    }

    return this.extratoRepository.uploadFile(file);
  }
}