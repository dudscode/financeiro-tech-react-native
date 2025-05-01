import React, { FC, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

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
    <Picker
      placeholder="Selecione o tipo de transação"
      selectedValue={selectedValue}
      onValueChange={itemValue => onValueChange(itemValue as string)}
      ref={pickerRef}
      style={[styles.select]}>
      {items.map(({ label, value }) => (
        <Picker.Item key={value} label={label} value={value} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  select: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    height: 50,
    padding: 10,
    borderColor: '#004d61',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
