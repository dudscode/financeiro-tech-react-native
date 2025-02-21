import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useCurrencyFormatter } from "../../hooks/useCurrencyFormatter";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useIsTablet } from "../../hooks/useIsTablet";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface Saldo {
  tipo: string;
  valor: number;
}

interface BalanceCardProps {
  saldo: Saldo;
  loading: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ saldo, loading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const { formatarValor } = useCurrencyFormatter();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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

  return (
    <View style={[styles.container, isTablet && styles.tabletContainer]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Usuário! :)</Text>
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
              {isVisible ? formatarValor(saldo.valor) : "****"}
            </Text>
          </View>
        )}
      </View>

      {!isMobile && (
        <>
          <Image
            source={require("../../assets/images/bottom-edge.png")}
            style={styles.imageBottomEdge}
          />
          <Image
            source={require("../../assets/images/top-edge.png")}
            style={styles.imageTopEdge}
          />
          <Image
            source={require("../../assets/images/person-with-coin.png")}
            style={styles.imagePerson}
          />
        </>
      )}
    </View>
  );
};
