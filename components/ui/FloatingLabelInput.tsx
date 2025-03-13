import React, { useState } from "react";
import { KeyboardTypeOptions, TextInputProps } from "react-native";
import styled from "styled-components/native";

interface FloatingLabelInputProps extends TextInputProps{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  hasError?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const Container = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.Text<{
  isFocused: boolean;
  hasValue: boolean;
  hasError: boolean;
}>`
  position: absolute;
  left: 10px;
  top: ${({ isFocused, hasValue }: { isFocused: boolean; hasValue: boolean }) =>
    isFocused || hasValue ? "-10px" : "15px"};
  font-size: ${({
    isFocused,
    hasValue,
  }: {
    isFocused: boolean;
    hasValue: boolean;
  }) => (isFocused || hasValue ? "12px" : "16px")};
  color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? "red" : "#999"};
  background-color: #f8f8f8;
  padding: 0 5px;
  z-index: 1;
`;

const Input = styled.TextInput<{ hasError: boolean }>`
  width: 100%;
  height: 50px;
  border: 1px solid
    ${({ hasError }: { hasError: boolean }) => (hasError ? "red" : "#ccc")};
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
`;



const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  hasError,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Label isFocused={isFocused} hasValue={!!value} hasError={hasError}>
        {label}
      </Label>
      <Input
         value={value}
         onChangeText={onChangeText}
         onFocus={() => setIsFocused(true)}
         onBlur={() => {onBlur(); setIsFocused(false);}}
         hasError={hasError}
        {...rest}
      />
    </Container>
  );
};

export default FloatingLabelInput;
