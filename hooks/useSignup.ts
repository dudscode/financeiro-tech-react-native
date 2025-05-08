import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha obrigatória'),
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data.name, data.email, data.password);
      console.log('Cadastro realizado com sucesso!', data);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao realizar cadastro');
    }
  };

  const handleLogin = () => {
    router.replace('/login');
  };
  return {
    control,
    handleSubmit,
    onSubmit,
    handleLogin,
  };
};
