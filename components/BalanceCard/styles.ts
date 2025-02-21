import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    backgroundColor: "#004D61",
    borderRadius: 8,
    padding: 24,
    color: "#fff",
    position: "relative",
    justifyContent: "center",
  },
  tabletContainer: {
    padding: 32,
    height: 420,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  greeting: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
  },
  date: {
    fontSize: 13,
    fontWeight: "400",
    color: "#fff",
  },
  balanceContainer: {
    alignItems: "center",
  },
  balance: {
    alignItems: "center",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
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
  },
  balanceAmount: {
    fontSize: 31,
    fontWeight: "400",
    color: "#fff",
  },
  imageBottomEdge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    opacity: 0.3,
  },
  imageTopEdge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    opacity: 0.3,
    transform: [{ rotate: "180deg" }],
  },
  imagePerson: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 200,
    height: 200,
  },
});
