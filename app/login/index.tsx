import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import * as S from './styles';
const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha obrigatória'),
});

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { isAuthenticated, signIn } = useAuth();

  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
      console.log('Login realizado com sucesso!', data);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    }
  };

  const handleSignUp = () => {
    router.replace('/signup');
  };

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
