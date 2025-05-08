import React from 'react';
import { FlatList, View, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ContainerView from '@/components/ContainerView';

import SwipeableItem from '@/components/extrato/SwipeableItem';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useExtrato } from '@/hooks/useExtrato';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

export default function TabExtratoScreen() {
  const textColor = useThemeColor({ light: '#000000', dark: '#ffffff' }, 'text');

  const {
    data,
    filteredData,
    handleDelete,
    handleEdit,
    handleLogout,
    searchQuery,
    setSearchQuery,
    resetSwipe,
    setResetSwipe,
  } = useExtrato();

  return (
    <ContainerView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Extrato</ThemedText>
      </ThemedView>
      <TouchableOpacity onPress={handleLogout} style={{ position: 'absolute', top: 10, right: 10 }}>
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
              keyExtractor={item => item.id}
              nestedScrollEnabled
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </>
        )}
      </View>
    </ContainerView>
  );
}
