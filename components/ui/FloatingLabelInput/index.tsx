import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInputProps } from 'react-native';
import { Container, Input, Label } from './styles';
interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  hasError?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

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
        onBlur={() => {
          onBlur();
          setIsFocused(false);
        }}
        hasError={hasError}
        {...rest}
      />
    </Container>
  );
};

export default FloatingLabelInput;
