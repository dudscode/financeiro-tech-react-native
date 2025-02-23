import React, { useState } from 'react';
import { Animated, PanResponder, Modal, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet } from 'react-native';
import { formatCurrency, transformType } from '../utils/utils';
import { TransactionType } from '../utils/config';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SwipeableItemProps {
    id: string;
    mes: string;
    tipo: TransactionType;
    valor: number;
    data: string;
    onDelete: (id: string) => void;
    onEdit: (id: string, tipo: TransactionType) => void;
}
export default function SwipeableItem({ id, mes, tipo, valor, data, onDelete, onEdit }: SwipeableItemProps)  {
    const iconColor = useThemeColor({ light: '#000000', dark: '#ffffff' }, 'icon');
    const [pan] = useState(new Animated.ValueXY());
    const [showOptions, setShowOptions] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedType, setSelectedType] = useState<TransactionType>(tipo);

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
                    toValue: { x: -100, y: 0 },
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
            <ThemedText
                type="primary"
                style={styles.buttonActionText}
                onPress={() => onDelete(id)}
            >
                <IconSymbol name="trash" size={30} color="#FFFFFF" />
            </ThemedText>
        </View>
    );

    const renderEditButton = () => (
        <TouchableOpacity
            style={styles.editAction}
            onPress={() => setShowEdit(true)}
        >
            <ThemedText
                type="primary"
                style={styles.buttonActionText}
            >
                <IconSymbol name="pencil" size={30} color="#FFFFFF" />
            </ThemedText>
        </TouchableOpacity>
    );

    const renderEditModal = () => (
        <Modal
            transparent={true}
            animationType="fade"
            visible={showEdit}
            onRequestClose={() => setShowEdit(false)}
        >
            <TouchableWithoutFeedback onPress={() => setShowEdit(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <ThemedView style={styles.modalContent}>

                            <TouchableOpacity
                                style={styles.closeModalContainer}
                                onPress={() => setShowEdit(false)}
                            >
                                <IconSymbol name="clear.fill" size={30} color={iconColor} />
                            </TouchableOpacity>

                            <ThemedText type="subtitle">Selecione um novo tipo:</ThemedText>
                            {['deposit', 'transfer', 'withdraw', 'payment', 'reversal', 'loan', 'docted'].map((tipoOption) => (
                                <TouchableOpacity
                                    key={tipoOption}
                                    style={styles.modalButton}
                                    onPress={() => handleEditType(tipoOption as TransactionType)}
                                >
                                    <ThemedText type="primary" style={styles.modalButtonText}>
                                        {transformType(tipoOption as TransactionType)}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </ThemedView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const handleEditType = (newTipo: TransactionType) => {
        setSelectedType(newTipo);
        onEdit(id, newTipo);
        setShowEdit(false);
    };

    return (
        <View style={styles.containerList}>
            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.item, { transform: [{ translateX: pan.x }] }]}
            >
                <View>
                    <ThemedText type="primary" style={styles.titleItem}>{mes}</ThemedText>
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
};


const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 38,
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
        borderColor: '#3d8630',
        borderWidth: 1,
        backgroundColor: '#47A138',
        marginBottom: 24,
    },
    deleteAction: {
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: 80,
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    editAction: {
        position: 'absolute',
        top: 0,
        right: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#484949',
        width: 80,
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    buttonActionText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        borderRadius: 8,
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#47A138',
        alignItems: 'center',
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
    },
    closeModalButtonText: {
        color: 'white',
    },
    closeModalContainer: {
        display: 'flex',
        alignContent: 'flex-end',
        flexWrap: 'wrap'
    }
});