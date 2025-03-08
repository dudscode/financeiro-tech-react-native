import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ContainerView from '@/components/ContainerView';
import { ThemedText } from '@/components/ThemedText';
import { addDoc, collection } from 'firebase/firestore';
import db  from '../firebase/config';
import extratoFirestore from '../services/extrato-firestore';
import { ItemPropsExtrato } from '@/components/utils/config';

export default function TabTwoScreen() {
  const handleAddTransaction = async () => {
    try {
      const newTransaction: ItemPropsExtrato = {
        id:  Math.floor(Math.random() * 1000).toString(),
        mes: "Fevereiro",
        tipo: "payment",
        data: new Date().toLocaleDateString(),
        valor: 50
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
        <ThemedText type="title">Balance Card</ThemedText>
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Transacoes</ThemedText>
      </View>
       {/* remover quando incluir o component de add transacao */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.addButtonText}>Adicionar Transação</Text>
      </TouchableOpacity>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    color: 'white',
    marginTop: 60,
  },
  // remover quando incluir o component de add transacao
  addButton: {
    backgroundColor: '#47A138',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
