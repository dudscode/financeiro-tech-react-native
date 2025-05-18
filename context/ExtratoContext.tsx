import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ExtratoItemProps } from '@/domain/entities/Extrato';
import { checkConnection } from '@/app/utils/network';
import { setItem, getItem } from '@/app/utils/async-storage';
import { ExtratoService } from '@/domain/services/extrato-service';

export interface ExtratoContextType {
  data: ExtratoItemProps[];
  setData: React.Dispatch<React.SetStateAction<ExtratoItemProps[]>>;
  fetchData: () => void;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export const ExtratoContext = createContext<ExtratoContextType | undefined>(undefined);

export const ExtratoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ExtratoItemProps[]>([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const fetchData = async () => {
    try {
      const { transactions, receitas, despesas, saldo } = await ExtratoService.fetchExtrato();
      setData(transactions);
      setTotalReceitas(receitas);
      setTotalDespesas(despesas);
      setSaldo(saldo);

      setItem('extrato', JSON.stringify(transactions));
      setItem('totalReceitas', JSON.stringify(receitas));
      setItem('totalDespesas', JSON.stringify(despesas));
      setItem('saldo', JSON.stringify(saldo));
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  useEffect(() => {
    checkConnection()
      .then(async isConnected => {
        if (!isConnected) {
          console.log('No internet connection');
      
          Promise.all([
            getItem('extrato'),
            getItem('totalReceitas'),
            getItem('totalDespesas'),
            getItem('saldo'),
          ])
            .then(values => {
              const [extrato, totalReceitas, totalDespesas, saldo] = values;
              if (extrato) {
                setData(extrato);
              }
              if (totalReceitas) {
                setTotalReceitas(Number(totalReceitas));
              }
              if (totalDespesas) {
                setTotalDespesas(Number(totalDespesas));
              }
              if (saldo) {
                setSaldo(Number(saldo));
              }
            })
            .catch(error => {
              console.error('Error retrieving cached data:', error);
            });
          return;
        }
        console.log('Internet connection established');
        fetchData();
      })
      .catch(error => {
        console.error('Error fetching connection state:', error);
      });
  }, []);

  return (
    <ExtratoContext.Provider
      value={{ data, setData, fetchData, totalReceitas, totalDespesas, saldo }}>
      {children}
    </ExtratoContext.Provider>
  );
};
