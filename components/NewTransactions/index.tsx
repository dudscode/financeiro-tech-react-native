import React, { FC, useState } from "react";
import { View, Text, Alert } from "react-native";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import { Select } from "@/components/Select";
import styled from "styled-components";
import { TransactionType } from "../utils/config";
import { transformValue } from "@/components/utils/utils";

import { Button } from "@/components/Button";
import { CardContainer } from "@/components/CardContainer";
import extratoFirestore from "@/app/services/extrato-firestore";
import { useExtrato } from "@/app/context/ExtratoContext";

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>("transfer");
  const [loading, setLoading] = useState(false);
  const [number, onChangeNumber] = useState<string | undefined>("");
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
      <Container>
        <TextUI>Valor</TextUI>
        <Input
          onChangeText={(masked) => {
            onChangeNumber(masked);
          }}
          value={number}
          placeholder="00,00"
          keyboardType="numeric"
          mask={mask}
        />
      </Container>
      <ButtonUI
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
          if (!selectedTransaction) {
            Alert.alert("Erro", "Selecione uma transação");
            setLoading(false);
            return;
          }
          if (!number || !parseFloat(number) || parseFloat(number) <= 0) {
            Alert.alert("Erro", "Adicione um valor");
            setLoading(false);
            return;
          }
          if (saldo < 0 && isDespesa) {
            Alert.alert("Saldo insuficiente");
            setLoading(false);
            return;
          }
          if (parseFloat(number) > saldo && isDespesa) {
            Alert.alert("Valor maior que o saldo");
            setLoading(false);
            return;
          }

          try {
            const id = new Date().getTime().toString();
            await extratoFirestore.addTransaction({
              mes: formatMonth(),
              data: new Date().toLocaleDateString(),
              tipo: selectedTransaction,
              valor: transformValue(
                selectedTransaction,
                parseFloat(number!.replace(/\./g, "").replace(",", "."))
              ),
              id,
            });
            confirmTransaction(id);
            setSelectedTransaction("transfer");
            onChangeNumber(undefined);
            fetchData();
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error("Erro ao adicionar transação:", error);
            Alert.alert("Erro", "Não foi possível adicionar a transação.");
          }
        }}
      />
    </CardContainer>
  );
};

export default NewTransactions;

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const TextUI = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #dee9ea;
`;

const Input = styled(MaskInput)`
  background-color: #fff;
  border-radius: 4px;
  min-width: 100px;
  text-align: center;
  padding: 15px;
  max-width: 100%;
`;

const ButtonUI = styled(Button)`
  background-color: #004d61;
  border-radius: 8px;
  width: 100%;
  max-width: 100px;
`;
