import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/context/AuthContext';
import * as yup from 'yup';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha obrigatória'),
});

export const useLogin = () => {
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

  return {
    control,
    handleSubmit,
    onSubmit,
    handleSignUp,
  };
};
