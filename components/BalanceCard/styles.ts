import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 500,
    backgroundColor: "#004D61",
    borderRadius: 8,
    padding: 24,
    color: "#fff",
    position: "relative",
    height: "100%",
  },
  tabletContainer: {
    padding: 32,
    minHeight: 520,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
    marginTop: 40,
  },
  greeting: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  date: {
    fontSize: 12,
    color: "#fff",
    marginTop: 16,
    fontFamily: "Inter_400Regular",
  },
  balanceContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
  },
  balance: {
    alignItems: "flex-start",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  balanceTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  icon: {
    marginLeft: 8,
  },
  balanceLine: {
    width: 180,
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  accountType: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 16,
    fontFamily: "Inter_400Regular",
  },
  imageTopEdge: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
  },
  imageBottomEdge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
  imagePerson: {
    position: "absolute",
    bottom: 45,
    right: 30,
  },
});
