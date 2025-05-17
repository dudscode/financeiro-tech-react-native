import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import extratoFirestore from '@/app/services/extrato-firestore';
import { useExtrato } from '@/hooks/useExtrato';
import { transformValue } from '@/components/utils/utils';
import { uploadFile } from '@/components/FileUpload';
import { TransactionType } from '@/components/utils/config';
import { formatMonth } from '@/components/utils/utils';
import { checkConnection } from '@/app/utils/network';

const confirmTransaction = () => {
  Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
};

const despesaType = ['payment', 'withdraw', 'transfer', 'loan', 'docted'];

export const useTransactions = () => {
  const [file, setUploadFile] = useState<any>();
  const [number, onChangeNumber] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { saldo, fetchData } = useExtrato();
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>('transfer');

  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const fetchConnectionStatus = async () => {
    const connectionStatus = await checkConnection();
    setIsConnected(connectionStatus);
  };

  useEffect(() => {
    fetchConnectionStatus();
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert('Erro', 'Transação desabilitada, por favor, verifique sua conexão.');
      return;
    }
    handleProcessTransaction();
  }, [isConnected]);

  const onPress = async () => {
    fetchConnectionStatus();
    handleProcessTransaction();
    setLoading(true);
  };

  const handleProcessTransaction = async () => {
    const isDespesa = despesaType.includes(selectedTransaction);
    const formatNumber = number && parseFloat(number) / 100;
    if (!selectedTransaction) {
      Alert.alert('Erro', 'Selecione uma transação');
      setLoading(false);
      return false;
    }
    if (!formatNumber || formatNumber <= 0) {
      Alert.alert('Erro', 'Adicione um valor');
      setLoading(false);
      return false;
    }
    if (saldo < 0 && isDespesa) {
      Alert.alert('Saldo insuficiente');
      setLoading(false);
      return false;
    }
    if (formatNumber > saldo && isDespesa) {
      Alert.alert('Valor maior que o saldo');
      setLoading(false);
      return false;
    }

    try {
      const id = new Date().getTime().toString();

      await extratoFirestore.addTransaction({
        mes: formatMonth(),
        data: new Date().toLocaleDateString(),
        tipo: selectedTransaction,
        valor: transformValue(selectedTransaction, formatNumber),
        id,
        imagePath: file ? await uploadFile(file) : null,
      });
      confirmTransaction();
      setSelectedTransaction('transfer');
      onChangeNumber(undefined);
      file && uploadFile(file);
      file && setUploadFile(undefined);
      fetchData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível adicionar a transação.');
    }
  };

  return {
    onPress,
    setUploadFile,
    setSelectedTransaction,
    setLoading,
    file,
    selectedTransaction,
    loading,
    number,
    onChangeNumber,
    isConnected,
  };
};
