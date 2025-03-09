import { StyleSheet, View } from "react-native";

import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { BalanceCard } from "@/components/BalanceCard";

export default function HomeScreen() {
  const [saldo, setSaldo] = useState({ tipo: "Conta Corrente", valor: 5000 });
  const [loading, setLoading] = useState(false);

  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <BalanceCard saldo={saldo} loading={loading} />
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Investimentos</ThemedText>
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 60,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
