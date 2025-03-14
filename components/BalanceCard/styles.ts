import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 150,
    backgroundColor: "#004D61",
    borderRadius: 8,
    padding: 16,
    color: "#fff",
    position: "relative",
    height: "100%",
  },
  tabletContainer: {
    padding: 24,
    minHeight: 520,
  },
  header: {
    marginBottom: 12,
    alignItems: "center",
    marginTop: 30,
  },
  greeting: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  date: {
    fontSize: 10,
    color: "#fff",
    marginTop: 12,
    fontFamily: "Inter_400Regular",
  },
  balanceContainer: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 30,
  },
  balance: {
    alignItems: "flex-start",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  balanceTitle: {
    fontSize: 18,
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
    marginVertical: 8,
  },
  accountType: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 12,
    fontFamily: "Inter_400Regular",
  },
  imageTopEdge: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  imageBottomEdge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0.3,
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  imagePerson: {
    position: "absolute",
    bottom: 15,
    right: 5,
    width: 80,
    height: 80,
  },
});
