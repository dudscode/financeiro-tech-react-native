import { IExtratoRepository } from "@/domain/repositories/IExtratoRepository";

export class DeleteTransactionUseCase {
  constructor(private readonly extratoRepository: IExtratoRepository) {}

  async execute(id: string): Promise<void> {
    await this.extratoRepository.deleteTransaction(id);
  }
}