import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Loading } from "@/components/Loading";

type AppButtonProps = {
  onPress: () => void;
  title: string;
  loading?: boolean;
};

export const Button: FC<AppButtonProps> = ({ onPress, title, loading }) => (
  <TouchableOpacity
    onPress={onPress}
    style={!loading ? styles.appButtonContainer : styles.desabled}
  >
    {loading && <Loading />}
    {!loading && <Text style={styles.appButtonText}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  desabled: {
    pointerEvents: "none",
    elevation: 8,
    backgroundColor: "#333",
    opacity: 0.5,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    maxWidth: 150,
  },
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
