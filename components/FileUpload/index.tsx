import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
// import storage from "@react-native-firebase/storage";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Função para selecionar o arquivo
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.type === "success") {
        setFile(res);
      }
    } catch (err) {
      console.log("Erro ao selecionar arquivo:", err);
    }
  };
  // Função para enviar o arquivo para o Firebase Storage
  // const uploadFile = async () => {
  //   if (!file) {
  //     Alert.alert('Aviso', 'Nenhum arquivo selecionado.');
  //     return;
  //   }

  //   setUploading(true);

  //   const { uri, name } = file[0];
  //   const reference = storage().ref(`uploads/${name}`); // Caminho no Firebase Storage

  //   // Inicia o upload
  //   const task = reference.putFile(uri);

  //   // Monitora o progresso do upload
  //   task.on('state_changed', (taskSnapshot) => {
  //     const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
  //     setUploadProgress(progress);
  //   });

  //   try {
  //     await task;
  //     Alert.alert('Sucesso', 'Arquivo enviado com sucesso!');
  //     console.log('Arquivo enviado:', name);
  //   } catch (error) {
  //     console.log('Erro ao enviar arquivo:', error);
  //     Alert.alert('Erro', 'Falha ao enviar o arquivo.');
  //   } finally {
  //     setUploading(false);
  //     setUploadProgress(0);
  //   }
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Selecionar Arquivo</Text>
      </TouchableOpacity>

      {file && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileText}>
            Arquivo selecionado: {file[0].name}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, uploading && styles.disabledButton]}
        onPress={() => Alert.alert("Aviso", "Função desabilitada")}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading
            ? `Enviando... ${uploadProgress.toFixed(2)}%`
            : "Enviar Arquivo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  fileInfo: {
    marginVertical: 20,
  },
  fileText: {
    fontSize: 16,
    color: "#333",
  },
});

export default FileUploader;
