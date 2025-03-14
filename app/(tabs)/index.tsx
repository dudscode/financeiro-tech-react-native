import { StyleSheet, View } from "react-native";

import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";
import { useExtrato } from "../context/ExtratoContext";
import ChartComponent from "@/components/chart-invest/chartComponent";

export default function HomeScreen() {
  const { data, totalDespesas, totalReceitas, saldo, fetchData } = useExtrato();

  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Balance Card</ThemedText>
        <View style={styles.summaryContainer}>
          <ThemedText type="erro">
            Gastos: R$ {totalDespesas.toFixed(2)}
          </ThemedText>
          <ThemedText type="primary">
            Receitas: R$ {totalReceitas.toFixed(2)}
          </ThemedText>
          <ThemedText type="info">Saldo: R$ {saldo.toFixed(2)}</ThemedText>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Sua evolução financeira </ThemedText>
        <ChartComponent />
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    color: "white",
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
  summaryContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
});
