import React, { useEffect, useState } from 'react';
import {
  Animated,
  PanResponder,
  Modal,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import { formatCurrency, transformType, transformValueEdit } from '../utils/utils';
import { ItemPropsExtrato, TransactionType } from '../utils/config';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './styles';

interface SwipeableItemProps {
  id: string;
  mes: string;
  tipo: TransactionType;
  valor: number;
  data: string;
  onDelete: (id: string) => void;
  onEdit: (newItem: ItemPropsExtrato) => void;
  resetSwipe: any;
  setResetSwipe: any;
}
export default function SwipeableItem({
  id,
  mes,
  tipo,
  valor,
  data,
  onDelete,
  onEdit,
  resetSwipe,
  setResetSwipe,
}: SwipeableItemProps) {
  const iconColor = useThemeColor({ light: '#000000', dark: '#ffffff' }, 'icon');
  const [pan] = useState(new Animated.ValueXY());
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedType, setSelectedType] = useState<TransactionType>(tipo);

  useEffect(() => {
    if (resetSwipe) {
      setShowOptions(false);
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start(() => {
        setResetSwipe(false);
      });
    }
  }, [resetSwipe]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newX = gestureState.dx < 0 ? gestureState.dx : 0;
      pan.setValue({ x: newX, y: 0 });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -30) {
        setShowOptions(true);
        Animated.spring(pan, {
          toValue: { x: -80, y: 0 },
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
        setShowOptions(false);
      }
    },
  });

  const renderDeleteButton = () => (
    <View style={styles.deleteAction}>
      <ThemedText type="primary" style={styles.buttonActionText} onPress={() => onDelete(id)}>
        <IconSymbol name="trash" size={30} color="#FFFFFF" />
      </ThemedText>
    </View>
  );

  const renderEditButton = () => (
    <TouchableOpacity style={styles.editAction} onPress={() => setShowEdit(true)}>
      <ThemedText type="primary" style={styles.buttonActionText}>
        <IconSymbol name="pencil" size={30} color="#FFFFFF" />
      </ThemedText>
    </TouchableOpacity>
  );

  const renderEditModal = () => (
    <Modal
      transparent={true}
      animationType="fade"
      visible={showEdit}
      onRequestClose={() => setShowEdit(false)}>
      <TouchableWithoutFeedback onPress={() => setShowEdit(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <ThemedView style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeModalContainer}
                onPress={() => setShowEdit(false)}>
                <IconSymbol name="clear.fill" size={30} color={iconColor} />
              </TouchableOpacity>

              <ThemedText type="subtitle">Selecione um novo tipo:</ThemedText>
              {['deposit', 'transfer', 'withdraw', 'payment', 'reversal', 'loan', 'docted'].map(
                tipoOption => (
                  <TouchableOpacity
                    key={tipoOption}
                    style={styles.modalButton}
                    onPress={() => handleEditType(tipoOption as TransactionType)}>
                    <ThemedText type="primary" style={styles.modalButtonText}>
                      {transformType(tipoOption as TransactionType)}
                    </ThemedText>
                  </TouchableOpacity>
                )
              )}
            </ThemedView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const handleEditType = (newTipo: TransactionType) => {
    const newItem: ItemPropsExtrato = { id, mes, tipo: newTipo, valor, data };
    newItem.valor = transformValueEdit(newItem.tipo, newItem.valor);
    setSelectedType(newTipo);
    onEdit(newItem);
    setShowEdit(false);
  };

  return (
    <View style={styles.containerList}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.item, { transform: [{ translateX: pan.x }] }]}>
        <View>
          <ThemedText type="primary" style={styles.titleItem}>
            {mes}
          </ThemedText>
          <View style={styles.listContainer}>
            <ThemedText type="subtitle">{transformType(tipo)}</ThemedText>
            <ThemedText type="info">{data}</ThemedText>
          </View>
          <ThemedText type="subtitle">{formatCurrency(valor)}</ThemedText>
          <View style={styles.divider}></View>
        </View>
      </Animated.View>
      {showOptions && renderDeleteButton()}
      {showEdit && renderEditModal()}
      {showOptions && renderEditButton()}
    </View>
  );
}
