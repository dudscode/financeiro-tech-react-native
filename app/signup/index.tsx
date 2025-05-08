import React from 'react';
import { Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import * as S from './styles';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { useSignup } from '@/hooks/useSignup';

const SignUp = () => {
  const { control, handleSubmit, onSubmit, handleLogin } = useSignup();

  return (
    <S.Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <S.Title>Cadastro</S.Title>

      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <FloatingLabelInput
              label="Nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!error}
            />
            {error && <S.ErrorText>{error.message}</S.ErrorText>}
          </>
        )}
      />

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
              secureTextEntry
              autoCapitalize="none"
              hasError={!!error}
            />
            {error && <S.ErrorText>{error.message}</S.ErrorText>}
          </>
        )}
      />

      <S.Button onPress={handleSubmit(onSubmit)}>
        <S.ButtonText>Cadastrar</S.ButtonText>
      </S.Button>
      <S.Button buttonType="secondary" onPress={handleLogin}>
        <S.ButtonText>Voltar para login</S.ButtonText>
      </S.Button>
    </S.Container>
  );
};

export default SignUp;
