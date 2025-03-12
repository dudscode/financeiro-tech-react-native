import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import * as S from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RootStackParamList = {
  login: undefined;
  signup: undefined;
};

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha obrigatória"),
});

const Login = () => {
  const { signIn } = useAuth();
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Login realizado com sucesso!", data);
    // Aqui você pode adicionar a lógica de autenticação e redirecionamento

    signIn();
    router.replace("/(tabs)");
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google OAuth", "Login com Google acionado!");
    // Aqui você pode implementar a lógica de OAuth com Google
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <S.Container
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <S.Logo source={require("@/assets/images/company-logo.png")} />

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <S.StyledTextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!error}
              keyboardType="email-address"
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
            <S.StyledTextInput
              placeholder="Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!error}
              secureTextEntry
            />
            {error && <S.ErrorText>{error.message}</S.ErrorText>}
          </>
        )}
      />

      <S.Button onPress={handleSubmit(onSubmit)}>
        <S.ButtonText>Entrar</S.ButtonText>
      </S.Button>

      <S.DividerContainer>
        <S.DividerLine />
        <S.DividerText>ou</S.DividerText>
        <S.DividerLine />
      </S.DividerContainer>

      <S.GoogleButton onPress={handleGoogleLogin}>
        <S.GoogleLogo source={require("@/assets/google-logo.png")} />
        <S.GoogleButtonText>Continuar com o Google</S.GoogleButtonText>
      </S.GoogleButton>

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
