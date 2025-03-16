import React, { FC } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

type CardContainerProps = {
  title?: string;
  children: React.ReactNode;
};
export const CardContainer: FC<CardContainerProps> = ({ title, children }) => {
  return (
    <View style={[styles.view]}>
      <Image
        source={require("@/assets/images/textura.png")}
        style={[styles.imageRotate, { left: 0, top: 0 }]}
      />
      {title && <Text style={[styles.title]}>{title}</Text>}
      {children}
      <Image
        source={require("@/assets/images/ilustration.png")}
        style={{ right: 0, bottom: 0, zIndex: 2 }}
      />
      <Image
        source={require("@/assets/images/textura.png")}
        style={[styles.image, { right: 0, bottom: 0 }]}
      />
    </View>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: -1,
  },
  imageRotate: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: -1,
    transform: [{ rotate: "180deg" }],
  },
  view: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    position: "relative",
    backgroundColor: "#cbcbcb",
    width: "100%",
    padding: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#dee9ea",
  },
});
