import { IExtratoRepository } from "@/domain/repositories/IExtratoRepository";
import { ExtratoItemProps } from "@/domain/entities/Extrato";

export class GetTransactionsUseCase {
  constructor(private extratoRepository: IExtratoRepository) {}

  async execute(): Promise<ExtratoItemProps[]> {
    return await this.extratoRepository.getTransactions();
  }
}