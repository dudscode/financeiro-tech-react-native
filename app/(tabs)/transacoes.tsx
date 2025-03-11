import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import ContainerView from "@/components/ContainerView";
import { BalanceCard } from "@/components/BalanceCard";
import { NewTransactions } from "@/components/NewTransactions";
import { useExtrato } from "../context/ExtratoContext";

export default function TabTwoScreen() {
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
      <NewTransactions />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    color: "white",
    marginTop: 60,
  },
  addButton: {
    backgroundColor: "#47A138",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
