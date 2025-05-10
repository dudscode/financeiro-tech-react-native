import { View, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth } from "@/app/firebase/config";
import { Button } from "@/components/Button";


export const uploadFile = async (file: DocumentPicker.DocumentPickerAsset): Promise<string | null> => {
  try {
    const response = await fetch(file.uri);
    const blob = await response.blob();

    const storagePath = `images/users/${auth.currentUser?.uid}/${file.name}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, blob);

    console.log("Arquivo enviado com sucesso!");
    return storagePath;
  } catch (error) {
    Alert.alert("Erro", "Erro ao enviar arquivo.");
    return null;
  }
};

type FileUploadProps = {
  callback: (file: DocumentPicker.DocumentPickerAsset) => void;
};

export const FileUpload = ({ callback }: FileUploadProps) => {
  const docPicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    const file = result?.assets?.[0];

    if (!!file) {
      callback(file);
    } else {
      Alert.alert("Cancelado", "Nenhum arquivo foi selecionado.");
    }
  };

  return (
    <View>
      <Button title="Upload de Imagem" onPress={docPicker} />
    </View>
  );
};
