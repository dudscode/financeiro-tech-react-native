import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ItemPropsExtrato } from '@/components/utils/config';
import extratoFirestore from '../services/extrato-firestore';

export interface ExtratoContextType {
  data: ItemPropsExtrato[];
  setData: React.Dispatch<React.SetStateAction<ItemPropsExtrato[]>>;
  fetchData: () => void;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export const ExtratoContext = createContext<ExtratoContextType | undefined>(undefined);

export const ExtratoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ItemPropsExtrato[]>([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const fetchData = async () => {
    try {
      const transactions = await extratoFirestore.getTransactions();
      setData(transactions);

      const receitas = transactions
        .filter(item => item.tipo === 'deposit' || item.tipo === 'reversal')
        .reduce((sum, item) => sum + item.valor, 0);

      const despesas = transactions
        .filter(item => ['payment', 'withdraw', 'transfer', 'loan', 'docted'].includes(item.tipo))
        .reduce((sum, item) => sum + item.valor, 0);

      setTotalReceitas(receitas);
      setTotalDespesas(despesas);
      const despesasCorrigidas = Math.abs(despesas);
      setSaldo(receitas - despesasCorrigidas);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ExtratoContext.Provider
      value={{ data, setData, fetchData, totalReceitas, totalDespesas, saldo }}>
      {children}
    </ExtratoContext.Provider>
  );
};
