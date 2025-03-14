import styled from "styled-components/native";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";

interface InputProps {
  hasError?: boolean;
}

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F8F8F8;
  padding: 20px;
  font-family: "Inter_400Regular";
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ErrorText = styled.Text`
  color: red;
  align-self: flex-start;
  margin-bottom: 10px;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: blue;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;