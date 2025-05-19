import { IExtratoRepository } from '@/domain/repositories/IExtratoRepository';
import { ExtratoItemProps } from '@/domain/entities/Extrato';

export class CreateTransactionUseCase {
  constructor(private readonly extratoRepository: IExtratoRepository) {}

  async execute(transaction: ExtratoItemProps): Promise<void> {
    await this.extratoRepository.createTransaction(transaction);
  }
}
