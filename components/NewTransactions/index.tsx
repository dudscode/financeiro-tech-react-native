import React, { FC, useState } from "react";
import { View, Text, Image } from "react-native";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import { Select } from "@/components/Select";
import styled from "styled-components";
import { Button } from "@/components/Button";

type Transactions = {
  number: number;
  selectedTransaction: string;
};

type NewTransactionsProps = {
  callback: (transaction: Transactions) => void;
};

const mask = createNumberMask({
  prefix: [""],
  delimiter: ".",
  separator: ",",
  precision: 2,
});

export const NewTransactions: FC<NewTransactionsProps> = ({ callback }) => {
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [number, onChangeNumber] = useState("");

  return (
    <ViewUI>
      <Title>Nova Transação</Title>
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
        onValueChange={(itemValue) => setSelectedTransaction(itemValue)}
      />
      <Container>
        <TextUI>Valor</TextUI>
        <Input
          onChangeText={(_, unmasked) => {
            onChangeNumber(unmasked);
          }}
          value={number}
          placeholder="00,00"
          keyboardType="numeric"
          mask={mask}
        />
      </Container>
      <ButtonUI
        title="Concluir transação"
        onPress={() => {
          callback({ number: parseFloat(number), selectedTransaction });
        }}
      />
      <Image
        source={require("@/assets/images/ilustration.png")}
        style={{ margin: 0, alignSelf: "center", zIndex: 2 }}
      />
      <ImageUI
        source={require("@/assets/images/textura.png")}
        style={{ right: 0, bottom: 0 }}
      />
    </ViewUI>
  );
};

export default NewTransactions;

const ImageUI = styled(Image)`
  position: absolute;
  pointer-events: none;
  z-index: 1;
`;

const ViewUI = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  position: relative;
  background-color: #cbcbcb;
  width: 100%;
  padding: 32px 16px 27px 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const Title = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: #dee9ea;
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
