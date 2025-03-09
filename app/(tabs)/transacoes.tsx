import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/config";
import extratoFirestore from "../services/extrato-firestore";
import { ItemPropsExtrato } from "@/components/utils/config";
import { useState } from "react";
import { BalanceCard } from "@/components/BalanceCard";

export default function TabTwoScreen() {
  const [saldo, setSaldo] = useState({ tipo: "Conta Corrente", valor: 5000 });
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = async () => {
    try {
      const newTransaction: ItemPropsExtrato = {
        id: Math.floor(Math.random() * 1000).toString(),
        mes: "Fevereiro",
        tipo: "payment",
        data: new Date().toLocaleDateString(),
        valor: 50,
      };

      await extratoFirestore.addTransaction(newTransaction);
      Alert.alert("Sucesso", "Transação adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      Alert.alert("Erro", "Não foi possível adicionar a transação.");
    }
  };

  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <BalanceCard saldo={saldo} loading={loading} />
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Transacoes</ThemedText>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.addButtonText}>Adicionar Transação</Text>
      </TouchableOpacity>
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
