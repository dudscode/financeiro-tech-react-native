import { StyleSheet, View } from "react-native";

import ContainerView from "@/components/ContainerView";
import { ThemedText } from "@/components/ThemedText";
import { NewTransactions } from "@/components/NewTransactions";

export default function TabTwoScreen() {
  return (
    <ContainerView>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Balance Card</ThemedText>
      </View>
      <NewTransactions />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    color: "white",
    marginTop: 60,
  },
});
