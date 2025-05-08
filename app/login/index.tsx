import React from 'react';
import { Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import * as S from './styles';
import { useLogin } from '@/hooks/useLogin';

const Login = () => {
  const { control, handleSubmit, onSubmit, handleSignUp } = useLogin();

  return (
    <S.Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <S.Logo source={require('@/assets/images/company-logo.png')} />

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <FloatingLabelInput
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              hasError={!!error}
            />
            {error && <S.ErrorText>{error.message}</S.ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <FloatingLabelInput
              label="Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!error}
              secureTextEntry
              autoCapitalize="none"
            />
            {error && <S.ErrorText>{error.message}</S.ErrorText>}
          </>
        )}
      />

      <S.Button onPress={handleSubmit(onSubmit)}>
        <S.ButtonText>Entrar</S.ButtonText>
      </S.Button>

      <S.SignUpContainer>
        <S.SignUpText>Ainda não possui conta?</S.SignUpText>
        <S.SignUpLink onPress={handleSignUp}>
          <S.SignUpLinkText>Cadastre-se</S.SignUpLinkText>
        </S.SignUpLink>
      </S.SignUpContainer>
    </S.Container>
  );
};

export default Login;
