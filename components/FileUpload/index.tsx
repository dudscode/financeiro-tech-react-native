import { TouchableOpacity, View, Text, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth } from "@/app/firebase/config";

type File = {
  uri: string;
  name: string;
  size: number;
  type: string;
  mimeType: string;
};

export const uploadFile = async (file: File) => {
  console.log("file: ", file);
  Alert.alert("Enviado", JSON.stringify(file));

  // Convertendo o arquivo para Blob
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const storageRef = ref(
    storage,
    `images/users/${auth.currentUser?.uid}/${file?.name}`
  );

  uploadBytes(storageRef, blob)
    .then((snapshot) => {
      Alert.alert("Sucesso", "Arquivo enviado com sucesso!");
    })
    .catch((error) => {
      Alert.alert("Erro", "Erro ao enviar arquivo.");
    });
};

export const FileUpload = () => {
  const docPicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    const file = result?.assets?.[0];

    if (!!file) {
      const { uri, name, size, mimeType } = file;
      console.log("Arquivo selecionado:", { uri, name, size, mimeType });
      Alert.alert(
        "Arquivo selecionado",
        `Nome: ${name}\nTamanho: ${size} bytes`
      );
      uploadFile(file);
    } else {
      console.log("Usuário cancelou a seleção de arquivo");
      Alert.alert("Cancelado", "Nenhum arquivo foi selecionado.");
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={docPicker}>
        <Text>{"Upload de Imagem"}</Text>
      </TouchableOpacity>
    </View>
  );
};
