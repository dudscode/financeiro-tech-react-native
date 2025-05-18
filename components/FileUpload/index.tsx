import { View, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "@/components/Button";
import React from "react";

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
