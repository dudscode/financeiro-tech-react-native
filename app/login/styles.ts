import styled from 'styled-components/native';
import { KeyboardAvoidingView, TextInput, TextInputProps } from 'react-native';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  font-family: 'Inter_400Regular';
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;
export const Logo = styled.Image.attrs({ resizeMode: 'contain' })`
  width: 70%;
  padding: 0 20px;
  height: 120px;
  /* margin: 0 30px; */
  margin-bottom: 30px;
  background-size: auto;
  /* resizemode: "contain"; */
`;

export const StyledTextInput = styled(TextInput)<{ hasError: boolean } & TextInputProps>`
  width: 100%;
  height: 50px;
  border: 1px solid ${({ hasError }: { hasError: boolean }) => (hasError ? 'red' : '#ccc')};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  font-family: 'Inter_400Regular';
`;

export const Button = styled.TouchableOpacity`
  background-color: #47a138;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Inter_600SemiBold';
`;

export const ErrorText = styled.Text`
  color: red;
  margin-bottom: 20px;
  align-self: flex-start;
  padding: 0 10px;
  font-family: 'Inter_400Regular';
`;

export const SignUpContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const SignUpText = styled.Text`
  color: #000000;
  font-size: 14px;
`;

export const SignUpLink = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const SignUpLinkText = styled.Text`
  color: #47a138;
  font-size: 14px;
  font-weight: bold;
`;
