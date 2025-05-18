import { IExtratoRepository } from "@/domain/repositories/IExtratoRepository";
import { ExtratoItemProps } from "@/domain/entities/Extrato";

export class UpdateTransactionUseCase {
  constructor(private readonly extratoRepository: IExtratoRepository) {}

  async execute(id: string, transaction: ExtratoItemProps): Promise<void> {
    await this.extratoRepository.updateTransaction(id, transaction);
  }
}