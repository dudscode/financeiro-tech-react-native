import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const handleSignup = () => {
    // Lógica de cadastro
  };

  return (
    <View>
      <Text>Signup Page</Text>
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => router.navigate("/login")} />
    </View>
  );
}
