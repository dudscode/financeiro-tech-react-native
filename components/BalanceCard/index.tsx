import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useCurrencyFormatter } from "../../hooks/useCurrencyFormatter";
import { useIsTablet } from "../../hooks/useIsTablet";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

interface BalanceCardProps {
  saldo: number;
  loading?: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ saldo, loading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const { formatarValor } = useCurrencyFormatter();
  const isTablet = useIsTablet();
  const { userEmail } = useAuth();

  useEffect(() => {
    setCurrentDate(formatCurrentDate());
  }, []);

  function formatCurrentDate() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "long",
    };
    return new Date().toLocaleDateString("pt-BR", options);
  }

  const getUserName = () => {
    if (userEmail) {
      return userEmail.split("@")[0];
    }
    return "Usuário";
  };

  return (
    <View style={[styles.container, isTablet && styles.tabletContainer]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {getUserName()}! :)</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <View style={styles.balanceContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.balance}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Saldo</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(!isVisible)}
                style={styles.icon}
              >
                <MaterialIcons
                  name={isVisible ? "visibility" : "visibility-off"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.balanceLine} />
            <Text style={styles.accountType}>Conta Corrente</Text>
            <Text style={styles.balanceAmount}>
              {isVisible ? formatarValor(saldo) : "****"}
            </Text>
          </View>
        )}
      </View>

      <>
        <Image
          source={require("../../assets/images/top-mobile.png")}
          style={styles.imageTopEdge}
        />
        <Image
          source={require("../../assets/images/bottom-mobile.png")}
          style={styles.imageBottomEdge}
        />
        <Image
          source={require("../../assets/images/person-with-coin.png")}
          style={styles.imagePerson}
        />
      </>
    </View>
  );
};
