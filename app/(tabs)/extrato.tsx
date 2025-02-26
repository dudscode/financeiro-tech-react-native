import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View, Alert, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ContainerView from '@/components/ContainerView';
import { ItemPropsExtrato, TransactionType } from '@/components/utils/config';
import SwipeableItem from '@/components/extrato/SwipeableItem';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useFocusEffect } from '@react-navigation/native';
import extratoFirestore from '../services/extrato-firestore';


export default function TabExtratoScreen() {
    const textColor = useThemeColor({ light: '#000000', dark: '#ffffff' }, 'text');
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<ItemPropsExtrato[]>([]);
    const [resetSwipe, setResetSwipe] = useState(false); // Estado para resetar o swipe

    const fetchData = async () => {
        try {
          const transactions = await extratoFirestore.getTransactions();
          setData(transactions);
        } catch (error) {
          console.error('Erro ao buscar transações:', error);
        }
      };
    
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
      
    );

    const filteredData = data.filter(item =>
        item.mes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.data.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleDelete = (id: string) => {
        Alert.alert(
            'Excluir Transação',
            'Você tem certeza que deseja excluir a Transação ' + id + ' ?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir',  onPress: async () => {
                    await extratoFirestore.deleteTransaction(id);
                    fetchData();
                }, },
            ],
        );
    };

    const handleEdit = async ( newItem: ItemPropsExtrato) => {
        try {
            await extratoFirestore.updateTransaction(newItem.id, newItem); 
            fetchData(); 
            confirmEdit(newItem.id);
            setResetSwipe(true); // Dispara o reset
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível editar a transação.');
          }
    };
    const confirmEdit = (id: string) => {
        Alert.alert(
            'Transação Editada!',
            'Você editou a Transação ' + id + ' com sucesso!',
            [
                { text: 'Ok', style: 'default' }
            ],
        );
    }

    return (
        <ContainerView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Extrato</ThemedText>
            </ThemedView>
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
                                <SwipeableItem {...item} onDelete={handleDelete} onEdit={handleEdit} resetSwipe={resetSwipe} setResetSwipe={setResetSwipe}  />
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
        flexDirection: 'row',
        gap: 8,
        // no meu celular tava muito em cima 
        marginTop: 60,
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleItem: {
        marginBottom: 10,
    },
    containerList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 90,
    },
    item: {
        flexDirection: 'column',
        gap: 6,
        width: '100%',
        paddingRight: 0,
    },
    divider: {
        width: '70%',
        marginTop: 8,
        borderColor: '#47A138',
        borderWidth: 1,
        backgroundColor: '#47A138',
        marginBottom: 24,
    },
    emptyListMessage: {
        textAlign: 'center',
        marginTop: 20,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 8,
        marginBottom: 16,
        fontWeight: 'bold',
    }
});
