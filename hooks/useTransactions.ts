import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useExtrato } from '@/hooks/useExtrato';
import { transformValue, formatMonth } from '@/components/utils/utils';
import { TransactionType } from '@/domain/entities/Extrato';
import { checkConnection } from '@/app/utils/network';
import { ExtratoFirebaseRepository } from '@/infra/firebase/ExtratoFirebaseRepository';
import { DownloadImageUseCase } from '@/domain/useCases/extrato/DownloadImageUseCase';
import * as Linking from 'expo-linking'; // para abrir no navegador
import { UploadFileUseCase } from '@/domain/useCases/extrato/UploadFileUseCase';
import { CreateTransactionUseCase } from '@/domain/useCases/extrato/CreateTransactionUseCase';

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

  const ExtratoRepository = new ExtratoFirebaseRepository();
  const downloadImageUseCase = new DownloadImageUseCase(ExtratoRepository);
  const uploadFileUseCase = new UploadFileUseCase(ExtratoRepository);
  const createTransactionUseCase = new CreateTransactionUseCase(ExtratoRepository);

  useEffect(() => {
    fetchConnectionStatus();
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert('Erro', 'Transação desabilitada, por favor, verifique sua conexão.');
    }
    // handleProcessTransaction();
  }, [isConnected]);

  const onPress = async () => {
    fetchConnectionStatus();
    handleProcessTransaction();
    setLoading(true);
  };

  const fetchConnectionStatus = async () => {
    const connectionStatus = await checkConnection();
    setIsConnected(connectionStatus);
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
      let imagePath = null;

      if (file) {
        imagePath = await uploadFileUseCase.execute(file);
        if (!imagePath) {
          return Alert.alert('Aviso', 'O upload do comprovante falhou. Deseja tentar novamente?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Tentar Novamente', onPress: () => handleProcessTransaction() },
          ]);
        }
      }

      await createTransactionUseCase.execute({
        mes: formatMonth(),
        data: new Date().toLocaleDateString(),
        fullDate: new Date(),
        tipo: selectedTransaction,
        valor: transformValue(selectedTransaction, formatNumber),
        id,
        imagePath,
      });

      confirmTransaction();
      setSelectedTransaction('transfer');
      onChangeNumber(undefined);

      if (file) {
        setUploadFile(undefined);
      }

      fetchData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível adicionar a transação.');
    }
  };

  const downloadTransactionImage = async (imagePath: string) => {
    try {
      if (!imagePath) {
        Alert.alert('Erro', 'Caminho da imagem não fornecido.');
        return;
      }
      const imageUrl = await downloadImageUseCase.execute(imagePath);
      if (imageUrl) Linking.openURL(imageUrl);
    } catch (error) {
      console.error('Error downloading transaction image:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao baixar a imagem. Por favor, tente novamente mais tarde.'
      );
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
    downloadTransactionImage,
  };
};
