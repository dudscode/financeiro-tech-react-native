import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";
import { BalanceCard } from "@/components/BalanceCard";

import { useExtrato } from "../context/ExtratoContext";
import ChartComponent from "@/components/chart-invest/chartComponent";

export default function HomeScreen() {
  const { saldo, fetchData } = useExtrato();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <ContainerView>
        <ActivityIndicator size="large" color="#0000ff" />
      </ContainerView>
    );
  }

  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <BalanceCard saldo={saldo} loading={loading} />
      </View>
      <View style={styles.chartContainer}>
        <ThemedText type="title" style={styles.titleChart}>
          Sua evolução financeira
        </ThemedText>
        <ChartComponent />
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
  summaryContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  chartContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  titleChart: {
    fontSize: 24,
    marginBottom: 12,
  },
});
