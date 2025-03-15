import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ContainerView from "@/components/ContainerView";
import { ItemPropsExtrato } from "@/components/utils/config";
import SwipeableItem from "@/components/extrato/SwipeableItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFocusEffect } from "@react-navigation/native";
import { useExtrato } from "../context/ExtratoContext";
import extratoFirestore from "../services/extrato-firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function TabExtratoScreen() {
  const textColor = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "text"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [resetSwipe, setResetSwipe] = useState(false);

  const { data, fetchData } = useExtrato();
  const { signOutUser } = useAuth();

  const filteredData = data.filter(
    (item) =>
      item.mes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.data.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Excluir Transação",
      "Você tem certeza que deseja excluir a Transação " + id + " ?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            await extratoFirestore.deleteTransaction(id);
            fetchData();
          },
        },
      ]
    );
  };

  const handleEdit = async (newItem: ItemPropsExtrato) => {
    try {
      await extratoFirestore.updateTransaction(newItem.id, newItem);
      fetchData();
      confirmEdit(newItem.id);
      setResetSwipe(true);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível editar a transação.");
    }
  };

  const confirmEdit = (id: string) => {
    Alert.alert(
      "Transação Editada!",
      "Você editou a Transação " + id + " com sucesso!",
      [{ text: "Ok", style: "default" }]
    );
  };

  const handleLogout = async () => {
    await signOutUser();
    router.replace("/login");
  };

  return (
    <ContainerView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Extrato</ThemedText>
      </ThemedView>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <MaterialIcons name="logout" size={24} color="#fff" />
      </TouchableOpacity>
      <View>
        {!data.length ? (
          <ThemedText type="primary" style={styles.emptyListMessage}>
            Sem transações
          </ThemedText>
        ) : (
          <>
            <TextInput
              style={[styles.searchInput, { color: textColor }]}
              placeholder="Buscar transação..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <SwipeableItem
                  {...item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  resetSwipe={resetSwipe}
                  setResetSwipe={setResetSwipe}
                />
              )}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              nestedScrollEnabled
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </>
        )}
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 60,
  },
  emptyListMessage: {
    textAlign: "center",
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
    fontWeight: "bold",
  },
});
