import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.Text<{
  isFocused: boolean;
  hasValue: boolean;
  hasError: boolean;
}>`
  position: absolute;
  left: 10px;
  top: ${({ isFocused, hasValue }: { isFocused: boolean; hasValue: boolean }) =>
    isFocused || hasValue ? '-10px' : '15px'};
  font-size: ${({ isFocused, hasValue }: { isFocused: boolean; hasValue: boolean }) =>
    isFocused || hasValue ? '12px' : '16px'};
  color: ${({ hasError }: { hasError: boolean }) => (hasError ? 'red' : '#999')};
  background-color: #f8f8f8;
  padding: 0 5px;
  z-index: 1;
`;

export const Input = styled.TextInput<{ hasError: boolean }>`
  width: 100%;
  height: 50px;
  border: 1px solid ${({ hasError }: { hasError: boolean }) => (hasError ? 'red' : '#ccc')};
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
`;
