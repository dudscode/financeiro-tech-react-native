import React, { FC, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import { Select } from "@/components/Select";
import { TransactionType } from "../utils/config";
import { transformValue } from "@/components/utils/utils";

import { Button } from "@/components/Button";
import { CardContainer } from "@/components/CardContainer";
import extratoFirestore from "@/app/services/extrato-firestore";
import { useExtrato } from "@/app/context/ExtratoContext";

import { FileUpload, uploadFile } from "../FileUpload";

const formatMonth = () => {
  const data = new Date().toLocaleString("pt-BR", { month: "long" });
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
  prefix: [""],
  delimiter: ".",
  separator: ",",
  precision: 2,
});

const confirmTransaction = (id: string) => {
  Alert.alert("Sucesso", "Transação adicionada com sucesso!");
};

export const NewTransactions: FC<NewTransactionsProps> = () => {
  const [file, setUploadFile] = useState<any>();
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>("transfer");
  const [loading, setLoading] = useState(false);
  const [number, onChangeNumber] = useState<string | undefined>();
  const { saldo, fetchData } = useExtrato();

  return (
    <CardContainer title="Nova Transação">
      <Select
        items={[
          { value: "deposit", label: "Depósito" },
          { value: "transfer", label: "Transferência" },
          { value: "withdraw", label: "Saque" },
          { value: "payment", label: "Pagamento" },
          { value: "reversal", label: "Estorno" },
          { value: "loan", label: "Empréstimo e Financiamento" },
          { value: "docted", label: "DOC/TED" },
        ]}
        selectedValue={selectedTransaction}
        onValueChange={(itemValue) =>
          setSelectedTransaction(itemValue as TransactionType)
        }
      />
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
          const isDespesa = [
            "payment",
            "withdraw",
            "transfer",
            "loan",
            "docted",
          ].includes(selectedTransaction);
          const formatNumber = number && parseFloat(number) / 100;
          if (!selectedTransaction) {
            Alert.alert("Erro", "Selecione uma transação");
            setLoading(false);
            return false;
          }
          if (!formatNumber || formatNumber <= 0) {
            Alert.alert("Erro", "Adicione um valor");
            setLoading(false);
            return false;
          }
          if (saldo < 0 && isDespesa) {
            Alert.alert("Saldo insuficiente");
            setLoading(false);
            return false;
          }
          if (formatNumber > saldo && isDespesa) {
            Alert.alert("Valor maior que o saldo");
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
            setSelectedTransaction("transfer");
            onChangeNumber(undefined);
            file && uploadFile(file);
            file && setUploadFile(undefined);
            fetchData();
            setLoading(false);
          } catch (error) {
            setLoading(false);
            Alert.alert("Erro", "Não foi possível adicionar a transação.");
          }
        }}
      />
    </CardContainer>
  );
};

export default NewTransactions;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },
  text: { fontSize: 16, fontWeight: "bold", color: "#dee9ea" },
  button: {
    backgroundColor: "#004d61",
    borderRadius: 8,
    width: "100%",
    margin: "auto",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 4,
    minWidth: 100,
    textAlign: "center",
    padding: 15,
    maxWidth: "100%",
  },
});
