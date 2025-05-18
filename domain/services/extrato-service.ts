import { ExtratoItemProps } from '@/domain/entities/Extrato';
import { ExtratoFirebaseRepository } from '@/infra/firebase/ExtratoFirebaseRepository';
import { getItem } from '@/app/utils/async-storage';
import { GetTransactionsUseCase } from '../useCases/extrato/GetTransactionsUseCase';

interface TransactionSummary {
  transactions: ExtratoItemProps[];
  receitas: number;
  despesas: number;
  saldo: number;
}

const authRepository = new ExtratoFirebaseRepository();

const getTransactionsUseCase = new GetTransactionsUseCase(authRepository);

export class ExtratoService {
  static async fetchExtrato(): Promise<TransactionSummary> {
    try {
      const transactions = await getTransactionsUseCase.execute();
      const receitas = this.calculateReceitas(transactions);
      const despesas = this.calculateDespesas(transactions);
      const saldo = this.calculateSaldo(despesas, receitas);

      return { transactions, receitas, despesas, saldo };
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  }

  static async fetchCachedExtrato(): Promise<TransactionSummary> {
    const [extrato, totalReceitas, totalDespesas, saldo] = await Promise.all([
      getItem('extrato'),
      getItem('totalReceitas'),
      getItem('totalDespesas'),
      getItem('saldo'),
    ]);
    
    return {
      transactions: extrato ? JSON.parse(extrato) : [],
      receitas: totalReceitas ? Number(totalReceitas) : 0,
      despesas: totalDespesas ? Number(totalDespesas) : 0,
      saldo: saldo ? Number(saldo) : 0,
    };
  }

  static calculateReceitas(transactions: ExtratoItemProps[]): number {
    return transactions
      .filter(item => item.tipo === 'deposit' || item.tipo === 'reversal')
      .reduce((sum, item) => sum + item.valor, 0);
  }

  static calculateDespesas(transactions: ExtratoItemProps[]): number {
    return transactions
      .filter(item => ['payment', 'withdraw', 'transfer', 'loan', 'docted'].includes(item.tipo))
      .reduce((sum, item) => sum + item.valor, 0);
  }

  static calculateSaldo(despesas: number, receitas: number): number {
    return receitas - Math.abs(despesas);
  }
}
