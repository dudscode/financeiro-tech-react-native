import React, { FC, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { TransactionType } from '../utils/config';
import { transformValue } from '@/components/utils/utils';

import { Button } from '@/components/Button';
import { CardContainer } from '@/components/CardContainer';
import { useExtrato } from '@/hooks/useExtrato';
import { Picker } from '@react-native-picker/picker';
import { FileUpload, uploadFile } from '../FileUpload';
import { styles } from './styles';
import extratoFirestore from '@/app/services/extrato-firestore';

const formatMonth = () => {
  const data = new Date().toLocaleString('pt-BR', { month: 'long' });
  return data.charAt(0).toUpperCase() + data.slice(1);
};

type Transactions = {
  number: number;
  selectedTransaction: string;
};

type NewTransactionsProps = {
  callback?: (transaction: Transactions) => void;
};

const mask = createNumberMask({
  prefix: [''],
  delimiter: '.',
  separator: ',',
  precision: 2,
});

const confirmTransaction = (id: string) => {
  Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
};

export const NewTransactions: FC<NewTransactionsProps> = () => {
  const [file, setUploadFile] = useState<any>();
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>('transfer');
  const [loading, setLoading] = useState(false);
  const [number, onChangeNumber] = useState<string | undefined>();
  const { saldo, fetchData } = useExtrato();

  return (
    <CardContainer title="Nova Transação">
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTransaction}
          onValueChange={itemValue => setSelectedTransaction(itemValue as TransactionType)}
          mode="dropdown"
          style={styles.picker}>
          <Picker.Item label="Depósito" value="deposit" />
          <Picker.Item label="Transferência" value="transfer" />
          <Picker.Item label="Saque" value="withdraw" />
          <Picker.Item label="Pagamento" value="payment" />
          <Picker.Item label="Estorno" value="reversal" />
          <Picker.Item label="Empréstimo e Financiamento" value="loan" />
          <Picker.Item label="DOC/TED" value="docted" />
        </Picker>
      </View>
      <View style={[styles.container]}>
        <Text style={[styles.text]}>Valor</Text>
        <MaskInput
          style={[styles.searchInput]}
          onChangeText={(_, unmasked) => {
            onChangeNumber(unmasked);
          }}
          value={number?.toString()}
          placeholder="00,00"
          keyboardType="numeric"
          mask={mask}
        />
      </View>
      <FileUpload callback={setUploadFile} />
      {file?.name && <Text>{file?.name}</Text>}
      <Button
        style={styles.button}
        title="Concluir transação"
        loading={loading}
        onPress={async () => {
          setLoading(true);
          const isDespesa = ['payment', 'withdraw', 'transfer', 'loan', 'docted'].includes(
            selectedTransaction
          );
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
            });
            confirmTransaction(id);
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
        }}
      />
    </CardContainer>
  );
};

export default NewTransactions;
