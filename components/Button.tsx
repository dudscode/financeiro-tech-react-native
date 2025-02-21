import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

type AppButtonProps = {
  onPress: () => void;
  title: string;
};

export const Button: FC<AppButtonProps> = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#004d61",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    maxWidth: 150,
  },
  appButtonText: {
    fontSize: 16,
    lineHeight: 21,
    color: "#fff",
    fontWeight: "normal",
    alignSelf: "center",
    textAlign: "center",
  },
});
