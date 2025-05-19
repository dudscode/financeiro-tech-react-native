import { IExtratoRepository } from "@/domain/repositories/IExtratoRepository";

export class DownloadImageUseCase {
  constructor(private readonly extratoRepository: IExtratoRepository) {}

  async execute(imagePath: string): Promise<string | null> {
    return await this.extratoRepository.downloadImage(imagePath);
  }
}