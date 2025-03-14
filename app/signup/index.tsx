import React from "react";
import { Alert, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";
import * as S from "./styles";
import { useAuth } from "@/context/AuthContext";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha obrigatória"),
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data.email, data.password);
      console.log("Cadastro realizado com sucesso!", data);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao realizar cadastro");
    }
  };

  const handleLogin = () => {
    router.replace("/login");
  };

  return (
    <S.Container
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <S.Title>Cadastrar</S.Title>

      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
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
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
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
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
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
      <S.Button onPress={handleLogin}>
        <S.ButtonText>Voltar para login</S.ButtonText>
      </S.Button>
    </S.Container>
  );
};

export default SignUp;
