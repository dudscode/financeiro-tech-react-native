import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Text, Checkbox, IconButton } from 'react-native-paper';

const CadastroScreen = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleCadastro = useCallback(() => {
        console.log({ nome, email, senha, isChecked });
    }, [nome, email, senha, isChecked]);

    const handleClose = useCallback(() => {
        console.log("Fechar aba");
    }, []);

    const renderInput = (label: string, value: string, onChange: (text: string) => void, options = {})  => (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder={`Digite seu ${label.toLowerCase()}`}
                placeholderTextColor="#B0B0B0"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                mode="flat"
                {...options}
            />
        </>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <IconButton
                    icon="close"
                    size={30}
                    onPress={handleClose}
                    style={styles.closeButton}
                />

                <Image source={require('../../assets/images/cadastro-imagem.png')} style={styles.image} />
                <Text style={styles.title}>Preencha os campos abaixo para criar sua conta corrente!</Text>

                {renderInput('Nome', nome, setNome)}
                {renderInput('Email', email, setEmail, { keyboardType: 'email-address' })}
                {renderInput('Senha', senha, setSenha, { secureTextEntry: true })}

                <View style={styles.checkboxContainer}>
                    <View style={styles.checkboxBorder}>
                        <Checkbox
                            status={isChecked ? 'checked' : 'unchecked'}
                            onPress={() => setIsChecked(!isChecked)}
                            uncheckedColor="transparent"
                            color={isChecked ? "#47A138" : undefined}
                        />
                    </View>
                    <Text style={styles.checkboxText}>
                        Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.
                    </Text>
                </View>

                <Button
                    mode="contained"
                    onPress={handleCadastro}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Criar conta
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderColor: '#DEE9EA',
        borderRadius: 10,
        borderWidth: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    checkboxBorder: {
        borderWidth: 1,
        borderColor: '#47A138',
        borderRadius: 4,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkboxText: {
        fontSize: 14,
        flex: 1,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#FF5031',
        borderRadius: 8,
        marginTop: 20,
        paddingVertical: 8,
        width: '40%',
        alignSelf: 'center',
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CadastroScreen;

