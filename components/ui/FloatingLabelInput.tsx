import React, { useState } from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  hasError?: boolean;
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
  background-color: #fff;
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
  hasError = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Container>
      <Label isFocused={isFocused} hasValue={!!value} hasError={hasError}>
        {label}
      </Label>
      <Input
        {...props}
        hasError={hasError}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text: React.SetStateAction<string>) => setValue(text)}
        value={value}
      />
    </Container>
  );
};

export default FloatingLabelInput;
