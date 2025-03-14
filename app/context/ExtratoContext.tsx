import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ItemPropsExtrato } from '@/components/utils/config';
import extratoFirestore from '../services/extrato-firestore';

interface ExtratoContextType {
  data: ItemPropsExtrato[];
  setData: React.Dispatch<React.SetStateAction<ItemPropsExtrato[]>>;
  fetchData: () => void;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

const ExtratoContext = createContext<ExtratoContextType | undefined>(undefined);

export const useExtrato = () => {
  const context = useContext(ExtratoContext);
  if (!context) {
    throw new Error('useExtrato must be used within an ExtratoProvider');
  }
  return context;
};

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
        .filter((item) => item.tipo === 'deposit' || item.tipo === 'reversal')
        .reduce((sum, item) => sum + item.valor, 0);

      const despesas = transactions
        .filter((item) => ['payment', 'withdraw', 'transfer', 'loan', 'docted'].includes(item.tipo))
        .reduce((sum, item) => sum + item.valor, 0);

      setTotalReceitas(receitas);
      setTotalDespesas(despesas);
      setSaldo(receitas - despesas);

    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ExtratoContext.Provider value={{ data, setData, fetchData, totalReceitas, totalDespesas, saldo }}>
      {children}
    </ExtratoContext.Provider>
  );
};
