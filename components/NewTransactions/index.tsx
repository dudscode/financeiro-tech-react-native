import React, { FC } from 'react';
import { View, Text } from 'react-native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { TransactionType } from '../utils/config';

import { Button } from '@/components/Button';
import { CardContainer } from '@/components/CardContainer';

import { Picker } from '@react-native-picker/picker';
import { FileUpload } from '@/components/FileUpload';
import { styles } from './styles';
import { useTransactions } from '@/hooks/useTransactions';

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

export const NewTransactions: FC<NewTransactionsProps> = () => {
  const {
    onPress,
    selectedTransaction,
    setSelectedTransaction,
    loading,
    onChangeNumber,
    number,
    setUploadFile,
    file,
    isConnected,
  } = useTransactions();

  return (
    <CardContainer title="Nova Transação">
      {!isConnected && (
        <Text style={[styles.text]}>Transação desabilitada, por favor, verifique sua conexão.</Text>
      )}
      {!!isConnected && (
        <>
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
            onPress={onPress}
          />
        </>
      )}
    </CardContainer>
  );
};

export default NewTransactions;
