import React, { FC, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components";

type Item = {
  label: string;
  value: string;
};

type Props = {
  items: Item[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export const Select: FC<Props> = ({ items, selectedValue, onValueChange }) => {
  const pickerRef = useRef<Picker<unknown> | null>(null);

  return (
    <SelectUI
      placeholder="Selecione o tipo de transação"
      selectedValue={selectedValue}
      onValueChange={(itemValue) => onValueChange(itemValue as string)}
      ref={pickerRef}
      style={{
        outline: "solid",
        outlineColor: "#004d61",
      }}
    >
      {items.map(({ label, value }) => (
        <Picker.Item key={value} label={label} value={value} />
      ))}
    </SelectUI>
  );
};

const SelectUI = styled(Picker)`
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
`;
