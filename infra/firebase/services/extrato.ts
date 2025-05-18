import { ExtratoItemProps } from '@/domain/entities/Extrato';

export const mountReceitas = (transactions: ExtratoItemProps[]) =>
  transactions
    .filter(item => item.tipo === 'deposit' || item.tipo === 'reversal')
    .reduce((sum, item) => sum + item.valor, 0);

export const mountDespesas = (transactions: ExtratoItemProps[]) =>
  transactions
    .filter(item => ['payment', 'withdraw', 'transfer', 'loan', 'docted'].includes(item.tipo))
    .reduce((sum, item) => sum + item.valor, 0);

export const mountSaldo = (despesas: number, receitas: number) => {
  return receitas - Math.abs(despesas);
};
