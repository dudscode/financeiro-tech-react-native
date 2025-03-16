import styled from 'styled-components/native';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';

interface InputProps {
  hasError?: boolean;
}

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  font-family: 'Inter_400Regular';
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #47a138;
`;

export const ErrorText = styled.Text`
  color: red;
  align-self: flex-start;
  margin-bottom: 10px;
`;

export const Button = styled(TouchableOpacity)<{ buttonType?: string }>`
  background-color: ${({ buttonType }: { buttonType: string }) =>
    buttonType == 'secondary' ? '#b1b1b1' : '#47a138'};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
