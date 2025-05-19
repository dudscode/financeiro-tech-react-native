import { useContext, useState } from 'react';
import { ExtratoContext, ExtratoContextType } from '@/context/ExtratoContext';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ExtratoItemProps } from '@/domain/entities/Extrato';
import { Alert } from 'react-native';
import { ExtratoFirebaseRepository } from '@/infra/firebase/ExtratoFirebaseRepository';
import { DeleteTransactionUseCase } from '@/domain/useCases/extrato/DeleteTransactionUseCase';
import { UpdateTransactionUseCase } from '@/domain/useCases/extrato/UpdateTransactionUseCase';

export const useExtrato = () => {
  const context = useContext<ExtratoContextType | undefined>(ExtratoContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetSwipe, setResetSwipe] = useState(false);
  const { signOutUser } = useAuth();

  const ExtratoRepository = new ExtratoFirebaseRepository();
  const updateTransactionUseCase = new UpdateTransactionUseCase(ExtratoRepository);
  const deleteTransactionUseCase = new DeleteTransactionUseCase(ExtratoRepository);
  
  if (!context) {
    throw new Error('useExtrato must be used within an ExtratoProvider');
  }

  const { data, fetchData } = context;
  const filteredData = data.filter(
    item =>
      item.mes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.data.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const handleEdit = async (newItem: ExtratoItemProps) => {
    try {
      await updateTransactionUseCase.execute(newItem.id, newItem);
      fetchData();
      confirmEdit(newItem.id);
      setResetSwipe(true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível editar a transação.');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir Transação',
      'Você tem certeza que deseja excluir a Transação ' + id + ' ?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            (async () => {
              await deleteTransactionUseCase.execute(id);
              fetchData();
            })();
          },
        },
      ]
    );
  };
  const confirmEdit = (id: string) => {
    Alert.alert('Transação Editada!', 'Você editou a Transação ' + id + ' com sucesso!', [
      { text: 'Ok', style: 'default' },
    ]);
  };

  const handleLogout = async () => {
    await signOutUser();
    router.replace('/login');
  };

  return {
    ...context,
    filteredData,
    handleDelete,
    handleEdit,
    handleLogout,
    searchQuery,
    setSearchQuery,
    resetSwipe,
    setResetSwipe,
  };
};
